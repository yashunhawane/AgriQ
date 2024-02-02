/* eslint-disable prettier/prettier */
import React from 'react';
import {View, ImageBackground, StyleSheet, Button} from 'react-native';

const Selection = ({navigation}) => {
  return (
    <ImageBackground
      source={require('./selection.jpg')}
      e
      style={styles.backgroundImage}>
      <View style={styles.button}>
        <Button
          title={'Login as Farmer'}
          onPress={() => navigation.navigate('FarmerLogin')}
          color="gray"
        />
      </View>

      <View style={styles.container}>
        <Button
          title={'Login as Expert'}
          onPress={() => navigation.navigate('ExpertLogin')}
          color="gray"
        />
      </View>
    </ImageBackground>
  );
};

export default Selection;

const styles = StyleSheet.create({
  backgroundImage: {
    // flex: 1,
    height: '100%',
    resizeMode: 'cover',
  },
  container: {
    // flex: 1,
    justifyContent: 'center',
    marginTop: 200,
    alignItems: 'center',
    paddingTop: 200,
    // backgroundColor: 'rgba(0,0,0,0.1)',
  },
  text: {
    color: 'white',
    fontSize: 24,
    fontWeight: 'bold',
  },
  button: {
    // flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    margin: 50,
    paddingTop: 100,
  },
});
