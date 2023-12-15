import {
  SafeAreaView,
  Share,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';
import dynamicLinks from '@react-native-firebase/dynamic-links';

const Deeplinking = () => {
  const generateLink = async () => {
    try {
      const link = await dynamicLinks().buildShortLink(
        {
          link: `https://socialloginmedia.page.link/Tbeh` /*  change key and value acc to state */,
          domainUriPrefix: `https://socialloginmedia.page.link`,
          android: {
            packageName: `com.newwork`,
          },
        },
        dynamicLinks.ShortLinkType.DEFAULT,
      );
      console.log('link', link);
      return link;
    } catch (error) {
      console.log(error);
    }
  };

  const shareProduct = async () => {
    const getLink = await generateLink();
    try {
      Share.share({
        message: getLink,
      });
    } catch (error) {
      console.log('share product error', error);
    }
  };
  return (
    <SafeAreaView>
      <TouchableOpacity
        onPress={() => {
          shareProduct();
        }}
        style={{
          alignItems: 'center',
          backgroundColor: 'green',
          padding: 10,
          borderRadius: 10,
        }}>
        <Text style={{color: 'white'}}>Share Product</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default Deeplinking;

const styles = StyleSheet.create({});
