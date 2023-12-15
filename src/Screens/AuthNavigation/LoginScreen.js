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
import React, {useState} from 'react';
import CommonButton from '../../components/common/Components/CommonButton';
import CommonTextInput from '../../components/common/Components/CommonTextInput';
import {StackActions, useNavigation} from '@react-navigation/native';
import auth from '@react-native-firebase/auth';

const LoginScreen = () => {
  const navigation = useNavigation();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');

  const handleLoginButton = async () => {
    try {
      if (email.length > 0 && password.length > 0) {
        const isUserLogin = await auth().signInWithEmailAndPassword(
          email,
          password,
        );
        setMessage('');
        if (isUserLogin.user.emailVerified) {
          navigation.dispatch(StackActions.replace('HomeScreen'));
        } else {
          alert('Please verify your email to login');
        }

        console.log('User logged in successfully', isUserLogin);
        // Alert.alert('User logged in successfully');
      } else {
        alert('Please fill all data');
      }
    } catch (error) {
      console.log(error);
      setMessage(error.message);
      // if (error.code === 'auth/email-already-in-use') {
      //   console.log('That email address is already in use!');
      //   Alert.alert('That email address is already in use!');
      // }

      // if (error.code === 'auth/invalid-email') {
      //   console.log('That email address is invalid!');
      //   Alert.alert('That email address is invalid!');
      // }
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
            Welcome !!!
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
          <CommonButton title="Login" onpress={() => handleLoginButton()} />
        </View>
        <View
          style={{
            alignItems: 'center',
            marginTop: RFValue(10),
            marginHorizontal: RFValue(10),
            flexDirection: 'row',
            justifyContent: 'space-between',
          }}>
          <Text>Don't have an account ?</Text>
          <Text onPress={() => navigation.navigate('SignupScreen')}>
            Create account
          </Text>
        </View>
        <View style={{marginTop: RFValue(20)}}>
          <Text style={{color: 'red'}}>{message}</Text>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
