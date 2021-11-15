import { useSelector } from 'react-redux';
import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { isValidPhoneNumber, parsePhoneNumber } from 'libphonenumber-js/mobile';
import { PhoneNumber } from 'libphonenumber-js/types';
import CountryPicker, { Country, CountryCode } from 'react-native-country-picker-modal';
import { CallingCode } from 'react-native-country-picker-modal/lib/types';

import { theme } from '../../theme';
import { RootState } from '../../redux/store';

export const PhoneInput = ({ isValid, setIsValid, setPhoneNumber }: PhoneInputProps) => {
  const isDefaultTheme = useSelector((state: RootState) => state.settings.isDefaultTheme);
  const [number, setNumber] = useState<string>('');
  const [nationalNumber, setNationalNumber] = useState<string>('');
  const [countryCode, setCountryCode] = useState<CountryCode>('UA');
  const [countryCallingCode, setCountryCallingCode] = useState<CallingCode>('380');
  const [modalVisible, setModalVisible] = useState<boolean>(false);

  const phoneInput = useRef<TextInput>(null);

  const colorTheme = useMemo(
    () => ({
      color: isDefaultTheme ? theme.colors.neutral.dark : theme.colors.neutral.offWhite,
    }),
    [isDefaultTheme]
  );

  const backgroundColorTheme = useMemo(
    () => ({
      backgroundColor: isDefaultTheme ? theme.colors.neutral.offWhite : theme.colors.neutral.dark,
    }),
    [isDefaultTheme]
  );

  useEffect(() => {
    setNumber(`+${countryCallingCode}${nationalNumber}`);
  }, [nationalNumber, countryCallingCode]);

  useEffect(() => {
    if (isValid) {
      let phoneNumberRaw = parsePhoneNumber(number);

      setPhoneNumber({
        number: phoneNumberRaw?.number,
        country: phoneNumberRaw?.country,
        nationalNumber: phoneNumberRaw?.nationalNumber,
        countryCallingCode: phoneNumberRaw?.countryCallingCode,
      });
    }
  }, [number, isValid, setPhoneNumber]);

  useEffect(() => {
    if (number) {
      setIsValid(isValidPhoneNumber(number));
    }
  }, [number, setIsValid]);

  useEffect(() => {
    if (!modalVisible && !phoneInput.current?.isFocused()) {
      phoneInput.current?.focus();
    }
  }, [modalVisible, countryCallingCode]);

  const showModal = useCallback(() => {
    setModalVisible(true);
  }, []);

  const hideModal = useCallback(() => {
    setModalVisible(false);
  }, []);

  const onSelect = useCallback(
    (country: Country) => {
      setCountryCode(country.cca2);
      setCountryCallingCode(country.callingCode[0]);
      hideModal();
      phoneInput.current?.focus();
    },
    [hideModal]
  );

  const onChangeTextHandler = useCallback(
    ({ nativeEvent: { text } }) => {
      setNationalNumber(text);
      setNumber(`+${countryCallingCode}${text}`);
    },
    [countryCallingCode]
  );

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.countryWrapper} onPress={showModal}>
        <CountryPicker
          countryCode={countryCode}
          onSelect={onSelect}
          withFilter
          withFlag
          withAlphaFilter
          visible={modalVisible}
          containerButtonStyle={[styles.countryPicker, backgroundColorTheme]}
        />
      </TouchableOpacity>
      <TouchableOpacity style={styles.countryWrapper} onPress={showModal}>
        <Text style={[styles.countryText, backgroundColorTheme, colorTheme]}>+{countryCallingCode}</Text>
      </TouchableOpacity>
      <View style={[styles.phoneWrapper, backgroundColorTheme]}>
        <TextInput
          autoFocus
          keyboardType="numeric"
          placeholder="Phone number"
          placeholderTextColor={theme.colors.neutral.disabled}
          ref={phoneInput}
          onChange={onChangeTextHandler}
          value={nationalNumber}
          style={[styles.phoneInput, colorTheme]}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'stretch',
    width: '100%',
  },
  countryWrapper: {
    flexGrow: 0,
    flexBasis: 'auto',
    alignSelf: 'stretch',
  },
  countryPicker: {
    height: '100%',
    borderTopLeftRadius: 4,
    borderBottomLeftRadius: 4,
  },
  countryText: {
    fontFamily: 'Mulish',
    fontSize: 14,
    lineHeight: 24,
    fontWeight: '600',
    padding: 8,
    borderTopRightRadius: 4,
    borderBottomRightRadius: 4,
  },
  phoneWrapper: {
    flexGrow: 1,
    flexBasis: 'auto',
    alignSelf: 'stretch',
    borderRadius: 4,
    overflow: 'hidden',
    marginLeft: 8,
  },
  phoneInput: {
    fontFamily: 'Mulish',
    fontSize: 14,
    fontWeight: '600',
    padding: 8,
    height: '100%',
    width: '100%',
  },
});

interface PhoneInputProps {
  isValid: boolean;
  phoneNumber: Partial<PhoneNumber> | undefined;
  setIsValid: (value: boolean) => void;
  setPhoneNumber: (value: Partial<PhoneNumber>) => void;
}
