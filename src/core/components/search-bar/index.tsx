import React, { useMemo } from 'react';
import { ImageBackground, PixelRatio, StyleSheet, TextInput, View } from 'react-native';
import { useSelector } from 'react-redux';

import { RootState } from '../../redux/store';
import { theme } from '../../theme';
import icons from '../../assets/icons.png';

export const SearchBar = ({ searchBy, onChangeSearch }: SearchBarProps) => {
  const isDefaultTheme = useSelector((state: RootState) => state.settings.isDefaultTheme);

  const containerTheme = useMemo(
    () => ({
      backgroundColor: isDefaultTheme ? theme.colors.neutral.offWhite : theme.colors.neutral.dark,
    }),
    [isDefaultTheme]
  );

  const searchInputTheme = useMemo(
    () => ({
      color: isDefaultTheme ? theme.colors.neutral.dark : theme.colors.neutral.offWhite,
    }),
    [isDefaultTheme]
  );

  return (
    <View style={[styles.container, containerTheme]}>
      <View style={styles.searchIconWrapper}>
        <ImageBackground source={icons} style={styles.searchIcon} imageStyle={styles.imageStyle} />
      </View>
      <View style={styles.searchInputWrapper}>
        <TextInput
          value={searchBy}
          onChangeText={onChangeSearch}
          placeholder="Search"
          placeholderTextColor={theme.colors.neutral.disabled}
          style={[styles.searchInput, searchInputTheme]}
        />
      </View>
    </View>
  );
};

interface SearchBarProps {
  onChangeSearch: (value: string) => void;
  searchBy: string;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexBasis: 36,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    borderRadius: 4,
    overflow: 'hidden',
    paddingHorizontal: 8,
    paddingVertical: 6,
  },
  searchInputWrapper: {
    flex: 1,
  },
  searchInput: {
    flexGrow: 1,
    fontFamily: 'Mulish',
    fontSize: 14,
    fontWeight: '600',
    height: 24,
    paddingHorizontal: 6,
    paddingVertical: 3,
  },
  searchIconWrapper: {
    flexGrow: 0,
  },
  searchIcon: {
    width: PixelRatio.roundToNearestPixel(24),
    height: PixelRatio.roundToNearestPixel(24),
    minHeight: 24,
    minWidth: 24,
    overflow: 'hidden',
  },
  imageStyle: {
    resizeMode: 'cover',
    width: PixelRatio.roundToNearestPixel(597),
    height: PixelRatio.roundToNearestPixel(298),
    top: -94,
    left: -312,
    tintColor: theme.colors.neutral.disabled,
  },
});
