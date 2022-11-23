import {NativeStackScreenProps} from '@react-navigation/native-stack';
import React from 'react';
import {useState} from 'react';
import {useCallback} from 'react';
import {useEffect} from 'react';
import {ScrollView} from 'react-native';
import {useRecoilValue, useSetRecoilState} from 'recoil';
import clubState from '../../atoms/clubState';

import userTokenState from '../../atoms/userTokenState';
import ScreenContainer from '../../components/layout/ScreenContainer';
import {RootStackParamList} from '../RootStackNavigator';
import ClubListItem from './components/ClubListItem';

type Data = {
  id: number;
  title: string;
  summary: string;
  status?: string;
  createdAt: Date;
  image: string;
  imageStr?: string;
  type: string;
};

type JoinedClubData = {
  summary: string;
  sortNo: number;
  image: string;
  communityId: number;
  title: string;
  type: string;
  userId?: number;
};

type Props = NativeStackScreenProps<RootStackParamList, 'ClubList'>;
const ClubListScreen: React.FC<Props> = ({navigation}) => {
  const setClubStateValue = useSetRecoilState(clubState);
  const [clubList, setClubList] = useState<Data[]>([]);
  const userTokenStateValue = useRecoilValue(userTokenState);

  useEffect(() => {
    async function init() {
      try {
        const response = await fetch('http://localhost:8091/community/list', {
          method: 'GET',
          headers: {
            Accepts: 'application/json',
            'Content-Type': 'application/json',
          },
        });
        const responseData = await response.json();
        setClubList(responseData.data);
      } catch (error) {
        console.error(error);
      }
    }

    init();
  }, []);

  const onPressClub = useCallback(
    (clubId: number) => async () => {
      try {
        const response = await fetch(
          'http://localhost:8091/community/list/user',
          {
            method: 'POST',
            headers: {
              Accepts: 'application/json',
              'Content-Type': 'application/json',
              Authorization: `Bearer ${userTokenStateValue}`,
            },
          },
        );
        const responseData = await response.json();

        const club = responseData.data.find((row: JoinedClubData) => {
          return !!row.userId && row.communityId === clubId;
        });
        console.log('club', club);
        // 해당 클럽에 가입되어있는지 여부를 여기서 체크
        if (club) {
          // 만약 가입되어있으면
          navigation.navigate('ClubHome', {
            clubId,
          });
          setClubStateValue(club);
        } else {
          // 아니라면
          navigation.navigate('CreateProfile', {
            clubId,
          });
        }
      } catch (e) {
        console.log(e);
      }
    },
    [],
  );

  return (
    <ScreenContainer>
      <ScrollView>
        {clubList.map((row, index) => {
          return (
            <ClubListItem
              key={index}
              title={row.title}
              image={`${row.type}${row.image}`}
              onPress={onPressClub(row.id)}
            />
          );
        })}
      </ScrollView>
    </ScreenContainer>
  );
};

export default ClubListScreen;
