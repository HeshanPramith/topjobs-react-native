import React, { useEffect } from "react";
import { View, Text, StatusBar } from 'react-native';
import AppNavigator from "./AppNavigator";
import styles from "../assets/styles/styles";

const LoginScreen = () => {

  useEffect(() => {
    StatusBar.setBarStyle("light-content");
  }, []);

  return (
    <View style={styles.mainscontainer}>
      <Text>Welcome to the Login Screen!</Text>
      <AppNavigator/>
    </View>
  );
};

export default LoginScreen;
