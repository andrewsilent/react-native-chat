import { useSelector } from 'react-redux';
import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { FlatList, Modal, SafeAreaView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { CountryCallingCode, CountryCode, getCountryCallingCode } from 'libphonenumber-js';
import { isValidPhoneNumber, parsePhoneNumber } from 'libphonenumber-js/mobile';
import { E164Number, PhoneNumber } from 'libphonenumber-js/types';
import { countries } from 'country-flag-icons';
// @ts-ignore
import Flags from 'country-flag-icons/react/3x2';

import { theme } from '../../theme';
import { RootState } from '../../redux/store';

export const PhoneInputComponent = ({ isValid, setIsValid, setPhoneNumber }: PhoneInputProps) => {
  const isDefaultTheme = useSelector((state: RootState) => state.settings.isDefaultTheme);
  const [number, setNumber] = useState<string>('');
  const [nationalNumber, setNationalNumber] = useState<E164Number>('');
  const [country, setCountry] = useState<CountryCode>('UA');
  const [countryCallingCode, setCountryCallingCode] = useState<CountryCallingCode>('380');
  const [modalVisible, setModalVisible] = useState<boolean>(false);

  const phoneInput = useRef<TextInput>(null);

  const countryWrapperTheme = useMemo(
    () => ({
      backgroundColor: isDefaultTheme ? theme.colors.neutral.offWhite : theme.colors.neutral.dark,
    }),
    [isDefaultTheme]
  );

  const phoneWrapperTheme = useMemo(
    () => ({
      backgroundColor: isDefaultTheme ? theme.colors.neutral.offWhite : theme.colors.neutral.dark,
    }),
    [isDefaultTheme]
  );

  const countryTextTheme = useMemo(
    () => ({
      color: isDefaultTheme ? theme.colors.neutral.dark : theme.colors.neutral.offWhite,
    }),
    [isDefaultTheme]
  );

  const phoneInputTheme = useMemo(
    () => ({
      color: isDefaultTheme ? theme.colors.neutral.dark : theme.colors.neutral.offWhite,
    }),
    [isDefaultTheme]
  );

  const countryListTheme = useMemo(
    () => ({
      backgroundColor: isDefaultTheme ? theme.colors.neutral.offWhite : theme.colors.neutral.active,
    }),
    [isDefaultTheme]
  );

  const modalContainerTheme = useMemo(
    () => ({
      backgroundColor: isDefaultTheme ? theme.colors.neutral.offWhite : theme.colors.neutral.active,
    }),
    [isDefaultTheme]
  );

  const countryListItemTheme = useMemo(
    () => ({
      borderColor: isDefaultTheme ? theme.colors.neutral.line : theme.colors.neutral.dark,
    }),
    [isDefaultTheme]
  );

  const countryListItemTextTheme = useMemo(
    () => ({
      color: isDefaultTheme ? theme.colors.neutral.dark : theme.colors.neutral.offWhite,
    }),
    [isDefaultTheme]
  );

  useEffect(() => {
    setNumber(`+${countryCallingCode}${nationalNumber}`);
  }, [nationalNumber, countryCallingCode]);

  useEffect(() => {
    const countryCallingCode = getCountryCallingCode(country);

    if (countryCallingCode) {
      setCountryCallingCode(countryCallingCode);
    }
  }, [country]);

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
      //TODO why not working
      phoneInput.current?.focus();
    }
  }, [modalVisible, countryCallingCode]);

  const showModal = useCallback(() => {
    setModalVisible(true);
  }, []);

  const hideModal = useCallback(() => {
    setModalVisible(false);
  }, []);

  const selectCountry = useCallback(
    e => {
      const value = e.target.textContent;
      setCountry(value as CountryCode);
      hideModal();
      phoneInput.current?.focus();
    },
    [hideModal]
  );

  const onChangeTextHandler = useCallback(
    e => {
      const value: string = e.target.value;
      setNationalNumber(value);
    },
    [setNationalNumber]
  );

  const renderCountryItem = useCallback(
    ({ item, index }: { item: string; index: number }) => {
      //TODO check if countries.e is one of aliases of CountryCode
      //TODO why not working <Flag /> styles, only inline works
      const Flag = Flags[item];
      return (
        <TouchableOpacity key={index} onPress={selectCountry} style={[styles.countryListItem, countryListItemTheme]}>
          <Flag style={{ borderRadius: 8, height: 20, width: 30 }} />
          <Text style={[styles.countryListItemText, countryListItemTextTheme]}>{item}</Text>
        </TouchableOpacity>
      );
    },
    [selectCountry, countryListItemTheme, countryListItemTextTheme]
  );

  const SelectedFlag = useMemo(() => {
    if (!Flags[country]) {
      return;
    }
    return Flags[country];
  }, [country]);

  return (
    <>
      <View style={styles.container}>
        <TouchableOpacity style={[styles.countryWrapper, countryWrapperTheme]} onPress={showModal}>
          <SelectedFlag
            style={{
              height: 20,
              width: 30,
              marginRight: 8,
              borderRadius: 8,
            }}
          />
          <Text style={[styles.countryText, countryTextTheme]}>+{countryCallingCode}</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.phoneWrapper, phoneWrapperTheme]}>
          <TextInput
            autoFocus
            keyboardType="numeric"
            placeholder="Phone number"
            placeholderTextColor={theme.colors.neutral.disabled}
            ref={phoneInput}
            onChange={onChangeTextHandler}
            style={[styles.phoneInput, phoneInputTheme]}
          />
        </TouchableOpacity>
      </View>
      {/*//TODO move modal to extra component */}
      <Modal visible={modalVisible} animationType="fade">
        <SafeAreaView style={[styles.modalContainer, modalContainerTheme]}>
          <FlatList data={countries} renderItem={renderCountryItem} style={[styles.countryList, countryListTheme]} />
        </SafeAreaView>
      </Modal>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'stretch',
  },
  phoneWrapper: {
    flex: 1,
    justifyContent: 'space-between',
    alignItems: 'stretch',
    backgroundColor: theme.colors.neutral.offWhite,
  },
  phoneInput: {
    fontFamily: 'Mulish',
    fontSize: 14,
    lineHeight: 24,
    fontWeight: '600',
    padding: 8,
    borderRadius: 4,
  },
  modalContainer: {
    flex: 1,
  },
  countryList: {
    paddingHorizontal: 24,
    paddingBottom: 36,
  },
  countryWrapper: {
    flex: 1,
    flexGrow: 0,
    flexBasis: 'auto',
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
    overflow: 'hidden',
    marginRight: 8,
    padding: 8,
    borderRadius: 4,
  },
  countryText: {
    fontFamily: 'Mulish',
    fontSize: 14,
    lineHeight: 24,
    fontWeight: '600',
    color: theme.colors.neutral.disabled,
  },
  countryListItem: {
    flex: 1,
    alignItems: 'center',
    flexDirection: 'row',
    padding: 8,
    borderBottomWidth: 1,
  },
  countryListItemText: {
    fontFamily: 'Mulish',
    fontSize: 14,
    lineHeight: 24,
    fontWeight: '400',
    paddingHorizontal: 8,
  },
});

interface PhoneInputProps {
  isValid: boolean;
  phoneNumber: Partial<PhoneNumber> | undefined;
  setIsValid: (value: boolean) => void;
  setPhoneNumber: (value: Partial<PhoneNumber>) => void;
}
