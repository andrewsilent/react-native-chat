import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { FlexStyle, ImageStyle } from 'react-native';
import { PhoneNumber } from 'libphonenumber-js/types';

export type RootStackParamList = {
  StartScreen: undefined;
  StepOne: undefined;
  CodeVerification: undefined;
  CreateProfile: undefined;
  Settings: undefined;
};

export type StartScreenProps = NativeStackScreenProps<RootStackParamList, 'StartScreen'>;
export type StepOneProps = NativeStackScreenProps<RootStackParamList, 'StepOne'>;
export type CodeVerificationProps = NativeStackScreenProps<RootStackParamList, 'CodeVerification'>;
export type CreateProfileProps = NativeStackScreenProps<RootStackParamList, 'CreateProfile'>;
export type SettingsProps = NativeStackScreenProps<RootStackParamList, 'Settings'>;

export interface User {
  firstName: string;
  lastName: string;
  phoneNumber: Partial<PhoneNumber>;
  userPhoto: UserPhoto | undefined;
}

export interface UserPhoto {
  height: number;
  width: number;
  localUri: string;
}

export interface SettingsMenuItem {
  id: number;
  title?: string;
  type: MenuItemType;
  iconStyles?: FlexStyle;
  imageStyles?: ImageStyle;
}

export const enum MenuItemType {
  menuItem = 'menuItem',
  dividerSpace = 'dividerSpace',
  dividerLine = 'dividerLine',
}
