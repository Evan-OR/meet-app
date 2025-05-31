import React from 'react';
import { Image, ImageSourcePropType, StyleProp, StyleSheet, View, ViewStyle } from 'react-native';

type AvatarProps = {
  source: ImageSourcePropType;
  size?: number;
  style?: StyleProp<ViewStyle>;
};

const Avatar = ({ source, size = 60, style }: AvatarProps) => {
  return (
    <View style={[styles.container, { width: size, height: size }]}>
      <Image source={source} style={styles.image} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    overflow: 'hidden',
    borderRadius: '100%',
  },
  image: {
    width: '100%',
    height: '100%',
  },
});

export default Avatar;
