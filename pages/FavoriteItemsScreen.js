import React, { useState, useEffect } from "react";
import { View, Text, FlatList, TouchableOpacity } from "react-native";
import styles from "../assets/styles/styles";
import AsyncStorage from '@react-native-async-storage/async-storage';

const FavoriteItemsScreen = ({ route }) => {
  // Manage favorites in the component state
  const [favorites, setFavorites] = useState(route.params.favorites || []);

  const removeFavorite = async (item) => {
    const updatedFavorites = favorites.filter((favorite) => favorite !== item);

    try {
      // Save the updated favorites to AsyncStorage
      await AsyncStorage.setItem('favorites', JSON.stringify(updatedFavorites));
      // Update the component state to reflect the real-time removal
      setFavorites(updatedFavorites);
    } catch (error) {
      console.error("Error saving favorites:", error);
    }
  };

  useEffect(() => {
    // Load favorites from AsyncStorage when the component mounts
    const loadFavorites = async () => {
      try {
        const storedFavorites = await AsyncStorage.getItem('favorites');
        if (storedFavorites) {
          setFavorites(JSON.parse(storedFavorites));
        }
      } catch (error) {
        console.error("Error loading favorites:", error);
      }
    };

    loadFavorites();
  }, []); // Empty dependency array to run only once when the component mounts

  return (
    <View style={styles.containeritemscreen}>
      <Text>Favorites: {favorites.length}</Text>
      <FlatList
        data={favorites}
        keyExtractor={(item, index) => `${item.title}-${index}`}
        renderItem={({ item }) => (
          <View style={styles.rssItemContainer}>
            <Text>{item.title}</Text>
            <Text>{item.description}</Text>
            <TouchableOpacity onPress={() => removeFavorite(item)}>
              <Text>Remove from Favorites</Text>
            </TouchableOpacity>
          </View>
        )}
        ListEmptyComponent={() => (
          <View style={styles.placeholderContainer}>
            <Text>No favorite items</Text>
          </View>
        )}
      />
    </View>
  );
};

export default FavoriteItemsScreen;
