import React, { useEffect, useMemo, useRef, useState } from 'react';
import { Text, View, StyleSheet, TouchableOpacity, TextInput, Vibration, Modal, Pressable } from 'react-native';

import { VerificationCode } from '../../components/verification-code';
import { PhoneNumber } from '../../interfaces';
import { theme } from '../../theme';

export const CodeVerification = ({ navigation, isDefaultTheme, phoneNumber }: CodeVerificationProps) => {
  const control = '543211';
  const [code, setCode] = useState('');
  const [verified, setVerified] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const codeInput = useRef('');

  useEffect(() => {
    if (code === control) {
      setVerified(true);
    }

    if (code.length === control.length) {
      Vibration.vibrate(100);
      setCode('');
      setModalVisible(true);
      setTimeout(() => setModalVisible(false), 3000);
    }
  }, [control, code]);

  useEffect(() => {
    if (verified) {
      navigation.navigate('Start');
    }
  }, [verified]);

  const containerTheme = useMemo(() => ({
    backgroundColor: isDefaultTheme ? theme.colors.neutral.white : theme.colors.neutral.active,
  }), [isDefaultTheme]);

  const titleTextTheme = useMemo(() => ({
    color: isDefaultTheme ? theme.colors.neutral.active : theme.colors.neutral.offWhite,
  }), [isDefaultTheme]);

  const subtitleTextTheme = useMemo(() => ({
    color: isDefaultTheme ? theme.colors.neutral.active : theme.colors.neutral.offWhite,
  }), [isDefaultTheme]);

  const resendBtnTextTheme = useMemo(() => ({
    color: isDefaultTheme ? theme.colors.brandColor.default : theme.colors.neutral.offWhite,
  }), [isDefaultTheme]);

  const modalWindowTheme = useMemo(() => ({
    backgroundColor: isDefaultTheme ? theme.colors.neutral.white : theme.colors.neutral.dark,
  }), [isDefaultTheme]);

  const modalMessageTheme = useMemo(() => ({
    color: isDefaultTheme ? theme.colors.neutral.active : theme.colors.neutral.offWhite,
  }), [isDefaultTheme]);

  const modalBtnTextTheme = useMemo(() => ({
    color: isDefaultTheme ? theme.colors.neutral.active : theme.colors.neutral.offWhite,
  }), [isDefaultTheme]);

  const resendBtnHandler = () => {
    console.log('Resend Code');
  };

  return (
    <View style={[styles.container, containerTheme]}>
      <View style={styles.title}>
        <Text style={[styles.titleText, titleTextTheme]}>
          Enter Code
        </Text>
        <Text
          style={[styles.subtitleText, subtitleTextTheme]}>
          We have sent you an SMS with the code to +{phoneNumber.code} {phoneNumber.number}
        </Text>
      </View>
      <VerificationCode
        isDefaultTheme={isDefaultTheme}
        code={code}
        codeLength={control.length}
      />
      <TextInput
        autoFocus={true}
        keyboardType={'numeric'}
        maxLength={6}
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
      <Modal
        visible={modalVisible}
        animationType="fade"
        transparent={true}
        RequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={[styles.modalWindow, modalWindowTheme]}>
            <Text style={[styles.modalTitle]}>
              Error
            </Text>
            <Text style={[styles.modalMessage, modalMessageTheme]}>
              Wrong verification code
            </Text>
            <Pressable
              onPress={() => setModalVisible(false)}
              style={styles.modalBtn}
            >
              <Text style={[styles.modalBtnText, modalBtnTextTheme]}>
                OK
              </Text>
            </Pressable>
          </View>
        </View>
      </Modal>
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
    position: 'relative',
  },
  title: {
    marginTop: 60,
  },
  titleText: {
    textAlign: 'center',
    fontFamily: 'Mulish',
    fontSize: 24,
    fontWeight: '700',
  },
  subtitleText: {
    textAlign: 'center',
    fontFamily: 'Mulish',
    fontSize: 14,
    lineHeight: 24,
    marginTop: 8,
  },
  codeInput: {
    position: 'absolute',
    width: 0,
    height: 0,
  },
  resendBtn: {},
  resendBtnText: {
    textAlign: 'center',
    fontFamily: 'Mulish',
    fontSize: 16,
    lineHeight: 28,
    fontWeight: '600',
    paddingHorizontal: 14,
    paddingVertical: 8,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignSelf: 'center',
    height: '100%',
    width: '100%',
  },
  modalWindow: {
    width: 300,
    flex: 1,
    flexGrow: 0,
    flexBasis: 'auto',
    justifyContent: 'center',
    alignSelf: 'center',
    borderRadius: 4,
    overflow: 'hidden',
    shadowColor: theme.colors.neutral.dark,
    shadowOpacity: 0.5,
    shadowRadius: 10,
    elevation: 20,
    shadowOffset: {
      width: 0,
      height: 2,
    },
  },
  modalTitle: {
    width: '100%',
    fontFamily: 'Mulish',
    fontSize: 16,
    paddingVertical: 10,
    paddingHorizontal: 20,
    backgroundColor: theme.colors.accent.danger,
    color: theme.colors.neutral.white,
  },
  modalMessage: {
    height: '100%',
    fontFamily: 'Mulish',
    fontSize: 16,
    marginTop: 24,
    marginBottom: 20,
    paddingHorizontal: 20
  },
  modalBtn: {
    width: '100%',
  },
  modalBtnText: {
    fontFamily: 'Mulish',
    fontSize: 20,
    marginTop: 12,
    padding: 12,
    textAlign: 'center',
    borderTopWidth: 1,
    borderColor: theme.colors.neutral.line,
  },
});

interface CodeVerificationProps {
  navigation: object;
  isDefaultTheme: boolean;
  phoneNumber: PhoneNumber;
}