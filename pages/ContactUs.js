import React, { useEffect, useState } from "react";
import {
    View,
    Text,
    StatusBar,
    TouchableOpacity,
    Linking,
    ScrollView
  } from "react-native";
import styles from "../assets/styles/styles";
import AppNavigator from "../configs/AppNavigator";
import { useFonts } from "expo-font";
import { userList } from "../configs/UserList";
import FontAwesome6 from "react-native-vector-icons/FontAwesome6";
import MapView, { Marker } from 'react-native-maps';
import { LinearGradient } from "expo-linear-gradient";

const ContactUs = () => {

  const [fontsLoaded] = useFonts({
    verdana: require("../assets/fonts/verdana.ttf"),
    verdanaBold: require("../assets/fonts/verdana-bold.ttf"),
  });

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    StatusBar.setBarStyle("light-content");
    setLoading(false);
  }, []);

  const handleCall = (phoneNumber) => {
    Linking.openURL(`tel:${phoneNumber}`);
  };

  if (!fontsLoaded || loading) {
    return null;
  }

  const randomColors = ['#27ae60', '#c0392b', '#e67e22', '#e74c3c','#3498db', '#9b59b6', '#34495e', '#e74c3c'];

  const handleEmailPostVcancy = () => {
    const subject = "topjobs - New Advertisement";
    const body = `topjobs,\n\nYour Name * :\n\nEnter Your Email * :\n\nYour Phone Number * :\n\nEnter Your Message * :\n\n`;
    Linking.openURL(`mailto:ads@topjobs.lk?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`);
  };

  const handleEmailSupport = () => {
    const subject = "topjobs - Applicant Support";
    const body = `topjobs,\n\nYour Name * :\n\nEnter Your Email * :\n\nYour Phone Number * :\n\nEnter Your Message * :\n\n`;
    Linking.openURL(`mailto:support@topjobs.lk?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`);
  };

  const handleEmailTopEmp = () => {
    const subject = "topjobs - Top Employer";
    const body = `topjobs,\n\nYour Name * :\n\nEnter Your Email * :\n\nYour Phone Number * :\n\nEnter Your Message * :\n\n`;
    Linking.openURL(`mailto:support@topjobs.lk?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`);
  };

  const handleEmailOtherEnq = () => {
    const subject = "topjobs - Other Enquiries";
    const body = `topjobs,\n\nYour Name * :\n\nEnter Your Email * :\n\nYour Phone Number * :\n\nEnter Your Message * :\n\n`;
    Linking.openURL(`mailto:support@topjobs.lk?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`);
  };

  const handleEmailFault = () => {
    const subject = "topjobs - Fault Notice";
    const body = `topjobs,\n\nYour Name * :\n\nEnter Your Email * :\n\nYour Phone Number * :\n\nEnter Your Message * :\n\n`;
    Linking.openURL(`mailto:ads@topjobs.lk?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`);
  };

  const handleEmailFeedback = () => {
    const subject = "topjobs - Feedback Message";
    const body = `topjobs,\n\nYour Name * :\n\nEnter Your Email * :\n\nYour Phone Number * :\n\nEnter Your Message * :\n\n`;
    Linking.openURL(`mailto:feedback@topjobs.lk?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`);
  };

  const handleEmailTestimonials = () => {
    const subject = "topjobs - Testimonials";
    const body = `topjobs,\n\nYour Name * :\n\nYour Company * :\n\nEnter Your Email * :\n\nYour Phone Number * :\n\nJob Title :\n\nLocation :\n\nHow did topjobs help you? * :\n\n`;
    Linking.openURL(`mailto:support@topjobs.lk?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`);
  };

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
  
  return (
    <View style={styles.mainsContainerContact} backgroundColor={'#F6F7F9'}>
      <Text style={[styles.loginTextContact, { fontFamily: 'verdanaBold' }]}>topjobs</Text>
      <ScrollView marginTop={10}>
        <View style={styles.contactUsWraper}>
          <Text style={styles.contactMainTitle}><Text style={{ fontFamily: 'verdanaBold', color: '#c00000' }}>topjobs</Text> To post vacancies</Text>
          <Text style={styles.contactSubTitle}>Email Or Call - Mon-Fri 8.30 am - 5.00 pm</Text>
          <View flexDirection={"row"}>
            <TouchableOpacity onPress={handleEmailPostVcancy}>
              <View style={[styles.useListEachEmail]}>
                <View flexDirection={"row"}>
                  <FontAwesome6 name="envelope-open-text" size={20} style={styles.userContIcon} />
                </View>
                <Text style={styles.userListItem}>Email Us</Text>            
              </View>
            </TouchableOpacity>
            <ScrollView horizontal={true} style={styles.scrollContact} showsHorizontalScrollIndicator={false}>
              {userList.map((user, index) => (          
                <TouchableOpacity key={index} onPress={() => handleCall(user.phoneNumber)} style={[styles.useListEach]}>
                  <View flexDirection={"row"}>
                    <FontAwesome6 name="phone-volume" size={20} style={[styles.userContIcon, {color: randomColors[index % randomColors.length]}]} />
                  </View>
                  <Text style={[styles.userListItem, {color: randomColors[index % randomColors.length]}]}>{user.name}</Text>
                </TouchableOpacity>          
              ))}
            </ScrollView>
          </View>
        </View>
        <Text style={styles.contactMainTitle}><Text style={{ fontFamily: 'verdanaBold', color: '#c00000' }}>topjobs</Text> Support</Text>
        <View style={styles.scrollContactBottom}>
          <ScrollView horizontal={true} style={styles.scrollContact} showsHorizontalScrollIndicator={false}>
            <View style={[styles.blockList, { backgroundColor:'#27ae60' }]}>
              <Text style={styles.blockListTitle}>Applicant Support</Text>
              <View flexDirection={"row"}>
                <TouchableOpacity onPress={() => handleCall("+94117765645")}>
                  <Text style={styles.blockListText}><FontAwesome6 name="phone-volume" style={styles.blockListIcon}/>  Phone 1</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => handleCall("+94117765600")}>
                  <Text style={styles.blockListText}><FontAwesome6 name="phone-volume" style={styles.blockListIcon}/>  Phone 2</Text>
                </TouchableOpacity>
              </View>            
              <TouchableOpacity onPress={handleEmailSupport}>
                <Text style={styles.blockListEmail}><FontAwesome6 name="envelope-open-text" style={styles.blockListIcon}/>  Email</Text>
              </TouchableOpacity>
            </View>
            <View style={[styles.blockList, { backgroundColor:'#9b59b6' }]}>
              <Text style={styles.blockListTitle}>Top Employer</Text>
              <View flexDirection={"row"}>
                <TouchableOpacity onPress={() => handleCall("+94117765645")}>
                  <Text style={styles.blockListText}><FontAwesome6 name="phone-volume" style={styles.blockListIcon}/>  Phone 1</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => handleCall("+94117765600")}>
                  <Text style={styles.blockListText}><FontAwesome6 name="phone-volume" style={styles.blockListIcon}/>  Phone 2</Text>
                </TouchableOpacity>
              </View> 
              <TouchableOpacity onPress={handleEmailTopEmp}>
                <Text style={styles.blockListEmail}><FontAwesome6 name="envelope-open-text" style={styles.blockListIcon}/>  Email</Text>
              </TouchableOpacity>
            </View>
            <View style={[styles.blockList, { backgroundColor:'#34495e' }]}>
              <Text style={styles.blockListTitle}>Other Enquiries</Text>
              <View flexDirection={"row"}>
                <TouchableOpacity onPress={() => handleCall("+94117765645")}>
                  <Text style={styles.blockListText}><FontAwesome6 name="phone-volume" style={styles.blockListIcon}/>  Phone 1</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => handleCall("+94117765600")}>
                  <Text style={styles.blockListText}><FontAwesome6 name="phone-volume" style={styles.blockListIcon}/>  Phone 2</Text>
                </TouchableOpacity>
              </View> 
              <TouchableOpacity onPress={handleEmailOtherEnq}>
                <Text style={styles.blockListEmail}><FontAwesome6 name="envelope-open-text" style={styles.blockListIcon}/>  Email</Text>
              </TouchableOpacity>
            </View>
          </ScrollView>
        </View>       
        <View style={styles.scrollContactBottom}>
          <ScrollView horizontal={true} style={styles.scrollContact} showsHorizontalScrollIndicator={false}>     
            <View style={[styles.blockListComm]}>
              <Text style={styles.blockListTitleComm}>Fault</Text>
              <View flexDirection={"row"}>
                <TouchableOpacity onPress={() => handleCall("+94117765645")}>
                  <Text style={styles.blockListTextComm}><FontAwesome6 name="phone-volume" style={styles.blockListIcon}/>  Phone</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => handleCall("+94773918922")}>
                  <Text style={styles.blockListTextComm}><FontAwesome6 name="phone-volume" style={styles.blockListIcon}/>  Mobile</Text>
                </TouchableOpacity>   
                <TouchableOpacity onPress={handleEmailFault}>
                  <Text style={styles.blockListEmailComm}><FontAwesome6 name="envelope-open-text" style={styles.blockListIcon}/>  Email</Text>
                </TouchableOpacity>           
              </View>   
            </View>
            <View style={[styles.blockListComm]}>
              <Text style={styles.blockListTitleComm}>Feedback</Text>
              <TouchableOpacity onPress={handleEmailFeedback}>
                <Text style={styles.blockListEmailComm}><FontAwesome6 name="envelope-open-text" style={styles.blockListIcon}/>  Email</Text>
              </TouchableOpacity>        
            </View>
            <View style={[styles.blockListComm]}>
              <Text style={styles.blockListTitleComm}>Testimonials</Text>
              <TouchableOpacity onPress={handleEmailTestimonials}>
                <Text style={styles.blockListEmailComm}><FontAwesome6 name="envelope-open-text" style={styles.blockListIcon}/>  Email</Text>
              </TouchableOpacity>        
            </View>
          </ScrollView>
        </View>   
        <Text style={styles.contactMainTitle}><Text style={{ fontFamily: 'verdanaBold', color: '#c00000' }}>topjobs</Text> We Are Here</Text>   
        <View paddingHorizontal={15}>
          <View style={styles.mapContainerContact}>
            <MapView
              style={styles.mapContact}
              initialRegion={{
                latitude: 6.903845144538262,
                longitude: 79.8528335966357,
                latitudeDelta: 0.005,
                longitudeDelta: 0.005,
              }}
              showsUserLocation={true}
              showsMyLocationButton={true}
              scrollEnabled={true}
              zoomEnabled={true}
              zoomTapEnabled={true}
              customMapStyle={mapStyle}
            >
              <Marker
                coordinate={{
                  latitude: 6.903845144538262,
                  longitude: 79.8528335966357,
                }}
                title="topjobs"
                description="Genesiis Software"
              />
            </MapView>
          </View>
        </View>
      </ScrollView>
      <LinearGradient
        colors={["#F6F7F900", "#f6f7f9c2", "#F6F7F9"]}
        style={styles.gradWrapperInner}
        >
      </LinearGradient>
      <AppNavigator /> 
    </View>
  );
};

export default ContactUs;

