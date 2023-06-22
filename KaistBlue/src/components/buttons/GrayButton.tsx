import React from 'react';
import {GestureResponderEvent, StyleSheet, ViewStyle} from 'react-native';

import BaseButton from './BaseButton';

type Props = {
  title: string;
  style?: ViewStyle;
  onPress: (event: GestureResponderEvent) => void;
  disabled?: boolean;
};

const GrayButton: React.FC<Props> = ({title, style, onPress, disabled}) => {
  return (
    <BaseButton
      title={title}
      style={{...styles.button, ...style}}
      textStyle={styles.text}
      onPress={onPress}
      disabled={disabled}
    />
  );
};

const styles = StyleSheet.create({
  button: {
    backgroundColor: '#ccc',
    borderWidth: 0,
  },
  text: {
    fontWeight: '700',
  },
});

export default GrayButton;
