import {useNavigation} from '@react-navigation/native';
import React, {ReactNode, useCallback} from 'react';
import {StyleSheet, TouchableOpacity, View} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

import PublicText from '../common/PublicText';

type Props = {
  RightButtons?: ReactNode;
};

// 네비게이션 설치과정에서 설치된 패키지
const Header: React.FC<Props> = ({RightButtons}) => {
  const inset = useSafeAreaInsets();
  const navigation = useNavigation();

  const onBack = useCallback(() => {
    navigation.goBack();
  }, [navigation]);

  return (
    <View style={[styles.container, {paddingTop: inset.top}]}>
      <TouchableOpacity onPress={onBack} style={styles.backBtn}>
        <PublicText style={styles.backBtnTitle}>뒤로</PublicText>
      </TouchableOpacity>
      <View style={styles.rightContainer}>{RightButtons}</View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingBottom: 10,
    paddingRight: 20,
    paddingLeft: 20,
    alignItems: 'flex-end',
    justifyContent: 'space-between',
    flexDirection: 'row',
    backgroundColor: '#fff',
  },
  rightContainer: {},
  backBtn: {},
  backBtnTitle: {
    fontSize: 20,
  },
});

export default Header;
