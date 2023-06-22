import {API_URL} from '@env';
import {useFocusEffect} from '@react-navigation/native';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import React, {useCallback, useEffect, useState} from 'react';
import {FlatList, StyleSheet} from 'react-native';
import {useRecoilRefresher_UNSTABLE, useRecoilValue} from 'recoil';

import articlesState from '../../atoms/articlesState';
import {Comment} from '../../atoms/commentState';
import userTokenState from '../../atoms/userTokenState';
import ScreenContainer from '../../components/layout/ScreenContainer';
import {RootStackParamList} from '../RootStackNavigator';
import CommentListItem from './components/CommentListItem';
import ViewArticle from './components/ViewArticle';
import ViewArticleHeader from './components/ViewArticleHeader';
import WriteCommentInput from './components/WriteCommentInput';

type Props = NativeStackScreenProps<RootStackParamList, 'ArticleView'>;
const ArticleViewScreen: React.FC<Props> = ({navigation, route}) => {
  const {boardId, communityId, content, createdAt, nickName, title} =
    route.params;
  const [article, setArticle] = useState(null);
  const [comments, setComments] = useState<Comment[]>([]);
  const userTokenValue = useRecoilValue(userTokenState);
  const refreshArticles = useRecoilRefresher_UNSTABLE(
    articlesState(communityId),
  );

  const fetchComments = useCallback(() => {
    async function init() {
      try {
        const response = await fetch(`${API_URL}/board/comment/list`, {
          method: 'post',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            Authorization: `Bearer ${userTokenValue}`,
          },
          body: JSON.stringify({
            boardId,
          }),
        });
        const responseData = await response.json();
        console.log('fetchComments', responseData.data);
        setComments(responseData.data);
      } catch (e) {
        console.log(e);
      }
    }
    init();
  }, [userTokenValue]);

  useFocusEffect(fetchComments);

  const onCommentEdit = useCallback(
    async (commentId: number, content: string) => {
      try {
        const response = await fetch(`${API_URL}/board/comment/save`, {
          method: 'POST',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            Authorization: `Bearer ${userTokenValue}`,
          },
          body: JSON.stringify({
            id: commentId,
            content,
          }),
        });
        const responseData = await response.json();
        console.log('responseData', responseData);
        await fetchComments();
      } catch (e) {
        console.log(e);
      }
    },
    [],
  );

  const onCommentSave = useCallback(
    async (content: string) => {
      try {
        const response = await fetch(`${API_URL}/board/comment/save`, {
          method: 'POST',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            Authorization: `Bearer ${userTokenValue}`,
          },
          body: JSON.stringify({
            communityId,
            boardId,
            content,
          }),
        });
        const responseData = await response.json();
        console.log('responseData', responseData);
        await fetchComments();
      } catch (e) {
        console.log(e);
      }
    },
    [userTokenValue],
  );

  const onCommentDelete = useCallback(async (comment: Comment) => {
    try {
      const response = await fetch(`${API_URL}/board/comment/delete`, {
        method: 'post',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          Authorization: `Bearer ${userTokenValue}`,
        },
        body: JSON.stringify({
          id: comment.id,
        }),
      });
      const responseData = await response.json();
      console.log('responseData', responseData.data);
      await fetchComments();
    } catch (e) {
      console.log(e);
    }
  }, []);

  const onDelete = useCallback(async () => {
    try {
      const response = await fetch(`${API_URL}/board/delete`, {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          Authorization: `Bearer ${userTokenValue}`,
        },
        body: JSON.stringify({
          id: boardId,
        }),
      });
      const responseData = await response.json();
      console.log('responseData', responseData);
      refreshArticles();
      navigation.goBack();
    } catch (e) {
      console.log(e);
    }
  }, [boardId]);

  return (
    <>
      <ViewArticleHeader onDelete={onDelete} />
      <ScreenContainer style={{backgroundColor: '#fff'}}>
        <FlatList
          ListHeaderComponent={
            <ViewArticle
              article={{
                boardId,
                communityId,
                content,
                createdAt,
                nickName,
                title,
              }}
            />
          }
          data={comments}
          style={flatListStyles.flatList}
          renderItem={({item}) => {
            return <CommentListItem comment={item} />;
          }}
          contentInset={{
            bottom: 20,
          }}
        />
        <WriteCommentInput
          onCommentEdit={onCommentEdit}
          onCommentSave={onCommentSave}
          onCommentDelete={onCommentDelete}
        />
      </ScreenContainer>
    </>
  );
};

const flatListStyles = StyleSheet.create({
  flatList: {
    backgroundColor: '#fff',
    padding: 10,
  },
});

export default ArticleViewScreen;
