import React, { useState,useContext } from 'react';
import { View, Text, FlatList, Image, StyleSheet, TouchableOpacity, TextInput, Button, Modal } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { CartContext } from './CartContext';

// Local image imports
const images = {
  mohinga: require('./images/mohinga.jpg'),
  shanNoodles: require('./images/nan_noodles.jpg'),
  teaLeafSalad: require('./images/tea_leaf.jpg'),
  nanGyiThoke: require('./images/nan_gyi.jpg'),
  ohnNoKhaoSwe: require('./images/ohn_noodle.jpg'),
  burger: require('./images/burger.jpg'),
  pizza: require('./images/pizza.jpg'),
  friedPotato: require('./images/potato.jpg'),
  chocolateCake: require('./images/chocolate.jpg'),
  strawberryCake: require('./images/strawberry_cake.jpg'),
  coffee: require('./images/coffee.jpg'),
  milkTea: require('./images/tea.jpg'),
  strawberryJuice: require('./images/strawberry.jpg'),
  orangeJuice: require('./images/orange.jpg'),
  water: require('./images/water.jpg'),
};

const categories = ['All', 'Burmese Foods', 'Snacks', 'Drink'];

const menuItems = [
  { id: '1', name: 'Mohinga (မုန့်ဟင်းခါး)', category: 'Burmese Foods', price: 3000, image: images.mohinga },
  { id: '2', name: 'Shan Noodles (ရှမ်းခေါက်ဆွဲ)', category: 'Burmese Foods', price: 3500, image: images.shanNoodles },
  { id: '3', name: 'Tea Leaf Salad (လက်ဖက်သုတ်)', category: 'Burmese Foods', price: 3000, image: images.teaLeafSalad },
  { id: '4', name: 'Nan Gyi Thoke (နန်းကြီးသုတ်)', category: 'Burmese Foods', price: 4000, image: images.nanGyiThoke },
  { id: '5', name: 'Ohn No Khao Swe (အုန်းနို့ခေါက်ဆွဲ)', category: 'Burmese Foods', price: 3500, image: images.ohnNoKhaoSwe },
  { id: '6', name: 'Burger (ဘာဂါ)', category: 'Snacks', price: 6000, image: images.burger },
  { id: '7', name: 'Pizza (ပီဇာ)', category: 'Snacks', price: 5000, image: images.pizza },
  { id: '8', name: 'Fried Potato (အာလူးချောင်းကြော်)', category: 'Snacks', price: 3000, image: images.friedPotato },
  { id: '9', name: 'Chocolate Cake (ချောကလက်ကိတ်)', category: 'Snacks', price: 3500, image: images.chocolateCake },
  { id: '10', name: 'Strawberry Cake (စတော်ဘယ်ရီကိတ်)', category: 'Snacks', price: 3500, image: images.strawberryCake },
  { id: '11', name: 'Coffee (ကော်ဖီ)', category: 'Drink', price: 3000, image: images.coffee },
  { id: '12', name: 'Milk Tea (လက်ဖက်ရည်)', category: 'Drink', price: 4000, image: images.milkTea },
  { id: '13', name: 'Strawberry Juice (စတော်ဘယ်ရီဖျော်ရည်)', category: 'Drink', price: 3000, image: images.strawberryJuice },
  { id: '14', name: 'Orange Juice (လိမ္မော်ဖျော်ရည်)', category: 'Drink', price: 3000, image: images.orangeJuice },
  { id: '15', name: 'Water (ရေ)', category: 'Drink', price: 3000, image: images.water },
];


export default function MenuScreen({ onAddToCart }) {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedItem, setSelectedItem] = useState(null);
  const [note, setNote] = useState('');
  const [quantity, setQuantity] = useState(1); // Add state for quantity
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [setCartItems] = useState([]);
  const { cartItems, addToCart } = useContext(CartContext);

  const filteredItems = menuItems
    .filter(item => selectedCategory === 'All' || item.category === selectedCategory)
    .filter(item => item.name.toLowerCase().includes(searchQuery.toLowerCase()));

    const handleAddToCart = () => {
      if (selectedItem && quantity > 0) {
        addToCart(selectedItem, note, quantity);
        setIsModalVisible(false);
        setQuantity(1);
        setNote('');
      }
    };
  
    const getTotalQuantityForItem = (itemId) => {
      return cartItems
        .filter(item => item.id === itemId)
        .reduce((total, item) => total + item.quantity, 0);
    };
    

  const increaseQuantity = () => {
    setQuantity(prevQuantity => prevQuantity + 1);
  };

  const decreaseQuantity = () => {
    setQuantity(prevQuantity => (prevQuantity > 1 ? prevQuantity - 1 : 1));
  };

  return (
    <View style={styles.container}>
      <View style={styles.categoryContainer}>
        {categories.map(category => (
          <TouchableOpacity
            key={category}
            style={[
              styles.categoryButton,
              selectedCategory === category && styles.selectedCategoryButton
            ]}
            onPress={() => setSelectedCategory(category)}
          >
            <Text style={[
              styles.categoryText,
              selectedCategory === category && styles.selectedCategoryText
            ]}>
              {category}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
      <TextInput
        style={styles.searchInput}
        placeholder="Search..."
        value={searchQuery}
        onChangeText={text => setSearchQuery(text)}
      />
      <FlatList
        data={filteredItems}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.item}>
            <Image source={item.image} style={styles.image} />
            <View style={styles.details}>
              <TouchableOpacity
                onPress={() => {
                  setSelectedItem(item);
                  setIsModalVisible(true);
                }}
              >
                <Text style={styles.name}>{item.name}</Text>
                <Text style={styles.price}>{item.price} MMK</Text>

                {item.length > 0 && (
                  <View style={styles.badge}>
                    <Text style={styles.badgeText}>{item.length}</Text>
                  </View>
                )}
              </TouchableOpacity>
              <Text>Total Quantity Ordered: {getTotalQuantityForItem(item.id)}</Text>
            </View>
          </View>
        )}
      />

      <Modal
        visible={isModalVisible}
        transparent={true}
        animationType="slide"
        onRequestClose={() => setIsModalVisible(false)}
      >
        <View style={styles.modalContainer}>
      <View style={styles.modalContent}>
        <TouchableOpacity style={styles.cancelButton} onPress={() => setIsModalVisible(false)}>
          <Icon name="close" size={25} color="black" />
        </TouchableOpacity>

        <Text style={styles.modalTitle}>Add a Note</Text>
        <TextInput
          style={styles.noteInput}
          placeholder="Enter your note..."
          value={note}
          onChangeText={setNote}
        />

        <Text style={styles.modalTitle}>Quantity</Text>
        <View style={styles.quantityContainer}>
          <TouchableOpacity onPress={decreaseQuantity} style={styles.quantityButton}>
            <Text style={styles.quantityButtonText}>-</Text>
          </TouchableOpacity>
          <Text style={styles.quantityText}>{quantity}</Text>
          <TouchableOpacity onPress={increaseQuantity} style={styles.quantityButton}>
            <Text style={styles.quantityButtonText}>+</Text>
          </TouchableOpacity>
        </View>

        <TouchableOpacity style={styles.addToCartButton} onPress={handleAddToCart}>
          <Icon name="cart-outline" size={40} color="black" />
        </TouchableOpacity>
      </View>
    </View>
      </Modal>
    </View>
  );
}



const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  categoryContainer: {
    flexDirection: 'row',
    marginBottom: 16,
  },
  categoryButton: {
    padding: 10,
    marginRight: 8,
    borderRadius: 5,
    backgroundColor: '#ddd',
  },
  selectedCategoryButton: {
    backgroundColor: '#007bff',
  },
  categoryText: {
    fontSize: 16,
  },
  selectedCategoryText: {
    color: '#fff',
  },
  searchInput: {
    padding: 10,
    borderRadius: 5,
    borderColor: '#ccc',
    borderWidth: 1,
    marginBottom: 16,
  },
  item: {
    flexDirection: 'row',
    marginBottom: 16,
  },
  image: {
    width: 80,
    height: 80,
    marginRight: 16,
  },
  details: {
    flex: 1,
  },
  name: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  price: {
    fontSize: 16,
    color: 'green',
  },
  
  header: {
    position: 'absolute',
    top: 10,
    right: 10,
  },
  quantityContainer: {
    padding: 10,
    backgroundColor: '#fff',
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#ddd',
    elevation: 3,
  },
  quantityTextTab: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'green',
  },
  item: {
    flexDirection: 'row',
    marginBottom: 16,
  },
  image: {
    width: 80,
    height: 80,
    marginRight: 16,
  },
  details: {
    flex: 1,
  },
  name: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  price: {
    fontSize: 16,
    color: 'green',
  },
  badge: {
    backgroundColor: '#ff0000',
    borderRadius: 10,
    padding: 5,
    position: 'absolute',
    top: 0,
    right: 0,
  },
  badgeText: {
    color: '#fff',
    fontSize: 12,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    width: 300,
    padding: 20,
    backgroundColor: 'white',
    borderRadius: 10,
    position: 'relative',
  },
  modalTitle: {
    fontSize: 18,
    marginBottom: 10,
    fontWeight: 'bold',
  },
  noteInput: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 20,
    paddingHorizontal: 10,
  },
  quantityContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
  },
  
  quantityText: {
    fontSize: 18,
    marginHorizontal: 15,
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
  addToCartButton: {
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 10,
  },
  cancelButton: {
    position: 'absolute',
    top: 10,
    right: 10,
  },
});
