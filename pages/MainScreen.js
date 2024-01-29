import React, { useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  StatusBar,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { useNavigation } from "@react-navigation/native"; // Import navigation hook

const MainScreen = () => {
  const navigation = useNavigation();
  const rssLinksWithAlias = [
    {
      link: "http://www.topjobs.lk/feeds/legasy/it_sware_db_qa_web_graphics_gis.rss",
      alias: "IT Software",
    },
    {
      link: "http://www.topjobs.lk/feeds/legasy/it_hware_networks_systems.rss",
      alias: "IT Hardware & Networks",
    },
    {
      link: "http://www.topjobs.lk/feeds/legasy/accounting_auditing_finance.rss",
      alias: "Accounting & Finance",
    },
    {
      link: "http://www.topjobs.lk/feeds/legasy/banking_insurance.rss",
      alias: "Banking & Insurance",
    },
    {
      link: "http://www.topjobs.lk/feeds/legasy/sales_marketing_merchandising.rss",
      alias: "Sales & Marketing",
    },
    {
      link: "http://www.topjobs.lk/feeds/legasy/hr_training.rss",
      alias: "HR & Training",
    },
    {
      link: "http://www.topjobs.lk/feeds/legasy/corporate_management_analysts.rss",
      alias: "Corporate Management & Analysts",
    },
    {
      link: "http://www.topjobs.lk/feeds/legasy/office_admin_secretary_receptionist.rss",
      alias: "Office Admin & Secretarial",
    },
    {
      link: "http://www.topjobs.lk/feeds/legasy/civil_eng_interior_design_architecture.rss",
      alias: "Civil Eng, Interior Design & Architecture",
    },
    {
      link: "http://www.topjobs.lk/feeds/legasy/it_telecoms.rss",
      alias: "IT & Telecoms",
    },
    {
      link: "http://www.topjobs.lk/feeds/legasy/customer_relations_public_relations.rss",
      alias: "Customer Relations & Public Relations",
    },
    {
      link: "http://www.topjobs.lk/feeds/legasy/logistics_warehouse_transport.rss",
      alias: "Logistics, Warehouse & Transport",
    },
    {
      link: "http://www.topjobs.lk/feeds/legasy/eng_mech_auto_elec.rss",
      alias: "Engineering, Mechanical, Auto & Electrical",
    },
    {
      link: "http://www.topjobs.lk/feeds/legasy/manufacturing_operations.rss",
      alias: "Manufacturing & Operations",
    },
    {
      link: "http://www.topjobs.lk/feeds/legasy/media_advert_communication.rss",
      alias: "Media, Advertising & Communication",
    },
    {
      link: "http://www.topjobs.lk/feeds/legasy/HOTELS_RESTAURANTS_HOSPITALITY.rss",
      alias: "Hotels, Restaurants & Hospitality",
    },
    {
      link: "http://www.topjobs.lk/feeds/legasy/TRAVEL_TOURISM.rss",
      alias: "Travel & Tourism",
    },
    {
      link: "http://www.topjobs.lk/feeds/legasy/sports_fitness_recreation.rss",
      alias: "Sports, Fitness & Recreation",
    },
    {
      link: "http://www.topjobs.lk/feeds/legasy/hospital_nursing_healthcare.rss",
      alias: "Hospital, Nursing & Healthcare",
    },
    {
      link: "http://www.topjobs.lk/feeds/legasy/legal_law.rss",
      alias: "Legal & Law",
    },
    {
      link: "http://www.topjobs.lk/feeds/legasy/supervision_quality_control.rss",
      alias: "Supervision & Quality Control",
    },
    {
      link: "http://www.topjobs.lk/feeds/legasy/apparel_clothing.rss",
      alias: "Apparel & Clothing",
    },
    {
      link: "http://www.topjobs.lk/feeds/legasy/ticketing_airline_marine.rss",
      alias: "Ticketing, Airline & Marine",
    },
    {
      link: "http://www.topjobs.lk/feeds/legasy/EDUCATION.rss",
      alias: "Education",
    },
    {
      link: "http://www.topjobs.lk/feeds/legasy/rnd_science_research.rss",
      alias: "R&D, Science & Research",
    },
    {
      link: "http://www.topjobs.lk/feeds/legasy/agriculture_dairy_environment.rss",
      alias: "Agriculture, Dairy & Environment",
    },
    {
      link: "http://www.topjobs.lk/feeds/legasy/security.rss",
      alias: "Security",
    },
    {
      link: "http://www.topjobs.lk/feeds/legasy/fashion_design_beauty.rss",
      alias: "Fashion Design & Beauty",
    },
    {
      link: "http://www.topjobs.lk/feeds/legasy/international_development.rss",
      alias: "International Development",
    },
    {
      link: "http://www.topjobs.lk/feeds/legasy/kpo_bpo.rss",
      alias: "KPO & BPO",
    },
    {
      link: "http://www.topjobs.lk/feeds/legasy/imports_exports.rss",
      alias: "Imports & Exports",
    },
  ];

  useEffect(() => {
    // Set the status bar to light content
    StatusBar.setBarStyle("light-content");
  }, []);

  const handleRssLinkClick = (rssLink) => {
    // Navigate to the RSS feed items screen with the selected RSS link
    navigation.navigate("RssFeedItemsScreen", { rssLink });
  };

  return (
    <View style={styles.container}>
      <Text>Welcome to the Main Screen!</Text>
      <ScrollView style={styles.scrollView}>
        {rssLinksWithAlias.map(({ link, alias }, index) => (
          <TouchableOpacity
            key={link}
            onPress={() => handleRssLinkClick(link)}
            style={styles.rssLinkButton}
          >
            <Text>{alias}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  rssLinkButton: {
    marginTop: 10,
    padding: 10,
    backgroundColor: "#e0e0e0",
    borderRadius: 5,
  },
});

export default MainScreen;
