import React from "react";
import { View, Text, FlatList, TouchableOpacity } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import styles from "../assets/styles/styles";
import AppNavigator from "./AppNavigator";

const FavoritesScreen = ({ navigation }) => {
  const [favorites, setFavorites] = React.useState([]);

  React.useEffect(() => {
    const loadFavorites = async () => {
      try {
        const favoritesData = await AsyncStorage.getItem("favorites");
        if (favoritesData) {
          setFavorites(JSON.parse(favoritesData));
        }
      } catch (error) {
        console.error("Error loading favorites:", error);
      }
    };

    loadFavorites();
  }, []);

  return (
    <View style={styles.mainscontainer}>
      <FlatList
        data={favorites}
        keyExtractor={(item, index) => `${item.title}-${index}`}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.favoriteItemContainer}
            onPress={() => {
              // Handle navigation to the details screen or any other action
            }}
          >
            <Text>{item.title}</Text>
            <Text>{item.description}</Text>
          </TouchableOpacity>
        )}
        ListEmptyComponent={() => (
          <View style={styles.placeholderContainer}>
            <Text>No favorite items available</Text>
          </View>
        )}
      />
      <AppNavigator />
    </View>
  );
};

export default FavoritesScreen;
