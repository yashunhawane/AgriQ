/* eslint-disable prettier/prettier */
import {
  ScrollView,
  View,
  SafeAreaView,
  // TouchableOpacity,
} from 'react-native';
import React from 'react';
import NewsList from './NewsList';

const News = () => {
  return (
    <SafeAreaView>
      <ScrollView>
        <View>
          <NewsList />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default News;
