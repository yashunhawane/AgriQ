/* eslint-disable prettier/prettier */

import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore'; // Import firestore properly

import React, {useState} from 'react';
import {
  SafeAreaView,
  View,
  Text,
  TextInput,
  Button,
  StyleSheet,
  Alert,
} from 'react-native';

const FarmerRegistration = ({navigation}) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const createUserFarmer = () => {
    if (password !== confirmPassword) {
      Alert.alert('Error', 'Passwords do not match');
      return;
    }

    auth()
      .createUserWithEmailAndPassword(email, password)
      .then(userCredential => {
        const user = userCredential.user;
        console.log('User created:', user.uid); // Log user ID for debugging

        return user
          .updateProfile({
            displayName: name, // Set the display name to the provided name
          })
          .then(() => {
            console.log('Display name set successfully');
            return firestore().collection('Farmer').add({
              userId: user.uid,
              name: name,
              email: email,
            });
          });
      })
      .then(() => {
        console.log('User data saved successfully'); // Log success for debugging
        Alert.alert('Success', 'User registered successfully');
        navigation.navigate('FarmerLogin');
      })
      .catch(error => {
        let errorMessage = 'An error occurred. Please try again.';
        if (error.code === 'auth/email-already-in-use') {
          errorMessage = 'That email address is already in use!';
        } else if (error.code === 'auth/invalid-email') {
          errorMessage = 'That email address is invalid!';
        } else if (error.code === 'auth/weak-password') {
          errorMessage = 'Password should be at least 6 characters long';
        }
        console.error('Error registering user:', error); // Log error for debugging
        Alert.alert('Error', errorMessage);
      });
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.section}>
        <Text style={styles.heading}>Registration</Text>
      </View>
      <View style={styles.section}>
        <Text style={styles.label}>Name</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter your Name"
          value={name}
          onChangeText={setName}
        />
      </View>
      <View style={styles.section}>
        <Text style={styles.label}>Email</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter your email address"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          autoCapitalize="none"
        />
      </View>
      <View style={styles.section}>
        <Text style={styles.label}>Password</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter your Password"
          secureTextEntry={true}
          value={password}
          onChangeText={setPassword}
        />
      </View>
      <View style={styles.section}>
        <Text style={styles.label}>Confirm Password</Text>
        <TextInput
          style={styles.input}
          placeholder="Re-enter your Password"
          secureTextEntry={true}
          value={confirmPassword}
          onChangeText={setConfirmPassword}
        />
      </View>
      <Button title={'Register'} onPress={createUserFarmer} color="gray" />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 150,
    paddingHorizontal: 16,
    justifyContent: 'center',
    margin: 10,
  },
  section: {
    marginBottom: 16,
  },
  heading: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  label: {
    fontSize: 16,
    marginBottom: 4,
  },
  input: {
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 8,
    padding: 8,
    fontSize: 16,
  },
});

export default FarmerRegistration;
