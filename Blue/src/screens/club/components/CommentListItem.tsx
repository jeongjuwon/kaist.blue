import React, {useCallback} from 'react';
import {StyleSheet, TouchableOpacity, View} from 'react-native';
import {useSetRecoilState} from 'recoil';
import commentState, {Comment} from '../../../atoms/commentState';

import PublicText from '../../../components/common/PublicText';
import ProfileImage from './ProfileImage';

type Props = {
  comment: Comment;
};

const CommentListItem: React.FC<Props> = ({comment}) => {
  const setCommentState = useSetRecoilState(commentState);
  const onEdit = useCallback(() => {
    // 상태에 기록을.. 선택된 코멘트를..
    setCommentState(comment);
  }, [comment]);

  return (
    <View style={listItemStyles.container}>
      <View style={listItemStyles.profileContainer}>
        <ProfileImage size={30} style={listItemStyles.profileImage} />
      </View>
      <View style={listItemStyles.contentContainer}>
        <PublicText style={listItemStyles.profileName}>
          {comment.nickName}
        </PublicText>
        <PublicText style={listItemStyles.content}>
          {comment.content.trim() || '내용이 없습니다.'}
        </PublicText>
      </View>
      <TouchableOpacity style={listItemStyles.btn} onPress={onEdit}>
        <PublicText style={listItemStyles.btnText}>수정</PublicText>
      </TouchableOpacity>
    </View>
  );
};

const listItemStyles = StyleSheet.create({
  container: {
    borderBottomWidth: 0.2,
    borderBottomColor: '#ccc',
    paddingVertical: 10,
    flexDirection: 'row',
  },
  profileContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  profileImage: {
    marginRight: 20,
  },
  contentContainer: {
    flex: 1,
  },
  content: {
    fontSize: 20,
  },
  btn: {
    paddingLeft: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  btnText: {},
  profileName: {
    marginBottom: 10,
  },
});

export default CommentListItem;
