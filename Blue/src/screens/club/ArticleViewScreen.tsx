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
  const {
    boardId: articleId,
    communityId: clubId,
    content,
    createdAt,
    nickName,
    title,
  } = route.params;
  const [article, setArticle] = useState(null);
  const [comments, setComments] = useState<Comment[]>([]);
  const userTokenValue = useRecoilValue(userTokenState);
  const refreshArticles = useRecoilRefresher_UNSTABLE(articlesState(clubId));

  useFocusEffect(
    useCallback(() => {
      async function init() {
        try {
          const response = await fetch(
            'http://localhost:8091/board/comment/list',
            {
              method: 'post',
              headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                Authorization: `Bearer ${userTokenValue}`,
              },
              body: JSON.stringify({
                boardId: articleId,
              }),
            },
          );
          const responseData = await response.json();
          console.log('responseData', responseData.data);
          setComments(responseData.data);
        } catch (e) {
          console.log(e);
        }
      }
      init();
    }, []),
  );

  const initComment = useCallback(async () => {
    try {
    } catch (e) {
      console.log(e);
    }
  }, []);

  useEffect(() => {
    initComment();
  }, [initComment]);

  const onSave = useCallback(() => {}, []);

  const onCommentSave = useCallback(
    async (content: string) => {
      try {
        const response = await fetch(
          'http://localhost:8091/board/comment/save',
          {
            method: 'POST',
            headers: {
              Accept: 'application/json',
              'Content-Type': 'application/json',
              Authorization: `Bearer ${userTokenValue}`,
            },
            body: JSON.stringify({
              communityId: clubId,
              boardId: articleId,
              content,
            }),
          },
        );
        const responseData = await response.json();
        console.log('responseData', responseData);
      } catch (e) {
        console.log(e);
      }
    },
    [userTokenValue],
  );

  const onCommentDelete = useCallback(async (comment: Comment) => {
    try {
      const response = await fetch(
        'http://localhost:8091/board/comment/delete',
        {
          method: 'post',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            Authorization: `Bearer ${userTokenValue}`,
          },
          body: JSON.stringify({
            id: comment.id,
          }),
        },
      );
      const responseData = await response.json();
      console.log('responseData', responseData.data);
      setComments(responseData.data);
    } catch (e) {
      console.log(e);
    }
  }, []);

  const onDelete = useCallback(async () => {
    try {
      const response = await fetch('http://localhost:8091/board/delete', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          Authorization: `Bearer ${userTokenValue}`,
        },
        body: JSON.stringify({
          id: articleId,
        }),
      });
      const responseData = await response.json();
      console.log('responseData', responseData);
      refreshArticles();
      navigation.goBack();
    } catch (e) {
      console.log(e);
    }
  }, [articleId]);

  return (
    <>
      <ViewArticleHeader
        articleId={0}
        clubId={clubId}
        onSave={onSave}
        onDelete={onDelete}
      />
      <ScreenContainer style={{backgroundColor: '#fff'}}>
        <FlatList
          ListHeaderComponent={
            <ViewArticle
              article={{
                boardId: articleId,
                communityId: clubId,
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
          articleId={0}
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
