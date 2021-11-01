import React, { useMemo } from 'react';
import { Text, StyleSheet, TouchableOpacity } from 'react-native';

import { theme } from '../../../theme';

export const PrimaryButton = ({ isDefaultTheme, text, onPressHandler, isDisabled = false }: PrimaryButtonProps) => {
  const primaryBtnTheme = useMemo(() => ({
    backgroundColor: isDefaultTheme
      ? isDisabled ? theme.colors.brandColor.light : theme.colors.brandColor.default :
      isDisabled ? theme.colors.brandColor.light : theme.colors.brandColor.darkMode,
  }), [isDefaultTheme, isDisabled]);

  return (
    <TouchableOpacity
      style={[styles.primaryBtn, primaryBtnTheme]}
      onPress={onPressHandler}
      disabled={isDisabled}
    >
      <Text style={styles.primaryBtnText}>
        {text}
      </Text>
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
  isDefaultTheme: boolean;
  onPressHandler: Function;
}