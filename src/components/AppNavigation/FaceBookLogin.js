import {Image, SafeAreaView, StyleSheet, Text, View} from 'react-native';
import React, {useState} from 'react';
import {LoginButton, AccessToken, Profile} from 'react-native-fbsdk-next';

const FaceBookLogin = () => {
  const [userProfile, setUserProfile] = useState('');
  console.log(userProfile);

  return (
    <SafeAreaView
      style={{
        flex: 1,
        justifyContent: 'center',
        paddingHorizontal: 24,
        alignItems: 'center',
      }}>
      {userProfile ? (
        <View>
          <Image
            style={{
              width: 100,
              height: 100,
              borderRadius: 50,

              marginVertical: 10,
            }}
            source={{
              uri: userProfile.imageURL,
            }}
          />
          <View style={{marginVertical: 10, alignItems: 'center'}}>
            <Text style={{color: 'black'}}>{userProfile.name}</Text>
          </View>
        </View>
      ) : null}
      <LoginButton
        onLoginFinished={(error, result) => {
          if (error) {
            console.log('login has error: ' + result.error);
          } else if (result.isCancelled) {
            console.log('login is cancelled.');
          } else {
            const currentProfile = Profile.getCurrentProfile().then(function (
              currentProfile,
            ) {
              if (currentProfile) {
                setUserProfile(currentProfile);
              }
            });
          }
        }}
        onLogoutFinished={() => {
          console.log('logout.');
          setUserProfile(null);
        }}
      />
    </SafeAreaView>
  );
};

export default FaceBookLogin;

const styles = StyleSheet.create({});
