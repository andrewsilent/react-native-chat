import { NativeStackScreenProps } from '@react-navigation/native-stack';

export type RootStackParamList = {
  StartScreen: undefined;
  StepOne: undefined;
  CodeVerification: undefined;
  CreateProfile: undefined;
};

export type StartScreenProps = NativeStackScreenProps<RootStackParamList, 'StartScreen'>;
export type StepOneProps = NativeStackScreenProps<RootStackParamList, 'StepOne'>;
export type CodeVerificationProps = NativeStackScreenProps<RootStackParamList, 'CodeVerification'>;
export type CreateProfileProps = NativeStackScreenProps<RootStackParamList, 'CreateProfile'>;

export interface UserPhoto {
  height?: number;
  width?: number;
  localUri?: string;
}
