import dayjs from 'dayjs';
import React from 'react';
import {StyleSheet, View} from 'react-native';

import {Article} from '../../../atoms/articleState';
import PublicText from '../../../components/common/PublicText';
import ProfileImage from './ProfileImage';

type Props = {
  article: Article;
};

const ViewArticle: React.FC<Props> = ({article}) => {
  return (
    <>
      <View style={styles.profileContainer}>
        <ProfileImage size={70} />
        <View style={styles.profileNameContainer}>
          <PublicText style={styles.profileName}>{article.nickName}</PublicText>
          <PublicText style={styles.date}>
            {dayjs(article.createdAt).format('YYYY-MM-DD HH:mm:ss')}
          </PublicText>
        </View>
      </View>
      <View style={styles.contentContainer}>
        <PublicText style={styles.title}>{article.title}</PublicText>
        <PublicText style={styles.content}>{article.content}</PublicText>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: '#fff',
  },
  profileContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  profileNameContainer: {
    flexDirection: 'column',
    flex: 1,
    alignItems: 'flex-end',
    justifyContent: 'flex-end',
  },
  profileName: {
    fontSize: 16,
    marginBottom: 10,
  },
  contentContainer: {
    borderTopWidth: 0.5,
    borderBottomWidth: 0.5,
    borderColor: '#ccc',
    marginTop: 20,
    flex: 1,
    paddingVertical: 20,
    paddingHorizontal: 10,
    paddingBottom: 20,
  },
  title: {
    fontSize: 16,
    marginBottom: 20,
  },
  content: {
    fontSize: 12,
  },
  date: {
    fontSize: 12,
  },
});

export default ViewArticle;
