import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

const TableSelectionScreen = ({ onSelectTable }) => {
  const tables = ['T1', 'T2', 'T3', 'T4'];

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Select Your Table</Text>
      <View style={styles.cardContainer}>
        {tables.map((table, index) => (
          <TouchableOpacity
            key={index}
            style={styles.card}
            onPress={() => onSelectTable(table)}
          >
            <Text style={styles.tableText}>{table}</Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#f8f8f8',
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
    fontWeight: 'bold',
  },
  cardContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
  },
  card: {
    width: 100,
    height: 100,
    margin: 10,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ffffff',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 5,
  },
  tableText: {
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default TableSelectionScreen;
