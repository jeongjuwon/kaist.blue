// CustomTextInput > PascalCase
// customTextInput > camelCase
// custom_text_input > snake_case
// custom-text-input > kebab-case
import React, {useState} from 'react';
import {StyleSheet, TextInput, ViewStyle} from 'react-native';

type Props = {
  value?: string;
  placeholder?: string;
  onChangeText?: (text: string) => void;
  style?: ViewStyle;
  multiline?: boolean;
  secureTextEntry?: boolean;
};

const CustomTextInput: React.FC<Props> = ({
  value,
  onChangeText,
  placeholder,
  style,
  secureTextEntry = false,
  multiline,
}) => {
  return (
    <TextInput
      placeholder={placeholder}
      value={value}
      onChangeText={onChangeText}
      style={[styles.textInput, style]}
      secureTextEntry={secureTextEntry}
      multiline={multiline}
    />
  );
};

const styles = StyleSheet.create({
  textInput: {
    borderWidth: 1,
    borderColor: '#ccc',
    alignSelf: 'stretch',
    height: 50,
    paddingHorizontal: 20,
    borderRadius: 30,
    color: '#000',
  },
});

export default CustomTextInput;
