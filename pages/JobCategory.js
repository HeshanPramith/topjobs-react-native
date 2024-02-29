import React, { useEffect, useState, useLayoutEffect } from "react";
import {
  View,
  Text,
  StatusBar,
  TouchableOpacity,
  ScrollView,
  Image,
  TextInput,
} from "react-native";
import { useNavigation, useIsFocused, useRoute } from "@react-navigation/native";
import Parser from "react-native-rss-parser";
import { Feather } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import styles from "../assets/styles/styles";
import AppNavigator from "../configs/AppNavigator";
import { useToast } from '@siteed/react-native-toaster';
import Icon from "react-native-vector-icons/FontAwesome6";
import rssLinksWithAlias from "../configs/rssData";
import FontAwesome6 from "react-native-vector-icons/FontAwesome6";
import { LinearGradient } from "expo-linear-gradient";
import { useFonts } from "expo-font";
import TextTicker from 'react-native-text-ticker'

const JobCategory = () => {
  const navigation = useNavigation();
  const isFocused = useIsFocused();
  const route = useRoute();
  const { selectedCategory } = route.params;
  const [rssData, setRssData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const toaster = useToast();
  const [previousCounts, setPreviousCounts] = useState({});
  const [searchQuery, setSearchQuery] = useState('');

  const [fontsLoaded] = useFonts({
    verdana: require("../assets/fonts/verdana.ttf"),
    verdanaBold: require("../assets/fonts/verdana-bold.ttf"),
  });

  useLayoutEffect(() => {
    StatusBar.setBarStyle("light-content");
    navigation.setOptions({
      headerLeft: () => (
        <TouchableOpacity style={{ marginLeft: 15 }} onPress={() => navigation.goBack()}>
          <Icon name="arrow-left" size={20} color="white" />
        </TouchableOpacity>
      ),
    });
  }, [navigation]);

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

  // Function to filter rssData based on searchQuery
  const filteredData = rssData.filter(item => {
    return item.alias.toLowerCase().includes(searchQuery.toLowerCase());
  });

  if (!fontsLoaded || loading) {
    return null;
  }

  const predefinedColors = ['#27ae60', '#c0392b', '#e67e22', '#783ce7','#3498db', '#9b59b6', '#34495e', '#d1bc01'];

  let colorIndex = 0;

  return (
    <View style={styles.mainsContainerHotjob} backgroundColor={'#F6F7F9'}>
      <View style={styles.buttonContainer}>
        <Text style={styles.comTitles}>All Job Categories</Text>
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
      <View style={styles.searchContainerJobc}>
        <TextInput
          style={styles.searchInputJobc}
          placeholder="Search Job Category..."
          value={searchQuery}
          placeholderTextColor={'#000000'}
          fontSize={14}
          onChangeText={text => setSearchQuery(text)}
        />
        <View style={styles.searchIconContainerJobc}>
          <Feather name="search" size={24} color="#000000" />
        </View>
      </View>
      {refreshing ? (
        <View style={styles.scrollViewMainRef}>
          <Image
            source={require('../assets/images/infinity.gif')}
            style={{ width: 100, height: 100 }}
          />
        </View>
      ) : (
        <ScrollView contentContainerStyle={styles.gridContainer}>
          {filteredData.map(({ link, alias, itemCount, increaseCount }) => {
            const rssLinkData = rssLinksWithAlias.find(data => data.link === link);
            const iconName = rssLinkData?.icon || "briefcase";
            if (itemCount === 0) {
              return null; // Skip rendering TouchableOpacity if itemCount is 0
            }
            const color = predefinedColors[colorIndex];
            colorIndex = (colorIndex + 1) % predefinedColors.length;
            const isSelected = alias === selectedCategory;
            return (              
              <TouchableOpacity
                key={link}
                onPress={() => handleRssLinkClick(link, alias)}
                style={[
                  styles.gridItem, 
                  isSelected && styles.selectedCategory
                  //{ backgroundColor: color }
                ]}
              >
                <View style={styles.gridBlockIcon}>
                  <Icon name={iconName} size={24} style={[
                    styles.gridBlockiconStyle, 
                    isSelected && styles.gridBlockTxtAct
                    //{ color: color }
                    ]} />
                </View>
                <TextTicker
                  style={[
                    // styles.gridBlockTxt, 
                    isSelected && styles.gridBlockTxtAct
                  ]}
                  duration={6000} // Adjust duration as needed
                  loop // Loop the animation
                  bounce // Bounce animation
                  repeatSpacer={50} // Repeat spacer
                  marqueeDelay={2500} // Delay before starting the animation
                  isInteraction={true} // Allow interaction
                  useNativeDriver={true} // Use native driver for performance
                >
                  {alias}
                </TextTicker>
                <Text style={[styles.gridBlockCount, isSelected && styles.gridBlockTxtAct]}>Jobs : {itemCount}</Text>
                {increaseCount > 0 && increaseCount !== previousCounts[link] ? (
                  <Text style={styles.rssLinkButtonCountIncre}>
                    New : {increaseCount}
                  </Text>
                ) : null}
              </TouchableOpacity>
            );
          })}
        </ScrollView>
      )}
      <LinearGradient
        colors={["#F6F7F900", "#f6f7f9c2", "#F6F7F9"]}
        style={styles.gradWrapperInner}
        >
      </LinearGradient>
      <AppNavigator />
    </View>
  );
};

export default JobCategory;

