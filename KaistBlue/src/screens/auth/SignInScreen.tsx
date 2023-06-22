import AsyncStorage from '@react-native-async-storage/async-storage';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import React, {useCallback, useEffect, useState} from 'react';
import {
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import {useRecoilState} from 'recoil';

import userTokenState from '../../atoms/userTokenState';
import LightBlueButton from '../../components/buttons/LightBlueButton';
import PublicText from '../../components/common/PublicText';
import Logo from '../../components/layout/Logo';
import ScreenContainer from '../../components/layout/ScreenContainer';
import {RootStackParamList} from '../RootStackNavigator';
import CustomTextInput from './components/CustomTextInput';
import RNBootSplash from 'react-native-bootsplash';
import {API_URL} from '@env';

type Props = NativeStackScreenProps<RootStackParamList, 'SignIn'>;
const SignInScreen: React.FC<Props> = ({navigation}) => {
  const [id, setId] = useState('');
  const [password, setPassword] = useState('');
  const [userTokenStateValue, setUserTokenState] =
    useRecoilState(userTokenState);
  // const navigation = useNavigation();

  useEffect(() => {
    RNBootSplash.hide();
  }, []);

  const onSignIn = useCallback(async () => {
    try {
      console.log('API_URL', API_URL);
      const response = await fetch(`${API_URL}/auth/authenticate`, {
        method: 'POST',
        headers: {
          //   Accepts: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userId: id,
          upassword: password,
        }),
      });
      const token = await response.text();
      console.log('token', token);

      if (token) {
        await AsyncStorage.setItem('token', token);
        setUserTokenState(token);
      } else {
        throw new Error('로그인 실패');
      }
    } catch (error) {
      console.error(error);
    }

    // navigation.navigate('ClubList');
  }, [id, password, setUserTokenState]);

  const onSignUp = useCallback(() => {
    navigation.navigate('SignUp');
  }, [navigation]);

  return (
    <ScreenContainer style={styles.screenContainer}>
      <KeyboardAvoidingView
        style={styles.rootConstainer}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
        <Logo />
        <CustomTextInput
          placeholder="아이디를 입력하세요."
          value={id}
          style={styles.idInput}
          onChangeText={text => {
            setId(text);
          }}
        />
        <CustomTextInput
          placeholder="패스워드를 입력하세요."
          value={password}
          style={styles.passwordInput}
          secureTextEntry={true}
          onChangeText={text => {
            setPassword(text);
          }}
        />
        <LightBlueButton title="로그인" onPress={onSignIn} />
        <View style={styles.signUpContainer}>
          <PublicText>만약 회원이 아니라면</PublicText>
          <TouchableOpacity style={styles.signUpButton} onPress={onSignUp}>
            <PublicText style={styles.signUpText}>회원 가입</PublicText>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </ScreenContainer>
  );
};

const styles = StyleSheet.create({
  screenContainer: {
    justifyContent: 'center',
  },
  rootConstainer: {
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  idInput: {
    marginBottom: 20,
  },
  passwordInput: {
    marginBottom: 20,
  },
  signUpContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  signUpText: {
    color: 'blue',
  },
  signUpButton: {
    paddingHorizontal: 10,
    paddingVertical: 20,
  },
});

export default SignInScreen;
