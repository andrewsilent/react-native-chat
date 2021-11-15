import React, { useCallback, useMemo } from 'react';
import { Text, View, StyleSheet } from 'react-native';
import { useSelector } from 'react-redux';

import { theme } from '../../theme';
import { RootState } from '../../redux/store';

export const VerificationCode = ({ code, codeLength }: VerificationCodeProps) => {
  const isDefaultTheme = useSelector((state: RootState) => state.settings.isDefaultTheme);

  const backgroundColor = useCallback(
    (id: number) => ({
      backgroundColor: code[id]
        ? 'transparent'
        : isDefaultTheme
        ? theme.colors.neutral.offWhite
        : theme.colors.neutral.dark,
    }),
    [code, isDefaultTheme]
  );

  const codeItemTextTheme = useMemo(
    () => ({
      color: isDefaultTheme ? theme.colors.neutral.active : theme.colors.neutral.offWhite,
    }),
    [isDefaultTheme]
  );

  return (
    <View style={styles.code}>
      {Array(codeLength)
        .fill(null)
        .map((e, i) => (
          <View key={i} style={styles.codeItem}>
            <View style={[styles.codeItemBackground, backgroundColor(i)]} />
            <Text style={[styles.codeItemText, codeItemTextTheme]}>{code[i]}</Text>
          </View>
        ))}
    </View>
  );
};

const styles = StyleSheet.create({
  code: {
    flex: 1,
    flexGrow: 0,
    width: '100%',
    minHeight: 'auto',
    marginTop: '25%',
    marginBottom: '30%',
    flexDirection: 'row',
    justifyContent: 'space-evenly',
  },
  codeItem: {
    position: 'relative',
    flex: 1,
    minHeight: 32,
    justifyContent: 'center',
    alignItems: 'center',
  },
  codeItemBackground: {
    position: 'absolute',
    backgroundColor: theme.colors.neutral.line,
    borderRadius: 50,
    width: 24,
    height: 24,
  },
  codeItemText: {
    fontFamily: 'Mulish',
    fontSize: 32,
    lineHeight: 32,
    fontWeight: '700',
  },
});

interface VerificationCodeProps {
  code: string;
  codeLength: number;
}
