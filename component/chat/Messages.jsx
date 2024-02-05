/* eslint-disable prettier/prettier */
import React, {useState, useEffect} from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';

const Messages = props => {
  const [chatData, setChatData] = useState([]);

  //
  const gotoChat = data => {
    props.navigation.navigate('Chat', {
      post: {
        farmerId: data.farmerId,
        expertId: data.expertId,
        farmerName: data.farmerName,
      },
    });
  };
  //

  useEffect(() => {
    const fetchData = async () => {
      // Get the current user within the component
      const currentUser = auth().currentUser;

      if (currentUser) {
        try {
          const unsubscribe = firestore()
            .collection('chats')
            .onSnapshot(async querySnapshot => {
              const data = [];
              for (const doc of querySnapshot.docs) {
                const chatData = {
                  id: doc.id,
                  lastMessage: null, // Initialize lastMessage to null
                };

                // Fetch the last message from the 'messages' subcollection of the current chat document
                const messagesSnapshot = await doc.ref
                  .collection('messages')
                  .orderBy('createdAt', 'desc') // Order by createdAt to get the last message
                  .limit(1) // Limit to only one message (the last one)
                  .get();

                if (!messagesSnapshot.empty) {
                  // If there's a last message, set it to chatData.lastMessage
                  const lastMessageData = messagesSnapshot.docs[0].data();
                  chatData.lastMessage = {
                    id: messagesSnapshot.docs[0].id,
                    ...lastMessageData,
                  };
                }

                data.push(chatData);
              }
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
  }, []); // Removed expertId from the dependency array

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Messages</Text>
      {/* Render chat messages */}

      <View style={styles.messageList}>
        {chatData.map(chat => (
          <TouchableOpacity onPress={() => gotoChat(chat.lastMessage)}>
            {console.log(chat.lastMessage)}
            <View key={chat.id} style={styles.message}>
              {chat.lastMessage && (
                <View>
                  <Text style={styles.sender}>
                    {chat.lastMessage.farmerName}
                  </Text>
                  <Text style={styles.messageText}>
                    {chat.lastMessage.text}
                  </Text>
                </View>
              )}
            </View>
          </TouchableOpacity>
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

export default Messages;
