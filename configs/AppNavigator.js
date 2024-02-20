import React, { useState } from "react";
import { View, TouchableOpacity, Text } from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";
import styles from "../assets/styles/styles";

const AppNavigator = () => {
  const [favorites] = useState([]);
  const navigation = useNavigation();
  const route = useRoute();

  const navigateToHome = () => {
    navigation.navigate("Main");
  };

  const navigateToSplash = () => {
    navigation.navigate("Splash");
  };

  const navigateToFav = () => {
    navigation.navigate("FavoritesScreen");
  };

  const isCurrentPage = (pageName) => route.name === pageName;

  return (
    <View style={[styles.buttonContainerBottom]}>
      <View style={[styles.bottomNavigator]}>
        <View style={{ flexDirection: "row" }}>
          <TouchableOpacity
            style={[
              styles.bottomNavBtn,
              isCurrentPage("Splash") && { backgroundColor: "#8b0000" }, // Apply white background for current page
            ]}
            onPress={navigateToSplash}
          >
            <View
              style={{
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <Ionicons
                name={
                  isCurrentPage("Splash")
                    ? "log-in-outline"
                    : "log-in-outline"
                }
                size={20}
                color={isCurrentPage("Splash") ? "#ffffff" : "#ffffffc4"}
              />
              <Text style={[styles.bottomButtonTextSpla]}>Login</Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity
            style={[
              styles.bottomNavBtn,
              isCurrentPage("Main") && { backgroundColor: "#8b0000" },
            ]}
            onPress={navigateToHome}
          >
            <View
              style={{
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <Ionicons
                name={isCurrentPage("Main") ? "briefcase" : "briefcase-outline"}
                size={20}
                color={isCurrentPage("Main") ? "#ffffff" : "#ffffffc4"}
              />
              <Text
                style={
                  isCurrentPage("Main")
                    ? styles.bottomButtonTextAct
                    : styles.bottomButtonTextInAct
                }
              >
                Job Category
              </Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity
            style={[
              styles.bottomNavBtn,
              isCurrentPage("FavoritesScreen") && { backgroundColor: "#8b0000" },
            ]}
            onPress={navigateToFav}
          >
            <View
              style={{
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <Ionicons
                name={
                  isCurrentPage("FavoritesScreen") ? "heart" : "heart-outline"
                }
                size={20}
                color={isCurrentPage("FavoritesScreen") ? "#ffffff" : "#ffffffc4"}
              />
              <Text
                style={
                  isCurrentPage("FavoritesScreen")
                    ? styles.bottomButtonTextAct
                    : styles.bottomButtonTextInAct
                }
              >
                My Favourites
              </Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default AppNavigator;
