/* eslint-disable prettier/prettier */
import React from 'react';
import {View, Image, Text, StyleSheet} from 'react-native';

const data = [
  {
    id: 1,
    title:
      'September rains in agricultural regions a good omen for cooling inflation',
    imageSource: require('./img-1.webp'),
  },
  {
    id: 2,
    title: 'Russian sellers stop fertiliser discounts to India, sources say',
    imageSource: require('./img-2.webp'),
  },
  {
    id: 3,
    title:
      'Nitin Gadkari pitches for diversification of agriculture towards energy, power sectors',
    imageSource: require('./img-3.webp'),
  },
];

const NewsList = () => {
  return (
    <>
      {data.map(item => (
        <View key={item.id} style={styles.card}>
          <Text style={styles.title}>{item.title}</Text>
          <Image source={item.imageSource} style={styles.image} />
        </View>
      ))}
    </>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: 'white',
    borderRadius: 10,
    shadowColor: 'rgba(0, 0, 0, 0.1)',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.8,
    elevation: 5,
    margin: 10,
    padding: 10,
  },
  image: {
    width: '100%',
    height: 250,
    borderRadius: 10,
    marginBottom: 10,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
});

export default NewsList;
