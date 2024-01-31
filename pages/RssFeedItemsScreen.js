import React, { useEffect, useState } from "react";
import { View, Text, TextInput, FlatList, StatusBar, TouchableOpacity, TouchableWithoutFeedback, Keyboard, Linking, ActivityIndicator } from "react-native";
import { parse } from "react-native-rss-parser";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useFocusEffect } from "@react-navigation/native";
import styles from "../assets/styles/styles";
import AppNavigator from "./AppNavigator";
import { Ionicons, Feather } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { useToast } from '@siteed/react-native-toaster';
import { useNavigation } from "@react-navigation/native";

const RssFeedItemsScreen = ({ route }) => {
  const { rssLink } = route.params;
  const [rssItems, setRssItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [favorites, setFavorites] = useState([]);
  const toaster = useToast();
  const navigation = useNavigation();
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredRssItems, setFilteredRssItems] = useState([]);
  const [totalJobs, setTotalJobs] = useState(0);

  const handleRssLinkClick = (item) => {
    const link = `https://www.topjobs.lk/employer/JobAdvertismentServlet?ac=${item.ac}&jc=${item.jc}&ec=${item.ec}`;
    Linking.openURL(link).catch((err) =>
      console.error("Error opening link:", err)
    );
  };

  const handleFavoriteToggle = (item) => {
    const isFavorite = favorites.some(
      (favItem) => favItem.title === item.title
    );
    if (isFavorite) {
      setFavorites(favorites.filter((favItem) => favItem.title !== item.title));
      toaster.show({
        message: 'Removed',
        subMessage: 'Favorite Item Removed',
        type: 'error',
        actionLabel: 'View Favorites',
        iconVisible: true ,
        iconStyle: {
          fontSize: 30,
          color: '#FFFFFF',
        },
        snackbarStyle: {
          borderRadius: 10,
          backgroundColor: '#c00000',
        },
        duration: 3000,
        action() {
          navigation.navigate("FavoritesScreen");
        },
        position: "bottom",
        subMessageStyle: {
          color: '#FFFFFF',
        },
      });
    } else {
      setFavorites([...favorites, item]);
      toaster.show({
        message: 'Success',
        subMessage: 'Added to favorites',
        type: 'success',
        actionLabel: 'View Favorites',
        iconVisible: true ,
        iconStyle: {
          fontSize: 30,
          color: '#FFFFFF',
        },
        snackbarStyle: {
          borderRadius: 10,
          backgroundColor: '#078007',
        },
        duration: 3000,
        action() {
          navigation.navigate("FavoritesScreen");
        },
        position: "bottom",
        subMessageStyle: {
          color: '#FFFFFF',
        },
      });
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

  useEffect(() => {
    setFilteredRssItems(
      rssItems.filter(
        (item) =>
          item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          item.description.toLowerCase().includes(searchQuery.toLowerCase())
      )
    );
  }, [rssItems, searchQuery]);

  useEffect(() => {
    setTotalJobs(filteredRssItems.length);
  }, [filteredRssItems]);

  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <View style={styles.mainscontainer} keyboardShouldPersistTaps="handled">
        <Text>Total Jobs: {totalJobs}</Text>
        <View style={styles.searchContainer}>
          <TextInput
            style={styles.searchInput}
            placeholder="Search Your Dream Job"
            value={searchQuery}
            placeholderTextColor={'#000000'}
            fontSize={14}
            onChangeText={(text) => setSearchQuery(text)}
          />
          <View style={styles.searchIconContainer}>
            <Feather name="search" size={24} color="#000000" />
          </View>
        </View>
        {loading ? (
          <View style={styles.activityIndicatorContainer}>
            <ActivityIndicator size="large" color="#580000" />
          </View>
        ) : (
          <FlatList
            style={styles.scrollView}
            data={filteredRssItems.filter(
              (item) =>
                item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                item.description.toLowerCase().includes(searchQuery.toLowerCase())
            )}
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
                <LinearGradient
                  colors={["#ececec6c", "#FFFFFF"]}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 1 }}
                  style={[
                    styles.gradientContainer,
                    favorites.some((favItem) => favItem.title === item.title) && {
                      borderLeftColor: "#25c925",
                      borderLeftWidth: 5,
                    },
                  ]}
                >
                  <View style={styles.rssItemTextContainer}>
                    <View style={{ flexDirection: 'row' }}>
                      <View style={styles.rssLeftCon}>
                        <Text>{item.title}</Text>
                        <Text>{item.description}</Text>
                      </View>
                      <TouchableOpacity
                        style={styles.rssRightCon}
                        onPress={() => {
                          handleFavoriteToggle(item);
                        }}
                      >
                        <Ionicons
                          name={
                            favorites.some(
                              (favItem) => favItem.title === item.title
                            )
                              ? "heart"
                              : "heart-outline"
                          }
                          size={24}
                          color="#25c925"
                          style={styles.favico}
                        />
                      </TouchableOpacity>
                    </View>
                  </View>
                </LinearGradient>
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
    </TouchableWithoutFeedback>
  );
};

export default RssFeedItemsScreen;
