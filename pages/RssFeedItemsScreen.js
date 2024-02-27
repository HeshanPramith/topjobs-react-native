import React, { useEffect, useState, useCallback, useLayoutEffect } from "react";
import { View, Text, TextInput, FlatList, StatusBar, TouchableOpacity, TouchableWithoutFeedback, Keyboard, Linking, Image, Modal, ScrollView, } from "react-native";
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
import axios from 'axios';
import FontAwesome6 from "react-native-vector-icons/FontAwesome6";
import TextTicker from 'react-native-text-ticker';

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
  const [selectedOrderFilter, setSelectedOrderFilter] = useState(""); // State for selected order filter
  const [isOrderModalVisible, setIsOrderModalVisible] = useState(false); // State for order modal visibility
  const [quickViewData] = useState(null); // State for quick view popup data
  const swipeableRefs = {};

  const locationOptions = ["All Locations", ...new Set(rssItems.map(item => item.itunes.explicit))];
  const orderOptions = ["All Job Types", ...new Set(rssItems.map(item => item.itunes.order))];

  const [setLatitude] = useState(null);
  const [setLongitude] = useState(null);

  const handleJobItemPress = useCallback((item) => {
    navigation.navigate('JobDetailView', { jobData: item });
  }, [navigation]);

  const handleCategoryChange = () => {
    navigation.navigate('JobCategory', { selectedCategory: alias });
  };

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <TouchableOpacity style={{ marginRight: 15 }} onPress={handleCategoryChange}>
          <FontAwesome6 name="arrows-turn-to-dots" size={20} color="white"/>
        </TouchableOpacity>
      ),
    });
  }, [navigation, handleCategoryChange])

  useEffect(() => {
    const fetchCoordinates = async () => {
      try {
        if (quickViewData && quickViewData.itunes && quickViewData.itunes.explicit) {
          const location = encodeURIComponent(quickViewData.itunes.explicit + ', Sri Lanka');
          const apiKey = 'e198933baaa244ca9173d6be9f553c0f'; // Replace 'YOUR_API_KEY' with your actual API key
          const response = await axios.get(`https://api.opencagedata.com/geocode/v1/json?q=${location}&key=${apiKey}`);
          
          if (response.data && response.data.results.length > 0) {
            const { lat, lng } = response.data.results[0].geometry;
            setLatitude(lat);
            setLongitude(lng);
          }
        }
      } catch (error) {
        console.error("Error fetching coordinates:", error);
      }
    };
  
    fetchCoordinates();
  }, [quickViewData]);

  const orderAliasMapping = {
    '5': 'Private Full time',
    '6': 'Private Part time',
    '9': 'Government Full time',
    '10': 'Government Part time',
    '17': 'NGO Full time',
    '18': 'NGO Part time'
  };

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
        setRssItems(rss.items);
        navigation.setOptions({ title: `${alias || "RSS Feed Items"}` });
      })
      .catch((error) => console.error("Error fetching RSS feed:", error))
      .finally(() => setLoading(false));
  }, [rssLink, alias, navigation]);

  useFocusEffect(
    useCallback(() => {
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
    // Sort filtered items based on location filter and order filter
    const sortedItems = sortItems(filteredItems, selectedLocationFilter, selectedOrderFilter);
    setFilteredRssItems(sortedItems);
    setTotalJobs(sortedItems.length);
  }, [rssItems, searchQuery, selectedLocationFilter, selectedOrderFilter]);


  useEffect(() => {
    setTotalJobs(filteredRssItems.length);
  }, [filteredRssItems]);

  const sortItems = (items, location, order) => {
    let filteredItems = items;
    if (location !== "" && location !== "All Locations") {
      filteredItems = filteredItems.filter(item => item.itunes.explicit === location);
    }
    if (order !== "" && order !== "All Job Types") {
      filteredItems = filteredItems.filter(item => item.itunes.order === order);
    }
    return filteredItems;
  };

  const [selectedItem, setSelectedItem] = useState(null);

  // Function to render location text with popup for multiple towns
  const renderLocationText = (item) => {
    if (item.itunes.explicit.includes(',')) {
      const towns = item.itunes.explicit.split(',');
      return (
        <TouchableOpacity onPress={() => setSelectedItem(item)}>
          <View style={{ flexDirection: 'row' }}>
            <Text style={styles.rstxtloca}>{towns[0]}</Text>
            <Text style={styles.rstxtloca}>, +{towns.length - 1} more</Text>
          </View>
        </TouchableOpacity>
      );
    } else {
      return <Text style={styles.rstxtloca}>{item.itunes.explicit}</Text>;
    }
  };
  

  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <View style={styles.mainscontainer} keyboardShouldPersistTaps="handled" backgroundColor={'#F6F7F9'}>
        <View style={styles.headerContainer}>
          <View style={styles.searchContainer}>
            <TextInput
              style={styles.searchInput}
              placeholder="Job title, company or keyword"
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
            <FontAwesome6 style={styles.locatioIcon} name="location-dot"/>
          </TouchableOpacity>
          <TouchableOpacity style={styles.filterButton} onPress={() => setIsOrderModalVisible(true)}>
            <FontAwesome6 style={styles.locatioIcon} name="sliders"/>
          </TouchableOpacity>
        </View>
        <View style={styles.topBarSearch}>
          <Text style={styles.jobTotalFil}>Results for '<Text style={styles.boldText}>{searchQuery ? searchQuery : 'All jobs'}</Text>'</Text>
          <Text style={styles.jobTotalResult}>{totalJobs} Results</Text>
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
                <Text style={styles.modalTitle}>Select Job Location - <Text style={styles.modalTitleSub}> {selectedLocationFilter || "All Locations"}</Text>
                </Text>
                <ScrollView style={{ maxHeight: "100%", height: 'auto' }}>
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
        <Modal
          visible={isOrderModalVisible}
          animationType="fade"
          transparent={true}
          onRequestClose={() => setIsOrderModalVisible(false)}
        >
          <TouchableWithoutFeedback onPress={() => setIsOrderModalVisible(false)}>
            <View style={styles.modalContainer}>
              <View style={styles.modalContent}>
                <Text style={styles.modalTitle}>Select Job Type - <Text style={styles.modalTitleSub}> {orderAliasMapping[selectedOrderFilter] || "All Job Types"}</Text>
                </Text>
                <ScrollView style={{ maxHeight: "100%", height: 'auto' }}>
                  {orderOptions.map(option => (
                    <TouchableOpacity
                      key={option}
                      style={[
                        styles.modalOption,
                        option === selectedOrderFilter && styles.selectedOrderOption // Apply different style for selected option
                      ]}
                      onPress={() => {
                        setSelectedOrderFilter(option);
                        setIsOrderModalVisible(false); // Close modal
                      }}
                    >
                      <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                        <Text style={[
                          styles.modalOptionItm,
                          option === selectedOrderFilter && styles.modalOptionItmCheck // Apply different style for selected option
                        ]}>{orderAliasMapping[option] || option}</Text>
                        {option === selectedOrderFilter && (
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
                    colors={["#ffffffff", "#ffffffff"]}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 1 }}
                    style={[ styles.gradientContainer ]}
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
                          <Text style={[styles.rstxtttl, { flex: 1 }]} numberOfLines={1} ellipsizeMode="tail">
                            {item.title.trim().replace(/\s+/g, ' ')}
                          </Text>
                          <TextTicker
                            style={[styles.rstxt]}
                            duration={6000} // Adjust duration as needed
                            loop // Loop the animation
                            bounce // Bounce animation
                            repeatSpacer={50} // Repeat spacer
                            marqueeDelay={2500} // Delay before starting the animation
                            isInteraction={true} // Allow interaction
                            useNativeDriver={true} // Use native driver for performance
                          >
                            {item.description}
                          </TextTicker>
                          <Text style={styles.rstxt}>{item.itunes.duration}</Text>
                          <View style={{ flexDirection: 'row' }}>
                            <Text style={styles.rstxtloca}>{renderLocationText(item)}</Text>
                            {item.categories.map((categoryObject, index) => (
                              <Text style={styles.rstxtexp} key={index}> • {categoryObject.name}</Text>
                            ))}
                          </View>
                        </View>
                        <View style={styles.rssRightCon}>
                          {favorites.some((favItem) => favItem.itunes.block === item.itunes.block) && (
                            <TouchableOpacity
                              style={styles.rssRightConIconButton}
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
                          <TouchableOpacity
                            style={styles.rssRightConIconButton}
                            // onPress={() => handleQuickView(item)}
                            onPress={() => handleJobItemPress(item)}
                          >
                            <Ionicons
                              name="eye-sharp"
                              size={24}
                              color="#636363"
                              style={styles.favico}
                            />
                          </TouchableOpacity>
                        </View>
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
        <LinearGradient
          colors={["#F6F7F900", "#f6f7f9c2", "#F6F7F9"]}
          style={styles.gradWrapperInner}
          >
        </LinearGradient>
        <AppNavigator />   
        <Modal
          visible={selectedItem !== null}
          animationType="fade"
          transparent={true}
          onRequestClose={() => setSelectedItem(null)}
        >
          <TouchableWithoutFeedback onPress={() => setSelectedItem(null)}>
            <View style={styles.modalContainer}>
              <View style={styles.modalContent}>
                <View style={{ flexDirection: 'row' }}>
                  <Text style={styles.modalTitle}>All Towns</Text>
                  <TouchableOpacity onPress={() => setSelectedItem(null)} style={styles.closeButtonTown}>
                    <Ionicons name="close-circle-outline" size={24} color="#000" />
                  </TouchableOpacity>
                </View>
                <ScrollView style={{ maxHeight: "100%", height: 'auto' }}>
                  {selectedItem && selectedItem.itunes.explicit.split(',').map((town, index) => (
                    <View style={styles.townWrapper} key={index}>
                      <Text style={styles.modalOptionItm}>{town.trim()}</Text>
                    </View>
                  ))}
                </ScrollView>
              </View>
            </View>
          </TouchableWithoutFeedback>
        </Modal>
      </View>
    </TouchableWithoutFeedback>
  );
};

export default RssFeedItemsScreen;