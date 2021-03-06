import React from 'react';
import { Text } from 'react-native';
import { ScreenContainer } from 'react-native-screens';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { store } from '../redux/store';
import { theme } from '../theme';
import { Settings } from '../screens/settings-more';
import { RootStackParamList } from '../interfaces';
import { StartScreen } from '../screens/start';
import { StepOne } from '../screens/step-one';
import { CodeVerification } from '../screens/code-verification';
import { CreateProfile } from '../screens/create-profile';
import { Contacts } from '../screens/contacts';

const RootStack = createNativeStackNavigator();
const StartStack = createNativeStackNavigator<RootStackParamList>();
const SettingsStack = createNativeStackNavigator<RootStackParamList>();

const Tab = createBottomTabNavigator();

// Chats stub
const Chats = () => (
  <ScreenContainer>
    <Text>Chats page</Text>
  </ScreenContainer>
);

const StartStackScreen = () => {
  return (
    <StartStack.Navigator
      screenOptions={{
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
      <StartStack.Screen
        name="StartScreen"
        component={StartScreen}
        options={{
          headerShown: false,
        }}
      />
      <StartStack.Screen
        name="StepOne"
        component={StepOne}
        options={{
          title: '',
        }}
      />
      <StartStack.Screen
        name="CodeVerification"
        component={CodeVerification}
        options={{
          title: '',
        }}
      />
      <StartStack.Screen
        name="CreateProfile"
        component={CreateProfile}
        options={{
          title: 'Your Profile',
        }}
      />
    </StartStack.Navigator>
  );
};

const SettingsStackScreen = () => {
  return (
    <SettingsStack.Navigator>
      <SettingsStack.Screen
        name="Settings"
        component={TabsNavigator}
        options={{
          headerShown: false,
        }}
      />
    </SettingsStack.Navigator>
  );
};

const TabsNavigator = () => {
  return (
    <Tab.Navigator
      initialRouteName="More"
      screenOptions={
        store.getState().settings.isDefaultTheme
          ? {
              headerStyle: {
                backgroundColor: theme.colors.neutral.white,
              },
              tabBarStyle: { backgroundColor: theme.colors.neutral.white },
              headerTintColor: theme.colors.neutral.active,
              tabBarActiveTintColor: theme.colors.brandColor.default,
              tabBarInactiveTintColor: theme.colors.neutral.active,
              headerShadowVisible: false,
            }
          : {
              headerStyle: {
                backgroundColor: theme.colors.neutral.active,
              },
              tabBarStyle: { backgroundColor: theme.colors.neutral.active },
              headerTintColor: theme.colors.neutral.white,
              tabBarActiveTintColor: theme.colors.brandColor.darkMode,
              tabBarInactiveTintColor: theme.colors.neutral.white,
              headerShadowVisible: false,
            }
      }
    >
      <Tab.Screen name="Contacts" component={Contacts} />
      <Tab.Screen name="Chats" component={Chats} />
      <Tab.Screen name="More" component={Settings} />
    </Tab.Navigator>
  );
};

const RootStackScreen = () => {
  return (
    <RootStack.Navigator>
      <RootStack.Screen
        name="StartScreen"
        component={StartStackScreen}
        options={{
          headerShown: false,
        }}
      />
      <RootStack.Screen
        name="Settings"
        component={SettingsStackScreen}
        options={{
          headerShown: false,
        }}
      />
    </RootStack.Navigator>
  );
};

export { RootStackScreen };
