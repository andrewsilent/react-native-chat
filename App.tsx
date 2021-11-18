import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { Provider } from 'react-redux';
import { useFonts } from 'expo-font';

import { store } from './src/core/redux/store';
import { RootStackScreen } from './src/core/navigation';

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
        <RootStackScreen />
      </NavigationContainer>
    </Provider>
  );
}
