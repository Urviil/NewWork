import React, {useRef} from 'react';
import {StyleSheet, TextInput, View} from 'react-native';
import {RFValue} from 'react-native-responsive-fontsize';

const CommonTextInput = ({placeholder, value, onchangetext}) => {
  return (
    <TextInput
      placeholder={placeholder}
      style={styles.textInput}
      value={value}
      onChangeText={onchangetext}
      blurOnSubmit={true}
    />
  );
};

export default CommonTextInput;

const styles = StyleSheet.create({
  textInput: {
    borderColor: 'black',
    borderWidth: RFValue(1),
    borderRadius: RFValue(10),
    paddingHorizontal: RFValue(10),
    marginBottom: RFValue(10),
  },
});
