import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  FlatList,
  StatusBar,
  TouchableOpacity,
  Linking,
  ActivityIndicator,
} from "react-native";
import { parse } from "react-native-rss-parser";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useFocusEffect } from "@react-navigation/native";
import styles from "../assets/styles/styles";
import AppNavigator from "./AppNavigator";
import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";

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

  const handleFavoriteToggle = (item) => {
    const isFavorite = favorites.some((favItem) => favItem.title === item.title);
    if (isFavorite) {
      setFavorites(favorites.filter((favItem) => favItem.title !== item.title));
    } else {
      setFavorites([...favorites, item]);
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
  }, [rssLink, navigation]);

  useFocusEffect(
    React.useCallback(() => {
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
    }, [])
  );

  useEffect(() => {
    const saveFavorites = async () => {
      try {
        await AsyncStorage.setItem("favorites", JSON.stringify(favorites));
      } catch (error) {
        console.error("Error saving favorites:", error);
      }
    };

    saveFavorites();
  }, [favorites]);

  return (
    <View style={styles.mainscontainer}>
      <Text>Total Jobs: {rssItems.length}</Text>
      {loading ? (
        <View style={styles.activityIndicatorContainer}>
          <ActivityIndicator size="large" color="#580000" />
        </View>
      ) : (
        <FlatList
          style={styles.scrollView}
          data={rssItems}
          keyExtractor={(item, index) => `${item.title}-${index}`}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={[
                styles.rssItemContainerDetail,
                favorites.some((favItem) => favItem.title === item.title) &&
                styles.favoriteItem,
              ]}
              onPress={() => {
                handleRssLinkClick(item);
              }}
            >
              {favorites.some((favItem) => favItem.title === item.title) ? (
                <LinearGradient
                  colors={['#00912463', '#ffffff']}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 1 }}
                  style={styles.gradientContainer}
                >
                  {/* Rest of your JSX for favorite items */}
                  <View style={styles.rssItemTextContainer}>
                    <View>
                      <Text>{item.title}</Text>
                      <Text>{item.description}</Text>
                    </View>
                    <TouchableOpacity
                      onPress={() => {
                        handleFavoriteToggle(item);
                      }}
                    >
                      <Ionicons
                        name="heart"
                        size={24}
                        color="#900"
                        style={styles.favico}
                      />
                    </TouchableOpacity>
                  </View>
                </LinearGradient>
              ) : (
                // JSX for non-favorite items
                <View style={styles.gradientContainer}>
                  <View style={styles.rssItemTextContainer}>
                    <View>
                      <Text>{item.title}</Text>
                      <Text>{item.description}</Text>
                    </View>
                    <TouchableOpacity
                      onPress={() => {
                        handleFavoriteToggle(item);
                      }}
                    >
                      <Ionicons
                        name="heart-outline"
                        size={24}
                        color="#900"
                        style={styles.favico}
                      />
                    </TouchableOpacity>
                  </View>
                </View>
              )}
            </TouchableOpacity>
          )}
          ListEmptyComponent={() => (
            <View style={styles.placeholderContainer}>
              <Text>No jobs available</Text>
            </View>
          )}
        />
      )}
      <AppNavigator />
    </View>
  );
};

export default RssFeedItemsScreen;
