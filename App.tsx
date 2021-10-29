import React, { useEffect, useState } from 'react';
import { Platform, useColorScheme } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useFonts } from 'expo-font';

import { theme } from './src/core/theme';
import { StepOne } from './src/core/screens/step-one';
import { StartScreen } from './src/core/screens/start';
import { CodeVerification } from './src/core/screens/code-verification';

const Stack = createNativeStackNavigator();

export default function App() {
  const devicePlatform = Platform;
  const colorScheme = useColorScheme();
  const [isDefaultTheme, setIsDefaultTheme] = useState(true);
  const [phoneNumber, setPhoneNumber] = useState({ code: '', number: '' });
  const [loaded] = useFonts({
    Mulish: require('./src/core/assets/fonts/Mulish.ttf'),
  });

  useEffect(() => {
    setIsDefaultTheme(colorScheme === 'light');
  }, [colorScheme]);

  if (!loaded) {
    return null;
  }

  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name='Start'
          options={{
            headerShown: false,
          }}
        >
          {props => <StartScreen {...props} isDefaultTheme={isDefaultTheme} />}
        </Stack.Screen>
        <Stack.Screen
          name='StepOne'
          options={{
            title: '',
            headerStyle: {
              backgroundColor: isDefaultTheme ? theme.colors.neutral.white : theme.colors.neutral.active,
              borderBottomWidth: 0,
            },
            headerTintColor: isDefaultTheme ? theme.colors.neutral.active : theme.colors.neutral.white,
          }}
        >
          {props => <StepOne {...props} isDefaultTheme={isDefaultTheme} setPhoneNumber={setPhoneNumber} />}
        </Stack.Screen>
        <Stack.Screen
          name='CodeVerification'
          options={{
            title: '',
            headerStyle: {
              backgroundColor: isDefaultTheme ? theme.colors.neutral.white : theme.colors.neutral.active,
              borderBottomWidth: 0,
            },
            headerTintColor: isDefaultTheme ? theme.colors.neutral.active : theme.colors.neutral.white,
          }}
        >
          {props => <CodeVerification {...props} isDefaultTheme={isDefaultTheme} phoneNumber={phoneNumber} />}
        </Stack.Screen>
      </Stack.Navigator>
    </NavigationContainer>
  );
}
