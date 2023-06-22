import {NavigationContainer} from '@react-navigation/native';
import React from 'react';
import {StyleSheet} from 'react-native';
import {RecoilRoot} from 'recoil';
import RootStackNavigator from './src/screens/RootStackNavigator';

const App = () => {
  return (
    <RecoilRoot>
      <NavigationContainer>
        <RootStackNavigator />
      </NavigationContainer>
    </RecoilRoot>
  );
};

export default App;
