import {StyleSheet, Text, View} from 'react-native';
import React, {useState} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import LoginScreen from '../Screens/AuthNavigation/LoginScreen';
import SignupScreen from '../Screens/AuthNavigation/SignupScreen';
import HomeScreen from '../Screens/AppNavigation/HomeScreen';
import SplashScreen from '../Screens/AuthNavigation/SplashScreen';
import EditScreen from '../Screens/AppNavigation/EditScreen';
import MusicPlayer from '../Screens/AppNavigation/MusicPlayer';

const Stack = createNativeStackNavigator();

const Router = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{headerShown: false}}>
        <Stack.Screen name="Musicplayer" component={MusicPlayer} />
        <Stack.Screen name="SplashScreen" component={SplashScreen} />
        <Stack.Screen name="LoginScreen" component={LoginScreen} />
        <Stack.Screen name="SignupScreen" component={SignupScreen} />
        <Stack.Screen name="HomeScreen" component={HomeScreen} />
        <Stack.Screen name="EditScreen" component={EditScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Router;

const styles = StyleSheet.create({});
