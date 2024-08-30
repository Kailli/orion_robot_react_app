// Importing the required modules
import React, { useState } from 'react';
import { View, Text, FlatList, TextInput, Pressable, StyleSheet, KeyboardAvoidingView, Platform, Dimensions } from 'react-native';
import * as Speech from 'expo-speech';
import { Audio } from 'expo-av';
import axios from 'axios'; // Add axios for making HTTP requests

const { width } = Dimensions.get('window');

const ChatScreen = ({ navigation }) => {
  const [messages, setMessages] = useState([{ id: '1', text: 'Hello! How can I help you?' }]);
  const [message, setMessage] = useState('');
  const [recording,setRecording] = useState(null);

  const handleSend = () => {
    if (message.trim()) {
      const newMessage = { id: (messages.length + 1).toString(), text: message, type: 'user' };
      setMessages([...messages, newMessage]);

      handleBotResponse(message); // Handle response to text message
      setMessage('');
    }
  };

  const handleBotResponse = (userMessage) => {
    const lowerCaseMessage = userMessage.toLowerCase();
    let botMessage = '';

    if (['hi', 'hello', 'morning', 'good morning'].includes(lowerCaseMessage)) {
      botMessage = 'Hello, Today is a great day. What can I help you?';
    } else if (lowerCaseMessage === 'show menu') {
      navigation.navigate('MenuScreen');
      return;
    } else if (lowerCaseMessage.includes('recommend')) {
      if (lowerCaseMessage.includes('drink')) {
        botMessage = 'I will suggest "Strawberry Juice and Orange Juice" for you. You can check price and order at Menu.';
      } else if (lowerCaseMessage.includes('food')) {
        botMessage = 'I will suggest "Ohn No Khao Swe (အုန်းနို့ခေါက်ဆွဲ) and Mohinga (မုန့်ဟင်းခါး)" for you. You can check price and order at Menu.';
      } else {
        botMessage = 'I will recommend today\'s special "Pizza and Strawberry Juice". You can check price and order at Menu.';
      }
    } else if (lowerCaseMessage.includes('connect with admin')) {
      botMessage = 'You are now connected with an admin. How can we assist you?';
    } else if (lowerCaseMessage.includes('open')) {
      if (lowerCaseMessage.includes('time')) {
        botMessage = 'We\'re open from 9:00AM to 9:00PM. ဆိုင်ဖွင့်ချိန်ဟာ မနက်၉နာရီမှ ညနေ၉နာရီထိ ရှိပါသည်';
      } else if (lowerCaseMessage.includes('day')) {
        botMessage = 'We are open every day and every weekend and provide the best service. ရုံးဖွင့်ရက်များနှင့် ပိတ်ရက်တိုင်းဖွင့်လှစ်ထားပြီးအကောင်းဆုံးသော ဝန်ဆောင်မှုပေးနေပါသည်';
      } else {
        botMessage = 'We are open every day and weekend from 9:00 AM to 9:00 PM and provide the best service. ရုံးဖွင့်ရက်များနှင့် ပိတ်ရက်တိုင်း မနက် ၉နာရီမှ ညနေ ၉နာရီထိ ဖွင့်လှစ်ထားပြီးအကောင်းဆုံးသော ဝန်ဆောင်မှုပေးနေပါသည်';
      }
    } else {
      botMessage = 'I did not understand that. Please choose one of the options or ask for a recommendation.';
    }

    const newBotMessage = { id: (messages.length + 2).toString(), text: botMessage, type: 'bot' };
    setMessages((prevMessages) => [...prevMessages, newBotMessage]);

    // Convert the bot message to speech
    Speech.speak(botMessage);
  };
  const handleBotResponseText = (userMessage) => {
    const lowerCaseMessage = userMessage.toLowerCase();
    let botMessage = '';

    if (['hi', 'hello', 'morning', 'good morning'].includes(lowerCaseMessage)) {
      botMessage = 'Hello, Today is a great day. What can I help you?';
    } else if (lowerCaseMessage === 'show menu') {
      navigation.navigate('MenuScreen');
      return;
    } else if (lowerCaseMessage.includes('recommend')) {
      if (lowerCaseMessage.includes('drink')) {
        botMessage = 'I will suggest "Strawberry Juice and Orange Juice" for you. You can check price and order at Menu.';
      } else if (lowerCaseMessage.includes('food')) {
        botMessage = 'I will suggest "Ohn No Khao Swe (အုန်းနို့ခေါက်ဆွဲ) and Mohinga (မုန့်ဟင်းခါး)" for you. You can check price and order at Menu.';
      } else {
        botMessage = 'I will recommend today\'s special "Pizza and Strawberry Juice". You can check price and order at Menu.';
      }
    } else if (lowerCaseMessage.includes('connect with admin')) {
      botMessage = 'You are now connected with an admin. How can we assist you?';
    } else if (lowerCaseMessage.includes('open')) {
      if (lowerCaseMessage.includes('time')) {
        botMessage = 'We\'re open from 9:00AM to 9:00PM. ဆိုင်ဖွင့်ချိန်ဟာ မနက်၉နာရီမှ ညနေ၉နာရီထိ ရှိပါသည်';
      } else if (lowerCaseMessage.includes('day')) {
        botMessage = 'We are open every day and every weekend and provide the best service. ရုံးဖွင့်ရက်များနှင့် ပိတ်ရက်တိုင်းဖွင့်လှစ်ထားပြီးအကောင်းဆုံးသော ဝန်ဆောင်မှုပေးနေပါသည်';
      } else {
        botMessage = 'We are open every day and weekend from 9:00 AM to 9:00 PM and provide the best service. ရုံးဖွင့်ရက်များနှင့် ပိတ်ရက်တိုင်း မနက် ၉နာရီမှ ညနေ ၉နာရီထိ ဖွင့်လှစ်ထားပြီးအကောင်းဆုံးသော ဝန်ဆောင်မှုပေးနေပါသည်';
      }
    } else {
      botMessage = 'I did not understand that. Please choose one of the options or ask for a recommendation.';
    }

    const newBotMessage = { id: (messages.length + 2).toString(), text: botMessage, type: 'bot' };
    setMessages((prevMessages) => [...prevMessages, newBotMessage]);
  };

 
  const startRecording = async () => {
    try {
      console.log('Requesting permissions...');
      await Audio.requestPermissionsAsync();

      console.log('Starting recording...');
      const newRecording = new Audio.Recording(); // Create a new instance of Audio.Recording
      await newRecording.prepareToRecordAsync(Audio.RECORDING_OPTIONS_PRESET_HIGH_QUALITY);
      await newRecording.startAsync();
      setRecording(newRecording); // Set the new recording instance
      console.log('Recording started:', newRecording);
    } catch (error) {
      console.error('Failed to start recording:', error);
    }
  };

  const stopRecording = async () => {
    try {
      if (!recording) {
        console.warn('No recording is in progress.');
        return;
      }

      console.log('Stopping recording...', recording);
      await recording.stopAndUnloadAsync();
      const { sound, status } = await recording.createNewLoadedSoundAsync();
      const audioBuffer = await recording.getURI();

      // Convert the audioBuffer to base64 if required by your transcription API
      const base64Audio = await fileToBase64(audioBuffer);

      // Send the base64 encoded audio directly to the transcription API
      const response = await axios.post('http://192.168.137.1:8081/transcribe', {
        audio: base64Audio,
      }, {
        headers: { 'Content-Type': 'application/json' },
      });

      console.log('Response:', response.data);
      const { transcript_id } = response.data;
      console.log('Transcript ID:', transcript_id);

      setRecording(null); // Clear the recording state
    } catch (error) {
      console.error('Failed to stop recording:', error);
    }
  };

  const fileToBase64 = async (uri) => {
    const response = await fetch(uri);
    const blob = await response.blob();
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onloadend = () => {
        resolve(reader.result.split(',')[1]); // Remove the base64 header
      };
      reader.onerror = reject;
      reader.readAsDataURL(blob);
    });
  };

  
  
  

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <FlatList
        data={messages}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={[styles.messageContainer, 
            item.type === 'user' ? styles.userMessage : styles.botMessage,
            { maxWidth: width * 0.8 }]}>
            <Text style={styles.messageText}>{item.text}</Text>
          </View>
        )}
        style={styles.messagesList}
      />
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.textInput}
          value={message}
          onChangeText={setMessage}
          placeholder="Type a message..."
        />
        <Pressable style={styles.sendButton} onPress={handleSend}>
          <Text style={styles.sendButtonText}>Send</Text>
        </Pressable>
      </View>
      <View style={styles.speechControls}>
        <Pressable style={styles.controlButton} onPress={startRecording}>
          <Text style={styles.controlButtonText}>Start Speaking</Text>
        </Pressable>
        <Pressable style={styles.controlButton} onPress={stopRecording}>
          <Text style={styles.controlButtonText}>Stop Speaking</Text>
        </Pressable>
      </View>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
  },
  messagesList: {
    flex: 1,
    width: '100%',
    padding: 10,
    backgroundColor: '#fff',
  },
  messageContainer: {
    padding: 10,
    borderRadius: 5,
    marginBottom: 10,
    alignSelf: 'flex-start',
  },
  userMessage: {
    backgroundColor: '#007bff',
    alignSelf: 'flex-end',
  },
  botMessage: {
    backgroundColor: '#037579',
  },
  messageText: {
    fontSize: 16,
    color: '#fff',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    backgroundColor: '#fff',
    borderTopWidth: 1,
    borderTopColor: '#ddd',
  },
  textInput: {
    flex: 1,
    padding: 10,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 5,
    marginRight: 10,
    backgroundColor: '#f5f5f5',
  },
  sendButton: {
    padding: 10,
    backgroundColor: '#007bff',
    borderRadius: 5,
  },
  sendButtonText: {
    color: '#fff',
    fontSize: 16,
  },
  speechControls: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 10,
    backgroundColor: '#f9f9f9',
    borderTopWidth: 1,
    borderTopColor: '#ddd',
  },
  controlButton: {
    padding: 10,
    backgroundColor: '#007bff',
    borderRadius: 5,
  },
  controlButtonText: {
    color: '#fff',
    fontSize: 16,
  },
});

export default ChatScreen;
