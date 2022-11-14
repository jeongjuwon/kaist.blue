import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';

import SignInScreen from './auth/SignInScreen';
import SignUpScreen from './auth/SignUpScreen';
import ClubHomeScreen from './club/ClubHomeScreen';
import ClubListScreen from './club/ClubListScreen';
import CreateProfileScreen from './club/CreateProfileScreen';

export type RootStackParamList = {
  SignIn: undefined;
  SignUp: undefined;
  ClubList: undefined;
  CreateProfile: {
    clubId: number;
  };
  ClubHome: {
    clubId: number;
  };
};

const Stack = createNativeStackNavigator<RootStackParamList>();

const RootStackNavigator = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
      initialRouteName="SignIn">
      <Stack.Screen name="SignIn" component={SignInScreen} />
      <Stack.Screen name="SignUp" component={SignUpScreen} />
      <Stack.Screen name="ClubList" component={ClubListScreen} />
      <Stack.Screen name="CreateProfile" component={CreateProfileScreen} />
      <Stack.Screen name="ClubHome" component={ClubHomeScreen} />
    </Stack.Navigator>
  );
};

export default RootStackNavigator;
