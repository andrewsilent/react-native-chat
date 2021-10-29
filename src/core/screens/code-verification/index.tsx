import React, { useEffect, useRef, useState } from 'react';
import { Text, View, StyleSheet, TouchableOpacity, TextInput } from 'react-native';

import { VerificationCode } from '../../components/verification-code';
import { PhoneNumber } from '../../interfaces';
import { theme } from '../../theme';

export const CodeVerification = ({ navigation, isDefaultTheme, phoneNumber }: CodeVerificationProps) => {
  const control = '5432';
  const example = '';
  const [code, setCode] = useState('');
  const [verified, setVerified] = useState(false);
  const codeInput = useRef('');

  useEffect(() => {
    setCode(example);
  }, []);

  useEffect(() => {
    if (code === control) {
      setVerified(true);
    }
  }, [control, code]);

  useEffect(() => {
    if (verified) {
      navigation.navigate('Start');
    }
  }, [verified]);

  const resendBtnTextTheme = {
    color: isDefaultTheme ? theme.colors.brandColor.default : theme.colors.neutral.offWhite,
  };

  const resendBtnHandler = () => {
    console.log('Resend Code');
  };

  return (
    <View style={[styles.container, isDefaultTheme ? styles.containerLight : styles.containerDark]}>
      <View style={styles.title}>
        <Text style={[styles.titleText, isDefaultTheme ? styles.titleTextLight : styles.titleTextDark]}>
          Enter Code
        </Text>
        <Text style={[styles.subtitleText, isDefaultTheme ? styles.subtitleTextLight : styles.subtitleTextDark]}>
          We have sent you an SMS with the code to +{phoneNumber.code} {phoneNumber.number}
        </Text>
      </View>
      <VerificationCode
        isDefaultTheme={isDefaultTheme}
        code={code}
      />
      <TextInput
        autoFocus={true}
        keyboardType={'numeric'}
        maxLength={4}
        onChangeText={text => {
          setCode(text);
        }}
        value={code}
        contextMenuHidden={true}
        style={styles.codeInput}
        ref={codeInput}
        onBlur={() => codeInput.current.focus()}
      />
      <TouchableOpacity style={styles.resendBtn} onPress={resendBtnHandler}>
        <Text style={[styles.resendBtnText, resendBtnTextTheme]}>
          Resend Code
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    paddingHorizontal: 24,
    paddingBottom: 36,
  },
  containerLight: {
    backgroundColor: theme.colors.neutral.white,
  },
  containerDark: {
    backgroundColor: theme.colors.neutral.active,
  },
  title: {
    textAlign: 'center',
    marginTop: 60,
  },
  titleText: {
    fontFamily: 'Mulish',
    fontSize: 24,
    fontWeight: '700',
  },
  titleTextLight: {
    color: theme.colors.neutral.active,
  },
  titleTextDark: {
    color: theme.colors.neutral.offWhite,
  },
  subtitleText: {
    fontFamily: 'Mulish',
    fontSize: 14,
    lineHeight: 24,
    marginTop: 8,
  },
  subtitleTextLight: {
    color: theme.colors.neutral.active,
  },
  subtitleTextDark: {
    color: theme.colors.neutral.offWhite,
  },
  codeInput: {
    position: 'absolute',
    width: 0,
    height: 0,
  },
  resendBtn: {},
  resendBtnText: {
    fontFamily: 'Mulish',
    fontSize: 16,
    lineHeight: 28,
    fontWeight: 600,
    paddingHorizontal: 14,
    paddingVertical: 8,
  },
});

interface CodeVerificationProps {
  navigation: object;
  isDefaultTheme: boolean;
  phoneNumber: PhoneNumber;
}