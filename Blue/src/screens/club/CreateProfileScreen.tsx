import { NativeStackScreenProps } from '@react-navigation/native-stack';
import React, { useCallback, useEffect, useState } from 'react';
import { GestureResponderEvent, KeyboardAvoidingView, Platform, StyleSheet, TouchableOpacity } from 'react-native';

import CancelButton from '../../components/buttons/CancelButton';
import GrayButton from '../../components/buttons/GrayButton';
import LightBlueButton from '../../components/buttons/LightBlueButton';
import ScreenContainer from '../../components/layout/ScreenContainer';
import CustomTextInput from '../auth/components/CustomTextInput';
import { RootStackParamList } from '../RootStackNavigator';
import ProfileImage from './components/ProfileImage';

type Props = NativeStackScreenProps<RootStackParamList, 'CreateProfile'>;
const CreateProfileScreen: React.FC<Props> = ({navigation, route}) => {
  const [nickName, setNickName] = useState('');

  const onChangeNickName = useCallback((text: string) => {
    setNickName(text);
  }, []);

  const onSave = useCallback((event: GestureResponderEvent) => {
    // todo: networking
    navigation.navigate('ClubHome', {
      clubId: 1,
    });
  }, []);

  const onCancel = useCallback((event: GestureResponderEvent) => {
    // todo: networking
    navigation.goBack();
  }, []);

  const onDeleteProfile = useCallback((event: GestureResponderEvent) => {
    // todo: networking
    navigation.navigate('ClubList');
  }, []);

  return (
    <ScreenContainer>
      <KeyboardAvoidingView
        style={styles.keyboardAvoidingView}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
        <TouchableOpacity style={styles.profileContainer}>
          <ProfileImage size={100} />
        </TouchableOpacity>
        <CustomTextInput
          placeholder="닉네임을 입력하세요"
          value={nickName}
          onChangeText={onChangeNickName}
        />
        <LightBlueButton title="클럽 정보수정" onPress={onSave} />
        <LightBlueButton title="클럽 가입하기" onPress={onSave} />
        <CancelButton onPress={onCancel} />
        <GrayButton title="클럽 탈퇴하기" onPress={onDeleteProfile} />
      </KeyboardAvoidingView>
    </ScreenContainer>
  );
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

export default CreateProfileScreen;
