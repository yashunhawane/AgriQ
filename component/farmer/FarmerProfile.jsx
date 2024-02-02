/* eslint-disable prettier/prettier */

import React, {useState, useEffect} from 'react';
import auth from '@react-native-firebase/auth';
import {View, Text, StyleSheet, Button} from 'react-native';

const FarmerProfile = ({navigation}) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    // Function to update user state
    const updateUser = currentUser => {
      setUser(currentUser);
    };

    // Subscribe to the user authentication state changes
    const unsubscribe = auth().onAuthStateChanged(updateUser);

    // Clean up subscription on unmount
    return unsubscribe;
  }, []);

  const handleLogout = () => {
    auth()
      .signOut()
      .then(() => console.log('User signed out!'))
      .then(() => navigation.navigate('Selection'))
      .catch(error => console.error('Error signing out:', error));
  };

  return (
    <View style={styles.container}>
      <View style={styles.profileHeader}>
        <Text style={styles.username}>{user ? user.displayName : ''}</Text>
        <Text style={styles.email}>{user ? user.email : ''}</Text>
      </View>
      <View style={styles.profileInfo}>
        <Text style={styles.sectionTitle}>About Me</Text>
        <Text style={styles.aboutText}>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla
          facilisi. Sed id justo ut purus suscipit iaculis.
        </Text>
      </View>
      <Button title="Log Out" onPress={handleLogout} color="#808080" />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  profileHeader: {
    alignItems: 'center',
    marginBottom: 20,
  },
  username: {
    fontSize: 24,
    fontWeight: 'bold',
    marginTop: 10,
  },
  email: {
    fontSize: 16,
    color: '#555',
    marginTop: 5,
  },
  profileInfo: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  aboutText: {
    fontSize: 16,
    lineHeight: 24,
  },
  infoItem: {
    fontSize: 16,
    lineHeight: 24,
  },
});

export default FarmerProfile;
