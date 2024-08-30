// AdminDashboard.js
import React, { useContext } from 'react';
import { View, Text, Button } from 'react-native';
import { AuthContext } from './AuthContext';

const AdminDashboard = () => {
  const { logout } = useContext(AuthContext);

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text style={{ fontSize: 24, marginBottom: 20 }}>Admin Dashboard</Text>
      <Button title="Logout" onPress={logout} />
    </View>
  );
};

export default AdminDashboard;
