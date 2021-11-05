import React, { useEffect, useState } from 'react';
import { Platform, useColorScheme } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Provider } from 'react-redux';
import { useFonts } from 'expo-font';

import { theme } from './src/core/theme';
import { StepOne } from './src/core/screens/step-one';
import { StartScreen } from './src/core/screens/start';
import { CodeVerification } from './src/core/screens/code-verification';
import { CreateProfile } from './src/core/screens/create-profile';
import { store } from './src/core/redux/store';

const Stack = createNativeStackNavigator();

export default function App() {
  const devicePlatform = Platform;
  const colorScheme = useColorScheme();
  const [isDefaultTheme, setIsDefaultTheme] = useState(true);
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
    <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen
            name="Start"
            options={{
              headerShown: false,
            }}
          >
            {props => <StartScreen {...props} isDefaultTheme={isDefaultTheme} />}
          </Stack.Screen>
          <Stack.Screen
            name="StepOne"
            options={{
              title: '',
              headerStyle: {
                backgroundColor: isDefaultTheme ? theme.colors.neutral.white : theme.colors.neutral.active,
                // borderBottomWidth: 0,
              },
              headerTintColor: isDefaultTheme ? theme.colors.neutral.active : theme.colors.neutral.white,
            }}
          >
            {props => <StepOne {...props} isDefaultTheme={isDefaultTheme} />}
          </Stack.Screen>
          <Stack.Screen
            name="CodeVerification"
            options={{
              title: '',
              headerStyle: {
                backgroundColor: isDefaultTheme ? theme.colors.neutral.white : theme.colors.neutral.active,
                // borderBottomWidth: 0,
              },
              headerTintColor: isDefaultTheme ? theme.colors.neutral.active : theme.colors.neutral.white,
            }}
          >
            {props => <CodeVerification {...props} isDefaultTheme={isDefaultTheme} />}
          </Stack.Screen>
          <Stack.Screen
            name="CreateProfile"
            options={{
              title: 'Your Profile',
              headerStyle: {
                backgroundColor: isDefaultTheme ? theme.colors.neutral.white : theme.colors.neutral.active,
                // borderBottomWidth: 0,
              },
              headerTintColor: isDefaultTheme ? theme.colors.neutral.active : theme.colors.neutral.white,
            }}
          >
            {props => <CreateProfile {...props} isDefaultTheme={isDefaultTheme} />}
          </Stack.Screen>
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
}
