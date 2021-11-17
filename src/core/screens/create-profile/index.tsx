import React, { useCallback, useContext, useEffect, useMemo, useState } from 'react';
import { View, StyleSheet, TextInput, Pressable, Modal, Text } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { ReactReduxContext, useSelector } from 'react-redux';

import { PrimaryButton } from '../../components/buttons/primary';
import { theme } from '../../theme';
import { UserCreateAvatar } from '../../components/user-create-avatar';
import { user } from '../../redux/reducers/user_reducer';
import { CreateProfileProps, UserPhoto } from '../../interfaces';
import { RootState } from '../../redux/store';
import { formatUserName, validateByRegexp } from '../../utils';

export const CreateProfile = ({ navigation }: CreateProfileProps) => {
  const isDefaultTheme = useSelector((state: RootState) => state.settings.isDefaultTheme);

  const [firstName, setFirstName] = useState<string>('');
  const [lastName, setLastName] = useState<string>('');
  const [isValidFirstName, setIsValidFirstName] = useState<number>(0);
  const [isValidLastName, setIsValidLastName] = useState<number>(0);
  const [userPhoto, setUserPhoto] = useState<UserPhoto>();
  const [modalVisible, setModalVisible] = useState<boolean>(false);

  const {
    store: { dispatch },
  } = useContext(ReactReduxContext);

  const usernameInputTheme = useMemo(
    () => ({
      backgroundColor: isDefaultTheme ? theme.colors.neutral.offWhite : theme.colors.neutral.dark,
      color: isDefaultTheme ? theme.colors.neutral.active : theme.colors.neutral.offWhite,
    }),
    [isDefaultTheme]
  );

  const firstNameStateTheme = useMemo(
    () => ({
      borderColor:
        isValidFirstName === 0
          ? 'transparent'
          : isValidFirstName === 1
          ? theme.colors.accent.success
          : theme.colors.accent.danger,
    }),
    [isValidFirstName]
  );

  const lastNameStateTheme = useMemo(
    () => ({
      borderColor:
        isValidLastName === 0
          ? 'transparent'
          : isValidLastName === 1
          ? theme.colors.accent.success
          : theme.colors.accent.danger,
    }),
    [isValidLastName]
  );

  const containerTheme = useMemo(
    () => ({
      backgroundColor: isDefaultTheme ? theme.colors.neutral.white : theme.colors.neutral.active,
    }),
    [isDefaultTheme]
  );

  const modalContainerTheme = useMemo(
    () => ({
      backgroundColor: isDefaultTheme ? 'rgba(0,0,0,0.25)' : 'rgba(255,255,255,0.15)',
    }),
    [isDefaultTheme]
  );

  const modalItemTextTheme = useMemo(
    () => ({
      backgroundColor: isDefaultTheme ? theme.colors.neutral.white : theme.colors.neutral.active,
      color: isDefaultTheme ? theme.colors.neutral.active : theme.colors.neutral.line,
    }),
    [isDefaultTheme]
  );

  const modalItemDivider = useMemo(
    () => ({
      borderBottomColor: isDefaultTheme ? theme.colors.neutral.line : theme.colors.neutral.dark,
      borderBottomWidth: 1,
    }),
    [isDefaultTheme]
  );

  useEffect(() => {
    setIsValidFirstName(0);
  }, [firstName]);

  useEffect(() => {
    setIsValidLastName(0);
  }, [lastName]);

  const showModal = useCallback(() => {
    setModalVisible(true);
  }, []);

  const hideModal = useCallback(() => {
    setModalVisible(false);
  }, []);

  const onChangeFirstName = useCallback((value: string) => {
    setFirstName(value ? formatUserName(value) : '');
  }, []);

  const onChangeLastName = useCallback((value: string) => {
    setLastName(value ? formatUserName(value) : '');
  }, []);

  const onPressHandler = useCallback(() => {
    const firstNamePattern = /^[a-zA-Z]{3,16}$/;
    const lastNamePattern = /^[a-zA-Z]{0,20}$/;

    const firstNameLocalState = validateByRegexp(firstName, firstNamePattern);
    const lastNameLocalState = validateByRegexp(lastName, lastNamePattern);

    validateByRegexp(firstName, firstNamePattern) ? setIsValidFirstName(1) : setIsValidFirstName(2);

    lastName
      ? validateByRegexp(lastName, lastNamePattern)
        ? setIsValidLastName(1)
        : setIsValidLastName(2)
      : setIsValidLastName(0);

    if (firstNameLocalState && lastNameLocalState) {
      dispatch(
        user.actions.changeUserInfo({
          firstName,
          lastName,
          userPhoto,
        })
      );
      navigation.navigate('Settings');
    }
  }, [firstName, lastName, userPhoto, dispatch, navigation]);

  const shootPhotoAsync = async () => {
    const permissionResult = await ImagePicker.requestCameraPermissionsAsync();

    if (!permissionResult.granted) {
      alert('Permission to access camera roll is required!');
      return;
    }

    const shootResult = await ImagePicker.launchCameraAsync();
    if (shootResult.cancelled) {
      return;
    }

    return {
      localUri: shootResult.uri,
      height: shootResult.height,
      width: shootResult.width,
    };
  };

  const openImagePickerAsync = async () => {
    const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (!permissionResult.granted) {
      alert('Permission to access camera roll is required!');
      return;
    }

    const pickerResult = await ImagePicker.launchImageLibraryAsync();
    if (pickerResult.cancelled) {
      return;
    }

    return {
      localUri: pickerResult.uri,
      height: pickerResult.height,
      width: pickerResult.width,
    };
  };

  const shootPhotoHandler = useCallback(async () => {
    hideModal();
    const image = await shootPhotoAsync();
    if (image) {
      setUserPhoto(image);
    }
  }, [hideModal]);

  const openImagePickerHandler = useCallback(async () => {
    hideModal();
    const image = await openImagePickerAsync();
    if (image) {
      setUserPhoto(image);
    }
  }, [hideModal]);

  return (
    <View style={[styles.container, containerTheme]}>
      <View style={styles.avatarWrapper}>
        <UserCreateAvatar onAddPress={showModal} avatar={userPhoto} />
      </View>
      <View style={styles.inputWrapper}>
        <TextInput
          value={firstName}
          onChangeText={onChangeFirstName}
          placeholder="First Name (Required)"
          placeholderTextColor={theme.colors.neutral.disabled}
          style={[styles.usernameInput, usernameInputTheme, firstNameStateTheme]}
        />
        <TextInput
          value={lastName}
          onChangeText={onChangeLastName}
          placeholder="Last Name (Optional)"
          placeholderTextColor={theme.colors.neutral.disabled}
          style={[styles.usernameInput, usernameInputTheme, lastNameStateTheme]}
        />
      </View>
      <PrimaryButton onPressHandler={onPressHandler} text={'Save'} />
      <Modal visible={modalVisible} animationType="fade" transparent={true}>
        <Pressable onPress={hideModal} style={[styles.modalContainer, modalContainerTheme]}>
          <View style={styles.modalWindow}>
            <Pressable style={[styles.modalWindowButton, modalItemDivider]} onPress={shootPhotoHandler}>
              <Text style={[styles.modalItemText, modalItemTextTheme]}>Choose from gallery</Text>
            </Pressable>
            <Pressable style={styles.modalWindowButton} onPress={openImagePickerHandler}>
              <Text style={[styles.modalItemText, modalItemTextTheme]}>Take a photo</Text>
            </Pressable>
          </View>
        </Pressable>
      </Modal>
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
  avatarWrapper: {
    width: '100%',
    minHeight: 100,
    marginTop: 46,
    flex: 1,
    flexGrow: 0,
    flexBasis: 'auto',
    justifyContent: 'center',
    alignItems: 'center',
  },
  inputWrapper: {
    width: '100%',
    marginTop: 30,
    marginBottom: 60,
  },
  usernameInput: {
    fontFamily: 'Mulish',
    fontSize: 14,
    fontWeight: '600',
    width: '100%',
    padding: 8,
    marginBottom: 12,
    borderColor: 'transparent',
    borderStyle: 'solid',
    borderWidth: 1,
    borderRadius: 4,
  },
  valid: {
    borderColor: theme.colors.accent.success,
  },
  invalid: {
    borderColor: theme.colors.accent.danger,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignSelf: 'center',
    height: '100%',
    width: '100%',
  },
  modalWindow: {
    flex: 1,
    justifyContent: 'center',
    borderRadius: 4,
    shadowColor: theme.colors.neutral.dark,
    marginHorizontal: '20%',
    shadowOpacity: 0.5,
    shadowRadius: 10,
    elevation: 20,
    shadowOffset: {
      width: 0,
      height: 2,
    },
  },
  modalWindowButton: {
    borderBottomWidth: 1,
    borderStyle: 'solid',
    borderBottomColor: '#999',
  },
  modalItemText: {
    fontSize: 16,
    padding: 16,
  },
});
