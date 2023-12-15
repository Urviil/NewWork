import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {
  GoogleSignin,
  statusCodes,
} from '@react-native-google-signin/google-signin';

const GoogleLoginScreen = () => {
  // Somewhere in your code
  useEffect(() => {
    GoogleSignin.configure({
      webClientId:
        '399632583384-edmflfrpb0lobaktis7g6u0vjuaaivha.apps.googleusercontent.com',
    });
  }, []);

  const [userData, setUserData] = useState('');

  const signOut = async () => {
    try {
      await GoogleSignin.signOut();

      setUserData(null); // Remember to remove the user from your app's state as well
    } catch (error) {
      console.error(error);
    }
  };
  const signIn = async () => {
    try {
      await GoogleSignin.hasPlayServices();
      const userInfo = await GoogleSignin.signIn();
      setUserData(userInfo);

      console.log('userInfo when sign in', userInfo);
    } catch (error) {
      if (error.code === statusCodes.SIGN_IN_CANCELLED) {
        // user cancelled the login flow
        console.log(error);
      } else if (error.code === statusCodes.IN_PROGRESS) {
        // operation (e.g. sign in) is in progress already
        console.log(error);
      } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
        // play services not available or outdated
        console.log(error);
      } else {
        // some other error happened
        console.log(error);
      }
    }
  };

  return (
    <SafeAreaView
      style={{
        flex: 1,
        justifyContent: 'center',
        paddingHorizontal: 24,
      }}>
      <View>
        {userData ? (
          <View style={{alignItems: 'center'}}>
            <Image
              style={{
                width: 100,
                height: 100,
                borderRadius: 50,

                marginVertical: 10,
              }}
              source={{uri: userData.user.photo}}
            />
            <View style={{marginVertical: 10, alignItems: 'center'}}>
              <Text style={{color: 'black'}}>{userData.user.name}</Text>
              <Text style={{color: 'black'}}>{userData.user.email}</Text>
            </View>
          </View>
        ) : null}
      </View>
      {!userData ? (
        <TouchableOpacity
          onPress={() => {
            signIn();
          }}
          style={{
            alignItems: 'center',
            backgroundColor: 'green',
            padding: 10,
            borderRadius: 10,
          }}>
          <Text style={{color: 'white'}}>Google Login</Text>
        </TouchableOpacity>
      ) : (
        <TouchableOpacity
          onPress={() => {
            signOut();
          }}
          style={{
            alignItems: 'center',
            backgroundColor: 'green',
            padding: 10,
            borderRadius: 10,
          }}>
          <Text style={{color: 'white'}}>Sign out</Text>
        </TouchableOpacity>
      )}
    </SafeAreaView>
  );
};

export default GoogleLoginScreen;

const styles = StyleSheet.create({});
