/* eslint-disable prettier/prettier */
import React, {useState, useEffect} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';

const FarmerMessage = () => {
  const [chatData, setChatData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      // Get the current user within the component
      const currentUser = auth().currentUser;

      if (currentUser) {
        try {
          const unsubscribe = firestore()
            .collection('chats')
            .onSnapshot(querySnapshot => {
              const data = querySnapshot.docs.map(doc => ({
                id: doc.id,
                messages: doc.data().messages || [],
              }));
              setChatData(data);
            });

          // Return a cleanup function to unsubscribe from the snapshot listener
          return () => unsubscribe();
        } catch (error) {
          console.error('Error fetching data:', error);
        }
      }
    };

    fetchData();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Messages</Text>
      {/* Render chat messages */}

      <View style={styles.messageList}>
        {chatData.map(chat => (
          <View key={chat.id} style={styles.message}>
            <Text style={styles.sender}>{chat.messages[0].farmerName}</Text>
            {console.log(chat)}
            <Text style={styles.messageText}>
              {chat.messages[0].farmerName}
            </Text>
          </View>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  messageList: {
    flex: 1,
  },
  message: {
    backgroundColor: '#F0F0F0',
    borderRadius: 10,
    padding: 10,
    marginBottom: 10,
  },
  sender: {
    fontWeight: 'bold',
    marginBottom: 5,
  },
  messageText: {
    fontSize: 16,
  },
});

export default FarmerMessage;
