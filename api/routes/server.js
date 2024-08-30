import axios from 'axios';
import * as FileSystem from 'expo-file-system';

// Function to transcribe audio using OpenAI Whisper API
const transcribeAudio = async (uri) => {
  try {
    // Read the audio file as base64
    const audioBase64 = await FileSystem.readAsStringAsync(uri, {
      encoding: FileSystem.EncodingType.Base64,
    });

    // Your OpenAI API key
    const apiKey = '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';
    const url = 'https://api.openai.com/v1/audio/transcriptions';

    // Request payload
    const requestPayload = {
      model: 'whisper-1',  // Specify Whisper model
      file: audioBase64,   // The audio file content in base64
      response_format: 'text',  // Desired response format
      language: 'en',     // Language of the audio
    };

    // Send the request to OpenAI Whisper API
    const response = await axios.post(url, requestPayload, {
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
    });

    // Extract and return the transcript from the response
    const transcript = response.data.text;
    return transcript;
  } catch (error) {
    console.error('Error transcribing audio:', error.response ? error.response.data : error.message);
    return '';
  }
};
