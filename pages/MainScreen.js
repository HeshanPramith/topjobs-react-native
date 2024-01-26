// MainScreen.js

import React, { useEffect } from 'react';
import { View, Text, StyleSheet, StatusBar } from 'react-native';

const MainScreen = () => {

  useEffect(() => {
    // Set the status bar to light content
    StatusBar.setBarStyle('light-content');
  }, []);

  return (
    <View style={styles.container}>
      <Text>Welcome to the Main Screen!</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default MainScreen;
