import React, { useState } from 'react';
import { KeyboardAvoidingView, Platform, StyleSheet, TouchableOpacity, View } from 'react-native';

import LightBlueButton from '../../components/buttons/LightBlueButton';
import PublicText from '../../components/common/PublicText';
import Logo from '../../components/layout/Logo';
import ScreenContainer from '../../components/layout/ScreenContainer';
import CustomTextInput from './components/CustomTextInput';

const SignIn = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  return (
    <ScreenContainer style={styles.screenContainer}>
      <KeyboardAvoidingView
        style={styles.rootConstainer}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
        <Logo />
        <CustomTextInput
          placeholder="이메일을 입력하세요."
          value={email}
          style={styles.idInput}
          onChangeText={text => {
            setEmail(text);
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
        <LightBlueButton
          title="로그인"
          onPress={() => {
            console.log('로그인 눌림');
          }}
        />
        <View style={styles.signUpContainer}>
          <PublicText>만약 회원이 아니라면</PublicText>
          <TouchableOpacity style={styles.signUpButton}>
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

export default SignIn;
