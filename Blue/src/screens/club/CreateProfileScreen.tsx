import {NativeStackScreenProps} from '@react-navigation/native-stack';
import React, {useCallback, useEffect, useState} from 'react';
import {
  GestureResponderEvent,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import {useRecoilValue} from 'recoil';
import {launchImageLibrary} from 'react-native-image-picker';

import userTokenState from '../../atoms/userTokenState';
import LightBlueButton from '../../components/buttons/LightBlueButton';
import Header from '../../components/layout/Header';
import ScreenContainer from '../../components/layout/ScreenContainer';
import CustomTextInput from '../auth/components/CustomTextInput';
import {RootStackParamList} from '../RootStackNavigator';
import ProfileImage from './components/ProfileImage';
import clubState from '../../atoms/clubState';
import CancelButton from '../../components/buttons/CancelButton';
import GrayButton from '../../components/buttons/GrayButton';

type Props = NativeStackScreenProps<RootStackParamList, 'CreateProfile'>;
const CreateProfileScreen: React.FC<Props> = ({navigation, route}) => {
  const {clubId} = route.params;
  const userTokenStateValue = useRecoilValue(userTokenState);
  const clubStateValue = useRecoilValue(clubState);
  const [nickName, setNickName] = useState(clubStateValue?.nickName || '');
  const [profileImage, setProfileImage] = useState('');

  const onChangeNickName = useCallback((text: string) => {
    setNickName(text);
  }, []);

  const onSave = useCallback(
    async (event: GestureResponderEvent) => {
      // todo: networking

      try {
        const response = await fetch(
          'http://localhost:8091/community/user/add',
          {
            method: 'POST',
            headers: {
              Accepts: 'application/json',
              'Content-Type': 'application/json',
              Authorization: `Bearer ${userTokenStateValue}`,
            },
            body: JSON.stringify({
              communityId: clubId,
              nickName: nickName,
              sortNo: '0',
              imageStr: profileImage,
            }),
          },
        );
        const responseData = await response.json();
        // console.log('responseData', responseData);
        navigation.replace('ClubHome', {
          clubId,
        });
      } catch (e) {
        console.log(e);
      }
    },
    [clubId, nickName, profileImage],
  );

  const onEdit = useCallback(() => {
    try {
      // todo: networking,
    } catch (e) {
      console.log(e);
    }
  }, [nickName]);

  const onCancel = useCallback((event: GestureResponderEvent) => {
    // todo: networking
    navigation.goBack();
  }, []);

  const onDeleteProfile = useCallback((event: GestureResponderEvent) => {
    // todo: networking
    navigation.navigate('ClubList');
  }, []);

  const onProfileImage = useCallback(async (event: GestureResponderEvent) => {
    const result = await launchImageLibrary({
      mediaType: 'photo',
      selectionLimit: 1,
      includeBase64: true,
    });

    if (!result?.assets) {
      return;
    }

    setProfileImage(`data:image/png;base64,${result.assets[0].base64}`);
  }, []);

  useEffect(() => {
    setProfileImage(`${clubStateValue?.type}${clubStateValue?.image}`);
  }, [clubStateValue?.type, clubStateValue?.image]);

  return (
    <>
      <Header />
      <ScreenContainer>
        <KeyboardAvoidingView
          style={styles.keyboardAvoidingView}
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
          <TouchableOpacity
            style={styles.profileContainer}
            onPress={onProfileImage}>
            <ProfileImage size={100} uri={profileImage} />
          </TouchableOpacity>
          <CustomTextInput
            placeholder="닉네임을 입력하세요"
            value={nickName}
            onChangeText={onChangeNickName}
            style={styles.inputNickName}
          />
          {clubStateValue === null && (
            <LightBlueButton title="클럽 가입하기" onPress={onSave} />
          )}
          {clubStateValue !== null && (
            <>
              <LightBlueButton
                title="프로필 수정"
                onPress={onEdit}
                style={styles.editBtn}
              />
              <CancelButton onPress={onCancel} />
              <GrayButton
                title="클럽 탈퇴하기"
                onPress={onDeleteProfile}
                style={styles.outBtn}
              />
            </>
          )}
        </KeyboardAvoidingView>
      </ScreenContainer>
    </>
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
  inputNickName: {
    marginBottom: 20,
  },
  editBtn: {
    marginBottom: 20,
  },
  outBtn: {
    marginTop: 20,
  },
});

export default CreateProfileScreen;
