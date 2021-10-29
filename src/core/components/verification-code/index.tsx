import React, { useCallback, useMemo } from 'react';
import { Text, View, StyleSheet } from 'react-native';

import { theme } from '../../theme';

export const VerificationCode = ({ isDefaultTheme, code }: VerificationCodeProps) => {
  const backgroundColor = useCallback((id: number) => ({
    backgroundColor: code[id]
      ? 'transparent'
      : isDefaultTheme
        ? theme.colors.neutral.offWhite
        : theme.colors.neutral.dark,
  }), [code]);

  const codeItemTextTheme = useMemo(() => ({
    color: isDefaultTheme ? theme.colors.neutral.active : theme.colors.neutral.offWhite,
  }), [isDefaultTheme]);

  return (
    <View style={styles.code}>
      <View style={[styles.codeItem, backgroundColor(0)]}>
        <Text style={[styles.codeItemText, codeItemTextTheme]}>{code[0]}</Text>
      </View>
      <View style={[styles.codeItem, backgroundColor(1)]}>
        <Text style={[styles.codeItemText, codeItemTextTheme]}>{code[1]}</Text>
      </View>
      <View style={[styles.codeItem, backgroundColor(2)]}>
        <Text style={[styles.codeItemText, codeItemTextTheme]}>{code[2]}</Text>
      </View>
      <View style={[styles.codeItem, backgroundColor(3)]}>
        <Text style={[styles.codeItemText, codeItemTextTheme]}>{code[3]}</Text>
      </View>
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
    backgroundColor: theme.colors.neutral.line,
    borderRadius: 50,
    width: 24,
    height: 24,
    textAlign: 'center',
    alignSelf: 'center',
    position: 'relative',
  },
  codeItemText: {
    fontFamily: 'Mulish',
    fontSize: 32,
    fontWeight: 700,
    top: '50%',
    left: '50%',
    position: 'absolute',
    transform: [
      { translateY: '-50%' },
      { translateX: '-50%' },
    ],
  },
});

interface VerificationCodeProps {
  isDefaultTheme: boolean;
  code: string;
}