import React, { useState } from "react";
import { Button, View, TouchableOpacity, Text } from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";
import styles from "../assets/styles/styles";

const AppNavigator = () => {
  const [favorites] = useState([]);
  const navigation = useNavigation();
  const route = useRoute();

  const navigateToFavoriteItems = () => {
    navigation.navigate("FavoriteItemsScreen", { favorites });
  };

  const navigateToHome = () => {
    navigation.navigate("Main");
  };

  const navigateToSplash = () => {
    navigation.navigate("Splash");
  };

  const isSplashScreenButtonActive = route.name === "Splash";
  const isHomeButtonActive = route.name === "Main";
  const isFavoriteButtonActive = route.name === "FavoriteItemsScreen";

  return (
    <View style={[styles.buttonContainer, styles.bottomNavigator]}>
      <View style={{ flexDirection: "row" }}>
        {/* <Button style={[styles.bottomNavBtn]}
          title={"Splash"}
          onPress={navigateToSplash}
          color={isSplashScreenButtonActive ? "#00f" : "#000"} // Change color if the screen is active
        />
        <Button style={[styles.bottomNavBtn]}
          title={"Home"}
          onPress={navigateToHome}
          color={isHomeButtonActive ? "#00f" : "#000"} // Change color if the screen is active
        />
        <Button style={[styles.bottomNavBtn]}
          title={"My Favorite Vacancies"}
          onPress={navigateToFavoriteItems}
          color={isFavoriteButtonActive ? "#00f" : "#000"} // Change color if the screen is active
        /> */}

        <TouchableOpacity
          onPress={navigateToSplash}
          color={isSplashScreenButtonActive ? "#00f" : "#000"}
        >
          <View
            style={{
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Ionicons name="briefcase" size={20} color="#000000" />
            <Text style={styles.jcbuttonText}>Splash</Text>
          </View>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={navigateToHome}
          color={isSplashScreenButtonActive ? "#00f" : "#000"}
        >
          <View
            style={{
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Ionicons name="home" size={20} color="#000000" />
            <Text style={styles.jcbuttonText}>Home</Text>
          </View>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={navigateToFavoriteItems}
          color={isSplashScreenButtonActive ? "#00f" : "#000"}
        >
          <View
            style={{
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Ionicons name="heart" size={20} color="#000000" />
            <Text style={styles.jcbuttonText}>My Favorite</Text>
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default AppNavigator;
