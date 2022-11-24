import React, {useCallback, useEffect, useMemo, useState} from 'react';
import {StyleSheet, TouchableOpacity, View, Alert} from 'react-native';
import {useRecoilState, useRecoilValue} from 'recoil';
import commentState, {Comment} from '../../../atoms/commentState';

import PublicText from '../../../components/common/PublicText';
import CustomTextInput from '../../auth/components/CustomTextInput';

type Props = {
  onCommentEdit: (commentId: number, content: string) => void;
  onCommentSave: (content: string) => void;
  onCommentDelete: (comment: Comment) => void;
};

const WriteCommentInput: React.FC<Props> = ({
  onCommentEdit,
  onCommentSave,
  onCommentDelete,
}) => {
  const [commentStateValue, setCommentStateValue] =
    useRecoilState(commentState);

  const [content, setContent] = useState(commentStateValue?.content || '');

  useEffect(() => {
    setContent(commentStateValue?.content || '');
  }, [commentStateValue]);

  const isDisabled = useMemo(() => content.length < 10, [content.length]);

  const onDelete = useCallback(() => {
    if (!commentStateValue) {
      return;
    }

    Alert.alert('경고', '정말 삭제하시겠습니까?', [
      {
        text: '확인',
        onPress: () => {
          onCommentDelete(commentStateValue);
          setCommentStateValue(null);
          setContent('');
        },
      },
      {
        text: '취소',
        onPress: () => {},
      },
    ]);
  }, [commentStateValue]);

  const onCancel = useCallback(() => {
    setCommentStateValue(null);
    setContent('');
  }, []);

  const _onCommentEdit = useCallback(() => {
    if (!commentStateValue?.id) {
      return;
    }

    onCommentEdit(commentStateValue?.id, content);
    setContent('');
  }, [commentStateValue?.id, content]);

  const _onCommentSave = useCallback(() => {
    onCommentSave(content);
    setContent('');
  }, [content]);

  return (
    <View style={styles.container}>
      <CustomTextInput
        style={styles.textInput}
        multiline
        value={content}
        onChangeText={setContent}
      />
      {commentStateValue === null && (
        <TouchableOpacity
          style={styles.btn}
          onPress={_onCommentSave}
          disabled={isDisabled}>
          <PublicText
            style={[
              styles.btnTitle,
              {color: isDisabled === true ? '#ccc' : '#191919'},
            ]}>
            등록
          </PublicText>
        </TouchableOpacity>
      )}
      {commentStateValue !== null && (
        <View style={styles.editBtnContainer}>
          <TouchableOpacity
            style={styles.btn}
            onPress={_onCommentEdit}
            disabled={isDisabled}>
            <PublicText
              style={[
                styles.btnTitle,
                {color: isDisabled === true ? '#ccc' : '#191919'},
              ]}>
              수정
            </PublicText>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.btn}
            onPress={onDelete}
            disabled={isDisabled}>
            <PublicText style={styles.btnTitle}>삭제</PublicText>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.btn}
            onPress={onCancel}
            disabled={isDisabled}>
            <PublicText style={styles.btnTitle}>취소</PublicText>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    paddingHorizontal: 10,
    paddingVertical: 10,
  },
  textInput: {
    flex: 1,
    borderRadius: 30,
    height: '100%',
    minHeight: 100,
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
    paddingVertical: 10,
    paddingHorizontal: 10,
  },
  editBtnContainer: {
    justifyContent: 'center',
  },
});
export default WriteCommentInput;
