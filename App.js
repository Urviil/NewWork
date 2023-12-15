import {SafeAreaView, StatusBar, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import LoginScreen from './src/Screens/AuthNavigation/LoginScreen';
import {RFValue} from 'react-native-responsive-fontsize';
import Router from './src/navigation/Router';
import MusicPlayer2 from './src/Screens/AppNavigation/MusicPlayer2';

const App = () => {
  return (
    <SafeAreaView style={styles.container}>
      {/* <StatusBar barStyle="light-content" /> */}
      <MusicPlayer2 />
    </SafeAreaView>
  );
};

export default App;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
