import AsyncStorage from '@react-native-async-storage/async-storage';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React, {useEffect, useState} from 'react';
import {StyleSheet, View} from 'react-native';
import {DotIndicator} from 'react-native-indicators';
import {useRecoilState} from 'recoil';

import {Article} from '../atoms/articleState';
import userTokenState from '../atoms/userTokenState';
import SignInScreen from './auth/SignInScreen';
import SignUpScreen from './auth/SignUpScreen';
import ArticleViewScreen from './club/ArticleViewScreen';
import ArticleWriteScreen from './club/ArticleWriteScreen';
import ClubHomeScreen from './club/ClubHomeScreen';
import ClubListScreen from './club/ClubListScreen';
import CreateProfileScreen from './club/CreateProfileScreen';

export type RootStackParamList = {
  SignIn: undefined;
  SignUp: undefined;
  ClubList: undefined;
  CreateProfile: {
    communityId: number;
  };
  ClubHome: {
    communityId: number;
  };
  ArticleWrite: {
    communityId: number;
    boardId: number;
  };
  ArticleView: Article;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

const RootStackNavigator = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [userTokenStateValue, setUserTokenState] =
    useRecoilState(userTokenState);

  useEffect(() => {
    async function init() {
      const token = await AsyncStorage.getItem('token');
      setUserTokenState(token);
      setIsLoading(false);
    }
    init();
  }, []);

  if (isLoading === true) {
    return (
      <View style={styles.indicatorContainer}>
        <DotIndicator color="#000" />
      </View>
    );
  }

  // userToken === null ? 참 : 거짓
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
      initialRouteName={userTokenStateValue === null ? 'SignIn' : 'ClubList'}>
      {userTokenStateValue === null ? (
        <>
          <Stack.Screen name="SignIn" component={SignInScreen} />
          <Stack.Screen name="SignUp" component={SignUpScreen} />
        </>
      ) : (
        <>
          <Stack.Screen name="ClubList" component={ClubListScreen} />
          <Stack.Screen name="ArticleWrite" component={ArticleWriteScreen} />
          <Stack.Screen name="ArticleView" component={ArticleViewScreen} />
          <Stack.Screen name="CreateProfile" component={CreateProfileScreen} />
          <Stack.Screen name="ClubHome" component={ClubHomeScreen} />
        </>
      )}
    </Stack.Navigator>
  );
};

const styles = StyleSheet.create({
  indicatorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default RootStackNavigator;
