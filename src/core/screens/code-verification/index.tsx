import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { Text, View, StyleSheet, TouchableOpacity, TextInput, Vibration, Modal, Pressable } from 'react-native';
import { useSelector } from 'react-redux';
import { PhoneNumber } from 'libphonenumber-js/core';

import { VerificationCode } from '../../components/verification-code';
import { CodeVerificationProps } from '../../interfaces';
import { theme } from '../../theme';
import { RootState } from '../../redux/store';

export const CodeVerification = ({ navigation }: CodeVerificationProps) => {
  const isDefaultTheme = useSelector((state: RootState) => state.settings.isDefaultTheme);

  const phoneNumber: PhoneNumber | undefined = useSelector((state: RootState) => state.user.phoneNumber);
  const control = '543211';
  const [code, setCode] = useState<string>('');
  const [verified, setVerified] = useState<boolean>(false);
  const [modalVisible, setModalVisible] = useState<boolean>(false);
  const codeInput = useRef<TextInput>(null);

  const showModal = useCallback(() => {
    setModalVisible(true);
  }, []);

  const hideModal = useCallback(() => {
    setModalVisible(false);
  }, []);

  const handleTextBlur = useCallback(() => {
    codeInput.current?.focus();
  }, []);

  const onChangeTextHandler = useCallback((value: string) => {
    setCode(value);
  }, []);

  useEffect(() => {
    if (code === control) {
      setVerified(true);
    }

    if (code.length === control.length && code !== control) {
      Vibration.vibrate(100);
      setCode('');
      showModal();
      setTimeout(() => hideModal(), 3000);
    }
  }, [control, code, showModal, hideModal]);

  useEffect(() => {
    if (verified) {
      navigation.navigate('CreateProfile');
    }
  }, [verified, navigation]);

  const containerTheme = useMemo(
    () => ({
      backgroundColor: isDefaultTheme ? theme.colors.neutral.white : theme.colors.neutral.active,
    }),
    [isDefaultTheme]
  );

  const titleTextTheme = useMemo(
    () => ({
      color: isDefaultTheme ? theme.colors.neutral.active : theme.colors.neutral.offWhite,
    }),
    [isDefaultTheme]
  );

  const subtitleTextTheme = useMemo(
    () => ({
      color: isDefaultTheme ? theme.colors.neutral.active : theme.colors.neutral.offWhite,
    }),
    [isDefaultTheme]
  );

  const resendBtnTextTheme = useMemo(
    () => ({
      color: isDefaultTheme ? theme.colors.brandColor.default : theme.colors.neutral.offWhite,
    }),
    [isDefaultTheme]
  );

  const modalWindowTheme = useMemo(
    () => ({
      backgroundColor: isDefaultTheme ? theme.colors.neutral.white : theme.colors.neutral.dark,
    }),
    [isDefaultTheme]
  );

  const modalMessageTheme = useMemo(
    () => ({
      color: isDefaultTheme ? theme.colors.neutral.active : theme.colors.neutral.offWhite,
    }),
    [isDefaultTheme]
  );

  const modalBtnTextTheme = useMemo(
    () => ({
      color: isDefaultTheme ? theme.colors.neutral.active : theme.colors.neutral.offWhite,
    }),
    [isDefaultTheme]
  );

  const resendBtnHandler = () => {
    // eslint-disable-next-line no-console
    console.log('Resend Code');
  };

  return (
    <View style={[styles.container, containerTheme]}>
      <View style={styles.title}>
        <Text style={[styles.titleText, titleTextTheme]}>Enter Code</Text>
        <Text style={[styles.subtitleText, subtitleTextTheme]}>
          We have sent you an SMS with the code to {phoneNumber && phoneNumber.number}
        </Text>
      </View>
      <VerificationCode isDefaultTheme={isDefaultTheme} code={code} codeLength={control.length} />
      <TextInput
        autoFocus={true}
        keyboardType={'numeric'}
        maxLength={6}
        onChangeText={onChangeTextHandler}
        value={code}
        contextMenuHidden={true}
        style={styles.codeInput}
        ref={codeInput}
        onBlur={handleTextBlur}
      />
      <TouchableOpacity style={styles.resendBtn} onPress={resendBtnHandler}>
        <Text style={[styles.resendBtnText, resendBtnTextTheme]}>Resend Code</Text>
      </TouchableOpacity>
      <Modal visible={modalVisible} animationType="fade" transparent={true}>
        <View style={styles.modalContainer}>
          <View style={[styles.modalWindow, modalWindowTheme]}>
            <Text style={[styles.modalTitle]}>Error</Text>
            <Text style={[styles.modalMessage, modalMessageTheme]}>Wrong verification code</Text>
            <Pressable onPress={hideModal} style={styles.modalBtn}>
              <Text style={[styles.modalBtnText, modalBtnTextTheme]}>OK</Text>
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
    paddingHorizontal: 20,
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
