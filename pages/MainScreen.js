import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StatusBar,
  TouchableOpacity,
  ScrollView,
  Image,
} from "react-native";
import { useNavigation, useIsFocused } from "@react-navigation/native";
import Parser from "react-native-rss-parser";
import AsyncStorage from "@react-native-async-storage/async-storage";
import styles from "../assets/styles/styles";
import AppNavigator from "../configs/AppNavigator";
import { useToast } from '@siteed/react-native-toaster';
import Icon from "react-native-vector-icons/FontAwesome6";
import { Ionicons } from "@expo/vector-icons";
import rssLinksWithAlias from "../configs/rssData";
import FontAwesome6 from "react-native-vector-icons/FontAwesome6";

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

  // Function to render location text with popup for multiple towns
  const renderLocationText = (item) => {
    if (item.itunes.explicit.includes(',')) {
      const towns = item.itunes.explicit.split(',');
      return (
        <TouchableOpacity onPress={() => setSelectedItem(item)}>
          <View style={{ flexDirection: 'row' }}>
            <Text>{towns[0]}</Text>
            <Text>, +{towns.length - 1} more</Text>
          </View>
        </TouchableOpacity>
      );
    } else {
      return <Text>{item.itunes.explicit}</Text>;
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

  const backgroundColors = ['#7440FC', '#27c7e2', '#3374FF', '#ad00a5', '#00a12b'];

  const formatDateMonthDate = (date) => {
    const month = date.toLocaleString('default', { month: 'short' });
    const day = date.getDate();
    return `${month} ${day}`;
  };

  return (
    <View style={styles.mainsContainerHotjob}>
      <View style={styles.commContainer}>
        <Text style={styles.comTitles}>Hotjobs</Text>
      </View>
      <View style={styles.hotJobsWraper}>
        <View style={styles.hotJobs}>
          {loadingDefzz ? (
            <Image
              source={require('../assets/images/infinity.gif')}
              style={{ width: 70, height: 70 }}
            />
          ) : (
            <ScrollView horizontal={true}>
              {filteredItems.map((item, index) => (
                <View key={index} style={[styles.eachJob, { backgroundColor: backgroundColors[index % backgroundColors.length] }]}>
                  <View style={{ flexDirection: 'row' }}>
                    <View style={styles.imgEach}>
                      {item.itunes.summary ? (
                        <Image
                          source={{ uri: `http://123.231.114.194:7181/logo/${item.itunes.summary}` }}
                          style={{ width: '100%', height: 50, borderRadius: 5 }}
                        />
                      ) : (
                        <Text>{item.itunes.summary}</Text>
                      )}
                    </View>
                    {item.categories.map((categoryObject) => (
                      <View style={styles.dateTags}>
                        <Text style={[styles.bigDateText, { color: backgroundColors[index % backgroundColors.length] }]}>{formatDateMonthDate(new Date(categoryObject.name))}</Text>
                        <Text style={[styles.smallDateText, { color: backgroundColors[index % backgroundColors.length] }]}>{new Date(categoryObject.name).getFullYear()}</Text>                        
                      </View>
                    ))}
                  </View>
                  <Text style={styles.eachTgTitle} numberOfLines={1} ellipsizeMode="tail">{item.title.trim().replace(/\s+/g, ' ')}</Text>
                  <Text style={styles.eachTgSub} numberOfLines={1} ellipsizeMode="tail">{item.itunes.duration}</Text>
                  <Text style={styles.eachTgSub} numberOfLines={1} ellipsizeMode="tail">{renderLocationText(item)}</Text>
                  <View style={styles.jobDetailViewTagHot}>{/* Updated style here */}
                    <Text style={styles.jobDetailViewTagHotText}>{orderAliasMapping[item.itunes.order]}</Text>
                  </View>
                  {/* <Text>{item.itunes.subtitle}</Text> */}
                </View>
              ))}
            </ScrollView>
          )}
        </View>
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
            {refreshing ? (
              <Ionicons
                name="eye"
                size={20}
                color="#000000"
              />
            ) : (
              <FontAwesome6 name="arrows-rotate" size={20} color="#000000" />
              // <Ionicons
              //   name="arrows-rotate"
              //   size={20}
              //   color="#000000"
              // />
            )}
            {/* <Text style={styles.buttonText2}>{refreshing ? "Gathering New Data" : "Get Latest Vacancies"}</Text> */}
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
          {rssData.map(({ link, alias, itemCount, increaseCount }) => {
            const rssLinkData = rssLinksWithAlias.find(data => data.link === link);
            const iconName = rssLinkData?.icon || "briefcase";

            return (              
              <TouchableOpacity
                key={link}
                onPress={() => handleRssLinkClick(link, alias)}
                style={styles.rssLinkButton}
              >

                <View style={styles.rssLinkButtonICon}>
                  <Icon name={iconName} size={18} color="#000" style={styles.iconStyle} />
                </View>
                <Text style={styles.rssLinkButtonTxt}>{alias}</Text>
                <Text style={styles.rssLinkButtonCount}>
                  {itemCount}
                </Text>
                {increaseCount > 0 && (
                  <Text style={styles.rssLinkButtonCountIncre}>
                    New : {increaseCount}
                  </Text>
                )}

                {itemCount === 0 ? (
                  <View style={[styles.redCircleIndicator, styles.cirIndi]}></View>
                ) : (
                  <View style={[styles.greenCircleIndicator, styles.cirIndi]}></View>
                )}
              </TouchableOpacity>
            );
          })}
        </ScrollView>
      )}
      <AppNavigator />
    </View>
  );
};

export default MainScreen;

