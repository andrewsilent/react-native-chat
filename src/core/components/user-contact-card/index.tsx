import React, { useMemo } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { useSelector } from 'react-redux';

import { RootState } from '../../redux/store';
import { ContactAvatar } from '../contact-avatar';
import { User } from '../../interfaces';
import { theme } from '../../theme';
import { getFullName } from '../../utils';

export const UserContactCard = ({ user }: UserContactCardProps) => {
  const isDefaultTheme = useSelector((state: RootState) => state.settings.isDefaultTheme);

  const usernameTextTheme = useMemo(
    () => ({
      color: isDefaultTheme ? theme.colors.neutral.active : theme.colors.neutral.offWhite,
    }),
    [isDefaultTheme]
  );

  const userFullName = useMemo(() => {
    return getFullName(user);
  }, [user]);

  const userStatus = useMemo(() => {
    let lastSeen = 'Online';
    let isOnline = false;
    const secondsAgo = user.lastActivity ? (new Date().getTime() - new Date(user.lastActivity).getTime()) / 1000 : -1;

    if (secondsAgo < 0) {
      lastSeen = 'Offline';
    }
    if (secondsAgo >= 0 && secondsAgo < 300) {
      isOnline = true;
      lastSeen = 'Online';
    }
    if (secondsAgo >= 300 && secondsAgo < 900) {
      lastSeen = 'Last seen 5 minutes ago';
    }
    if (secondsAgo >= 900 && secondsAgo < 1800) {
      lastSeen = 'Last seen 15 minutes ago';
    }
    if (secondsAgo >= 1800 && secondsAgo < 3600) {
      lastSeen = 'Last seen 30 minutes ago';
    }
    if (secondsAgo >= 3600 && secondsAgo < 10800) {
      lastSeen = 'Last seen 1 hour ago';
    }
    if (secondsAgo >= 10800 && secondsAgo < 21600) {
      lastSeen = 'Last seen 3 hours ago';
    }
    if (secondsAgo >= 21600 && secondsAgo < 43200) {
      lastSeen = 'Last seen 6 hours ago';
    }
    if (secondsAgo >= 43200 && secondsAgo < 86400) {
      lastSeen = 'Last seen 12 hours ago';
    }
    if (secondsAgo >= 86400 && secondsAgo < 172800) {
      lastSeen = 'Last seen yesterday';
    }
    if (user.lastActivity && secondsAgo >= 172800) {
      lastSeen = `Last seen ${new Date(user.lastActivity).toDateString().split(' ').slice(1, 3).join(' ')}`;
    }

    return { lastSeen, isOnline };
  }, [user.lastActivity]);

  return (
    <View style={styles.container}>
      <View style={[styles.avatarWrapper]}>
        <ContactAvatar user={user} userStatus={userStatus} />
      </View>
      <View style={styles.infoWrapper}>
        <Text style={[styles.usernameText, usernameTextTheme]}>{userFullName}</Text>
        <Text style={styles.userStatusText}>{userStatus.lastSeen}</Text>
      </View>
    </View>
  );
};

interface UserContactCardProps {
  user: User;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
  },
  avatarWrapper: {
    borderRadius: 16,
    marginRight: 12,
  },
  infoWrapper: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
  },
  usernameText: {
    fontFamily: 'Mulish',
    fontSize: 14,
    fontWeight: '600',
    lineHeight: 24,
    marginBottom: 5,
  },
  userStatusText: {
    fontFamily: 'Mulish',
    fontSize: 12,
    fontWeight: '400',
    lineHeight: 20,
    color: theme.colors.neutral.disabled,
  },
});
