import { useNavigation } from '@react-navigation/native';
import React, { useCallback } from 'react';
import { Image, StyleSheet, TouchableOpacity } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const ICON = require('../../../assets/images/icon-writing.png');

type Props = {
  clubId: number;
};

const FloatingActionButtton: React.FC<Props> = ({clubId}) => {
  const inset = useSafeAreaInsets();
  const navigation = useNavigation();

  const onPress = useCallback(() => {
    navigation.navigate('ArticleWrite', {
      clubId,
    });
  }, [navigation]);

  return (
    <TouchableOpacity
      style={[styles.container, {bottom: inset.bottom + 20}]}
      onPress={onPress}>
      <Image source={ICON} style={styles.icon} />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    borderRadius: 50,
    borderWidth: 3,
    width: 70,
    height: 70,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    right: 20,
  },
  icon: {
    width: 25,
    height: 25,
  },
});

export default FloatingActionButtton;
