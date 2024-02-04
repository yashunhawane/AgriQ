/* eslint-disable prettier/prettier */
import React from 'react';
import {View, TouchableOpacity, Text, StyleSheet} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

const Navbar = ({navigation}) => {
  return (
    <View style={styles.container}>
      <TouchableOpacity
        onPress={() => navigation.navigate('FarmerProfile')}
        style={styles.icon}>
        <Icon name="user" size={32} color="black" />
      </TouchableOpacity>
      <View style={styles.middleTextContainer}>
        <TouchableOpacity onPress={() => navigation.navigate('News')}>
          <Text style={styles.middleText}>News Updates</Text>
        </TouchableOpacity>
      </View>
      <TouchableOpacity
        style={styles.icon}
        onPress={() => navigation.navigate('FarmerMessage')}>
        <Icon name="envelope" size={32} color="black" />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: 50,
    backgroundColor: 'lightgray', // Customize the background color
  },
  icon: {
    marginHorizontal: 10,
  },
  middleTextContainer: {
    flex: 1,
    alignItems: 'center',
  },
  middleText: {
    fontSize: 20,
    fontWeight: 'bold',
  },
});

export default Navbar;
