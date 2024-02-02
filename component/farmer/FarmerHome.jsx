/* eslint-disable prettier/prettier */
import React from 'react';
import {
  View,
  SafeAreaView,
  TouchableOpacity,
  Text,
  StyleSheet,
} from 'react-native';
import ListItem from './ListItem';
import Navbar from '../navBar/Navbar';

const FarmerHome = props => {
  return (
    <SafeAreaView>
      <Navbar navigation={props.navigation} />
      <View>
        <ListItem />
      </View>
      <View style={styles.container}>
        <TouchableOpacity
          style={styles.customButton}
          onPress={() => props.navigation.navigate('PhotoUploadScreen')}>
          <Text style={styles.buttonText}>Create a new Post</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default FarmerHome;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  customButton: {
    backgroundColor: 'gray', // Gray background color
    borderRadius: 8, // Adjust border radius as needed
    width: 180, // Set the button width to 150 units
    alignItems: 'center',
    height: 50,
    padding: 3,
    paddingTop: 8,
    marginTop: 50,
  },
  buttonText: {
    color: 'white', // White text color
    fontSize: 20,
    fontWeight: 'bold',
  },
});
