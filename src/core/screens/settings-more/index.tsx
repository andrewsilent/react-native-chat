import React, { useCallback, useContext, useEffect, useMemo, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  FlatList,
  TouchableOpacity,
  PixelRatio,
  ImageBackground,
  ImageStyle,
  Alert,
} from 'react-native';
import { ReactReduxContext, useSelector } from 'react-redux';

import icons from '../../assets/icons.png';
import { theme } from '../../theme';
import { RootState } from '../../redux/store';
import { UserCard } from '../../components/user-card';
import { user } from '../../redux/reducers/user_reducer';
import { getRandomUsers } from '../../utils';
import { MenuItemType, SettingsMenuItem, SettingsProps } from '../../interfaces';

export const Settings = ({ navigation }: SettingsProps) => {
  const isDefaultTheme = useSelector((state: RootState) => state.settings.isDefaultTheme);
  const self = useSelector((state: RootState) => state.user);

  const [contacts, setContacts] = useState([]);

  const {
    store: { dispatch },
  } = useContext(ReactReduxContext);

  const getContacts = async () => {
    setContacts(await getRandomUsers(10));
  };

  useEffect(() => {
    if (!contacts.length) {
      getContacts();
    }

    dispatch(user.actions.setContacts(contacts));
  }, [contacts, dispatch]);

  const containerTheme = useMemo(
    () => ({
      backgroundColor: isDefaultTheme ? theme.colors.neutral.white : theme.colors.neutral.active,
    }),
    [isDefaultTheme]
  );

  const imageTheme = useMemo(
    () => ({
      tintColor: isDefaultTheme ? theme.colors.neutral.active : theme.colors.neutral.offWhite,
    }),
    [isDefaultTheme]
  );

  const colorTheme = useMemo(
    () => ({
      color: isDefaultTheme ? theme.colors.neutral.active : theme.colors.neutral.offWhite,
    }),
    [isDefaultTheme]
  );

  const imageStyle = useMemo<ImageStyle>(
    () => ({
      ...imageTheme,
      resizeMode: 'cover',
      width: PixelRatio.roundToNearestPixel(448),
      height: PixelRatio.roundToNearestPixel(224),
    }),
    [imageTheme]
  );

  const iconSize = useMemo<ImageStyle>(
    () => ({
      width: PixelRatio.roundToNearestPixel(24),
      height: PixelRatio.roundToNearestPixel(24),
      minHeight: 24,
      minWidth: 24,
      overflow: 'hidden',
    }),
    []
  );

  const menu: SettingsMenuItem[] = [
    {
      id: 1,
      type: MenuItemType.menuItem,
      title: 'Account',
      iconStyles: iconSize,
      imageStyles: {
        ...imageStyle,
        top: -179,
        left: -9,
      },
    },
    {
      id: 2,
      type: MenuItemType.menuItem,
      title: 'Chats',
      iconStyles: iconSize,
      imageStyles: {
        ...imageStyle,
        top: -12,
        left: -287,
      },
    },
    {
      id: 3,
      type: MenuItemType.dividerSpace,
      title: '',
    },
    {
      id: 4,
      type: MenuItemType.menuItem,
      title: 'Appearance',
      iconStyles: iconSize,
      imageStyles: {
        ...imageStyle,
        top: -68,
        left: -176,
      },
    },
    {
      id: 5,
      type: MenuItemType.menuItem,
      title: 'Notification',
      iconStyles: iconSize,
      imageStyles: {
        ...imageStyle,
        top: -179,
        left: -342,
      },
    },
    {
      id: 6,
      type: MenuItemType.menuItem,
      title: 'Privacy',
      iconStyles: iconSize,
      imageStyles: {
        ...imageStyle,
        top: -124,
        left: -120,
      },
    },
    {
      id: 7,
      type: MenuItemType.menuItem,
      title: 'Data Usage',
      iconStyles: iconSize,
      imageStyles: {
        ...imageStyle,
        top: -124,
        left: -286,
      },
    },
    {
      id: 8,
      type: MenuItemType.dividerLine,
      title: '',
    },
    {
      id: 9,
      type: MenuItemType.menuItem,
      title: 'Help',
      iconStyles: iconSize,
      imageStyles: {
        ...imageStyle,
        top: -124,
        left: -231,
      },
    },
    {
      id: 10,
      type: MenuItemType.menuItem,
      title: 'Invite Your Friends',
      iconStyles: iconSize,
      imageStyles: {
        ...imageStyle,
        top: -179,
        left: -398,
      },
    },
  ];

  const onPressMenuItemHandler = useCallback(() => {
    Alert.alert('Hello there', 'Menu is under construct. Thank you for donation', [
      {
        text: 'Donate',
        onPress: () => console.log('Donate Pressed'),
        style: 'cancel',
      },
      { text: 'OK', onPress: () => console.log('OK Pressed') },
    ]);
  }, []);

  const onPressUserCardHandler = useCallback(() => {
    navigation.navigate('CreateProfile');
  }, []);

  const renderItem = useCallback(
    ({ item }: { item: Partial<SettingsMenuItem> }) => {
      if (item.type === 'dividerSpace') {
        return <View key={item.id} style={styles.dividerSpace} />;
      }

      if (item.type === 'dividerLine') {
        return <View key={item.id} style={styles.dividerLine} />;
      }

      return (
        <View>
          <TouchableOpacity key={item.id} style={styles.menuItem} onPress={onPressMenuItemHandler}>
            <View style={styles.iconWrapper}>
              <ImageBackground source={icons} style={item.iconStyles} imageStyle={item.imageStyles} />
            </View>
            <View style={styles.titleTextWrapper}>
              <Text style={[styles.titleText, colorTheme]}>{item.title}</Text>
            </View>
            <View style={styles.arrowWrapper}>
              <ImageBackground source={icons} style={item.iconStyles} imageStyle={[styles.arrowStyle, imageTheme]} />
            </View>
          </TouchableOpacity>
        </View>
      );
    },
    [colorTheme, imageTheme]
  );

  return (
    <SafeAreaView style={[styles.container, containerTheme]}>
      <TouchableOpacity onPress={onPressUserCardHandler}>
        <UserCard user={self} icons={icons} />
      </TouchableOpacity>
      <View style={styles.menuWrapper}>
        <FlatList data={menu} renderItem={renderItem} />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'stretch',
    justifyContent: 'flex-start',
    paddingHorizontal: 24,
    paddingBottom: 36,
  },
  menuWrapper: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'stretch',
    marginTop: 8,
  },
  menuItem: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    height: 40,
    marginTop: 8,
  },
  iconWrapper: {
    flexGrow: 0,
    marginRight: 6,
  },
  titleTextWrapper: {
    flexGrow: 1,
  },
  titleText: {
    fontFamily: 'Mulish',
    fontSize: 14,
    fontWeight: '600',
  },
  dividerSpace: {
    width: '100%',
    marginTop: 8,
    backgroundColor: '#999',
  },
  dividerLine: {
    width: '100%',
    height: 1,
    marginTop: 7,
    backgroundColor: '#999',
  },
  arrowWrapper: {
    alignSelf: 'center',
    alignContent: 'center',
  },
  arrowStyle: {
    resizeMode: 'cover',
    width: PixelRatio.roundToNearestPixel(448),
    height: PixelRatio.roundToNearestPixel(224),
    top: -12,
    left: -120,
  },
});
