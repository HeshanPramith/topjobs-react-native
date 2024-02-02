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
import { useNavigation } from "@react-navigation/native";
import Parser from "react-native-rss-parser";
import AsyncStorage from "@react-native-async-storage/async-storage";
import styles from "../assets/styles/styles";
import AppNavigator from "../configs/AppNavigator";
import { useToast } from '@siteed/react-native-toaster';
import Icon from "react-native-vector-icons/FontAwesome6";

const MainScreen = () => {
  const navigation = useNavigation();
  const [rssData, setRssData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const toaster = useToast();
  const rssLinksWithAlias = [
    {
      link: "http://192.168.8.101/feeds/legasy/it_sware_db_qa_web_graphics_gis.rss",
      alias: "IT Software",
      icon: "pen-ruler",
    },
    {
      link: "http://192.168.8.101/feeds/legasy/it_hware_networks_systems.rss",
      alias: "IT Hardware / Networks",
      icon: "microchip",
    },
    {
      link: "http://192.168.8.101/feeds/legasy/accounting_auditing_finance.rss",
      alias: "Accounting / Auditing / Finance",
    },
    {
      link: "http://192.168.8.101/feeds/legasy/banking_insurance.rss",
      alias: "Banking / Insurance",
    },
    {
      link: "http://192.168.8.101/feeds/legasy/sales_marketing_merchandising.rss",
      alias: "Sales / Marketing / Merchandising",
    },
    {
      link: "http://192.168.8.101/feeds/legasy/hr_training.rss",
      alias: "HR / Training",
    },
    {
      link: "http://192.168.8.101/feeds/legasy/corporate_management_analysts.rss",
      alias: "Corporate Management / Analysts",
    },
    {
      link: "http://192.168.8.101/feeds/legasy/office_admin_secretary_receptionist.rss",
      alias: "Office Admin / Secretarial",
    },
    {
      link: "http://192.168.8.101/feeds/legasy/civil_eng_interior_design_architecture.rss",
      alias: "Civil Eng / Interior Design / Architecture",
    },
    {
      link: "http://192.168.8.101/feeds/legasy/it_telecoms.rss",
      alias: "IT & Telecoms",
    },
    {
      link: "http://192.168.8.101/feeds/legasy/customer_relations_public_relations.rss",
      alias: "Customer Relations / Public Relations",
    },
    {
      link: "http://192.168.8.101/feeds/legasy/logistics_warehouse_transport.rss",
      alias: "Logistics / Warehouse / Transport",
    },
    {
      link: "http://192.168.8.101/feeds/legasy/eng_mech_auto_elec.rss",
      alias: "Engineering / Mechanical / Auto / Electrical",
    },
    {
      link: "http://192.168.8.101/feeds/legasy/manufacturing_operations.rss",
      alias: "Manufacturing / Operations",
    },
    {
      link: "http://192.168.8.101/feeds/legasy/media_advert_communication.rss",
      alias: "Media / Advertising / Communication",
    },
    {
      link: "http://192.168.8.101/feeds/legasy/HOTELS_RESTAURANTS_HOSPITALITY.rss",
      alias: "Hotels / Restaurants / Hospitality",
    },
    {
      link: "http://192.168.8.101/feeds/legasy/TRAVEL_TOURISM.rss",
      alias: "Travel / Tourism",
    },
    {
      link: "http://192.168.8.101/feeds/legasy/sports_fitness_recreation.rss",
      alias: "Sports / Fitness / Recreation",
    },
    {
      link: "http://192.168.8.101/feeds/legasy/hospital_nursing_healthcare.rss",
      alias: "Hospital / Nursing / Healthcare",
    },
    {
      link: "http://192.168.8.101/feeds/legasy/legal_law.rss",
      alias: "Legal / Law",
    },
    {
      link: "http://192.168.8.101/feeds/legasy/supervision_quality_control.rss",
      alias: "Supervision / Quality Control",
    },
    {
      link: "http://192.168.8.101/feeds/legasy/apparel_clothing.rss",
      alias: "Apparel / Clothing",
    },
    {
      link: "http://192.168.8.101/feeds/legasy/ticketing_airline_marine.rss",
      alias: "Ticketing / Airline / Marine",
    },
    {
      link: "http://192.168.8.101/feeds/legasy/EDUCATION.rss",
      alias: "Education",
    },
    {
      link: "http://192.168.8.101/feeds/legasy/rnd_science_research.rss",
      alias: "R&D / Science / Research",
    },
    {
      link: "http://192.168.8.101/feeds/legasy/agriculture_dairy_environment.rss",
      alias: "Agriculture / Dairy / Environment",
    },
    {
      link: "http://192.168.8.101/feeds/legasy/security.rss",
      alias: "Security",
    },
    {
      link: "http://192.168.8.101/feeds/legasy/fashion_design_beauty.rss",
      alias: "Fashion Design / Beauty",
    },
    {
      link: "http://192.168.8.101/feeds/legasy/international_development.rss",
      alias: "International Development",
    },
    {
      link: "http://192.168.8.101/feeds/legasy/kpo_bpo.rss",
      alias: "KPO / BPO",
    },
    {
      link: "http://192.168.8.101/feeds/legasy/imports_exports.rss",
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

      setRssData(data);
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
        {rssData.map(({ link, alias, itemCount }) => {
          const rssLinkData = rssLinksWithAlias.find(data => data.link === link);
          const iconName = rssLinkData?.icon || "briefcase";

          return (
            <TouchableOpacity
              key={link}
              onPress={() => handleRssLinkClick(link, alias)}
              style={styles.rssLinkButton}
            >
              
              <View style={styles.rssLinkButtonICon}>
                <Icon name={iconName} size={20} color="#000" style={styles.iconStyle} />
              </View>
              <Text style={styles.rssLinkButtonTxt}>{alias}</Text>
              <Text style={styles.rssLinkButtonCount}>{itemCount}</Text>
              
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
