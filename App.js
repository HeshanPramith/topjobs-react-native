import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import SplashScreen from './pages/SplashScreen';
import MainScreen from './pages/MainScreen';
import LoginScreen from './pages/LoginScreen';
import RssFeedItemsScreen from './pages/RssFeedItemsScreen';
import FavoritesScreen from './pages/FavoritesScreen';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { ToastProvider } from '@siteed/react-native-toaster';

const Stack = createStackNavigator();

export default function App() {
  return (
    <SafeAreaProvider style={{ flex: 1, backgroundColor: 'white' }}>
      <ToastProvider>
        <NavigationContainer>
          <Stack.Navigator initialRouteName="Splash">
            <Stack.Screen
              name="Splash"
              component={SplashScreen}
              options={{ headerShown: false, }}
            />
            <Stack.Screen
              name="Main"
              component={MainScreen}
              options={{
                title: 'Choose Your Career Path',
                headerTitleAlign: 'center',
                headerLeft: false,
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
                headerLeft: false,
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
                title: 'Loading Vacancies',
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
              name="FavoritesScreen"
              component={FavoritesScreen}
              options={{
                title: 'My Favorites',
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
      </ToastProvider>
    </SafeAreaProvider>
  );
}
