import React from 'react';
import { View, Image, ScrollView, Text, Linking, TouchableOpacity } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import styles from '../assets/styles/styles';
import FontAwesome6 from "react-native-vector-icons/FontAwesome6";

const mapStyle = [
  {
    elementType: 'geometry',
    stylers: [
      {
        color: '#242f3e',
      },
    ],
  },
  {
    elementType: 'labels.text.fill',
    stylers: [
      {
        color: '#746855',
      },
    ],
  },
  {
    elementType: 'labels.text.stroke',
    stylers: [
      {
        color: '#242f3e',
      },
    ],
  },
  {
    featureType: 'administrative.locality',
    elementType: 'labels.text.fill',
    stylers: [
      {
        color: '#ffffff',
      },
    ],
  },
  {
    featureType: 'poi',
    elementType: 'labels.text.fill',
    stylers: [
      {
        color: '#ffffff',
      },
    ],
  },
  {
    featureType: 'poi.park',
    elementType: 'geometry',
    stylers: [
      {
        color: '#263c3f',
      },
    ],
  },
  {
    featureType: 'poi.park',
    elementType: 'labels.text.fill',
    stylers: [
      {
        color: '#6b9a76',
      },
    ],
  },
  {
    featureType: 'road',
    elementType: 'geometry',
    stylers: [
      {
        color: '#38414e',
      },
    ],
  },
  {
    featureType: 'road',
    elementType: 'geometry.stroke',
    stylers: [
      {
        color: '#212a37',
      },
    ],
  },
  {
    featureType: 'road',
    elementType: 'labels.text.fill',
    stylers: [
      {
        color: '#9ca5b3',
      },
    ],
  },
  {
    featureType: 'road.highway',
    elementType: 'geometry',
    stylers: [
      {
        color: '#746855',
      },
    ],
  },
  {
    featureType: 'road.highway',
    elementType: 'geometry.stroke',
    stylers: [
      {
        color: '#1f2835',
      },
    ],
  },
  {
    featureType: 'road.highway',
    elementType: 'labels.text.fill',
    stylers: [
      {
        color: '#f3d19c',
      },
    ],
  },
  {
    featureType: 'transit',
    elementType: 'geometry',
    stylers: [
      {
        color: '#2f3948',
      },
    ],
  },
  {
    featureType: 'transit.station',
    elementType: 'labels.text.fill',
    stylers: [
      {
        color: '#d59563',
      },
    ],
  },
  {
    featureType: 'water',
    elementType: 'geometry',
    stylers: [
      {
        color: '#17263c',
      },
    ],
  },
  {
    featureType: 'water',
    elementType: 'labels.text.fill',
    stylers: [
      {
        color: '#515c6d',
      },
    ],
  },
  {
    featureType: 'water',
    elementType: 'labels.text.stroke',
    stylers: [
      {
        color: '#17263c',
      },
    ],
  },
];

const MapViewTab = ({ latitude, longitude, mapLoading, jobData }) => (
  <View style={{ flex: 1 }}>
    <ScrollView contentContainerStyle={styles.scrollViewContent}>
      <View style={styles.mapComLocateWrapper}>
        <Text style={styles.mapComLocate}>
          {jobData.itunes.duration}
        </Text>
        <TouchableOpacity
          style={styles.showGoogleMapsButton}
          onPress={() => {
            const query = encodeURIComponent(jobData.itunes.duration + ' Sri Lanka');
            const googleMapsUrl = `https://www.google.com/maps/search/?api=1&query=${query}`;
            Linking.openURL(googleMapsUrl).catch((err) =>
              console.error('Error opening Google Maps:', err)
            );
          }}
        >
          <FontAwesome6 name="map-location-dot" style={styles.mapIconViewLoc} />
        </TouchableOpacity>
      </View>
      <Text style={styles.mapNote}><FontAwesome6 name="circle-info" style={styles.mapIconView} /> Note: This is not a place for interviews</Text>
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
              scrollEnabled={true}
              zoomEnabled={true}
              zoomTapEnabled={true}
              customMapStyle={mapStyle}
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
    </ScrollView>
  </View>
);

export default MapViewTab;
