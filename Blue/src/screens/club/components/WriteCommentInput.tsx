import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';

import PublicText from '../../../components/common/PublicText';
import CustomTextInput from '../../auth/components/CustomTextInput';

type Props = {
  articleId: number;
  onCommentSave: (content: string) => void;
  onDelete: () => void;
};

const WriteCommentInput: React.FC<Props> = ({
  articleId,
  onCommentSave,
  onDelete,
}) => {
  const [content, setContent] = useState('');

  useEffect(() => {}, []);

  const isDisabled = useMemo(() => content.length < 10, [content.length]);

  return (
    <View style={styles.container}>
      <CustomTextInput
        style={styles.textInput}
        multiline
        value={content}
        onChangeText={setContent}
      />
      <TouchableOpacity
        style={styles.btn}
        onPress={() => {
          onCommentSave(content);
          setContent('');
        }}
        disabled={isDisabled}>
        <PublicText
          style={[
            styles.btnTitle,
            {color: isDisabled === true ? '#ccc' : '#191919'},
          ]}>
          등록
        </PublicText>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    paddingHorizontal: 10,
  },
  textInput: {
    flex: 1,
    borderRadius: 30,
    height: 100,
    borderWidth: 1,
    borderColor: '#ccc',
    paddingHorizontal: 20,
    paddingVertical: 20,
    fontSize: 20,
    lineHeight: 30,
    textAlignVertical: 'center',
  },
  btn: {
    borderRadius: 30,
    // borderWidth: 1,
    width: 70,
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 10,
  },
  btnTitle: {
    fontSize: 20,
    fontWeight: '700',
  },
});
export default WriteCommentInput;
