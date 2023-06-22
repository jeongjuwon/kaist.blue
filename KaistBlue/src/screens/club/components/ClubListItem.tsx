import React from 'react';
import { GestureResponderEvent, ImageBackground, StyleSheet, TouchableOpacity, View } from 'react-native';

import PublicText from '../../../components/common/PublicText';

type Props = {
  title: string;
  image?: string;
  onPress?: ((event: GestureResponderEvent) => void) | undefined;
};

const DEFAULT_IMAGE = require('../../../assets/images/club-default-image.png');
const ClubListItem: React.FC<Props> = ({title, image, onPress}) => {
  return (
    <TouchableOpacity style={styles.container} onPress={onPress}>
      <ImageBackground
        source={image ? {uri: image} : DEFAULT_IMAGE}
        style={styles.backgroundImage}>
        <View style={styles.titleContainer}>
          <PublicText style={styles.title}>{title}</PublicText>
        </View>
      </ImageBackground>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    borderRadius: 20,
    paddingHorizontal: 20,
  },
  titleContainer: {
    backgroundColor: 'rgba(0,0,0, 0.4)',
    width: '100%',
    alignItems: 'flex-end',
    justifyContent: 'center',
    padding: 10,
  },
  backgroundImage: {
    width: '100%',
    height: 200,
    borderRadius: 20,
    overflow: 'hidden',
    alignItems: 'flex-end',
    justifyContent: 'flex-end',
    borderWidth: 1,
    borderColor: '#ccc',
    marginBottom: 20,
  },
  title: {
    fontSize: 30,
    color: '#fff',
  },
});
export default ClubListItem;
