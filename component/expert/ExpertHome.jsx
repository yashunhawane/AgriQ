/* eslint-disable prettier/prettier */
import {
  View,
  Image,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import Navbar from '../navBar/Navbar';
import auth from '@react-native-firebase/auth';

import firestore from '@react-native-firebase/firestore';

const ExpertHome = props => {
  const [postData, setPostData] = useState([]);

  const currentUser = auth().currentUser.uid;

  const gotoPost = detail => {
    props.navigation.navigate('PostDetail', {
      post: {
        description: detail.description,
        imageUrl: detail.imageUrl,
        pesticidesType: detail.pesticidesType,
        soilType: detail.soilType,
        userId: detail.userId,
        title: detail.title,
        expertId: currentUser,
      },
    });
  };
  useEffect(() => {
    const fetchData = async () => {
      try {
        const querySnapshot = await firestore()
          .collection('Post')
          .orderBy('createdAt', 'desc')
          .get();
        const data = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data(),
        }));
        setPostData(data);
      } catch (error) {
        console.error('Error fetching data:', error);
        // You can set an error state here if needed
        // setError(error);
      }
    };

    fetchData();
  }, []);

  return (
    <>
      <Navbar navigation={props.navigation} />
      <ScrollView contentContainerStyle={styles.scrollViewContent}>
        {postData.map(item => (
          <TouchableOpacity onPress={() => gotoPost(item)}>
            <View style={styles.card} key={item.id}>
              <Text style={styles.title}>{item.title}</Text>
              <Image source={{uri: item.imageUrl}} style={styles.image} />
              <Text style={styles.text}>Soil Type: {item.soilType}</Text>
              <Text style={styles.text}>
                Pesticides Type: {item.pesticidesType}
              </Text>
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </>
  );
};

const styles = StyleSheet.create({
  scrollViewContent: {
    flexGrow: 1,
    alignItems: 'center',
    paddingBottom: 20,
  },
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
export default ExpertHome;
