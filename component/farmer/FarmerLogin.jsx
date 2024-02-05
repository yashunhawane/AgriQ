/* eslint-disable prettier/prettier */
import auth from '@react-native-firebase/auth';
import {CommonActions} from '@react-navigation/native';

import React, {useState} from 'react';
import {
  SafeAreaView,
  View,
  Text,
  TextInput,
  Button,
  StyleSheet,
  Alert,
  TouchableOpacity,
} from 'react-native';

const FarmerLogin = ({navigation}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  //
  const handleEmailChange = text => {
    setEmail(text);
  };
  const handlePasswordChange = text => {
    setPassword(text);
  };

  const handleLogin = async () => {
    try {
      if (!email || !password) {
        Alert.alert('Error', 'Please enter both email and password.');
        return;
      }

      await auth().signInWithEmailAndPassword(email, password);

      navigation.dispatch(
        CommonActions.reset({
          index: 0,
          routes: [{name: 'FarmerHome'}],
        }),
      );
    } catch (error) {
      if (error.code === 'auth/user-not-found') {
        Alert.alert('Error', 'User not found. Please check your email.');
      } else if (error.code === 'auth/wrong-password') {
        Alert.alert('Error', 'Incorrect password. Please try again.');
      } else {
        Alert.alert('Error', error.message);
      }
    }
  };
  //
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.section}>
        <Text style={styles.heading}>Welcome Back</Text>
      </View>
      <View style={styles.section}>
        <Text style={styles.label}>Mobile Number</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter your Email"
          value={email}
          onChangeText={handleEmailChange}
        />
      </View>
      <View style={styles.section}>
        <Text style={styles.label}>Password</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter your Password"
          secureTextEntry={true}
          value={password}
          onChangeText={handlePasswordChange}
        />
      </View>
      <Button title={'Login Now'} onPress={handleLogin} color="#808080" />

      <View style={styles.section}>
        <Text style={styles.forgotPassword}>Forgot your password?</Text>
      </View>

      <TouchableOpacity
        onPress={() => navigation.navigate('FarmerRegistration')}>
        <View>
          <Text style={styles.register}>Don't have an account? Register</Text>
        </View>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    marginTop: 200,
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
  forgotPassword: {
    marginTop: 10,
    fontSize: 15,
    color: 'gray',
  },
  register: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 8,
    marginLeft: 20,
  },
});

export default FarmerLogin;
