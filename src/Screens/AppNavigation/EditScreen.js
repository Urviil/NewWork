import {SafeAreaView, StyleSheet, Text, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import CommonTextInput from '../../components/common/Components/CommonTextInput';
import {RFValue} from 'react-native-responsive-fontsize';
import CommonButton from '../../components/common/Components/CommonButton';
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';
import {get} from 'react-native/Libraries/TurboModule/TurboModuleRegistry';
import {StackActions, useNavigation} from '@react-navigation/native';

const EditScreen = () => {
  const navigation = useNavigation();
  const [userData, setUserData] = useState('');
  useEffect(() => {
    getUser();
  }, []);
  const getUser = async () => {
    await firestore()
      .collection('users')
      .doc(auth().currentUser.uid)
      .get()
      .then(docSnap => {
        if (docSnap.exists) {
          setUserData(docSnap.data());
        }
      });
  };

  const handleUpdateButton = async () => {
    await firestore()
      .collection('users')
      .doc(auth().currentUser.uid)
      .update({
        email: userData.email,
      })
      .then(() => {
        console.log('user updated');
      });
    navigation.dispatch(StackActions.replace('HomeScreen'));
  };
  return (
    <SafeAreaView style={styles.container}>
      <View>
        <CommonTextInput
          placeholder="Email"
          value={userData ? userData.email : ''}
          onchangetext={e => setUserData({...userData, email: e})}
        />
      </View>
      <View
        style={{
          marginTop: RFValue(20),
          flexDirection: 'row',
        }}>
        <CommonButton title="Update " onpress={() => handleUpdateButton()} />
      </View>
    </SafeAreaView>
  );
};

export default EditScreen;

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'lightgreen',
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: RFValue(24),
  },
});
