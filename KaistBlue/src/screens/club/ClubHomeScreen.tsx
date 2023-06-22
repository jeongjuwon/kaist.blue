import {NativeStackScreenProps} from '@react-navigation/native-stack';
import React, {useCallback, useMemo} from 'react';
import {FlatList, StyleSheet, TouchableOpacity, View} from 'react-native';
import {useRecoilValue} from 'recoil';

import articlesState from '../../atoms/articlesState';
import {Article} from '../../atoms/articleState';
import clubState from '../../atoms/clubState';
import PublicText from '../../components/common/PublicText';
import Header from '../../components/layout/Header';
import ScreenContainer from '../../components/layout/ScreenContainer';
import {RootStackParamList} from '../RootStackNavigator';
import FloatingActionButtton from './components/FloatingActionButton';
import ProfileImage from './components/ProfileImage';

type Props = NativeStackScreenProps<RootStackParamList, 'ClubHome'>;
const ClubHomeScreen: React.FC<Props> = ({navigation, route}) => {
  const {communityId} = route.params;
  const articles = useRecoilValue(articlesState(communityId));
  const clubStateValue = useRecoilValue(clubState);

  const onView = useCallback(
    (item: Article) => () => {
      navigation.navigate('ArticleView', {
        boardId: item.boardId,
        communityId: item.communityId,
        content: item.content,
        createdAt: item.createdAt,
        nickName: item.nickName,
        title: item.title,
      });
    },
    [navigation],
  );

  const onProfile = useCallback(() => {
    navigation.navigate('CreateProfile', {
      communityId,
    });
  }, [communityId, navigation]);

  const profileImage = useMemo(() => {
    if (!clubStateValue?.type || !clubStateValue?.image) {
      return '';
    }

    return `${clubStateValue?.type}${clubStateValue?.image}`;
  }, [clubStateValue?.type, clubStateValue?.image]);

  return (
    <>
      <Header
        RightButtons={
          <TouchableOpacity onPress={onProfile}>
            <ProfileImage size={30} uri={profileImage} />
          </TouchableOpacity>
        }
      />
      <ScreenContainer>
        <FlatList
          data={articles}
          renderItem={({item}) => {
            return (
              <TouchableOpacity
                style={listItemStyles.container}
                onPress={onView(item)}>
                <PublicText style={listItemStyles.title}>
                  {item.title}
                </PublicText>
                <PublicText style={listItemStyles.content}>
                  {item.content}
                </PublicText>
              </TouchableOpacity>
            );
          }}
          ListEmptyComponent={
            <View style={styles.emptyListContainer}>
              <PublicText>등록된 글이 없습니다.</PublicText>
            </View>
          }
          style={styles.container}
        />
        <FloatingActionButtton communityId={communityId} />
      </ScreenContainer>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  emptyListContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

const listItemStyles = StyleSheet.create({
  container: {
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    paddingVertical: 20,
  },
  title: {
    fontSize: 16,
    paddingBottom: 10,
  },
  content: {
    fontSize: 12,
    color: '#999',
  },
});

export default ClubHomeScreen;
