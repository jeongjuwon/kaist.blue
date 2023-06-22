import React from 'react';
import { GestureResponderEvent, StyleSheet } from 'react-native';

import BaseButton from './BaseButton';

type Props = {
  onPress?: (event: GestureResponderEvent) => void;
};
const CancelButton: React.FC<Props> = ({onPress}) => {
  return <BaseButton title="취소" style={styles.button} onPress={onPress} />;
};

const styles = StyleSheet.create({
  button: {
    color: '#efefef',
  },
});

export default CancelButton;
