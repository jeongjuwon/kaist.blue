import { NativeStackScreenProps } from '@react-navigation/native-stack';
import React, { useCallback, useEffect, useState } from 'react';
import { StyleSheet } from 'react-native';

import ScreenContainer from '../../components/layout/ScreenContainer';
import { RootStackParamList } from '../RootStackNavigator';

type Props = NativeStackScreenProps<RootStackParamList, 'ClubHome'>;
const ClubHomeScreen: React.FC<Props> = ({navigation, route}) => {
  return <ScreenContainer></ScreenContainer>;
};

const styles = StyleSheet.create({
  keyboardAvoidingView: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
  },
  profileContainer: {
    alignItems: 'center',
    marginBottom: 50,
  },
});

export default ClubHomeScreen;
