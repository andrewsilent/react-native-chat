import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { Text, View, Keyboard, StyleSheet } from 'react-native';
import PhoneInput from 'react-native-phone-number-input';

import { PrimaryButton } from '../../components/buttons/primary';
import { theme } from '../../theme';

export const StepOne = ({ isDefaultTheme, navigation, setPhoneNumber }: StepOneProps) => {
  const phoneInput = useRef<PhoneInput>();
  const [isValid, setIsValid] = useState(false);

  useEffect(() => {
    if (isValid) {
      Keyboard.dismiss();
    }
  }, [isValid]);

  const isDisabled = useMemo(() => !isValid, [isValid]);

  const containerTheme = useMemo(() => ({
    backgroundColor: isDefaultTheme ? theme.colors.neutral.white : theme.colors.neutral.active,
  }), [isDefaultTheme]);

  const titleTextTheme = useMemo(() => ({
    color: isDefaultTheme ? theme.colors.neutral.active : theme.colors.neutral.offWhite,
  }), [isDefaultTheme]);

  const subtitleTextTheme = useMemo(() => ({
    color: isDefaultTheme ? theme.colors.neutral.active : theme.colors.neutral.offWhite,
  }), [isDefaultTheme]);

  const onPressHandler = useCallback(() => {
    setPhoneNumber({
      code: phoneInput.current?.state.code || '',
      number: phoneInput.current?.state.number || '',
    });
    navigation.navigate('CodeVerification');
  }, [navigation, setPhoneNumber]);

  return (
    <View style={[styles.container, containerTheme]}>
      <View style={styles.title}>
        <Text style={[styles.titleText, titleTextTheme]}>
          Enter Your Phone Number
        </Text>
        <Text style={[styles.subtitleText, subtitleTextTheme]}>
          Please confirm your country code and enter your phone number
        </Text>
      </View>
      <View style={styles.phone}>
        <PhoneInput
          ref={phoneInput}
          defaultCode='UA'
          autoFocus
          onChangeText={(text) => {
            setIsValid(phoneInput.current?.isValidNumber(text) || false);
          }}
          disableArrowIcon={true}
          placeholder='Phone Number'
          containerStyle={{
            backgroundColor: isDefaultTheme ? theme.colors.neutral.offWhite : theme.colors.neutral.dark,
          }}
          flagButtonStyle={{
            backgroundColor: isDefaultTheme ? theme.colors.neutral.offWhite : theme.colors.neutral.dark,
          }}
          countryPickerButtonStyle={{
            width: 60,
            padding: 0,
            borderTopLeftRadius: 4,
            borderBottomLeftRadius: 4,
          }}
          textContainerStyle={{
            padding: 0,
            overflow: 'hidden',
            backgroundColor: isDefaultTheme ? theme.colors.neutral.white : theme.colors.neutral.active,
          }}
          codeTextStyle={{
            marginRight: 0,
            backgroundColor: isDefaultTheme ? theme.colors.neutral.offWhite : theme.colors.neutral.dark,
            color: theme.colors.neutral.disabled,
            fontSize: 14,
            fontWeight: '600',
            padding: 8,
            borderTopRightRadius: 4,
            borderBottomRightRadius: 4,
          }}
          textInputStyle={{
            marginRight: 0,
            backgroundColor: isDefaultTheme ? theme.colors.neutral.offWhite : theme.colors.neutral.dark,
            width: '100%',
          }}
          textInputProps={{
            placeholderTextColor: theme.colors.neutral.disabled, keyboardType: 'numeric', style: {
              marginLeft: 10,
              width: '100%',
              borderRadius: 4,
              fontFamily: 'Mulish',
              fontSize: 14,
              textAlignVertical: 'top',
              fontWeight: '600',
              padding: 8,
              color: theme.colors.neutral.disabled,
              backgroundColor: isDefaultTheme ? theme.colors.neutral.offWhite : theme.colors.neutral.dark,
            },
          }}
        />
      </View>
      <PrimaryButton
        isDefaultTheme={isDefaultTheme}
        text={'Continue'}
        navigation={navigation}
        isDisabled={isDisabled}
        onPressHandler={onPressHandler}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-start',
    paddingHorizontal: 24,
    paddingBottom: 36,
  },
  title: {
    marginTop: 60,
  },
  titleText: {
    fontFamily: 'Mulish',
    fontSize: 24,
    fontWeight: '700',
    textAlign: 'center',
  },
  subtitleText: {
    fontFamily: 'Mulish',
    fontSize: 14,
    lineHeight: 24,
    textAlign: 'center',
    marginTop: 8,
  },
  phone: {
    marginTop: 30,
    marginBottom: 30,
  },
});

interface StepOneProps {
  navigation: object;
  isDefaultTheme: boolean;
  setPhoneNumber: Function;
}