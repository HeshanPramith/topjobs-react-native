import React, { useEffect, useState } from "react";
import { View, Text, TextInput, FlatList, StatusBar, TouchableOpacity, TouchableWithoutFeedback, Keyboard, Linking, ActivityIndicator, Image, Modal, ScrollView } from "react-native";
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
  const [selectedLocationFilter, setSelectedLocationFilter] = useState(""); // State for selected location filter
  const [isFilterModalVisible, setIsFilterModalVisible] = useState(false); // State for filter modal visibility
  const [lastSelectedLocation, setLastSelectedLocation] = useState(""); // State for last selected location
  const swipeableRefs = {};

  const locationOptions = ["All Locations", ...new Set(rssItems.map(item => item.itunes.explicit))];

  const handleRssLinkClick = (item) => {
    const link = `http://123.231.114.194:7181/employer/JobAdvertismentServlet?ac=${item.itunes.subtitle}&jc=${item.itunes.block}&ec=${item.id}`;
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
    // Filter items based on search query
    const filteredItems = rssItems.filter(
      (item) =>
        item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.itunes.duration.toLowerCase().includes(searchQuery.toLowerCase())
    );
    // Sort filtered items based on location filter
    const sortedItems = sortItemsByLocation(filteredItems, selectedLocationFilter);
    setFilteredRssItems(sortedItems);
    setTotalJobs(sortedItems.length);
  }, [rssItems, searchQuery, selectedLocationFilter]);

  useEffect(() => {
    setTotalJobs(filteredRssItems.length);
  }, [filteredRssItems]);

  const sortItemsByLocation = (items, location) => {
    if (location === "" || location === "All Locations") {
      // No location filter or "All Locations" selected, return items as is
      return items;
    } else {
      // Sort items based on location filter
      return items.filter(item => item.itunes.explicit === location);
    }
  };

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
        <View style={styles.headerContainer}>
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
          <TouchableOpacity style={styles.filterButton} onPress={() => setIsFilterModalVisible(true)}>
            {/* <Text>Filter by Location: {selectedLocationFilter || "All"}</Text> */}
            <Ionicons
            name={"location"}
            style={styles.locatioIcon}
          />
          </TouchableOpacity>
        </View>
        <Modal
          visible={isFilterModalVisible}
          animationType="fade"
          transparent={true}
          onRequestClose={() => setIsFilterModalVisible(false)}
        >
          <TouchableWithoutFeedback onPress={() => setIsFilterModalVisible(false)}>
            <View style={styles.modalContainer}>
              <View style={styles.modalContent}>
                <Text style={styles.modalTitle}>Select Job Location - {selectedLocationFilter || "All Locations"}</Text>
                <ScrollView style={{ maxHeight: "100%" }}>
                  {locationOptions.map(option => (
                    <TouchableOpacity
                      key={option}
                      style={[
                        styles.modalOption,
                        option === lastSelectedLocation && styles.selectedLocationOption // Apply different style for last selected option
                      ]}
                      onPress={() => {
                        setSelectedLocationFilter(option);
                        setLastSelectedLocation(option); // Update last selected location
                        setIsFilterModalVisible(false); // Close modal
                      }}
                    >
                      <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                        <Text style={[
                        styles.modalOptionItm,
                        option === lastSelectedLocation && styles.modalOptionItmCheck // Apply different style for last selected option
                      ]}>{option}</Text>
                        {option === selectedLocationFilter && (
                          <Ionicons name="checkmark-circle" size={20} color="#25c925" style={{ marginLeft: 10 }} />
                        )}
                      </View>
                    </TouchableOpacity>
                  ))}
                </ScrollView>
              </View>
            </View>
          </TouchableWithoutFeedback>
        </Modal>
        {loading ? (
          <View style={styles.activityIndicatorContainer}>
            <Image
              source={require('../assets/images/infinity.gif')}
              style={{ width: 100, height: 100 }}
            />
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
                              source={{ uri: `http://123.231.114.194:7181/logo/${item.itunes.summary}` }}
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
