import React, { useEffect, useState } from 'react';
import { StyleSheet, View, Text, Button, ActivityIndicator, Animated, Easing } from 'react-native';
import * as Location from 'expo-location';
import { MaterialCommunityIcons } from '@expo/vector-icons';

const LocationScreen = ({ navigate, tableNumber }) => {
  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);
  const [loading, setLoading] = useState(false);
  const [animationValue] = useState(new Animated.Value(0));

  const getLocation = async () => {
    setLoading(true);
    let { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== 'granted') {
      setErrorMsg('Permission to access location was denied');
      setLoading(false);
      return;
    }

    try {
      let location = await Location.getCurrentPositionAsync({});
      setLocation(location.coords);
      startAnimation();
    } catch (error) {
      setErrorMsg(error.message);
    }
    setLoading(false);
  };

  const startAnimation = () => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(animationValue, {
          toValue: 1,
          duration: 1000,
          easing: Easing.linear,
          useNativeDriver: true,
        }),
        Animated.timing(animationValue, {
          toValue: 0,
          duration: 1000,
          easing: Easing.linear,
          useNativeDriver: true,
        }),
      ])
    ).start();
  };

  const translateY = animationValue.interpolate({
    inputRange: [0, 1],
    outputRange: [0, -10],
  });

  return (
    <View style={styles.container}>
      <View style={styles.tableBox}>
      <Text style={styles.showBox}>{tableNumber} </Text>
      
      </View>
      {loading ? (
        <ActivityIndicator size="large" color="#007bff" />
      ) : errorMsg ? (
        <Text style={styles.errorText}>{errorMsg}</Text>
      ) : location ? (
        <View style={styles.locationBox}>
          <Animated.View style={[styles.robotIconContainer, { transform: [{ translateY }] }]}>
            <MaterialCommunityIcons name="robot" size={50} color="#007bff" />
          </Animated.View>
          <Text style={styles.serviceText}>Service in Progress!</Text>
          {/* <Text style={styles.locationText}>Latitude: {location.latitude}</Text>
          <Text style={styles.locationText}>Longitude: {location.longitude}</Text> */}
        </View>
      ) : (
        <Text style={styles.infoText}>Click "Call For Service" to get service.</Text>
      )}
      <View style={styles.buttonContainer}>
        <Button
          title="Call For Service"
          onPress={getLocation}
          color="#007bff"
        />
      </View>
      <View style={styles.buttonContainer}>
        <Button
          title="Go to Menu"
          onPress={() => navigate('Menu')}
          color="#007bff"
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  tableBox: {
    padding: 10,    
    marginBottom: 20,
    alignItems: 'center',
  },
  tableText: {
    fontSize: 18,
    color: '#495057',
    fontWeight: 'bold',
  },
  locationBox: {
    padding: 20,
    marginBottom: 20,
    alignItems: 'center',
  },
  showBox: {
    padding: 20,
    fontSize: 30,
    borderRadius: 10,
    backgroundColor: '#fff',
    borderColor: '#ddd',
    borderWidth: 1,
    marginBottom: 20,
    alignItems: 'center',
  },
  robotIconContainer: {
    marginBottom: 10,
  },
  serviceText: {
    fontSize: 20,
    color: '#007bff',
    fontWeight: 'bold',
    marginBottom: 10,
  },
  locationText: {
    fontSize: 18,
    color: '#495057',
  },
  buttonContainer: {
    marginVertical: 10,
    width: '100%',
  },
  infoText: {
    fontSize: 16,
    color: '#495057',
    marginBottom: 20,
  },
  errorText: {
    color: '#dc3545',
    fontSize: 16,
    marginBottom: 20,
  },
});

export default LocationScreen;
