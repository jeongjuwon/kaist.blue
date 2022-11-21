import { NativeStackScreenProps } from '@react-navigation/native-stack';
import React, { useCallback, useEffect, useState } from 'react';
import { KeyboardAvoidingView, Platform, StyleSheet } from 'react-native';
import { useRecoilRefresher_UNSTABLE, useRecoilState } from 'recoil';

import articlesState from '../../atoms/articlesState';
import userTokenState from '../../atoms/userTokenState';
import CancelButton from '../../components/buttons/CancelButton';
import LightBlueButton from '../../components/buttons/LightBlueButton';
import ScreenContainer from '../../components/layout/ScreenContainer';
import CustomTextInput from '../auth/components/CustomTextInput';
import { RootStackParamList } from '../RootStackNavigator';

type Props = NativeStackScreenProps<RootStackParamList, 'ArticleWrite'>;
const ArticleWriteScreen: React.FC<Props> = ({navigation, route}) => {
  const {clubId, articleId} = route.params;
  const [tokenStateValue, setTokenState] = useRecoilState(userTokenState);
  const refreshArticles = useRecoilRefresher_UNSTABLE(articlesState(clubId));

  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  useEffect(() => {
    async function init() {}
    init();
  }, [tokenStateValue]);

  const onSave = useCallback(async () => {
    try {
      const response = await fetch('http://localhost:8091/board/save', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          Authorization: `Bearer ${tokenStateValue}`,
        },
        body: JSON.stringify({
          title,
          content,
          communityId: clubId,
        }),
      });
      const responseData = await response.json();
      console.log('responseData', responseData);
      refreshArticles();
      navigation.goBack();
    } catch (e) {
      console.log(e);
    }
  }, [clubId, content, navigation, title, tokenStateValue]);

  const onCancel = useCallback(() => {
    navigation.goBack();
  }, [navigation]);

  return (
    <ScreenContainer>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.keyboardAvoidingView}>
        <CustomTextInput
          placeholder="제목을 입력하세요"
          value={title}
          onChangeText={setTitle}
          style={styles.titleTextInput}
        />
        <CustomTextInput
          placeholder="내용을 입력하세요"
          value={content}
          onChangeText={setContent}
          multiline
          style={styles.contentTextInput}
        />
        <LightBlueButton
          title="저장하기"
          onPress={onSave}
          style={styles.lightBlueButton}
        />
        <CancelButton onPress={onCancel} />
      </KeyboardAvoidingView>
    </ScreenContainer>
  );
};

const styles = StyleSheet.create({
  keyboardAvoidingView: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
  },
  titleTextInput: {
    marginBottom: 20,
    fontSize: 15,
  },
  contentTextInput: {
    marginBottom: 20,
    flex: 1,
    paddingTop: 20,
    fontSize: 15,
  },
  lightBlueButton: {
    marginBottom: 20,
  },
});

export default ArticleWriteScreen;
