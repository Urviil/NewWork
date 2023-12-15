import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {useNavigation} from '@react-navigation/native';

const UserDetailScreen = ({route}) => {
  console.log('first', route);
  const navigation = useNavigation();
  const {email, password} = route.params;
  return (
    <View>
      <Text>User Email: {email}</Text>
      <Text>User Password: {password}</Text>
    </View>
  );
};

export default UserDetailScreen;

const styles = StyleSheet.create({});
