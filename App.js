// App.js

import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import SplashScreen from './pages/SplashScreen';
import MainScreen from './pages/MainScreen';
import LoginScreen from './pages/LoginScreen';
import RssFeedItemsScreen from './pages/RssFeedItemsScreen';

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Splash">
        <Stack.Screen
          name="Splash"
          component={SplashScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Main"
          component={MainScreen}
          options={{
            headerTitleAlign: 'center',
            headerTitleStyle: {
              color: '#FFFFFF',
              fontSize: 16,
            },
            headerStyle: {
              backgroundColor: '#8b0000',
            },
            headerTintColor: '#FFFFFF',
          }}
        />
        <Stack.Screen
          name="Login"
          component={LoginScreen}
          options={{
            headerTitleAlign: 'center',
            headerTitleStyle: {
              color: '#FFFFFF',
              fontSize: 16,
            },
            headerStyle: {
              backgroundColor: '#8b0000',
            },
            headerTintColor: '#FFFFFF',
          }}
        />
        <Stack.Screen
          name="RssFeedItemsScreen"
          component={RssFeedItemsScreen}
          options={{
            headerTitleAlign: 'center',
            headerTitleStyle: {
              color: '#FFFFFF',
              fontSize: 16,
            },
            headerStyle: {
              backgroundColor: '#8b0000',
            },
            headerTintColor: '#FFFFFF',
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
