/* eslint-disable prettier/prettier */
import React, {useState, useEffect} from 'react';
import {View, Text, Image, StyleSheet, ScrollView} from 'react-native';

import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';
import {SafeAreaView} from 'react-native-safe-area-context';

const ListItem = () => {
  //
  const [postData, setPostData] = useState([]);
  //
  useEffect(() => {
    const fetchData = async () => {
      // Get the current user within the component
      const currentUser = auth().currentUser;

      if (currentUser) {
        try {
          const querySnapshot = await firestore()
            .collection('Post')
            .where('userId', '==', currentUser.uid)
            .get();
          const data = querySnapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data(),
          }));
          setPostData(data);
        } catch (error) {
          console.error('Error fetching data:', error);
        }
      }
    };

    fetchData();
  }, []);

  return (
    <SafeAreaView>
      <ScrollView contentContainerStyle={styles.scrollViewContent}>
        {postData.map(item => (
          <View style={styles.card} key={item.id}>
            <Text style={styles.title}>{item.description}</Text>
            <Image source={{uri: item.imageUrl}} style={styles.image} />
            <Text style={styles.text}>Soil Type: {item.soilType}</Text>
            <Text style={styles.text}>
              Pesticides Type: {item.pesticidesType}
            </Text>
          </View>
        ))}
      </ScrollView>
    </SafeAreaView>
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
    marginBottom: 20,
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
    marginBottom: 10,
  },
});
export default ListItem;
