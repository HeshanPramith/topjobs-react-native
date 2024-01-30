import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StatusBar,
  TouchableOpacity,
  ScrollView,
  ActivityIndicator,
  Button,
} from "react-native";
import { useNavigation } from "@react-navigation/native"; // Import navigation hook
import Parser from "react-native-rss-parser";
import AsyncStorage from "@react-native-async-storage/async-storage";
import styles from "../assets/styles/styles";
import AppNavigator from "./AppNavigator";

const MainScreen = () => {
  const navigation = useNavigation();
  const [rssData, setRssData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [favorites, setFavorites] = useState([]);
  const rssLinksWithAlias = [
    {
      link: "http://www.topjobs.lk/feeds/legasy/it_sware_db_qa_web_graphics_gis.rss",
      alias: "IT Software",
    },
    {
      link: "http://www.topjobs.lk/feeds/legasy/it_hware_networks_systems.rss",
      alias: "IT Hardware / Networks",
    },
    {
      link: "http://www.topjobs.lk/feeds/legasy/accounting_auditing_finance.rss",
      alias: "Accounting / Auditing / Finance",
    },
    {
      link: "http://www.topjobs.lk/feeds/legasy/banking_insurance.rss",
      alias: "Banking / Insurance",
    },
    {
      link: "http://www.topjobs.lk/feeds/legasy/sales_marketing_merchandising.rss",
      alias: "Sales / Marketing / Merchandising",
    },
    {
      link: "http://www.topjobs.lk/feeds/legasy/hr_training.rss",
      alias: "HR / Training",
    },
    {
      link: "http://www.topjobs.lk/feeds/legasy/corporate_management_analysts.rss",
      alias: "Corporate Management / Analysts",
    },
    {
      link: "http://www.topjobs.lk/feeds/legasy/office_admin_secretary_receptionist.rss",
      alias: "Office Admin / Secretarial",
    },
    {
      link: "http://www.topjobs.lk/feeds/legasy/civil_eng_interior_design_architecture.rss",
      alias: "Civil Eng / Interior Design / Architecture",
    },
    {
      link: "http://www.topjobs.lk/feeds/legasy/it_telecoms.rss",
      alias: "IT & Telecoms",
    },
    {
      link: "http://www.topjobs.lk/feeds/legasy/customer_relations_public_relations.rss",
      alias: "Customer Relations / Public Relations",
    },
    {
      link: "http://www.topjobs.lk/feeds/legasy/logistics_warehouse_transport.rss",
      alias: "Logistics / Warehouse / Transport",
    },
    {
      link: "http://www.topjobs.lk/feeds/legasy/eng_mech_auto_elec.rss",
      alias: "Engineering / Mechanical / Auto / Electrical",
    },
    {
      link: "http://www.topjobs.lk/feeds/legasy/manufacturing_operations.rss",
      alias: "Manufacturing / Operations",
    },
    {
      link: "http://www.topjobs.lk/feeds/legasy/media_advert_communication.rss",
      alias: "Media / Advertising / Communication",
    },
    {
      link: "http://www.topjobs.lk/feeds/legasy/HOTELS_RESTAURANTS_HOSPITALITY.rss",
      alias: "Hotels / Restaurants / Hospitality",
    },
    {
      link: "http://www.topjobs.lk/feeds/legasy/TRAVEL_TOURISM.rss",
      alias: "Travel / Tourism",
    },
    {
      link: "http://www.topjobs.lk/feeds/legasy/sports_fitness_recreation.rss",
      alias: "Sports / Fitness / Recreation",
    },
    {
      link: "http://www.topjobs.lk/feeds/legasy/hospital_nursing_healthcare.rss",
      alias: "Hospital / Nursing / Healthcare",
    },
    {
      link: "http://www.topjobs.lk/feeds/legasy/legal_law.rss",
      alias: "Legal / Law",
    },
    {
      link: "http://www.topjobs.lk/feeds/legasy/supervision_quality_control.rss",
      alias: "Supervision / Quality Control",
    },
    {
      link: "http://www.topjobs.lk/feeds/legasy/apparel_clothing.rss",
      alias: "Apparel / Clothing",
    },
    {
      link: "http://www.topjobs.lk/feeds/legasy/ticketing_airline_marine.rss",
      alias: "Ticketing / Airline / Marine",
    },
    {
      link: "http://www.topjobs.lk/feeds/legasy/EDUCATION.rss",
      alias: "Education",
    },
    {
      link: "http://www.topjobs.lk/feeds/legasy/rnd_science_research.rss",
      alias: "R&D / Science / Research",
    },
    {
      link: "http://www.topjobs.lk/feeds/legasy/agriculture_dairy_environment.rss",
      alias: "Agriculture / Dairy / Environment",
    },
    {
      link: "http://www.topjobs.lk/feeds/legasy/security.rss",
      alias: "Security",
    },
    {
      link: "http://www.topjobs.lk/feeds/legasy/fashion_design_beauty.rss",
      alias: "Fashion Design / Beauty",
    },
    {
      link: "http://www.topjobs.lk/feeds/legasy/international_development.rss",
      alias: "International Development",
    },
    {
      link: "http://www.topjobs.lk/feeds/legasy/kpo_bpo.rss",
      alias: "KPO / BPO",
    },
    {
      link: "http://www.topjobs.lk/feeds/legasy/imports_exports.rss",
      alias: "Imports / Exports",
    },
  ];

  useEffect(() => {
    StatusBar.setBarStyle("light-content");
    loadRssItemCounts();
  }, []);

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
      setRefreshing(true); // Start refreshing indicator
      const data = await Promise.all(
        rssLinksWithAlias.map(async ({ link, alias }) => {
          try {
            const response = await fetch(link);
            const text = await response.text();
            const parsedData = await Parser.parse(text);
            const itemCount = parsedData.items.length;
            return { link, alias, itemCount };
          } catch (error) {
            console.error(`Error fetching or parsing RSS feed for ${alias}:`, error);
            return { link, alias, itemCount: 0 };
          }
        })
      );

      setRssData(data);
      cacheData(data);
    } catch (error) {
      console.error("Error refreshing RSS item counts:", error);
    } finally {
      setRefreshing(false); // Stop refreshing indicator
    }
  };

  const handleRssLinkClick = (rssLink) => {
    navigation.navigate("RssFeedItemsScreen", { rssLink });
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

  const navigateToFavoriteItems = () => {
    navigation.navigate('FavoriteItemsScreen', { favorites });
  };

  return (
    <View style={styles.mainscontainer}>
      <View style={styles.buttonContainer}>
        <Button
          title={refreshing ? "Gathering New Data" : "Refresh"}
          onPress={refreshCacheData}
          disabled={refreshing}
        />
      </View>
      {refreshing ? (
        <ActivityIndicator size="large" color="#580000" />
      ) : (
        <ScrollView style={styles.scrollView}>
          {rssData.map(({ link, alias, itemCount }) => (
            <TouchableOpacity
              key={link}
              onPress={() => handleRssLinkClick(link)}
              style={styles.rssLinkButton}
            >
              <Text>
                {alias} - {itemCount}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      )}
      
      {/* <View style={styles.buttonContainer}>
        <Button
          title={'View Favorites'}
          onPress={navigateToFavoriteItems}
        />
      </View> */}
      <AppNavigator />
    </View>
  );
};


export default MainScreen;
