import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import {RFValue} from 'react-native-responsive-fontsize';

const CommonButton = ({title, onpress}) => {
  return (
    <View>
      <TouchableOpacity
        style={styles.button}
        onPress={() => {
          onpress();
        }}>
        <Text>{title}</Text>
      </TouchableOpacity>
    </View>
  );
};

export default CommonButton;

const styles = StyleSheet.create({
  button: {
    borderWidth: RFValue(1),
    padding: RFValue(10),
    alignItems: 'center',
    borderRadius: RFValue(10),
    backgroundColor: '#2196f3',
  },
});
