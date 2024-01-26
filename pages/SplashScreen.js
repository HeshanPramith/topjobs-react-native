import React, { useEffect } from 'react';
import { View, Text, TouchableOpacity, StatusBar } from 'react-native';
import { useNavigation } from '@react-navigation/native'; // Import useNavigation
import * as Font from 'expo-font';
import styles from '../assets/styles/styles'; // Import the styles from the separate file

const SplashScreen = () => {
  const navigation = useNavigation(); // Use useNavigation hook to get the navigation object

  useEffect(() => {
    // Load the custom font
    async function loadFont() {
      await Font.loadAsync({
        'verdana': require('../assets/fonts/verdana-bold.ttf'),
        'verdananormal': require('../assets/fonts/verdana.ttf'),
      });
    }

    StatusBar.setBarStyle('light-content');

    loadFont();
  }, []);

  const handleLoginPress = () => {
    // Handle Login button press
    // You can navigate to the login screen or perform any other action
    console.log('Login button pressed');
  };

  const handleViewJobsPress = () => {
    // Handle View Jobs button press
    // Navigate to the MainScreen
    navigation.navigate('Main'); // Replace 'MainScreen' with the name of your MainScreen component
  };

  return (
    <View style={styles.container}>
      <Text style={styles.text}>topjobs</Text>
      <Text style={styles.text2}>Recruitment Made Easy</Text>
      <Text style={styles.text2}>More than 3500+ jobs</Text>

      {/* Login Button */}
      <TouchableOpacity onPress={handleLoginPress} style={styles.button}>
        <Text style={styles.buttonText}>Login</Text>
      </TouchableOpacity>

      {/* View Job Categories Button */}
      <TouchableOpacity onPress={handleViewJobsPress} style={styles.button}>
        <Text style={styles.buttonText}>View Job Categories</Text>
      </TouchableOpacity>
    </View>
  );
};

export default SplashScreen;
