import React, { useEffect, useState, useCallback } from "react";
import {
  View,
  Text,
  StatusBar,
  TouchableOpacity,
  ScrollView,
  Image,
  Modal,
  TouchableWithoutFeedback
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation, useIsFocused } from "@react-navigation/native";
import Parser from "react-native-rss-parser";
import AsyncStorage from "@react-native-async-storage/async-storage";
import styles from "../assets/styles/styles";
import AppNavigator from "../configs/AppNavigator";
import { useToast } from '@siteed/react-native-toaster';
import Icon from "react-native-vector-icons/FontAwesome6";
import rssLinksWithAlias from "../configs/rssData";
import FontAwesome6 from "react-native-vector-icons/FontAwesome6";
import { LinearGradient } from "expo-linear-gradient";
import { useFonts } from "expo-font";

const MainScreen = () => {
  const navigation = useNavigation();
  const isFocused = useIsFocused();
  const [rssData, setRssData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [loadingDefzz, setLoadingDefzz] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const toaster = useToast();
  const [previousCounts, setPreviousCounts] = useState({});
  const [filteredItems, setFilteredItems] = useState([]);
  const [pinnedCategories, setPinnedCategories] = useState([]);
  const [hotJobsCount, setHotJobsCount] = useState(0);

  const [fontsLoaded] = useFonts({
    verdana: require("../assets/fonts/verdana.ttf"),
    verdanaBold: require("../assets/fonts/verdana-bold.ttf"),
  });

  useEffect(() => {
    const fetchAndFilterRSS = async () => {
      setLoadingDefzz(true); // Set loadingDefzz to true while fetching and filtering
      
      const allItems = [];
      const fetchPromises = rssLinksWithAlias.map(async (rssLink) => {
        try {
          const response = await fetch(rssLink.link);
          const rssData = await response.text();
          const parsedData = await Parser.parse(rssData);
          allItems.push(...parsedData.items);
        } catch (error) {
          console.error('Error fetching or parsing RSS:', error);
        }
      });
    
      // Fetch all RSS feeds concurrently
      await Promise.allSettled(fetchPromises);
    
      // Filter items based on itunes.subtitle === 'DEFZZZ'
      const filtered = allItems.filter(item => item.itunes && item.itunes.subtitle === 'DEFZZZ');
      setFilteredItems(filtered);
      setHotJobsCount(filtered.length);
    
      setLoadingDefzz(false); // Set loadingDefzz to false after fetching and filtering
    };

    fetchAndFilterRSS();
  }, []);

  useEffect(() => {
    StatusBar.setBarStyle("light-content");
    loadRssItemCounts();
  }, [isFocused]);

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      loadRssItemCounts();
    });

    return unsubscribe;
  }, [navigation]);

  const loadRssItemCounts = async () => {
    try {
      const cachedData = await getCachedData();
      if (cachedData) {
        setRssData(cachedData);
      } else {
        await refreshCacheData();
      }
    } catch (error) {
      console.error("Error loading RSS item counts:", error);
    } finally {
      setLoading(false);
    }
  };

  const refreshCacheData = async () => {
    try {
      setRefreshing(true);
      const data = await Promise.all(
        rssLinksWithAlias.map(async ({ link, alias }) => {
          try {
            const response = await fetch(link);
            const text = await response.text();
            const parsedData = await Parser.parse(text);
            const itemCount = parsedData.items.length;

            return { link, alias, itemCount };
          } catch (error) {
            console.error(
              `Error fetching or parsing RSS feed for ${alias}:`,
              error
            );
            return { link, alias, itemCount: 0 };
          }
        })
      );

      const newCounts = {};
      data.forEach(({ link, itemCount }) => {
        newCounts[link] = itemCount;
      });

      const updates = data.map(({ link, alias, itemCount }) => {
        const previousCount = previousCounts[link] || 0;
        const increaseCount = itemCount - previousCount;
        return {
          link,
          alias,
          itemCount,
          increaseCount
        };
      });

      setRssData(updates);

      const countsCopy = { ...previousCounts };
      data.forEach(({ link, itemCount }) => {
        countsCopy[link] = itemCount;
      });
      setPreviousCounts(countsCopy);

      cacheData(data);
    } catch (error) {
      console.error("Error refreshing RSS item counts:", error);
    } finally {
      setRefreshing(false);
    }
  };

  const handleRssLinkClick = async (rssLink, alias) => {
    try {
      const response = await fetch(rssLink);
      const text = await response.text();
      const parsedData = await Parser.parse(text);
      const itemCount = parsedData.items.length;

      if (itemCount === 0) {
        toaster.show({
          message: 'All vacancies filled',
          subMessage: 'No vacancies open at the moment.',
          type: 'warning',
          actionLabel: 'Close',
          iconVisible: true,
          iconStyle: {
            fontSize: 30,
          },
          snackbarStyle: {
            borderRadius: 10,
          },
          duration: 3000,
          action() {

          },
          position: "middle",
          subMessageStyle: {
            color: '#FFFFFF',
          },
        });
      } else {
        navigation.navigate("RssFeedItemsScreen", { rssLink, alias });
      }
    } catch (error) {
      console.error(`Error fetching or parsing RSS feed for ${alias}:`, error);
    }
  };

  const getCachedData = async () => {
    try {
      const cachedData = await AsyncStorage.getItem("rssDataCache");
      return cachedData ? JSON.parse(cachedData) : null;
    } catch (error) {
      console.error("Error retrieving cached data:", error);
      return null;
    }
  };

  const cacheData = async (data) => {
    try {
      await AsyncStorage.setItem("rssDataCache", JSON.stringify(data));
    } catch (error) {
      console.error("Error caching data:", error);
    }
  };

  const [selectedItem, setSelectedItem] = useState(null);

  // Function to render location text with popup for multiple towns
  const renderLocationText = (item) => {
    if (item.itunes.explicit.includes(',')) {
      const towns = item.itunes.explicit.split(',');
      return (
        <TouchableOpacity onPress={() => setSelectedItem(item)}>
          <View style={{ flexDirection: 'row' }}>
            <Text style={styles.eachTgSub}>{towns[0]}</Text>
            <Text style={styles.eachTgSub}>, +{towns.length - 1} more</Text>
          </View>
        </TouchableOpacity>
      );
    } else {
      return <Text style={styles.eachTgSub}>{item.itunes.explicit}</Text>;
    }
  };

  const orderAliasMapping = {
    '5': 'Private Full time',
    '6': 'Private Part time',
    '9': 'Government Full time',
    '10': 'Government Part time',
    '17': 'NGO Full time',
    '18': 'NGO Part time'
  };

  const backgroundColors = ['#27ae60', '#c0392b', '#e67e22', '#e74c3c','#3498db', '#9b59b6', '#34495e', '#e74c3c'];

  const dateColors = ['#27ae60', '#c0392b', '#e67e22', '#e74c3c', '#3498db', '#9b59b6', '#34495e', '#e74c3c'];

  const formatDateMonthDate = (date) => {
    const month = date.toLocaleString('default', { month: 'short' });
    const day = date.getDate();
    return `${month} ${day}`;
  };

  const handleRssLinkClickHotjob = useCallback((item) => {
    navigation.navigate('JobDetailView', { jobData: item });
  }, [navigation]);

  if (!fontsLoaded || loading) {
    return null;
  }

  // Function to toggle pin status of a category
  const togglePinCategory = (alias) => {
    if (pinnedCategories.includes(alias)) {
      setPinnedCategories(pinnedCategories.filter(item => item !== alias));
    } else {
      setPinnedCategories([...pinnedCategories, alias]);
    }
  };

  // Sort categories based on pin status
  const sortCategories = (a, b) => {
    if (pinnedCategories.includes(a.alias) && !pinnedCategories.includes(b.alias)) {
      return -1;
    } else if (!pinnedCategories.includes(a.alias) && pinnedCategories.includes(b.alias)) {
      return 1;
    } else {
      return 0;
    }
  };

  return (
    <View style={styles.mainsContainerHotjob}>
      <View style={styles.commContainer}>
        <View style={styles.commContainerRes}>
          <Text style={styles.comTitles}>Hot Jobs</Text>
          <Text style={styles.jobTotalResultHot}>({hotJobsCount} Results)</Text>
        </View>
      </View>
      <View style={styles.hotJobsWraper}>
        <View style={styles.hotJobs}>
          {loadingDefzz ? (
            <Image
              source={require('../assets/images/infinity.gif')}
              style={{ width: 70, height: 70 }}
            />
          ) : (
            <ScrollView horizontal={true} style={styles.borderRadiusMedium} showsHorizontalScrollIndicator={false}>
              {filteredItems.map((item, index) => (
                <TouchableOpacity
                  key={`filteredItem-${index}`}
                  onPress={() => {
                    handleRssLinkClickHotjob(item);
                  }}
                  activeOpacity={0.9}
                >
                  <View key={index} style={[styles.eachJob, { backgroundColor: backgroundColors[index % backgroundColors.length] }]}>
                    <View style={{ flexDirection: 'row' }}>
                      <View style={styles.imgEach}>
                        <Text style={{ fontFamily: 'verdanaBold' }}>topjobs</Text>
                        <Text style={{ fontFamily: 'verdana' }}>topAD</Text>
                      </View>
                      {item.categories.map((categoryObject, innerIndex) => (
                        <View key={innerIndex} style={styles.dateTags}>
                          <Text style={[styles.bigDateText, { color: dateColors[index % dateColors.length] }]}>{formatDateMonthDate(new Date(categoryObject.name))}</Text>
                          <Text style={[styles.smallDateText, { color: dateColors[index % dateColors.length] }]}>{new Date(categoryObject.name).getFullYear()}</Text>                        
                        </View>
                      ))}
                    </View>
                    <Text style={styles.eachTgTitle} numberOfLines={1} ellipsizeMode="tail">{item.title.trim().replace(/\s+/g, ' ')}</Text>
                    <Text style={styles.eachTgSub} numberOfLines={1} ellipsizeMode="tail">{item.itunes.duration}</Text>
                    <Text style={styles.eachTgSub} numberOfLines={1} ellipsizeMode="tail">{renderLocationText(item)}</Text>
                    <View style={{ flexDirection: 'row' }}>
                      <View style={styles.jobDetailViewTagHot}>
                        <Text style={styles.jobDetailViewTagHotText}>
                          {orderAliasMapping[item.itunes.order]}
                        </Text>
                      </View>
                      <View style={styles.jobDetailViewTagHot}>
                        <Text style={styles.jobDetailViewTagHotText}>topAD</Text>
                      </View>
                    </View>
                  </View>
                </TouchableOpacity>
              ))}
            </ScrollView>
          )}
        </View>
        {loadingDefzz ? (
            <View></View>
          ) : (
            <LinearGradient
              colors={["#F6F7F900", "#F6F7F9"]}
              start={{ x: 0, y: 0.9 }}
              end={{ x: 1, y: 0.9 }}
              style={styles.hotJobsHider}
            >
            </LinearGradient>
        )}
      </View>
      <View style={styles.buttonContainer}>
        <Text style={styles.comTitles}>Popular Categories</Text>
        <TouchableOpacity
          onPress={refreshCacheData}
          style={refreshing ? styles.lgiconButtonbgDeact : styles.lgiconButtonbg}
          disabled={refreshing}
        >
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <FontAwesome6 style={refreshing ? styles.refIconDeac : styles.refIcon} name="download"/>
            <Text style={refreshing ? styles.buttonText2Deac : styles.buttonText2}>{refreshing ? "Loading New Jobs" : "Get Latest Jobs"}</Text>
          </View>
        </TouchableOpacity>
      </View>
      {refreshing ? (
        <View style={styles.scrollViewMainRef}>
          <Image
            source={require('../assets/images/infinity.gif')}
            style={{ width: 100, height: 100 }}
          />
        </View>
      ) : (
        <ScrollView style={styles.scrollViewMain}>
          {rssData.slice().sort(sortCategories).map(({ link, alias, itemCount, increaseCount }) => {
            const rssLinkData = rssLinksWithAlias.find(data => data.link === link);
            const iconName = rssLinkData?.icon || "briefcase";
            if (itemCount === 0) {
              return null; // Skip rendering TouchableOpacity if itemCount is 0
            }
            return (    
              <View key={link} style={styles.categoryContainer}>         
                <TouchableOpacity
                  key={link}
                  onPress={() => handleRssLinkClick(link, alias)}
                  style={pinnedCategories.includes(alias) ? styles.rssLinkButtonAct : styles.rssLinkButton}
                >
                  <TouchableOpacity
                    onPress={() => togglePinCategory(alias)}
                    style={styles.pinButton}
                  >
                    <Ionicons name={pinnedCategories.includes(alias) ? "bookmark" : "bookmark-outline"} size={20} color="#25c925" style={{ marginRight: 10 }} />
                  </TouchableOpacity>
                  <View style={styles.rssLinkButtonICon}>
                    <Icon name={iconName} size={18} color="#000" style={styles.iconStyle} />
                  </View>
                  <Text style={styles.rssLinkButtonTxt}>{alias}</Text>
                  <Text style={styles.rssLinkButtonCount}>{itemCount}</Text>
                  {increaseCount > 0 && increaseCount !== previousCounts[link] ? (
                    <Text style={styles.rssLinkButtonCountIncre}>
                      New : {increaseCount}
                    </Text>
                  ) : null}
                </TouchableOpacity>
              </View> 
            );
          })}
          <View height={50}></View>
        </ScrollView>
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
  );
};

export default MainScreen;

