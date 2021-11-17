import React, { useMemo } from 'react';
import { View, StyleSheet, ImageSourcePropType, Text } from 'react-native';
import { useSelector } from 'react-redux';
import { parsePhoneNumber } from 'libphonenumber-js/mobile';

import { theme } from '../../theme';
import { User } from '../../interfaces';
import { UserAvatar } from '../user-avatar';
import { RootState } from '../../redux/store';

export const UserCard = ({ user, icons }: UserCardShortProps) => {
  const isDefaultTheme = useSelector((state: RootState) => state.settings.isDefaultTheme);

  const colorTheme = useMemo(
    () => ({
      color: isDefaultTheme ? theme.colors.neutral.active : theme.colors.neutral.offWhite,
    }),
    [isDefaultTheme]
  );

  const userFullName = useMemo(() => {
    if (user.lastName) {
      return `${user.firstName} ${user.lastName}`;
    }
    return user.firstName;
  }, [user]);

  const formattedPhoneNumber = useMemo(() => {
    return parsePhoneNumber(user.phoneNumber.number as string).formatInternational();
  }, [user]);

  return (
    <View style={styles.container}>
      <UserAvatar avatar={user.userPhoto} icons={icons} userAvatarStyle={styles.userAvatarStyle} />
      <View style={styles.userInfo}>
        <Text style={[styles.usernameText, colorTheme]}>{userFullName}</Text>
        <Text style={styles.phoneNumberText}>{formattedPhoneNumber}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexGrow: 0,
    flexBasis: 66,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  userAvatarStyle: {
    marginRight: 20,
  },
  userInfo: {
    padding: 10,
  },
  usernameText: {
    fontFamily: 'Mulish',
    fontSize: 14,
    fontWeight: '600',
    lineHeight: 24,
  },
  phoneNumberText: {
    fontFamily: 'Mulish',
    fontSize: 12,
    fontWeight: '400',
    lineHeight: 24,
    color: theme.colors.neutral.disabled,
  },
});

interface UserCardShortProps {
  user: User;
  icons: ImageSourcePropType;
}
