import React, { PropsWithChildren, type } from 'react';
import { StyleSheet } from 'react-native';

import SignIn from './src/screens/auth/SignIn';

const App = () => {
  return <SignIn />;
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    borderWidth: 10,
  },
});

export default App;
