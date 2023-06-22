import {useNavigation} from '@react-navigation/native';
import React, {useCallback} from 'react';
import {StyleSheet, TouchableOpacity, View} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

import PublicText from '../../../components/common/PublicText';
import Header from '../../../components/layout/Header';

type Props = {
  onDelete: () => void;
};

// 네비게이션 설치과정에서 설치된 패키지
const ViewArticleHeader: React.FC<Props> = ({onDelete}) => {
  return (
    <Header
      RightButtons={
        <TouchableOpacity onPress={onDelete} style={styles.backBtn}>
          <PublicText style={styles.backBtnTitle}>글삭제</PublicText>
        </TouchableOpacity>
      }
    />
  );
};

const styles = StyleSheet.create({
  backBtn: {},
  backBtnTitle: {
    fontSize: 16,
  },
});

export default ViewArticleHeader;
