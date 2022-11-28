import React, {ReactNode} from 'react';
import {StyleProp, StyleSheet, Text, TextStyle} from 'react-native';

type Props = {
  style?: StyleProp<TextStyle>;
  children: ReactNode;
};

const PublicText: React.FC<Props> = ({style, children}) => {
  return <Text style={[styles.text, style]}>{children}</Text>;
};

const styles = StyleSheet.create({
  text: {
    fontFamily: 'Nanum GoDigANiGoGoDing',
    fontSize: 20,
    color: '#000',
  },
});

export default PublicText;
