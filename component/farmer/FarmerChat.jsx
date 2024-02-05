/* eslint-disable prettier/prettier */
import React, {useState, useCallback, useEffect} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {GiftedChat, Bubble, InputToolbar, Send} from 'react-native-gifted-chat';
import {useRoute} from '@react-navigation/native';
import {SafeAreaView} from 'react-native-safe-area-context';
import firestore from '@react-native-firebase/firestore';

const FarmerChat = () => {
  const route = useRoute();
  const {farmerId, expertId, farmerName} = route.params.post;

  const [messages, setMessages] = useState([]);
  const [conversationId, setConversationId] = useState(null);

  useEffect(() => {
    let unsubscribe;

    const fetchMessages = async () => {
      try {
        const conversationSnapshot = await firestore()
          .collection('chats')
          .where('farmerId', '==', farmerId)
          .where('expertId', '==', expertId)
          .limit(1)
          .get();

        if (!conversationSnapshot.empty) {
          const conversationId = conversationSnapshot.docs[0].id;
          const messagesSnapshot = await firestore()
            .collection('chats')
            .doc(conversationId)
            .collection('messages')
            .orderBy('createdAt', 'desc')
            .get();

          const data = messagesSnapshot.docs.map(doc => ({
            _id: doc.id,
            text: doc.data().text,
            createdAt: doc.data().createdAt
              ? doc.data().createdAt.toDate()
              : null,
            user: doc.data().user,
          }));
          setMessages(data);
          setConversationId(conversationId);
        }
      } catch (error) {
        console.error('Error fetching messages:', error);
      }
    };

    fetchMessages();

    if (conversationId && !unsubscribe) {
      unsubscribe = firestore()
        .collection('chats')
        .doc(conversationId)
        .collection('messages')
        .orderBy('createdAt', 'desc')
        .onSnapshot(querySnapshot => {
          const data = querySnapshot.docs.map(doc => ({
            _id: doc.id,
            text: doc.data().text,
            createdAt: doc.data().createdAt
              ? doc.data().createdAt.toDate()
              : null,
            user: doc.data().user,
          }));
          setMessages(data);
        });
    }

    return () => {
      if (unsubscribe) {
        unsubscribe();
        unsubscribe = null;
      }
    };
  }, [conversationId]);

  const onSend = useCallback(
    async (newMessages = []) => {
      const updatedMessages = GiftedChat.append(messages, newMessages); // Combine old and new messages

      const batch = firestore().batch();

      let idToUse = null;
      let existingDoc = null;

      try {
        existingDoc = await firestore()
          .collection('chats')
          .where('farmerId', '==', farmerId)
          .where('expertId', '==', expertId)
          .limit(1)
          .get();

        if (!existingDoc.empty) {
          idToUse = existingDoc.docs[0].id;
        } else {
          idToUse = firestore().collection('chats').doc().id;
          const chatsRef = firestore().collection('chats').doc(idToUse);
          batch.set(chatsRef, {
            farmerId,
            expertId,
          });
        }

        const messageData = newMessages.map(({_id, text, createdAt, user}) => ({
          _id,
          text,
          createdAt,
          user,
          farmerName,
          farmerId,
          expertId,
        }));

        const messagesRef = firestore()
          .collection('chats')
          .doc(idToUse)
          .collection('messages');

        messageData.forEach(data => {
          const messageDoc = messagesRef.doc();
          batch.set(messageDoc, data);
        });

        await batch.commit();
        setConversationId(idToUse);

        console.log('Messages added successfully');
      } catch (error) {
        console.error('Error adding messages:', error);
      }
    },
    [messages, farmerId, expertId],
  );

  return (
    <SafeAreaView style={styles.container}>
      <GiftedChat
        messages={messages}
        onSend={newMessages => onSend(newMessages)}
        user={{_id: farmerId}} // Ensure farmerId is the sender
        renderBubble={props => (
          <Bubble
            {...props}
            wrapperStyle={{
              right: styles.bubbleRight,
              left: styles.bubbleLeft,
            }}
            textStyle={{
              right: styles.textRight,
              left: styles.textLeft,
            }}
          />
        )}
        renderInputToolbar={props => (
          <InputToolbar
            {...props}
            containerStyle={styles.inputToolbarContainer}
            primaryStyle={styles.inputToolbarPrimary}
          />
        )}
        renderSend={props => (
          <Send {...props}>
            <View style={styles.sendButtonContainer}>
              <Text style={styles.sendButtonText}>Send</Text>
            </View>
          </Send>
        )}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  bubbleRight: {
    backgroundColor: 'gray',
  },
  bubbleLeft: {
    backgroundColor: '#36454F',
  },
  textRight: {
    color: '#fff',
  },
  textLeft: {
    color: '#000',
  },
  inputToolbarContainer: {
    backgroundColor: '#fff',
  },
  inputToolbarPrimary: {
    color: '#333',
  },
  sendButtonContainer: {
    marginRight: 10,
    marginBottom: 5,
  },
  sendButtonText: {
    color: '#007AFF',
    fontSize: 20,
    fontWeight: 'bold',
  },
});

export default FarmerChat;
