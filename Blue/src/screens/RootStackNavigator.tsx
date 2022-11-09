import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';

import SignInScreen from './auth/SignInScreen';
import SignUpScreen from './auth/SignUpScreen';
import ClubListScreen from './club/ClubListScreen';

export type RootStackParamList = {
  SignIn: undefined;
  SignUp: undefined;
  ClubList: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

const RootStackNavigator = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
      initialRouteName="ClubList">
      <Stack.Screen name="SignIn" component={SignInScreen} />
      <Stack.Screen name="SignUp" component={SignUpScreen} />
      <Stack.Screen name="ClubList" component={ClubListScreen} />
    </Stack.Navigator>
  );
};

export default RootStackNavigator;
