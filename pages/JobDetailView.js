import React, { useEffect, useState } from "react";
import { View, Text, Image, TouchableOpacity, Linking, ScrollView } from 'react-native';
import styles from '../assets/styles/styles';
import { useNavigation } from '@react-navigation/native';
import FontAwesome6 from "react-native-vector-icons/FontAwesome6";
import MapView, { Marker } from 'react-native-maps';
import axios from 'axios';

const JobDetailView = ({ route }) => {
  const { jobData } = route.params;
  const [latitude, setLatitude] = useState(null);
  const [longitude, setLongitude] = useState(null);
  const [mapLoading, setMapLoading] = useState(true);
  const navigation = useNavigation();

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
  }, [jobData]);;

  const orderAliasMapping = {
    '5': 'Private Full time',
    '6': 'Private Part time',
    '9': 'Government Full time',
    '10': 'Government Part time',
    '17': 'NGO Full time',
    '18': 'NGO Part time'
  };

  const handleRssLinkClick = (jobData) => {
    const link = `http://123.231.114.194:7181/employer/JobAdvertismentServlet?ac=${jobData.itunes.subtitle}&jc=${jobData.itunes.block}&ec=${jobData.id}`;
    Linking.openURL(link).catch((err) =>
      console.error("Error opening link:", err)
    );
  };

  return (
    <>
      <View style={{ flex: 1, backgroundColor: 'white' }}>
        <ScrollView contentContainerStyle={styles.scrollViewContent}>
          <View style={styles.mainsContainerDetail}>
            <View style={styles.rssLeftConImg}>
              {jobData.itunes.summary ? (
                <Image
                  source={{ uri: `http://123.231.114.194:7181/logo/${jobData.itunes.summary}` }}
                  style={{ width: '100%', height: 70, borderRadius: 5 }}
                  resizeMode="contain"
                />
              ) : (
                <Text>{jobData.itunes.summary}</Text>
              )}
            </View>
            <Text numberOfLines={1} ellipsizeMode="tail">
              {jobData.title.trim().replace(/\s+/g, ' ')}
            </Text>
            <Text>{jobData.description}</Text>
            <Text>{jobData.itunes.duration}</Text>
            <View style={{ flexDirection: 'row' }}>
              <Text style={styles.rstxtloca}>{jobData.itunes.explicit}</Text>
              {jobData.categories.map((categoryObject, index) => (
                <Text style={styles.rstxtexp} key={index}> • {categoryObject.name}</Text>
              ))}
            </View>
            <Text style={styles.quickViewDuration}>{orderAliasMapping[jobData.itunes.order]}</Text>
            <TouchableOpacity
              style={styles.openGoogleMapsButton}
              onPress={() => {
                const query = encodeURIComponent(jobData.itunes.duration + ' Sri Lanka');
                const googleMapsUrl = `https://www.google.com/maps/search/?api=1&query=${query}`;
                Linking.openURL(googleMapsUrl).catch((err) =>
                  console.error('Error opening Google Maps:', err)
                );
              }}
            >
              <Text style={styles.openGoogleMapsButtonText}>Open in Google Maps</Text>
            </TouchableOpacity>
            {mapLoading ? (
              <View style={styles.mapContainer}>
                <View style={styles.activityIndicatorContainer}>
                  <Image
                    source={require('../assets/images/map.gif')}
                    style={{ width: 80, height: 80 }}
                  />
                </View>
              </View>
            ) : (
              latitude !== null && longitude !== null && (
                <View style={styles.mapContainer}>
                  <MapView
                    style={styles.map}
                    region={{
                      latitude: latitude,
                      longitude: longitude,
                      latitudeDelta: 0.0522,
                      longitudeDelta: 0.0421,
                    }}
                    showsUserLocation={true}
                    showsMyLocationButton={true}
                    onMapReady={() => setMapLoading(false)} // Set mapLoading to false when map is ready
                  >
                    <Marker
                      coordinate={{ latitude: latitude, longitude: longitude }}
                      title={jobData.itunes.explicit}
                      description="Note: This is not a place for interviews"
                    />
                  </MapView>
                </View>
              )
            )}
          </View>
        </ScrollView>
        <View style={styles.modalContentFooter}>
          <TouchableOpacity style={styles.closeQuickViewButton} onPress={() => navigation.goBack()}>
            <FontAwesome6 name="arrow-left" style={styles.closeQuickViewButtonIcon} />
            <Text style={styles.closeQuickViewButtonText}>Back</Text>
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
        </View>
      </View>
    </>
  );
};

export default JobDetailView;
