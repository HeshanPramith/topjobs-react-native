import React, { useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StatusBar,
  ImageBackground,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import * as Font from "expo-font";
import { Ionicons } from "@expo/vector-icons";
import styles from "../assets/styles/styles";
import { useToast } from '@siteed/react-native-toaster';

const SplashScreen = () => {
  const navigation = useNavigation();

  useEffect(() => {
    async function loadFont() {
      await Font.loadAsync({
        verdana: require("../assets/fonts/verdana-bold.ttf"),
        verdananormal: require("../assets/fonts/verdana.ttf"),
      });
    }

    StatusBar.setBarStyle("dark-content");

    loadFont();
  }, []);

  const toaster = useToast();

  const handleLoginPress = () => {
    toaster.show({
      message: 'Feature Coming Soon',
      subMessage: 'Jobseeker login feature coming soon',
      type: 'warning',
      actionLabel: 'OK',
      iconVisible: true,
      snackbarStyle: {
        borderRadius: 50,
      },
      duration: 8000,
      action() {

      },
      position: "bottom",
      subMessageStyle: {
        fontSize: 12,
        color: '#FFFFFF'
      },
    });
  };

  const handleViewJobsPress = () => {
    navigation.navigate("Main");
  };

  return (

    <View style={styles.spcon}>
      <ImageBackground
        source={require("../assets/images/sp-bg.jpg")}
        style={styles.backgroundImage}
      >
        <View style={styles.spcon}>
          <Text style={[styles.logintext, { fontFamily: 'verdana' }]}>topjobs</Text>
          <Text style={[styles.logintext2, { fontFamily: 'verdananormal' }]}>Recruitment Made Easy</Text>
          <Text style={[styles.logintext3, { fontFamily: 'verdananormal' }]}>More than 3500+ jobs</Text>
          <View
            style={{
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <TouchableOpacity
              onPress={handleLoginPress}
              style={[styles.button, styles.lgiconButtonbgLog]}
            >
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Ionicons
                  name="person"
                  size={20}
                  color="#FFFFFF"
                  style={{ marginRight: 10 }}
                />
                <Text style={styles.buttonText}>Jobseeker Login</Text>
              </View>
            </TouchableOpacity>

            <Text
              style={[styles.ortext]}
            >
              OR
            </Text>

            <TouchableOpacity
              onPress={handleViewJobsPress}
              style={[styles.jcbutton, styles.jciconButtonbg]}
            >
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Ionicons
                  name="briefcase"
                  size={20}
                  color="#000000"
                  style={{ marginRight: 10 }}
                />
                <Text style={styles.jcbuttonText}>View Job Categories</Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>
      </ImageBackground>
    </View>
  );
};

export default SplashScreen;
