/* eslint-disable prettier/prettier */
import React from 'react';
import {View, Text, Image, StyleSheet} from 'react-native';

const data = [
  {
    id: '1',
    imageSource: require('./leaf-1.jpg'),
    title: 'Description about crop',
    soilType: 'Type of soil-',
    pesticides: 'Type pf pesticides-',
  },
  {
    id: '2',
    imageSource: require('./leaf-2.jpg'),
    title: 'Description about crop',
    soilType: 'Type of soil-',
    pesticides: 'Type pf pesticides-',
  },
  {
    id: '3',
    imageSource: require('./leaf-2.jpg'),
    title: 'Description about crop',
    soilType: 'Type of soil-',
    pesticides: 'Type pf pesticides-',
  },
  // Add more items as needed
];

const ListItem = () => {
  return (
    <>
      {data.map(item => (
        <View key={item.id} style={styles.container}>
          <Image source={item.imageSource} style={styles.image} />
          <Text style={styles.description}>{item.title}</Text>
          <Text style={styles.description}>{item.soilType}</Text>
          <Text style={styles.description}>{item.pesticides}</Text>
        </View>
      ))}
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 16,
    paddingVertical: 5,
    borderBottomWidth: 3, // Add a bottom border to each item
    borderColor: 'gray', // Border color
    margin: 20,
  },
  itemContainer: {
    flexDirection: 'row', // Display items side by side
    alignItems: 'center',
  },
  image: {
    width: 70,
    height: 70,
    borderRadius: 40,
    marginRight: 16,
  },
  description: {
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default ListItem;
