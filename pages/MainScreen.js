import React, { useEffect, useState, useCallback } from "react";
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

const MainScreen = () => {
  const navigation = useNavigation();
  const isFocused = useIsFocused();
  const [rssData, setRssData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const toaster = useToast();
  const [previousCounts, setPreviousCounts] = useState({});

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

  return (
    <View style={styles.mainscontainer}>
      <View style={styles.buttonContainer}>
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
            <Ionicons
              name="download"
              size={20}
              color="#000000"
              style={{ marginRight: 10 }}
            />
            <Text style={styles.buttonText2}>{refreshing ? "Gathering New Data" : "Latest Vacancies"}</Text>
          </View>
        </TouchableOpacity>
      </View>
      {refreshing ? (

        <Image
          source={require('../assets/images/infinity.gif')}
          style={{ width: 100, height: 100 }}
        />
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

