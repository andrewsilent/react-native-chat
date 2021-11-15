import React from 'react';
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
import { RootStackParamList } from './src/core/interfaces';

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function App() {
  const [loaded] = useFonts({
    Mulish: require('./src/core/assets/fonts/Mulish.ttf'),
  });

  if (!loaded) {
    return null;
  }

  return (
    <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator
          screenOptions={{
            title: '',
            headerStyle: {
              backgroundColor: store.getState().settings.isDefaultTheme
                ? theme.colors.neutral.white
                : theme.colors.neutral.active,
            },
            headerShadowVisible: false,
            headerTintColor: store.getState().settings.isDefaultTheme
              ? theme.colors.neutral.active
              : theme.colors.neutral.white,
          }}
        >
          <Stack.Screen
            name="StartScreen"
            component={StartScreen}
            options={{
              headerShown: false,
            }}
          />
          <Stack.Screen
            name="StepOne"
            component={StepOne}
            options={{
              title: '',
            }}
          />
          <Stack.Screen
            name="CodeVerification"
            component={CodeVerification}
            options={{
              title: '',
            }}
          />
          <Stack.Screen
            name="CreateProfile"
            component={CreateProfile}
            options={{
              title: 'Your Profile',
            }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
}
