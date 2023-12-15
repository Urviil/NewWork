import {SafeAreaView, StyleSheet, Text, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import Auth from '@react-native-firebase/auth';
import {StackActions, useNavigation} from '@react-navigation/native';

const SplashScreen = () => {
  const navigation = useNavigation();

  useEffect(() => {
    setTimeout(async () => {
      const unSubcribe = await Auth().onAuthStateChanged(user => {
        console.log(user);
        const routeName = user !== null ? 'HomeScreen' : 'LoginScreen';

        unSubcribe();
        navigation.dispatch(StackActions.replace(routeName));
      });
    }, 1000);
    return () => {};
  }, []);
  return (
    <SafeAreaView style={styles.container}>
      <Text>{'SplashScreen'}</Text>
    </SafeAreaView>
  );
};

export default SplashScreen;

const styles = StyleSheet.create({
  container: {flex: 1, justifyContent: 'center', alignItems: 'center'},
});
