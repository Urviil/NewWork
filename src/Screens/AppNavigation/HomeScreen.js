import {SafeAreaView, StyleSheet, Text, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import Auth from '@react-native-firebase/auth';
import {StackActions, useNavigation} from '@react-navigation/native';
import {RFValue} from 'react-native-responsive-fontsize';
import CommonButton from '../../components/common/Components/CommonButton';
import firestore from '@react-native-firebase/firestore';

const HomeScreen = () => {
  const [dataFromFirestore, setDataFromFirestore] = useState('');
  const navigation = useNavigation();
  useEffect(() => {
    try {
      firestore()
        .collection('users')
        .doc(Auth().currentUser.uid)
        .get()
        .then(documentSnapshot => {
          console.log('User exists: ', documentSnapshot.exists);

          if (documentSnapshot.exists) {
            setDataFromFirestore(documentSnapshot.data());
            console.log('User data: ', documentSnapshot.data());
          }
        });
    } catch (error) {
      console.error('Error getting documents: ', error);
    }
  }, []);
  const handleLogOutButton = async () => {
    Auth().signOut();
    navigation.dispatch(StackActions.replace('LoginScreen'));
  };
  const handleEditButton = () => {
    navigation.replace('EditScreen');
  };
  return (
    <SafeAreaView style={styles.container}>
      {/* <Text>{Auth().currentUser.email}</Text> */}
      <View style={{}}>
        <Text style={styles.labeltxt}>Email</Text>
        <Text style={styles.subtxt}>{dataFromFirestore.email}</Text>
        <View style={styles.hrline} />
        <Text style={styles.labeltxt}>Id</Text>
        <Text style={styles.subtxt}>{dataFromFirestore.id}</Text>
        <View style={styles.hrline} />
      </View>

      <View
        style={{
          marginTop: RFValue(20),
          flexDirection: 'row',
          justifyContent: 'space-between',
        }}>
        <CommonButton title="Edit " onpress={() => handleEditButton()} />
        <CommonButton title="Log Out" onpress={() => handleLogOutButton()} />
      </View>
    </SafeAreaView>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: RFValue(24),
  },
  labeltxt: {
    fontWeight: 'bold',
    fontSize: RFValue(20),
    color: 'black',
    paddingLeft: RFValue(15),
    paddingTop: 10,
  },
  subtxt: {
    paddingVertical: RFValue(5),
    fontSize: RFValue(16),
    color: 'grey',
    paddingLeft: RFValue(15),
  },
  hrline: {
    height: 1,
    backgroundColor: 'grey',
  },
});
