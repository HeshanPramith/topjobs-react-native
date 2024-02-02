import React, { useEffect, useState } from "react";
import { View, Text, TextInput, FlatList, StatusBar, TouchableOpacity, TouchableWithoutFeedback, Keyboard, Linking, ActivityIndicator, Image } from "react-native";
import { parse } from "react-native-rss-parser";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useFocusEffect } from "@react-navigation/native";
import styles from "../assets/styles/styles";
import AppNavigator from "../configs/AppNavigator";
import { Ionicons, Feather } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { useToast } from '@siteed/react-native-toaster';
import { useNavigation } from "@react-navigation/native";
import { Swipeable } from 'react-native-gesture-handler';

const RssFeedItemsScreen = ({ route }) => {
  const { rssLink, alias } = route.params;
  const [rssItems, setRssItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [favorites, setFavorites] = useState([]);
  const toaster = useToast();
  const navigation = useNavigation();
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredRssItems, setFilteredRssItems] = useState([]);
  const [totalJobs, setTotalJobs] = useState(0);
  const swipeableRefs = {};

  const handleRssLinkClick = (item) => {
    const link = `http://192.168.8.101/employer/JobAdvertismentServlet?ac=${item.itunes.subtitle}&jc=${item.itunes.block}&ec=${item.id}`;
    Linking.openURL(link).catch((err) =>
      console.error("Error opening link:", err)
    );
  };

  const handleFavoriteToggle = (item) => {
    const isFavorite = favorites.some(
      (favItem) => favItem.itunes.block === item.itunes.block
    );
    if (isFavorite) {
      setFavorites(favorites.filter((favItem) => favItem.itunes.block !== item.itunes.block));
      toaster.show({
        message: 'Removed',
        subMessage: 'Favorite Item Removed',
        type: 'error',
        actionLabel: 'View Favorites',
        iconVisible: true,
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
        iconVisible: true,
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

    const swipeableRef = swipeableRefs[item.itunes.block];
    if (swipeableRef) {
      swipeableRef.close();
    }
  };

  useEffect(() => {
    StatusBar.setBarStyle("light-content");
    setLoading(true);
    fetch(rssLink)
      .then((response) => response.text())
      .then((responseData) => parse(responseData))
      .then((rss) => {
        //console.log(rss);
        setRssItems(rss.items);
        navigation.setOptions({ title: alias || "RSS Feed Items" });
      })
      .catch((error) => console.error("Error fetching RSS feed:", error))
      .finally(() => setLoading(false));
  }, [rssLink, alias, navigation]);

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
          item.itunes.duration.toLowerCase().includes(searchQuery.toLowerCase())
      )
    );
  }, [rssItems, searchQuery]);

  useEffect(() => {
    setTotalJobs(filteredRssItems.length);
  }, [filteredRssItems]);

  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <View style={styles.mainscontainer} keyboardShouldPersistTaps="handled">
        <View style={styles.topbar}>
          <Ionicons
            name={"briefcase"}
            size={20}
            color="#000000"
            style={styles.commicon}
          />
          <Text style={styles.jobtotal}>Total Jobs: {totalJobs}</Text>
        </View>
        <View style={styles.searchContainer}>
          <TextInput
            style={styles.searchInput}
            placeholder="Search Your Dream Job Or Company"
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
                item.itunes.duration.toLowerCase().includes(searchQuery.toLowerCase())
            )}
            keyExtractor={(item, index) => `${item.itunes.block}-${index}`}
            renderItem={({ item }) => (
              <Swipeable
                ref={(ref) => (swipeableRefs[item.itunes.block] = ref)}
                renderRightActions={() => (
                  <TouchableOpacity
                    style={
                      favorites.some((favItem) => favItem.itunes.block === item.itunes.block)
                        ? styles.deleteButton
                        : styles.saveButton
                    }
                    onPress={() => handleFavoriteToggle(item)}
                  >
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                      <Ionicons
                        name={
                          favorites.some(
                            (favItem) => favItem.itunes.block === item.itunes.block
                          )
                            ? "close-circle"
                            : "heart-outline"
                        }
                        size={24}
                        color="#FFFFFF"
                        style={styles.favico}
                      />
                      <Text style={styles.favTexter}>
                        {favorites.some((favItem) => favItem.itunes.block === item.itunes.block)
                          ? " Remove Favorites"
                          : " Add to Favorites"}
                      </Text>
                    </View>
                  </TouchableOpacity>
                )}
              >
                <TouchableOpacity
                  style={[
                    styles.rssItemContainerDetail,
                    favorites.some((favItem) => favItem.itunes.block === item.itunes.block) &&
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
                      favorites.some((favItem) => favItem.itunes.block === item.itunes.block) && {
                        borderLeftColor: "#25c925",
                        borderLeftWidth: 5,
                      },
                    ]}
                  >
                    <View style={styles.rssItemTextContainer}>
                      <View style={{ flexDirection: 'row' }}>
                        <View style={styles.rssLeftConImg}>
                          {item.itunes.summary ? (
                            <Image
                              source={{ uri: `http://192.168.8.101/logo/${item.itunes.summary}` }}
                              style={{ width: '80%', height: 30, borderRadius: 5 }}
                            />
                          ) : (
                            <Text>{item.itunes.summary}</Text>
                          )}
                        </View>
                        <View style={styles.rssLeftCon}>
                          <Text style={styles.rstxtttl}>{item.title}</Text>
                          <Text style={styles.rstxt}>{item.description}</Text>
                          <Text style={styles.rstxt}>{item.itunes.duration}</Text>
                          <Text style={styles.rstxtloca}>{item.itunes.explicit}</Text>
                          {item.categories.map((categoryObject, index) => (
                            <Text style={styles.rstxtexp} key={index}>Exp : {categoryObject.name}</Text>
                          ))}
                        </View>
                        {favorites.some((favItem) => favItem.itunes.block === item.itunes.block) && (
                          <TouchableOpacity
                            style={styles.rssRightCon}
                            onPress={() => {
                              handleFavoriteToggle(item);
                            }}
                          >
                            <Ionicons
                              name="heart"
                              size={24}
                              color="#25c925"
                              style={styles.favico}
                            />
                          </TouchableOpacity>
                        )}

                      </View>
                    </View>
                  </LinearGradient>
                </TouchableOpacity>
              </Swipeable>
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
