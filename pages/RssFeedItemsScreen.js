import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  FlatList,
  StatusBar,
  ActivityIndicator,
  TouchableOpacity,
  Linking,
} from "react-native";
import { parse } from "react-native-rss-parser";
import styles from "../assets/styles/styles";
import AsyncStorage from "@react-native-async-storage/async-storage";
import AppNavigator from "./AppNavigator";

const RssFeedItemsScreen = ({ route, navigation }) => {
  const { rssLink } = route.params;
  const [rssItems, setRssItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [favorites, setFavorites] = useState([]);

  const handleRssLinkClick = (item) => {
    const link = `https://www.topjobs.lk/employer/JobAdvertismentServlet?ac=${item.ac}&jc=${item.jc}&ec=${item.ec}`;
    Linking.openURL(link).catch((err) =>
      console.error("Error opening link:", err)
    );
  };

  const toggleFavorite = async (item) => {
    const updatedFavorites = favorites.includes(item)
      ? favorites.filter((favorite) => favorite !== item)
      : [...favorites, item];

    setFavorites(updatedFavorites);

    try {
      // Save the updated favorites to AsyncStorage
      await AsyncStorage.setItem("favorites", JSON.stringify(updatedFavorites));
    } catch (error) {
      console.error("Error saving favorites:", error);
    }
  };

  useEffect(() => {
    StatusBar.setBarStyle("light-content");
    setLoading(true);
    fetch(rssLink)
      .then((response) => response.text())
      .then((responseData) => parse(responseData))
      .then((rss) => {
        setRssItems(rss.items);
        navigation.setOptions({ title: rss.title || "RSS Feed Items" });
      })
      .catch((error) => console.error("Error fetching RSS feed:", error))
      .finally(() => setLoading(false));

    const loadFavorites = async () => {
      try {
        // Load favorites from AsyncStorage
        const storedFavorites = await AsyncStorage.getItem("favorites");
        if (storedFavorites) {
          setFavorites(JSON.parse(storedFavorites));
        }
      } catch (error) {
        console.error("Error loading favorites:", error);
      }
    };

    loadFavorites();
  }, [rssLink, navigation]);

  return (
    <View style={styles.mainscontainer}>
      <Text>Total Jobs: {rssItems.length}</Text>
      {loading ? (
        <View style={styles.activityIndicatorContainer}>
          <ActivityIndicator size="large" color="#580000" />
        </View>
      ) : (
        <FlatList
          data={rssItems}
          keyExtractor={(item, index) => `${item.title}-${index}`}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={styles.rssItemContainer}
              onPress={() => {
                handleRssLinkClick(item);
              }}
            >
              <Text>{item.title}</Text>
              <Text>{item.description}</Text>
              <TouchableOpacity
                onPress={() => toggleFavorite(item)}
                style={styles.rssLinkButton}
              >
                <Text>
                  {favorites.includes(item)
                    ? "Remove from Favorites"
                    : "Add to Favorites"}
                </Text>
              </TouchableOpacity>
            </TouchableOpacity>
          )}
          ListEmptyComponent={() => (
            <View style={styles.placeholderContainer}>
              <Text>No jobs available</Text>
            </View>
          )}
        />
      )}
      <AppNavigator/>
    </View>
  );
};

export default RssFeedItemsScreen;
