import React, { useCallback, useContext, useEffect, useMemo, useState } from 'react';
import { Text, View, Keyboard, StyleSheet } from 'react-native';
import PhoneInput, {
  isValidPhoneNumber,
  parsePhoneNumber,
  getCountryCallingCode,
} from 'react-phone-number-input/mobile';
import { PhoneNumber } from 'libphonenumber-js/core';
import { ReactReduxContext, useSelector } from 'react-redux';
import Input from 'react-phone-number-input/input';

import { PrimaryButton } from '../../components/buttons/primary';
import { theme } from '../../theme';
import { user } from '../../redux/reducers/user_reducer';
import { RootState } from '../../redux/store';
import { StepOneProps } from '../../interfaces';

export const StepOne = ({ navigation }: StepOneProps) => {
  const isDefaultTheme = useSelector((state: RootState) => state.settings.isDefaultTheme);
  const [isValid, setIsValid] = useState(false);
  const [number, setNumber] = useState<string>('');
  const [phoneNumber, setPhoneNumber] = useState<PhoneNumber>();
  const {
    store: { dispatch },
  } = useContext(ReactReduxContext);

  useEffect(() => {
    if (isValid) {
      Keyboard.dismiss();
    }
  }, [isValid]);

  useEffect(() => {
    setPhoneNumber(parsePhoneNumber(number));
  }, []);

  const isDisabled = useMemo(() => !isValid, [isValid]);

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

  const onPressHandler = useCallback(() => {
    dispatch(user.actions.setPhoneNumber(phoneNumber));
    navigation.navigate('CodeVerification');
  }, [dispatch, navigation, phoneNumber]);

  return (
    <View style={[styles.container, containerTheme]}>
      <View style={styles.title}>
        <Text style={[styles.titleText, titleTextTheme]}>Enter Your Phone Number</Text>
        <Text style={[styles.subtitleText, subtitleTextTheme]}>
          Please confirm your country code and enter your phone number
        </Text>
      </View>
      <View style={styles.phone}>
        <PhoneInput
          autoFocus
          international
          value={number}
          defaultCountry="UA"
          placeholder="Phone number"
          onChange={value => {
            if (value) {
              setNumber(value as string);
              setPhoneNumber(parsePhoneNumber(value as string));
              setIsValid(isValidPhoneNumber(value as string | ''));
            }
          }}
        />
        <Input
          style={{ display: 'none' }}
          disabled
          onChange={value => value}
          value={getCountryCallingCode(phoneNumber?.country || 'UA')}
          // flagComponent={{ country: 'UA', countryName: 'Ukraine' }}
        />
        <Input
          style={{ display: 'none' }}
          autoFocus
          international
          value={number}
          defaultCountry="UA"
          placeholder="Phone number"
          onChange={value => {
            if (value) {
              setNumber(value as string);
              setPhoneNumber(parsePhoneNumber(value as string));
              setIsValid(isValidPhoneNumber(value as string | ''));
            }
          }}
        />
      </View>
      <PrimaryButton text={'Continue'} isDisabled={isDisabled} onPressHandler={onPressHandler} />
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
