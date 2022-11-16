import { useFocusEffect } from '@react-navigation/native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import React, { useCallback, useEffect, useState } from 'react';
import { FlatList, StyleSheet } from 'react-native';

import ScreenContainer from '../../components/layout/ScreenContainer';
import { RootStackParamList } from '../RootStackNavigator';
import CommentListItem from './components/CommentListItem';
import ViewArticle from './components/ViewArticle';
import ViewArticleHeader from './components/ViewArticleHeader';
import WriteCommentInput from './components/WriteCommentInput';

type Props = NativeStackScreenProps<RootStackParamList, 'ArticleView'>;
const ArticleViewScreen: React.FC<Props> = ({navigation, route}) => {
  const {
    boardId,
    communityId: clubId,
    content,
    createdAt,
    nickName,
    title,
  } = route.params;
  const [article, setArticle] = useState(null);
  const [comments, setComments] = useState([]);

  useFocusEffect(
    useCallback(() => {
      async function init() {
        try {
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

  const onSave = useCallback(() => {
    initComment();
  }, [initComment]);

  const onDelete = useCallback(() => {
    initComment();
  }, [initComment]);

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
                boardId,
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
            return <CommentListItem item={item} />;
          }}
          contentInset={{
            bottom: 20,
          }}
        />
        <WriteCommentInput articleId={0} onSave={onSave} onDelete={onDelete} />
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
