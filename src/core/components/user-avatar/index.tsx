import React, { useMemo } from 'react';
import { View, StyleSheet, ImageBackground, PixelRatio, ImageSourcePropType, FlexStyle } from 'react-native';
import { useSelector } from 'react-redux';

import { theme } from '../../theme';
import { UserPhoto } from '../../interfaces';
import { RootState } from '../../redux/store';

export const UserAvatar = ({ avatar, icons, userAvatarStyle }: UserAvatarProps) => {
  const isDefaultTheme = useSelector((state: RootState) => state.settings.isDefaultTheme);

  const avatarWrapperTheme = useMemo(
    () => ({
      backgroundColor: isDefaultTheme ? theme.colors.neutral.offWhite : theme.colors.neutral.dark,
    }),
    [isDefaultTheme]
  );

  const avatarImageScale = useMemo(
    () =>
      avatar?.height && avatar?.width && avatar.height > avatar.width
        ? {
            height: 'auto',
            width: 50,
          }
        : { height: 50, width: 'auto' },
    [avatar]
  );

  const avatarPlaceholderStyleTheme = useMemo(
    () => ({
      tintColor: isDefaultTheme ? theme.colors.neutral.dark : theme.colors.neutral.white,
    }),
    [isDefaultTheme]
  );

  return (
    <View style={[styles.avatarWrapper, userAvatarStyle, avatarWrapperTheme]}>
      {avatar?.localUri ? (
        <View style={styles.avatarImageWrapper}>
          <ImageBackground
            source={{ uri: avatar.localUri }}
            style={styles.avatarImage}
            imageStyle={[styles.avatarImageStyle, avatarImageScale]}
          />
        </View>
      ) : (
        <View style={styles.avatarPlaceholderWrapper}>
          <ImageBackground
            source={icons}
            style={styles.avatarPlaceholder}
            imageStyle={[styles.avatarPlaceholderStyle, avatarPlaceholderStyleTheme]}
          />
        </View>
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
    minHeight: 50,
    minWidth: 50,
    position: 'relative',
  },
  avatarImageWrapper: {
    borderRadius: 50,
    overflow: 'hidden',
  },
  avatarImage: {
    width: 50,
    height: 50,
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
    width: PixelRatio.roundToNearestPixel(448),
    height: PixelRatio.roundToNearestPixel(224),
    top: -180,
    left: -9,
  },
});

interface UserAvatarProps {
  avatar?: UserPhoto;
  icons: ImageSourcePropType;
  userAvatarStyle: FlexStyle;
}
