import { useNavigation } from '@react-navigation/native';
import React, { useCallback } from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import PublicText from '../../../components/common/PublicText';

type Props = {
  clubId: number;
  articleId: number;
  onSave: () => void;
  onDelete: () => void;
};

// 네비게이션 설치과정에서 설치된 패키지
const ViewArticleHeader: React.FC<Props> = ({clubId, articleId}) => {
  const inset = useSafeAreaInsets();
  const navigation = useNavigation();

  const onBack = useCallback(() => {
    navigation.goBack();
  }, [navigation]);

  const onEdit = useCallback(() => {
    navigation.navigate('ArticleWrite', {
      clubId,
      articleId,
    });
  }, [navigation, clubId, articleId]);

  return (
    <View style={[styles.container, {paddingTop: inset.top}]}>
      <TouchableOpacity onPress={onBack} style={styles.backBtn}>
        <PublicText style={styles.backBtnTitle}>뒤로</PublicText>
      </TouchableOpacity>
      <TouchableOpacity onPress={onEdit} style={styles.backBtn}>
        <PublicText style={styles.backBtnTitle}>글수정</PublicText>
      </TouchableOpacity>
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
  backBtn: {},
  backBtnTitle: {
    fontSize: 20,
  },
});

export default ViewArticleHeader;
