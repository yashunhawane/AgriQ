// import {View, Text} from 'react-native';
import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {NavigationContainer} from '@react-navigation/native';

import Selection from './component/selection/Selection';
import FarmerLogin from './component/farmer/FarmerLogin';
import PhotoUploadScreen from './component/farmer/PhotoUploadScreen';
import FarmerRegistration from './component/farmer/FarmerRegistration';
import News from './component/News/News';
import FarmerHome from './component/farmer/FarmerHome';
import Navbar from './component/navBar/Navbar';
import FarmerProfile from './component/farmer/FarmerProfile';
import ExpertLogin from './component/expert/ExpertLogin';
import ExpertRegistration from './component/expert/ExpertRegistration';
import ExpertHome from './component/expert/ExpertHome';
import PostDetail from './component/expert/PostDetail';

const Stack = createNativeStackNavigator();

const App = () => {
  return (
    <>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Selection">
          <Stack.Screen
            name="Selection"
            component={Selection}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="FarmerLogin"
            component={FarmerLogin}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="FarmerRegistration"
            component={FarmerRegistration}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="FarmerHome"
            component={FarmerHome}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="PhotoUploadScreen"
            component={PhotoUploadScreen}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="Navbar"
            component={Navbar}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="News"
            component={News}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="FarmerProfile"
            component={FarmerProfile}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="ExpertLogin"
            component={ExpertLogin}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="ExpertRegistration"
            component={ExpertRegistration}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="ExpertHome"
            component={ExpertHome}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="PostDetail"
            component={PostDetail}
            options={{headerShown: false}}
          />
        </Stack.Navigator>
      </NavigationContainer>

      {/* <News /> */}
    </>
  );
};

export default App;
