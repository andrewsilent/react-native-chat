import React, { useCallback } from 'react';
import { Text, View, Image, TouchableOpacity, StyleSheet } from 'react-native';

import start from '../../assets/start.png';
import startDark from '../../assets/start-dark.png';
import { PrimaryButton } from '../../components/buttons/primary';
import { theme } from '../../theme';

export const StartScreen = ({ navigation, isDefaultTheme }: StartScreenProps) => {
  const termsBtnHandler = useCallback(() => {
    console.log('Terms & Privacy Policy');
  }, []);

  const onPressHandler = useCallback(() => {
    navigation.navigate('StepOne');
  }, []);

  return (
    <View style={[styles.container, isDefaultTheme ? styles.containerLight : styles.containerDark]}>
      <Image source={isDefaultTheme ? start : startDark} style={styles.startImg} />
      <Text style={[styles.startText, isDefaultTheme ? styles.startTextLight : styles.startTextDark]}>
        Connect easily with your family and friends over countries
      </Text>
      <View style={styles.controls}>
        <TouchableOpacity style={styles.termsBtn} onPress={termsBtnHandler}>
          <Text style={[styles.termsBtnText, isDefaultTheme ? styles.termsBtnTextLight : styles.termsBtnTextDark]}>
            Terms & Privacy Policy
          </Text>
        </TouchableOpacity>
        <PrimaryButton isDefaultTheme={isDefaultTheme} navigation={navigation} onPressHandler={onPressHandler} text={'Start Messaging'} />
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
  containerLight: {
    backgroundColor: theme.colors.neutral.white,
  },
  containerDark: {
    backgroundColor: theme.colors.neutral.active,
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
  startTextLight: {
    color: theme.colors.neutral.active,
  },
  startTextDark: {
    color: theme.colors.neutral.offWhite,
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
  termsBtnTextLight: {
    color: theme.colors.neutral.active,
  },
  termsBtnTextDark: {
    color: theme.colors.neutral.offWhite,
  },
});

interface StartScreenProps {
  navigation: object;
  isDefaultTheme: boolean;
}