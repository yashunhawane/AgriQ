/* eslint-disable prettier/prettier */
import React from 'react';
import {useRoute} from '@react-navigation/native';
import {View, Text, Image, StyleSheet} from 'react-native';

const PostDetail = () => {
  const route = useRoute();

  return (
    <>
      <View style={styles.card}>
        <Text style={styles.title}>{route.params.post.description}</Text>
        <Image
          source={{uri: route.params.post.imageUrl}}
          style={styles.image}
        />
        <Text style={styles.text}>Soil Type: {route.params.post.soilType}</Text>
        <Text style={styles.text}>
          Pesticides Type: {route.params.post.pesticidesType}
        </Text>
      </View>
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
    width: 280,
    height: 250,
    marginBottom: 10,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  text: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
  },
});

export default PostDetail;
