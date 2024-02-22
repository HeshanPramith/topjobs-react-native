import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StatusBar,
  ImageBackground,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useFonts } from "expo-font";
import { Ionicons } from "@expo/vector-icons";
import styles from "../assets/styles/styles";
import { useToast } from '@siteed/react-native-toaster';

const SplashScreen = () => {
  const navigation = useNavigation();

  const [fontsLoaded] = useFonts({
    verdana: require("../assets/fonts/verdana.ttf"),
    verdanaBold: require("../assets/fonts/verdana-bold.ttf"),
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    StatusBar.setBarStyle("dark-content");
    setLoading(false);
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

  if (!fontsLoaded || loading) {
    return null;
  }

  return (

    <View style={styles.spcon}>
      <ImageBackground
        source={require("../assets/images/sp-bg.jpg")}
        style={styles.backgroundImage}
      >
        <View style={styles.spcon}>
          <Text style={[styles.logintext, { fontFamily: 'verdanaBold' }]}>topjobs</Text>
          <Text style={[styles.logintext2, { fontFamily: 'verdana' }]}>Recruitment Made Easy</Text>
          <Text style={[styles.logintext3, { fontFamily: 'verdana' }]}>More than 3500+ jobs</Text>
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
