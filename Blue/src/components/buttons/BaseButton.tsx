import React from 'react';
import { GestureResponderEvent, Pressable, StyleSheet, TextStyle, ViewStyle } from 'react-native';

import PublicText from '../common/PublicText';

type Props = {
  title: string;
  style?: ViewStyle;
  textStyle?: TextStyle;
  onPress?: (event: GestureResponderEvent) => void;
  disabled?: boolean;
};

const BaseButton: React.FC<Props> = ({
  title,
  style,
  textStyle,
  onPress,
  disabled,
}) => {
  return (
    <Pressable
      style={[styles.button, style]}
      onPress={onPress}
      disabled={disabled}>
      <PublicText style={textStyle}>{title}</PublicText>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  button: {
    height: 50,
    borderWidth: 1,
    borderRadius: 30,
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'stretch',
  },
});

export default BaseButton;
