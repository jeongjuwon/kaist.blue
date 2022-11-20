import { NativeStackScreenProps } from '@react-navigation/native-stack';
import React, { useCallback, useEffect, useState } from 'react';
import { FlatList, StyleSheet, View } from 'react-native';

import PublicText from '../../components/common/PublicText';
import ScreenContainer from '../../components/layout/ScreenContainer';
import { RootStackParamList } from '../RootStackNavigator';
import FloatingActionButtton from './components/FloatingActionButton';

const data = [
  {
    title: '글 제목',
    content: '글 내용',
  },
  {
    title: '글 제목',
    content: '글 내용',
  },
  {
    title: '글 제목',
    content: '글 내용',
  },
  {
    title: '글 제목',
    content: '글 내용',
  },
  {
    title: '글 제목',
    content: '글 내용',
  },
  {
    title: '글 제목',
    content: '글 내용',
  },
];

type Props = NativeStackScreenProps<RootStackParamList, 'ClubHome'>;
const ClubHomeScreen: React.FC<Props> = ({navigation, route}) => {
  const {clubId} = route.params;

  useEffect(() => {
    // todo: 네트워킹
  }, []);
  return (
    <ScreenContainer>
      <FlatList
        data={data}
        renderItem={({item}) => {
          return (
            <View style={listItemStyles.container}>
              <PublicText>{item.title}</PublicText>
            </View>
          );
        }}
      />
      <FloatingActionButtton clubId={clubId} />
    </ScreenContainer>
  );
};

const listItemStyles = StyleSheet.create({
  container: {
    borderWidth: 1,
    padding: 20,
  },
});

export default ClubHomeScreen;
