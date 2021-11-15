import React, { useMemo } from 'react';
import { Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useSelector } from 'react-redux';

import { theme } from '../../../theme';
import { RootState } from '../../../redux/store';

export const PrimaryButton = ({ text, onPressHandler, isDisabled = false }: PrimaryButtonProps) => {
  const isDefaultTheme = useSelector((state: RootState) => state.settings.isDefaultTheme);

  const primaryBtnTheme = useMemo(
    () => ({
      backgroundColor: isDefaultTheme
        ? isDisabled
          ? theme.colors.brandColor.light
          : theme.colors.brandColor.default
        : isDisabled
        ? theme.colors.brandColor.light
        : theme.colors.brandColor.darkMode,
    }),
    [isDefaultTheme, isDisabled]
  );

  return (
    <TouchableOpacity style={[styles.primaryBtn, primaryBtnTheme]} onPress={onPressHandler} disabled={isDisabled}>
      <Text style={styles.primaryBtnText}>{text}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  primaryBtn: {
    width: '100%',
    borderRadius: 25,
    paddingHorizontal: 14,
    paddingVertical: 8,
  },
  primaryBtnText: {
    fontFamily: 'Mulish',
    fontSize: 16,
    lineHeight: 28,
    fontWeight: '600',
    textAlign: 'center',
    color: theme.colors.neutral.offWhite,
  },
});

interface PrimaryButtonProps {
  text: string;
  isDisabled?: boolean;
  onPressHandler: () => void;
}
