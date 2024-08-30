import React, { useState } from 'react';
import { View, Text, FlatList, TextInput,Button, Pressable, StyleSheet, KeyboardAvoidingView, Platform, Dimensions } from 'react-native';

const { width } = Dimensions.get('window');

const ChatScreen = ({ navigation }) => {
  const [messages, setMessages] = useState([{ id: '1', text: 'Hello! How can I help you?' }]);
  const [message, setMessage] = useState('');

  const handleSend = () => {
    if (message.trim()) {
      const newMessage = { id: (messages.length + 1).toString(), text: message, type: 'user' };
      setMessages([...messages, newMessage]);

      handleBotResponse(message);
      setMessage('');
    }
  };

  const handleBotResponse = (userMessage) => {
    const lowerCaseMessage = userMessage.toLowerCase();
    let botMessage = '';

    if (['hi', 'hello', 'morning', 'good morning'].includes(lowerCaseMessage)) {
      botMessage = 'Hello, Today is a great day. What can I help you?';
    } else if (lowerCaseMessage === 'show menu') {
      botMessage = 'You can go to Menu Page. လူကြီးမင်းအတွက် သန့်ရှင်းလက်ဆက်ပြီး အရသာရှိသော ဟင်းလျာများအား ကြည့်ရှုနိုင်ရန်အတွက် Menu Pageသို့ သွားရောက်ပေးပါရှင့်';
    } else if (lowerCaseMessage.includes('recommend') || 
                lowerCaseMessage.includes('like') || 
                lowerCaseMessage.includes('love') || 
                lowerCaseMessage.includes('give me')) {
      if (lowerCaseMessage.includes('drink')) {
        botMessage = 'I will suggest \'Strawberry Juice and Orange Juice\' for you. You can check price and order at Menu.';
      } else if (lowerCaseMessage.includes('food')) {
        botMessage = 'I will suggest \'Ohn No Khao Swe (အုန်းနို့ခေါက်ဆွဲ) and Mohinga (မုန့်ဟင်းခါး) \' for you. You can check price and order at Menu.';
      } else {
        botMessage = 'I will recommend today\'s special \'Pizza and Strawberry Juice\'. You can check price and order at Menu.';
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

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 64 : 0} // Adjust offset if needed
    >
      <View style={styles.chatContainer}>
        <FlatList
          data={messages}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <View style={[
              styles.messageContainer,
              item.type === 'user' ? styles.userMessage : styles.botMessage,
              { maxWidth: width * 0.8 }
            ]}>
              <Text style={styles.messageText}>{item.text}</Text>
            </View>
          )}
          style={styles.messagesList}
          contentContainerStyle={styles.listContent}
          inverted={true} // Ensure messages appear from bottom to top
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
      </View>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
  },
  chatContainer: {
    flex: 1,
    justifyContent: 'flex-end', // Ensure input stays at the bottom
  },
  messagesList: {
    flex: 1,
    width: '100%',
    paddingHorizontal: 10,
  },
  listContent: {
    paddingVertical: 10,
    flexDirection: 'column-reverse', // Ensures messages are ordered from bottom to top
  },
  messageContainer: {
    padding: 10,
    borderRadius: 5,
    marginBottom: 10,
    alignSelf: 'flex-start',
  },
  userMessage: {
    backgroundColor: '#007bff', // Blue background for user messages
    alignSelf: 'flex-end',
  },
  botMessage: {
    backgroundColor: '#037579', // Gray background for bot replies
  },
  messageText: {
    fontSize: 16,
    color: '#fff', // White text color for user messages
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
});

export default ChatScreen;
