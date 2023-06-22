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
import {API_URL} from '@env';

type Props = NativeStackScreenProps<RootStackParamList, 'CreateProfile'>;
const CreateProfileScreen: React.FC<Props> = ({navigation, route}) => {
  const {communityId} = route.params;
  const userTokenStateValue = useRecoilValue(userTokenState);
  const clubStateValue = useRecoilValue(clubState);
  const [nickName, setNickName] = useState(clubStateValue?.nickName || '');
  const [profileImage, setProfileImage] = useState('');

  const onChangeNickName = useCallback((text: string) => {
    setNickName(text);
  }, []);

  const onSave = useCallback(async () => {
    // todo: networking

    try {
      const response = await fetch(`${API_URL}/community/user/add`, {
        method: 'POST',
        headers: {
          Accepts: 'application/json',
          'Content-Type': 'application/json',
          Authorization: `Bearer ${userTokenStateValue}`,
        },
        body: JSON.stringify({
          communityId,
          nickName: nickName,
          sortNo: '0',
          imageStr: profileImage,
        }),
      });
      const responseData = await response.json();
      // console.log('responseData', responseData);
      navigation.replace('ClubHome', {
        communityId,
      });
    } catch (e) {
      console.log(e);
    }
  }, [communityId, navigation, nickName, profileImage, userTokenStateValue]);

  const onEdit = useCallback(async () => {
    try {
      const response = await fetch(`${API_URL}/community/user/add`, {
        method: 'POST',
        headers: {
          Accepts: 'application/json',
          'Content-Type': 'application/json',
          Authorization: `Bearer ${userTokenStateValue}`,
        },
        body: JSON.stringify({
          communityId,
          nickName: nickName,
          sortNo: '0',
          imageStr: profileImage,
        }),
      });
      const responseData = await response.json();
      // console.log('responseData', responseData);
      navigation.replace('ClubHome', {
        communityId,
      });
    } catch (e) {
      console.log(e);
    }
  }, [communityId, navigation, nickName, profileImage, userTokenStateValue]);

  const onCancel = useCallback(() => {
    // todo: networking
    navigation.goBack();
  }, [navigation]);

  const onDeleteProfile = useCallback(() => {
    // todo: networking
    navigation.navigate('ClubList');
  }, [navigation]);

  const onProfileImage = useCallback(async () => {
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
    if (clubStateValue) {
      setProfileImage(`${clubStateValue?.type}${clubStateValue?.image}`);
    }
  }, [clubStateValue]);

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
