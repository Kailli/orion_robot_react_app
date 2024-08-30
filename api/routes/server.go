package main

import (
	"bytes"
	"encoding/json"
	"fmt"
	"io/ioutil"
	"log"
	"net/http"
	"os"

	"github.com/gorilla/mux"
)

// API key and AssemblyAI URLs
const API_KEY = "463ac49f6a3b45f7986693cfc3f6d3eb"
const UPLOAD_URL = "https://api.assemblyai.com/v2/upload"
const TRANSCRIPT_URL = "https://api.assemblyai.com/v2/transcript"

// Handle file upload and transcription
func handleTranscription(w http.ResponseWriter, r *http.Request) {
	// Parse the form to retrieve the file
	err := r.ParseMultipartForm(10 << 20) // Limit the size to 10 MB
	if err != nil {
		http.Error(w, "Unable to parse form", http.StatusBadRequest)
		return
	}

	file, _, err := r.FormFile("audio")
	if err != nil {
		http.Error(w, "Error retrieving the file", http.StatusBadRequest)
		return
	}
	defer file.Close()

	// Read the file into a byte slice
	fileBytes, err := ioutil.ReadAll(file)
	if err != nil {
		http.Error(w, "Error reading the file", http.StatusInternalServerError)
		return
	}

	// Upload the file to AssemblyAI
	req, _ := http.NewRequest("POST", UPLOAD_URL, bytes.NewBuffer(fileBytes))
	req.Header.Set("authorization", API_KEY)

	client := &http.Client{}
	res, err := client.Do(req)
	if err != nil || res.StatusCode != http.StatusOK {
		http.Error(w, "Failed to upload file", http.StatusInternalServerError)
		return
	}

	// Decode the response to get the upload URL
	var uploadResult map[string]interface{}
	json.NewDecoder(res.Body).Decode(&uploadResult)
	uploadURL, ok := uploadResult["upload_url"].(string)
	if !ok {
		http.Error(w, "Failed to retrieve upload URL", http.StatusInternalServerError)
		return
	}

	// Request transcription from AssemblyAI
	values := map[string]string{"audio_url": uploadURL}
	jsonData, _ := json.Marshal(values)

	req, _ = http.NewRequest("POST", TRANSCRIPT_URL, bytes.NewBuffer(jsonData))
	req.Header.Set("authorization", API_KEY)
	req.Header.Set("content-type", "application/json")

	res, err = client.Do(req)
	if err != nil || res.StatusCode != http.StatusOK {
		http.Error(w, "Failed to request transcription", http.StatusInternalServerError)
		return
	}

	// Decode the transcription response
	var transcriptResult map[string]interface{}
	json.NewDecoder(res.Body).Decode(&transcriptResult)

	// Send the transcript ID back to the client
	transcriptID, ok := transcriptResult["id"].(string)
	if !ok {
		http.Error(w, "Failed to retrieve transcript ID", http.StatusInternalServerError)
		return
	}

	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(http.StatusOK)
	json.NewEncoder(w).Encode(map[string]string{"transcript_id": transcriptID})
}

func main() {
	router := mux.NewRouter()
	router.HandleFunc("/transcribe", handleTranscription).Methods("POST")

	fmt.Println("Server is running on port 8080...")
	log.Fatal(http.ListenAndServe(":8080", router))
}
