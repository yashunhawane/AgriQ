/* eslint-disable prettier/prettier */
import React, {useEffect} from 'react';
import {View, Image, StyleSheet} from 'react-native';

const SplashScreen = ({navigation}) => {
  useEffect(() => {
    // Simulate a delay (e.g., 2 seconds) to display the splash screen
    setTimeout(() => {
      // Redirect to your main app screen or any other screen
      navigation.replace('Selection');
    }, 3000);
  }, [navigation]);

  return (
    <View style={styles.container}>
      <Image
        source={require('./home.jpg')} // Replace with your image path
        style={styles.image}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    // backgroundColor: '#FFFFFF', // Set your background color
  },
  image: {
    width: '100%', // Adjust the width and height as needed
    height: '100%',
  },
});

export default SplashScreen;
