import React from 'react';
import { GestureResponderEvent, Pressable, StyleSheet, TextStyle, ViewStyle } from 'react-native';

import PublicText from '../common/PublicText';

type Props = {
  title: string;
  style?: ViewStyle | ViewStyle[];
  textStyle?: TextStyle;
  onPress?: (event: GestureResponderEvent) => void;
};

const BaseButton: React.FC<Props> = ({title, style, textStyle, onPress}) => {
  return (
    <Pressable style={[styles.button, style]} onPress={onPress}>
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
