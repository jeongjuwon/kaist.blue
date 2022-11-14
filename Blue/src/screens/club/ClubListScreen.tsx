import { NativeStackScreenProps } from '@react-navigation/native-stack';
import React from 'react';
import { useState } from 'react';
import { useCallback } from 'react';
import { useEffect } from 'react';
import { ScrollView } from 'react-native';

import ScreenContainer from '../../components/layout/ScreenContainer';
import { RootStackParamList } from '../RootStackNavigator';
import ClubListItem from './components/ClubListItem';

type Data = {
  title: string;
  image: string;
};

const data: Data[] = [
  {
    title: '커뮤니티',
    image: '',
  },
  {
    title: '커뮤니티',
    image: '',
  },
  {
    title: '커뮤니티',
    image: '',
  },
  {
    title: '커뮤니티',
    image: '',
  },
  {
    title: '커뮤니티',
    image: '',
  },
  {
    title: '커뮤니티',
    image: '',
  },
  {
    title: '커뮤니티',
    image: '',
  },
  {
    title: '커뮤니티',
    image: '',
  },
  {
    title: '커뮤니티',
    image: '',
  },
  {
    title: '커뮤니티',
    image: '',
  },
];

type Props = NativeStackScreenProps<RootStackParamList, 'ClubList'>;
const ClubListScreen: React.FC<Props> = () => {
  const [clubList, setClubList] = useState<Data[]>([]);

  useEffect(() => {
    // todo: 네트워킹
    // data: 응답
    return setClubList(data);
  }, []);

  const onPressClub = useCallback(() => {
    // todo: 네트워킹
    // 해당 클럽에 가입되어있는지 여부를 여기서 체크
    // 만약 가입되어있으면
    // navigation.navigate('ClubHome');
    // 아니라면
    // navigation.navigate('CreateProfile');
  }, []);

  return (
    <ScreenContainer>
      <ScrollView>
        {clubList.map((row, index) => {
          return (
            <ClubListItem
              key={index}
              title={row.title}
              image={row.image}
              onPress={onPressClub}
            />
          );
        })}
      </ScrollView>
    </ScreenContainer>
  );
};

export default ClubListScreen;
