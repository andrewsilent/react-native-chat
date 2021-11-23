import React, { useMemo } from 'react';
import { ImageBackground, StyleSheet, Text, View } from 'react-native';
import { useSelector } from 'react-redux';
import { LinearGradient } from 'expo-linear-gradient';

import { RootState } from '../../redux/store';
import { User } from '../../interfaces';
import { theme } from '../../theme';

export const ContactAvatar = ({ user, userStatus }: ContactAvatarProps) => {
  const isDefaultTheme = useSelector((state: RootState) => state.settings.isDefaultTheme);

  const imageWrapperTheme = useMemo(
    () => ({
      backgroundColor: isDefaultTheme ? theme.colors.neutral.white : theme.colors.neutral.active,
    }),
    [isDefaultTheme]
  );

  const linearGradientTheme = useMemo(
    () =>
      Object.keys(user.story).length > 0
        ? [theme.colors.gradient.v1Color2, theme.colors.gradient.v1Color1]
        : ['transparent', 'transparent'],
    [user.story]
  );

  const usernamePlaceholder = useMemo(() => {
    if (user.lastName) {
      return `${user.firstName[0]}${user.lastName[0]}`;
    }
    return `${user.firstName[0]}${user.firstName[1].toUpperCase()}`;
  }, [user]);

  return (
    <LinearGradient start={[1, 0]} end={[0, 0]} colors={linearGradientTheme} style={{ borderRadius: 16 }}>
      <View style={[styles.imageWrapper, imageWrapperTheme]}>
        {user.userPhoto?.localUri ? (
          <ImageBackground
            source={{ uri: user.userPhoto?.localUri }}
            style={styles.image}
            imageStyle={styles.imageStyle}
          />
        ) : (
          <View style={styles.usernamePlaceholderWrapper}>
            <Text style={styles.usernamePlaceholderText}>{usernamePlaceholder}</Text>
          </View>
        )}
        {userStatus.isOnline && <View style={styles.statusFlag} />}
      </View>
    </LinearGradient>
  );
};

interface ContactAvatarProps {
  user: User;
  userStatus: {
    isOnline: boolean;
    lastSeen: string;
  };
}

const styles = StyleSheet.create({
  imageWrapper: {
    minWidth: 54,
    minHeight: 54,
    borderRadius: 16,
    margin: 2,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },
  image: {
    minWidth: 48,
    minHeight: 48,
    borderRadius: 16,
    overflow: 'hidden',
  },
  imageStyle: {
    borderRadius: 16,
  },
  statusFlag: {
    minHeight: 16,
    minWidth: 16,
    borderRadius: 50,
    borderWidth: 3,
    borderStyle: 'solid',
    backgroundColor: theme.colors.accent.success,
    borderColor: theme.colors.neutral.white,
    position: 'absolute',
    top: 2,
    right: 2,
  },
  usernamePlaceholderWrapper: {
    flex: 1,
    flexGrow: 0,
    justifyContent: 'center',
    alignItems: 'center',
    minWidth: 48,
    minHeight: 48,
    borderRadius: 16,
    backgroundColor: theme.colors.brandColor.darkMode,
    position: 'relative',
  },
  usernamePlaceholderText: {
    fontFamily: 'Mulish',
    fontSize: 14,
    lineHeight: 24,
    fontWeight: '700',
    color: theme.colors.neutral.white,
  },
});
