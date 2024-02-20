import React, { useEffect, useState } from "react";
import { View, Text, useWindowDimensions, TouchableOpacity, Linking, Share, Image, Modal, TouchableWithoutFeedback, ScrollView } from 'react-native';
import { TabView, TabBar } from 'react-native-tab-view';
import { useNavigation } from '@react-navigation/native';
import styles from "../assets/styles/styles";
import MapViewTab from '../widgets/MapViewTab'; // Import MapViewTab
import axios from 'axios';
import DetailTab from '../widgets/DetailTab';
import FontAwesome6 from "react-native-vector-icons/FontAwesome6";
import { Ionicons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useToast } from '@siteed/react-native-toaster';
import { LinearGradient } from "expo-linear-gradient";

const JobDetailView = ({ route }) => {
  const { jobData } = route.params;
  const [isFavorite, setIsFavorite] = useState(false);
  const [latitude, setLatitude] = useState(null);
  const [longitude, setLongitude] = useState(null);
  const [mapLoading, setMapLoading] = useState(true);
  const navigation = useNavigation();
  const toaster = useToast();

  const [selectedItem, setSelectedItem] = useState(null);

  // Function to render location text with popup for multiple towns
  const renderLocationText = (jobData) => {
    if (jobData.itunes.explicit.includes(',')) {
      const towns = jobData.itunes.explicit.split(',');
      return (
        <TouchableOpacity onPress={() => setSelectedItem(jobData)}>
          <View style={{ flexDirection: 'row', marginBottom: -4 }}>
            <Text style={styles.jobDetailViewLoc}>{towns[0]}</Text>
            <Text style={styles.jobDetailViewLoc}>, +{towns.length - 1} more</Text>
          </View>
        </TouchableOpacity>
      );
    } else {
      return <Text style={styles.jobDetailViewLoc}>{jobData.itunes.explicit}</Text>;
    }
  };

  const handleRssLinkClick = (jobData) => {
    const link = `http://123.231.114.194:7181/employer/JobAdvertismentServlet?ac=${jobData.itunes.subtitle}&jc=${jobData.itunes.block}&ec=${jobData.id}`;
    Linking.openURL(link).catch((err) =>
      console.error("Error opening link:", err)
    );
  };

  const handleShareJobLink = () => {
    const link = `http://123.231.114.194:7181/employer/JobAdvertismentServlet?ac=${jobData.itunes.subtitle}&jc=${jobData.itunes.block}&ec=${jobData.id}`;
    Share.share({
      message: link,
    })
      .then(result => console.log(result))
      .catch(error => console.log(error));
  };

  const fetchCoordinates = async () => {
    try {
      if (jobData && jobData.itunes && jobData.itunes.explicit) {
        const location = encodeURIComponent(jobData.itunes.explicit + ', Sri Lanka');
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
    } finally {
      setMapLoading(false); // Set map loading to false when coordinates are fetched
    }
  };

  useEffect(() => {
    fetchCoordinates();
  }, [jobData]);

  useEffect(() => {
    checkIfFavorite();
  }, []);

  const checkIfFavorite = async () => {
    try {
      const favoritesData = await AsyncStorage.getItem("favorites");
      if (favoritesData) {
        const favorites = JSON.parse(favoritesData);
        const isFav = favorites.some((favItem) => favItem.itunes.block === jobData.itunes.block);
        setIsFavorite(isFav);
      }
    } catch (error) {
      console.error("Error checking favorite:", error);
    }
  };

  const handleFavoriteToggle = async () => {
    try {
      let favorites = [];
      const favoritesData = await AsyncStorage.getItem("favorites");
      if (favoritesData) {
        favorites = JSON.parse(favoritesData);
      }
      const existingIndex = favorites.findIndex((favItem) => favItem.itunes.block === jobData.itunes.block);
      if (existingIndex !== -1) {
        favorites.splice(existingIndex, 1);
        setIsFavorite(false);
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
        favorites.push(jobData);
        setIsFavorite(true);
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
      await AsyncStorage.setItem("favorites", JSON.stringify(favorites));
    } catch (error) {
      console.error("Error toggling favorite:", error);
    }
  };

  const layout = useWindowDimensions();

  const [index, setIndex] = React.useState(0);
  const [routes] = React.useState([
    { key: 'detail', title: 'Job Description', icon: 'eye' },
    { key: 'mapview', title: 'Company', icon: 'map-location-dot' },
  ]);

  const orderAliasMapping = {
    '5': 'Private Full time',
    '6': 'Private Part time',
    '9': 'Government Full time',
    '10': 'Government Part time',
    '17': 'NGO Full time',
    '18': 'NGO Part time'
  };

  return (
    <>
      <View style={styles.jobDetailVIewWrapper}>
        <View style={styles.jobDetailVIew}>
          <View style={styles.jobDataTopBlock}>
            {jobData.itunes.summary ? (
              <View style={styles.jobDetailViewLogoCom}>
                <Image
                  source={{ uri: `http://123.231.114.194:7181/logo/${jobData.itunes.summary}` }}
                  style={{ width: 100, height: 80 }}
                  resizeMode="contain"
                />
              </View>
            ) : (
              <Text>No logo available</Text>
            )}
            <Text style={styles.jobDetailViewTitle}>{jobData.title.trim().replace(/\s+/g, ' ')}</Text>
            <Text style={styles.jobDetailViewLoc}>{renderLocationText(jobData)}, Sri Lanka</Text>
            <View style={{ flexDirection: 'row' }}>
              <Text style={styles.jobDetailViewTag}>{orderAliasMapping[jobData.itunes.order]}</Text>
              {jobData.categories.map((categoryObject, index) => (
                <Text style={styles.jobDetailViewTagCal} key={index}><FontAwesome6 name="calendar-days" style={styles.jobDetailViewTagIco} />  {categoryObject.name}</Text>
              ))}
            </View>
          </View>
          <View style={{ flex: 1 }}>
            <LinearGradient
              colors={['#ffffff', '#f3f3f39d']} // Adjust gradient colors as needed
              style={styles.jobDataBottomBlock}
            >
              <TabView
                navigationState={{ index, routes }}
                renderScene={({ route }) => {
                  switch (route.key) {
                    case 'detail':
                      return <DetailTab jobData={jobData} />;
                    case 'mapview':
                      return <MapViewTab latitude={latitude} longitude={longitude} mapLoading={mapLoading} jobData={jobData} />;
                    default:
                      return null;
                  }
                }}
                renderTabBar={props => (
                  <TabBar
                    {...props}
                    style={{ backgroundColor: '#f3f3f39d', height: 35, elevation: 0, borderRadius: 30, width: 300, justifyContent: 'center', alignSelf: 'center', marginBottom: 10 }} // Set fixed width and align center
                    indicatorStyle={{ backgroundColor: '#8b0000', height: 35, borderRadius: 30, justifyContent: "center", alignItems: "center" }} // Active indicator color
                    // style={{ backgroundColor: '#ffffffff', height: 30, elevation: 0, borderRadius: 30, width: 300, justifyContent: "center" }} // TabBar background color
                    renderLabel={({ route, focused }) => (
                      <View style={{ flexDirection: 'row', alignItems: 'center', borderRadius: 30, }}>
                        <FontAwesome6 style={{ marginRight: 5, marginTop: -15 }} name={route.icon} size={14} color={focused ? '#ffffff' : '#464646a2'} />
                        <Text style={{ color: focused ? '#ffffff' : '#464646a2', fontWeight: "500", position: "relative", top: -8 }}>{route.title}</Text>
                      </View>
                    )}
                  />
                )}
                onIndexChange={setIndex}
                initialLayout={{ width: layout.width }}
                animationEnabled={true}
              />
            </LinearGradient>
          </View>
        </View>
      </View>
      <LinearGradient
        colors={["#ffffff00", "#ffffffff"]}
        style={styles.gradWrapper}
        >
      </LinearGradient>
      <View style={styles.modalContentFooter}>
        <TouchableOpacity style={styles.closeQuickViewButton} onPress={() => navigation.goBack()}>
          <FontAwesome6 name="arrow-left" style={styles.closeQuickViewButtonIcon} />
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.openVacancyButton}
          onPress={() => {
            handleRssLinkClick(jobData);
          }}
        >
          <FontAwesome6 name="share-from-square" style={styles.openVacancyButtonIcon} />
          <Text style={styles.openVacancyButtonText}>Open Vacancy</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.shareVacancyButton}
          onPress={() => {
            handleShareJobLink();
          }}
        >
          <FontAwesome6 name="share-nodes" style={styles.shareVacancyButtonIcon} />
        </TouchableOpacity>
        <TouchableOpacity
          style={isFavorite ? styles.togVacancyButton : styles.togVacancyButtonIn}
          onPress={handleFavoriteToggle}
        >
          <Ionicons name={isFavorite ? "heart" : "heart-outline"} style={isFavorite ? styles.togVacancyButtonIcon: styles.togVacancyButtonIconIn} />
        </TouchableOpacity>
      </View>
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
    </>
  );
};

export default JobDetailView;
