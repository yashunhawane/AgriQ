/* eslint-disable prettier/prettier */
import React, {useState, useEffect} from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';

const FarmerMessage = props => {
  const [chatData, setChatData] = useState([]);
  const [farmerId, setFarmerId] = useState(null);
  const [expertId, setExpertId] = useState(null);
  const [farmerName, setFarmerName] = useState(null);

  //
  const gotoChat = () => {
    props.navigation.navigate('FarmerChat', {
      post: {
        farmerId,
        expertId,
        farmerName,
      },
    });
  };
  //

  useEffect(() => {
    const fetchData = async () => {
      // Get the current user within the component
      const currentUser = auth().currentUser;

      if (currentUser) {
        setFarmerId(currentUser.uid);
        setFarmerName(currentUser.displayName);

        try {
          const unsubscribe = firestore()
            .collection('chats')
            .where('farmerId', '==', currentUser.uid) // Filter by farmerId
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
                  // Set the expertId if it's not set already
                  if (!expertId) {
                    setExpertId(lastMessageData.expertId);
                  }
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
  }, [expertId]);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Messages</Text>
      {/* Render chat messages */}
      {console.log(chatData)}
      <View style={styles.messageList}>
        {chatData.length === 0 ? (
          <Text style={styles.noMessageText}>No messages yet</Text>
        ) : (
          chatData.map(chat => (
            <TouchableOpacity
              key={chat.id}
              style={styles.message}
              onPress={() => gotoChat(chat.id)}>
              {chat.lastMessage ? (
                <View>
                  <Text style={styles.sender}>Expert</Text>
                  <Text style={styles.messageText}>
                    {chat.lastMessage.text}
                  </Text>
                </View>
              ) : (
                <Text style={styles.noMessageText}>No messages yet</Text>
              )}
            </TouchableOpacity>
          ))
        )}
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
  noMessageText: {
    fontStyle: 'italic',
    color: '#666',
    fontSize: 24,
    fontWeight: 'bold',
  },
});

export default FarmerMessage;
