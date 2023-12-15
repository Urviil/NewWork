import {
  Alert,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import {RFPercentage, RFValue} from 'react-native-responsive-fontsize';
import React, {useRef, useState} from 'react';
import CommonButton from '../../components/common/Components/CommonButton';
import CommonTextInput from '../../components/common/Components/CommonTextInput';
import {useNavigation} from '@react-navigation/native';
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';

const SignupScreen = () => {
  const navigation = useNavigation();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');

  const handleSignUpButton = async () => {
    try {
      if (email.length > 0 && password.length > 0) {
        const response = await auth().createUserWithEmailAndPassword(
          email,
          password,
        );

        const userData = {
          id: response.user.uid,
          email: email,
        };
        await firestore()
          .collection('users')
          .doc(response.user.uid)
          .set(userData);
        setMessage('');
        console.log('User account created', response);
        alert('User account created');
        setEmail('');
        setPassword('');
        await auth().currentUser.sendEmailVerification();
        await auth().signOut();
        // navigation.navigate('LoginScreen');
      } else {
        alert('Please enter all data');
      }
    } catch (error) {
      console.log('error', error);
      setMessage(error.message);
      //   if (error.code === 'auth/email-already-in-use') {
      //     console.log('That email address is already in use!');
      //     Alert.alert('That email address is already in use!');
      //   }

      //   if (error.code === 'auth/invalid-email') {
      //     console.log('That email address is invalid!');
      //     Alert.alert('That email address is invalid!');
      //   }
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View
        style={{
          backgroundColor: 'lightgreen',
          flex: 1,
          padding: RFValue(14),
          justifyContent: 'center',
        }}>
        <View style={{alignItems: 'center', marginBottom: RFValue(10)}}>
          <Text
            style={{
              color: 'white',
              fontWeight: 'bold',
              fontSize: RFValue(20),
            }}>
            Create fresh new account !!
          </Text>
        </View>
        <View>
          <CommonTextInput
            placeholder="Enter Email"
            value={email}
            onchangetext={e => setEmail(e)}
          />
          <CommonTextInput
            placeholder="Enter Password"
            value={password}
            onchangetext={e => setPassword(e)}
          />
        </View>
        <View style={{marginTop: RFValue(20)}}>
          <CommonButton title="Signup" onpress={() => handleSignUpButton()} />
        </View>
        <View
          style={{
            alignItems: 'center',
            marginTop: RFValue(10),
            marginHorizontal: RFValue(10),
            flexDirection: 'row',
            justifyContent: 'space-between',
          }}>
          <Text>Already have an account ?</Text>
          <Text onPress={() => navigation.navigate('LoginScreen')}>
            Go Back Login
          </Text>
        </View>
        <View style={{marginTop: RFValue(20)}}>
          <Text style={{color: 'red'}}>{message}</Text>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default SignupScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
