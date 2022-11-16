import React, { useCallback } from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';

import PublicText from '../../../components/common/PublicText';
import ProfileImage from './ProfileImage';

const CommentListItem = ({item}) => {
  const onEdit = useCallback(() => {}, [item]);

  return (
    <View style={listItemStyles.container}>
      <View style={listItemStyles.profileContainer}>
        <ProfileImage size={30} style={listItemStyles.profileImage} />
      </View>
      <View style={listItemStyles.contentContainer}>
        <PublicText style={listItemStyles.profileName}>
          {item.profileName}
        </PublicText>
        <PublicText style={listItemStyles.content}>
          {item.content || '내용이 없습니다.'}
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
  profileName: {},
});

export default CommentListItem;
