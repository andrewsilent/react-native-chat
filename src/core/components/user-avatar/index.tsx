import React, { useMemo } from 'react';
import { View, StyleSheet, ImageBackground, PixelRatio, TouchableOpacity } from 'react-native';

import icons from '../../assets/icons.png';
import { theme } from '../../theme';
import { UserPhoto } from '../../interfaces';

export const UserAvatar = ({ avatar, onAddPress, isDefaultTheme }: UserAvatarProps) => {
  const avatarWrapperTheme = useMemo(
    () => ({
      backgroundColor: isDefaultTheme ? theme.colors.neutral.offWhite : theme.colors.neutral.dark,
    }),
    [isDefaultTheme]
  );

  const avatarPlaceholderStyleTheme = useMemo(
    () => ({
      tintColor: isDefaultTheme ? theme.colors.neutral.dark : theme.colors.neutral.white,
    }),
    [isDefaultTheme]
  );

  const addIconTheme = useMemo(
    () => ({
      backgroundColor: isDefaultTheme ? theme.colors.neutral.active : theme.colors.neutral.offWhite,
    }),
    [isDefaultTheme]
  );

  const addIconStyleTheme = useMemo(
    () => ({
      tintColor: isDefaultTheme ? theme.colors.neutral.white : theme.colors.neutral.dark,
    }),
    [isDefaultTheme]
  );

  const avatarImageScale = useMemo(
    () =>
      avatar?.height && avatar?.width && avatar.height > avatar.width
        ? {
            height: 'auto',
            width: 100,
          }
        : { height: 100, width: 'auto' },
    [avatar]
  );

  return (
    <View style={[styles.avatarWrapper, avatarWrapperTheme]}>
      {avatar?.localUri ? (
        <TouchableOpacity onPress={() => onAddPress()}>
          <View style={styles.avatarImageWrapper}>
            <ImageBackground
              source={{ uri: avatar?.localUri }}
              style={styles.avatarImage}
              imageStyle={[styles.avatarImageStyle, avatarImageScale]}
            />
          </View>
        </TouchableOpacity>
      ) : (
        <View style={styles.avatarPlaceholderWrapper}>
          <ImageBackground
            source={icons}
            style={styles.avatarPlaceholder}
            imageStyle={[styles.avatarPlaceholderStyle, avatarPlaceholderStyleTheme]}
          />
        </View>
      )}
      {!avatar?.localUri && (
        <TouchableOpacity onPress={() => onAddPress()} style={[styles.addBtn]}>
          <ImageBackground
            source={icons}
            style={[styles.addIcon, addIconTheme]}
            imageStyle={[styles.addIconStyle, addIconStyleTheme]}
          />
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  avatarWrapper: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    flexGrow: 0,
    flexBasis: 'auto',
    borderRadius: 50,
    minHeight: 100,
    minWidth: 100,
    position: 'relative',
  },
  avatarImageWrapper: {
    borderRadius: 50,
    overflow: 'hidden',
  },
  avatarImage: {
    width: 100,
    height: 100,
  },
  avatarImageStyle: {
    resizeMode: 'cover',
  },
  avatarPlaceholderWrapper: {
    padding: 38,
    position: 'absolute',
  },
  avatarPlaceholder: {
    width: PixelRatio.roundToNearestPixel(24),
    height: PixelRatio.roundToNearestPixel(24),
    minHeight: 24,
    minWidth: 24,
    overflow: 'hidden',
  },
  avatarPlaceholderStyle: {
    resizeMode: 'cover',
    width: PixelRatio.roundToNearestPixel(597),
    height: PixelRatio.roundToNearestPixel(298),
    top: -243,
    left: -16,
  },
  addBtn: {
    overflow: 'hidden',
    position: 'absolute',
    bottom: 0,
    right: 0,
  },
  addIcon: {
    width: PixelRatio.roundToNearestPixel(24),
    height: PixelRatio.roundToNearestPixel(24),
    borderRadius: 12,
  },
  addIconStyle: {
    resizeMode: 'cover',
    width: PixelRatio.roundToNearestPixel(597),
    height: PixelRatio.roundToNearestPixel(298),
    top: -243,
    left: -164,
  },
});

interface UserAvatarProps {
  avatar?: UserPhoto;
  onAddPress: Function;
  isDefaultTheme: boolean;
}
