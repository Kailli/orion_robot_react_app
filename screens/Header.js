import React, { useState } from 'react';
import { StyleSheet, View, Pressable, Text, Modal } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import IconI from 'react-native-vector-icons/Ionicons';

const Header = ({ navigate }) => {
  const [dropdownVisible, setDropdownVisible] = useState(false);

  const toggleDropdown = () => {
    setDropdownVisible(!dropdownVisible);
  };

  return (
    <View style={styles.header}>
      <View style={styles.leftSection}>
        <Pressable style={styles.iconButton} onPress={toggleDropdown}>
          <Icon name="bars" size={24} color="#000" />
        </Pressable>
      </View>
      <Pressable style={styles.iconButton} onPress={() => navigate('Cart')}>
        <IconI name="cart-outline" size={24} color="#000" />
      </Pressable>

      {/* Dropdown menu as a modal to ensure it floats and overlaps */}
      {dropdownVisible && (
        <Modal
          transparent={true}
          animationType="fade"
          visible={dropdownVisible}
          onRequestClose={toggleDropdown}
        >
          <Pressable style={styles.overlay} onPress={toggleDropdown}>
            <View style={styles.dropdownContainer}>
              <Pressable style={styles.button} onPress={() => { navigate('Location'); toggleDropdown(); }}>
                <Text style={styles.buttonText}>Location</Text>
              </Pressable>
              <Pressable style={styles.button} onPress={() => { navigate('Menu'); toggleDropdown(); }}>
                <Text style={styles.buttonText}>Menu</Text>
              </Pressable>
              <Pressable style={styles.button} onPress={() => { navigate('Chat'); toggleDropdown(); }}>
                <Text style={styles.buttonText}>Chat</Text>
              </Pressable>
            </View>
          </Pressable>
        </Modal>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 10,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  leftSection: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconButton: {
    padding: 10,
    backgroundColor: '#fff',
    borderRadius: 5,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  overlay: {
    flex: 1,
    justifyContent: 'flex-start',
  },
  dropdownContainer: {
    marginTop: 70,
    marginLeft: 10,
    width:'45%',
    backgroundColor: '#fff',
    borderRadius: 5,
    elevation: 5, // Adds shadow for Android
    shadowColor: '#000', // Adds shadow for iOS
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  button: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  buttonText: {
    color: '#000',
    fontSize: 16,
  },
});

export default Header;
