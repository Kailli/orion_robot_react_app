// ProfileScreen.js
import React from 'react';
import { StyleSheet, View, Text, Pressable } from 'react-native';

const ProfileScreen = ({ navigation, onLogout }) => {
  const user = {
    name: 'John Doe',
    email: 'johndoe@example.com',
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Profile</Text>
      <Text style={styles.info}>Name: {user.name}</Text>
      <Text style={styles.info}>Email: {user.email}</Text>
      
      <Pressable style={styles.logoutButton} onPress={onLogout}>
        <Text style={styles.logoutButtonText}>Logout</Text>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  info: {
    fontSize: 18,
    marginBottom: 10,
  },
  logoutButton: {
    marginTop: 20,
    padding: 15,
    backgroundColor: '#dc3545',
    borderRadius: 5,
    alignItems: 'center',
  },
  logoutButtonText: {
    color: '#fff',
    fontSize: 16,
  },
});

export default ProfileScreen;
