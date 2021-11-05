import React, { useCallback, useMemo } from 'react';
import { Text, View, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import start from '../../assets/start.png';
import startDark from '../../assets/start-dark.png';
import { PrimaryButton } from '../../components/buttons/primary';
import { theme } from '../../theme';

export const StartScreen = ({ isDefaultTheme }: StartScreenProps) => {
  const navigation = useNavigation();

  const containerTheme = useMemo(
    () => ({ backgroundColor: isDefaultTheme ? theme.colors.neutral.white : theme.colors.neutral.active }),
    [isDefaultTheme]
  );

  const startTextTheme = useMemo(
    () => ({
      color: isDefaultTheme ? theme.colors.neutral.active : theme.colors.neutral.offWhite,
    }),
    [isDefaultTheme]
  );

  const termsBtnTextTheme = useMemo(
    () => ({
      color: isDefaultTheme ? theme.colors.neutral.active : theme.colors.neutral.offWhite,
    }),
    [isDefaultTheme]
  );

  const termsBtnHandler = useCallback(() => {
    // eslint-disable-next-line no-console
    console.log('Terms & Privacy Policy');
  }, []);

  const onPressHandler = useCallback(() => {
    navigation.navigate('StepOne');
  }, [navigation]);

  return (
    <View style={[styles.container, containerTheme]}>
      <Image source={isDefaultTheme ? start : startDark} style={styles.startImg} />
      <Text style={[styles.startText, startTextTheme]}>Connect easily with your family and friends over countries</Text>
      <View style={styles.controls}>
        <TouchableOpacity style={styles.termsBtn} onPress={termsBtnHandler}>
          <Text style={[styles.termsBtnText, termsBtnTextTheme]}>Terms & Privacy Policy</Text>
        </TouchableOpacity>
        <PrimaryButton isDefaultTheme={isDefaultTheme} onPressHandler={onPressHandler} text={'Start Messaging'} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 24,
    paddingBottom: 36,
  },
  startImg: {
    width: '100%',
    height: '39%',
    resizeMode: 'contain',
    marginTop: '35%',
  },
  startText: {
    textAlign: 'center',
    fontFamily: 'Mulish',
    fontSize: 24,
    fontWeight: '700',
  },
  controls: {
    width: '100%',
  },
  termsBtn: {
    paddingHorizontal: 14,
    paddingVertical: 8,
    marginBottom: 8,
  },
  termsBtnText: {
    textAlign: 'center',
    fontFamily: 'Mulish',
    fontSize: 14,
    lineHeight: 24,
    fontWeight: '600',
    color: theme.colors.neutral.active,
  },
});

interface StartScreenProps {
  isDefaultTheme: boolean;
}
