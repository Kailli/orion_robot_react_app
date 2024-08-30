import React, {useState} from 'react';
import { StyleSheet, View } from 'react-native';
import { CartProvider } from './screens/CartContext'; // Import CartProvider
import ChatScreen from './screens/ChatScreen';
import Header from './screens/Header';
import LocationScreen from './screens/LocationScreen';
import MenuScreen from './screens/MenuScreen';
import CartScreen from './screens/CartScreen';
import TableSelectionScreen from './screens/TableSelectionScreen';

const App = () => {
  const [currentScreen, setCurrentScreen] = useState('TableSelection');
  const [selectedTable, setSelectedTable] = useState(null);

  const navigate = (screen) => {
    setCurrentScreen(screen);
  };

  const handleSelectTable = (table) => {
    setSelectedTable(table);
    setCurrentScreen('Location');
  };

  let ScreenComponent;
  switch (currentScreen) {
    case 'Chat':
      ScreenComponent = <ChatScreen navigate={navigate} />;
      break;
    case 'Location':
      ScreenComponent = <LocationScreen navigate={navigate} tableNumber={selectedTable} />;
      break;
    case 'Cart':
      ScreenComponent = <CartScreen navigate={navigate} />;
      break;
    case 'TableSelection':
      ScreenComponent = <TableSelectionScreen onSelectTable={handleSelectTable} />;
      break;
    default:
      ScreenComponent = <MenuScreen navigate={navigate} />;
      break;
  }

  return (
    <CartProvider>
      <View style={styles.container}>
        <Header navigate={navigate} />
        <View style={styles.screenContainer}>
          {ScreenComponent}
        </View>
      </View>
    </CartProvider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    margin: 10,
  },
  screenContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default App;
