import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StatusBar,
  Image,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useFonts } from "expo-font";
import { Ionicons } from "@expo/vector-icons";
import Swiper from 'react-native-swiper';
import styles from "../assets/styles/styles";
import { useToast } from '@siteed/react-native-toaster';
import FontAwesome6 from "react-native-vector-icons/FontAwesome6";

const SplashScreen = () => {
  const navigation = useNavigation();

  const [fontsLoaded] = useFonts({
    verdana: require("../assets/fonts/verdana.ttf"),
    verdanaBold: require("../assets/fonts/verdana-bold.ttf"),
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    StatusBar.setBarStyle("light-content");
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
      <View style={styles.spconWrapper}>
        <Swiper style={{ pointerEvents: "none" }} showsButtons={false} autoplay={true} loop={true} showsPagination={true}>
          <View>
            <Image
              source={require("../assets/images/slide1.jpg")}
              style={styles.backgroundImage}
            />
            <Text style={[styles.sliderText, { fontFamily: 'verdanaBold' }]}>Skills</Text>
          </View>
          <View>
            <Image
              source={require("../assets/images/slide2.jpg")}
              style={styles.backgroundImage}
            />
            <Text style={[styles.sliderText, { fontFamily: 'verdanaBold' }]}>Match</Text>
          </View>
          <View>
            <Image
              source={require("../assets/images/slide3.jpg")}
              style={styles.backgroundImage}
            />
            <Text style={[styles.sliderText, { fontFamily: 'verdanaBold' }]}>Job</Text>
          </View>
        </Swiper>
      </View>
      {/* Bottom half - Content */}
      <View style={styles.spashTxtWrapper}>
        <Text style={[styles.logintext, { fontFamily: 'verdanaBold' }]}>topjobs</Text>
        <Text style={[styles.logintextSub]}>topjobs sri lanka Job Network - most popular online job site in Sri Lanka for jobs, careers, recruitment and employment with recruitment automation for employers.</Text>
        <View style={styles.rowContainer}>          
          <TouchableOpacity
            onPress={handleLoginPress}
            style={styles.lgiconButtonbgLog}
          >
            <FontAwesome6 name="arrow-right-to-bracket" size={20} color={'#FFFFFF'} style={{ marginRight: 10 }}/>
            <Text style={styles.buttonText}>Jobseeker Login</Text>
          </TouchableOpacity>
          <Text style={[styles.ortext]}>OR</Text>
          <TouchableOpacity
            onPress={handleViewJobsPress}
            style={styles.jciconButtonbg}
          >
            <FontAwesome6 name="arrow-right" size={20} color={'#FFFFFF'} style={{ marginRight: 10 }}/>
            <Text style={styles.buttonText}>All Categories</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default SplashScreen;
