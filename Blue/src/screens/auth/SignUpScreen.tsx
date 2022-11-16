import { NativeStackScreenProps } from '@react-navigation/native-stack';
import React, { useCallback, useState } from 'react';
import { useMemo } from 'react';
import { KeyboardAvoidingView, Platform, StyleSheet } from 'react-native';

import CancelButton from '../../components/buttons/CancelButton';
import LightBlueButton from '../../components/buttons/LightBlueButton';
import ScreenContainer from '../../components/layout/ScreenContainer';
import { RootStackParamList } from '../RootStackNavigator';
import CustomTextInput from './components/CustomTextInput';

type Props = NativeStackScreenProps<RootStackParamList, 'SignUp'>;
const SignUpScreen: React.FC<Props> = ({navigation}) => {
  const [id, setId] = useState('');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordRe, setPasswordRe] = useState('');

  const onChangeId = useCallback((text: string) => {
    setId(text);
  }, []);

  const onChangeName = useCallback((text: string) => {
    setName(text);
  }, []);

  const onChangeEmail = useCallback((text: string) => {
    setEmail(text);
  }, []);

  const onChangePassword = useCallback((text: string) => {
    setPassword(text);
  }, []);

  const onChangePasswordre = useCallback((text: string) => {
    setPasswordRe(text);
  }, []);

  const disabled = useMemo(() => {
    console.log(password, passwordRe);
    return password === '' || passwordRe === '' || password !== passwordRe;
  }, [password, passwordRe]);

  const onCancel = useCallback(() => {
    navigation.goBack();
  }, [navigation]);

  const onSignUp = useCallback(async () => {
    // todo: 네트워킹
    try {
      const response = await fetch('http://localhost:8091/api/signup', {
        method: 'POST',
        headers: {
          Accepts: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userId: id,
          userName: name,
          upassword: password,
          email: email,
        }),
      });
      const responseData = await response.json();
      console.log('responseData', responseData);

      navigation.goBack();
    } catch (e) {
      console.log(e);
    }
  }, [navigation, id, name, password, email]);

  return (
    <ScreenContainer style={styles.screenContainer}>
      <KeyboardAvoidingView
        style={styles.rootContainer}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
        <CustomTextInput
          placeholder="아이디를 입력하세요."
          style={styles.emailInput}
          value={id}
          onChangeText={onChangeId}
        />
        <CustomTextInput
          placeholder="이름을 입력하세요."
          style={styles.emailInput}
          value={name}
          onChangeText={onChangeName}
        />
        <CustomTextInput
          placeholder="이메일을 입력하세요."
          style={styles.emailInput}
          value={email}
          onChangeText={onChangeEmail}
        />
        <CustomTextInput
          placeholder="패스워드를 입력하세요."
          secureTextEntry
          style={styles.passwordInput}
          value={password}
          onChangeText={onChangePassword}
        />
        <CustomTextInput
          placeholder="패스워드를 확인해주세요."
          secureTextEntry
          style={styles.passwordReInput}
          value={passwordRe}
          onChangeText={onChangePasswordre}
        />
        <LightBlueButton
          title="가입하기"
          onPress={onSignUp}
          style={[
            styles.signUpButton,
            {backgroundColor: disabled === true ? '#ccc' : 'lightblue'},
          ]}
          disabled={disabled}
        />
        <CancelButton onPress={onCancel} />
      </KeyboardAvoidingView>
    </ScreenContainer>
  );
};

const styles = StyleSheet.create({
  screenContainer: {
    borderWidth: 1,
  },
  rootContainer: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
  },
  emailInput: {
    marginBottom: 20,
  },
  passwordInput: {
    marginBottom: 20,
  },
  passwordReInput: {
    marginBottom: 20,
  },
  signUpButton: {
    marginBottom: 20,
  },
});

export default SignUpScreen;
