import React, { useState, useContext } from 'react';
import { View, Text, FlatList, StyleSheet, Button, TextInput, TouchableOpacity } from 'react-native';
import { CartContext } from './CartContext'; // Import CartContext

export default function CartScreen({ navigate }) {
  const { cartItems, setCartItems } = useContext(CartContext); // Use CartContext
  const [isOrderPlaced, setIsOrderPlaced] = useState(false);
  const [items, setItems] = useState(cartItems);
  
  const totalAmount = items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  
  const handleQuantityChange = (index, change) => {
    setItems(prevItems => {
      const newItems = [...prevItems];
      const newQuantity = Math.max(newItems[index].quantity + change, 0);
      if (newQuantity === 0) {
        newItems.splice(index, 1);
      } else {
        newItems[index] = { ...newItems[index], quantity: newQuantity };
      }
      setCartItems(newItems); // Update context
      return newItems;
    });
  };
  
  const handleNoteChange = (index, note) => {
    setItems(prevItems => {
      const newItems = [...prevItems];
      newItems[index] = { ...newItems[index], note };
      setCartItems(newItems); // Update context
      return newItems;
    });
  };

  const handleMakeToOrder = () => {
    // setIsOrderPlaced(true);
    // const orderRef = `Order${Math.floor(10000000 + Math.random() * 90000000)}`;
    alert(`Order placed! Please kindly wait. Your order received from the kitchen.`);
    // Handle storing the order in the database
  };

  return (
    <View style={styles.container}>
      {isOrderPlaced ? (
        <View>
          {/* <Text style={styles.orderRef}>Order Reference: {`Order${Math.floor(10000000 + Math.random() * 90000000)}`}</Text> */}
          <FlatList
            data={items}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({ item }) => (
              <View style={styles.cartItem}>
                <Text style={styles.name}>{item.name}</Text>
                <Text style={styles.note}>Qty: {item.quantity}</Text>
                <Text style={styles.note}>Note: {item.note}</Text>
                <Text style={styles.price}>{item.price * item.quantity} MMK</Text>
              </View>
            )}
          />
          <Text style={styles.total}>Total: {totalAmount} MMK</Text>
          <Button title="Back to Menu" onPress={() => navigate('Menu')} />
        </View>
      ) : (
        <View>
          <FlatList
            data={items}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({ item, index }) => (
              <View style={styles.cartItem}>
                <Text style={styles.name}>{item.name}</Text>
                <View style={styles.quantityContainer}>
                  <TouchableOpacity onPress={() => handleQuantityChange(index, -1)} style={styles.quantityButton}>
                    <Text style={styles.quantityButtonText}>-</Text>
                  </TouchableOpacity>
                  <TextInput
                    style={styles.quantityInput}
                    value={item.quantity.toString()}
                    onChangeText={text => handleQuantityChange(index, parseInt(text) - item.quantity)}
                    keyboardType="numeric"
                    editable={!isOrderPlaced}
                  />
                  <TouchableOpacity onPress={() => handleQuantityChange(index, 1)} style={styles.quantityButton}>
                    <Text style={styles.quantityButtonText}>+</Text>
                  </TouchableOpacity>
                </View>
                <TextInput
                  style={styles.noteInput}
                  value={item.note}
                  onChangeText={text => handleNoteChange(index, text)}
                  placeholder="Enter note..."
                  editable={!isOrderPlaced}
                />
                <Text style={styles.price}>{item.price * item.quantity} MMK</Text>
              </View>
            )}
          />
          <View style={styles.ButtonS}>
            <Text style={styles.total}>Total: {totalAmount} MMK</Text>
            </View>
          <View style={styles.ButtonS}>
            <Button title="Make to Order" style={styles.ButtonS} onPress={handleMakeToOrder} />
          </View>
          
          <Button title="Back to Menu" onPress={() => navigate('Menu')} />
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  cartItem: {
    marginBottom: 16,
  },
  name: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  note: {
    fontSize: 16,
  },
  price: {
    fontSize: 16,
    color: 'green',
  },
  total: {
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 20,
  },
  orderRef: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'blue',
    marginBottom: 20,
  },
  quantityContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  quantityButton: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ddd',
    borderRadius: 5,
  },
  quantityButtonText: {
    fontSize: 24,
    color: 'black',
  },
  quantityInput: {
    width: 60,
    height: 40,
    textAlign: 'center',
    fontSize: 18,
    borderColor: '#ddd',
    borderWidth: 1,
    borderRadius: 5,
    marginHorizontal: 10,
  },
  noteInput: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 10,
    paddingHorizontal: 10,
  },
  ButtonS:{
    marginBottom: 10,
  }
});
