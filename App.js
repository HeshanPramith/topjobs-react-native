// App.js

import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { StatusBar } from 'react-native';
import SplashScreen from './pages/SplashScreen';
import MainScreen from './pages/MainScreen';
import LoginScreen from './pages/LoginScreen';

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Splash">
        <Stack.Screen
          name="Splash"
          component={SplashScreen}
          options={{ headerShown: false }}
          listeners={({ navigation }) => ({
            focus: () => {
              StatusBar.setHidden(false);
            },
            blur: () => {
              StatusBar.setHidden(false);
            },
          })}
        />
        <Stack.Screen
          name="Main"
          component={MainScreen}
          options={{
            headerTitleAlign: 'center',
            headerTitleStyle: {
              color: '#FFFFFF',
            },
            headerStyle: {
              backgroundColor: '#850310',
            },
          }}
        />
        <Stack.Screen
          name="Login"
          component={LoginScreen}
          options={{
            headerLeft: null,
            headerTitleAlign: 'center',
            headerTitleStyle: {
              color: '#FFFFFF',
            },
            headerStyle: {
              backgroundColor: '#850310',
            },
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
