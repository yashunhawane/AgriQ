/* eslint-disable prettier/prettier */
import React from 'react';
import {useRoute} from '@react-navigation/native';
import {View, Text, Image, StyleSheet, Button} from 'react-native';
import auth from '@react-native-firebase/auth';

const PostDetail = props => {
  const route = useRoute();
  //
  const currentUser = auth().currentUser;

  //
  const gotoChat = () => {
    props.navigation.navigate('Chat', {
      post: {
        farmerId: route.params.post.userId,
        farmerName: route.params.post.title,
        expertId: currentUser.uid,
      },
    });
  };
  //
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
        <View style={styles.buttonContainer}>
          <Button title="Message" onPress={gotoChat} color="#808080" />
        </View>
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
  buttonContainer: {
    marginVertical: 10,
    marginHorizontal: 20,
    padding: 10,
    borderRadius: 5,
    overflow: 'hidden',
  },
  image: {
    width: 280,
    height: 250,
    marginBottom: 10,
    marginLeft:10,
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
