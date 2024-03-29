import React from 'react';
import {GestureResponderEvent, StyleSheet, ViewStyle} from 'react-native';

import BaseButton from './BaseButton';

type Props = {
  title: string;
  style?: ViewStyle;
  onPress: (event: GestureResponderEvent) => void;
  disabled?: boolean;
};

const LightBlueButton: React.FC<Props> = ({
  title,
  style,
  onPress,
  disabled,
}) => {
  return (
    <BaseButton
      title={title}
      style={[styles.button, style]}
      textStyle={styles.text}
      onPress={onPress}
      disabled={disabled}
    />
  );
};

const styles = StyleSheet.create({
  button: {
    backgroundColor: 'lightblue',
    borderWidth: 0,
  },
  text: {
    color: '#fff',
    fontWeight: '700',
    fontSize: 16,
  },
});

export default LightBlueButton;
