import React, {useState}from "react";
import { View, Text, FlatList, TouchableOpacity, Image, Modal, TouchableWithoutFeedback, ScrollView, Linking } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import styles from "../assets/styles/styles";
import AppNavigator from "../configs/AppNavigator";
import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { Swipeable } from 'react-native-gesture-handler';
import { useNavigation } from "@react-navigation/native";

const FavoritesScreen = ({ }) => {
  const [favorites, setFavorites] = React.useState([]);
  const totalJobs = favorites.length;
  const swipeableRef = React.useRef(null);
  const navigation = useNavigation();
  const [selectedItem, setSelectedItem] = useState(null);

  // Function to render location text with popup for multiple towns
  const renderLocationText = (item) => {
    if (item.itunes.explicit.includes(',')) {
      const towns = item.itunes.explicit.split(',');
      return (
        <TouchableOpacity onPress={() => setSelectedItem(item)}>
          <View style={{ flexDirection: 'row', marginBottom: -4 }}>
            <Text style={styles.rstxtloca}>{towns[0]}</Text>
            <Text style={styles.rstxtloca}>, +{towns.length - 1} more</Text>
          </View>
        </TouchableOpacity>
      );
    } else {
      return <Text style={styles.rstxtloca}>{item.itunes.explicit}</Text>;
    }
  };

  const handleRssLinkClick = (item) => {
    const link = `http://123.231.114.194:7181/employer/JobAdvertismentServlet?ac=${item.itunes.subtitle}&jc=${item.itunes.block}&ec=${item.id}`;
    Linking.openURL(link).catch((err) =>
      console.error("Error opening link:", err)
    );
  };

  React.useEffect(() => {
    const loadFavorites = async () => {
      try {
        const favoritesData = await AsyncStorage.getItem("favorites");
        if (favoritesData) {
          setFavorites(JSON.parse(favoritesData));
        }
      } catch (error) {
        console.error("Error loading favorites:", error);
      }
    };

    loadFavorites();
  }, []);

  const handleRemoveFavorite = (itemToRemove) => {
    const updatedFavorites = favorites.filter(
      (favItem) => favItem.itunes.block !== itemToRemove.itunes.block
    );
    setFavorites(updatedFavorites);

    // Update AsyncStorage
    saveFavorites(updatedFavorites);
  };

  const saveFavorites = async (updatedFavorites) => {
    try {
      await AsyncStorage.setItem("favorites", JSON.stringify(updatedFavorites));
    } catch (error) {
      console.error("Error saving favorites:", error);
    }
  };

  const handleJobItemPress = (item) => {
    navigation.navigate('JobDetailView', { jobData: item });
  };

  return (
    <View style={styles.mainscontainerfav}>
      <View style={styles.topbar}>
        <Ionicons
          name={"briefcase"}
          size={20}
          color="#000000"
          style={styles.commicon}
        />
        <Text style={styles.jobtotal}>Total Jobs: {totalJobs}</Text>
      </View>
      <FlatList
        style={styles.scrollView}
        data={favorites}
        keyExtractor={(item, index) => `${item.itunes.block}-${index}`}
        renderItem={({ item }) => (
          <Swipeable
            ref={(ref) => (swipeableRef.current = ref)}
            renderRightActions={() => (
              <TouchableOpacity
                style={styles.deleteButton}
                onPress={() => {
                  handleRemoveFavorite(item);
                  swipeableRef.current.close();
                }}
              >
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                  <Ionicons
                    name={"close-circle"}
                    size={24}
                    color="#FFF"
                    style={styles.favico}
                  />
                  <Text style={styles.favTexter}> Remove Favorites</Text>
                </View>
              </TouchableOpacity>
            )}
          >
            <TouchableOpacity
              style={[
                styles.rssItemContainerDetail,
                favorites.some((favItem) => favItem.itunes.block === item.itunes.block) &&
                styles.favoriteItem,
              ]}
              onPress={() => {
                handleRssLinkClick(item);
              }}
            >
              <LinearGradient
                colors={["#ececec6c", "#FFFFFF"]}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
              >
                <View style={styles.rssItemTextContainer}>
                  <View style={{ flexDirection: 'row' }}>
                    <View style={styles.rssLeftConImg}>
                      {item.itunes.summary ? (
                        <Image
                          source={{ uri: `http://123.231.114.194:7181/logo/${item.itunes.summary}` }}
                          style={{ width: '80%', height: 30, borderRadius: 5 }}
                        />
                      ) : (
                        <Text>{item.itunes.summary}</Text>
                      )}
                    </View>
                    <View style={styles.rssLeftCon}>
                      <Text style={[styles.rstxtttl, { flex: 1 }]} numberOfLines={1} ellipsizeMode="tail">
                        {item.title.trim().replace(/\s+/g, ' ')}
                      </Text>
                      <Text style={styles.rstxt}>{item.description}</Text>
                      <Text style={styles.rstxt}>{item.itunes.duration}</Text>
                      <View style={{ flexDirection: 'row' }}>
                        {/* <Text style={styles.rstxtloca}>{item.itunes.explicit}</Text> */}
                        <Text style={styles.rstxtloca}>{renderLocationText(item)}</Text>
                        {item.categories.map((categoryObject, index) => (
                          <Text style={styles.rstxtexp} key={index}> • {categoryObject.name}</Text>
                        ))}
                      </View>
                    </View>
                    <View style={styles.rssRightCon}>
                      <TouchableOpacity
                        style={styles.rssRightConIconButton}
                        onPress={() => handleJobItemPress(item)}
                      >
                        <Ionicons
                          name="eye-sharp"
                          size={24}
                          color="#636363"
                          style={styles.favico}
                        />
                      </TouchableOpacity>
                    </View>
                  </View>
                </View>

              </LinearGradient>
            </TouchableOpacity>
          </Swipeable>
        )}
        ListEmptyComponent={() => (
          <View style={styles.placeholderContainer}>
            <Ionicons
              name={"sad-outline"}
              size={60}
              color="#555"
            />
            <Text style={styles.placeholderText}>No favorite items available</Text>
          </View>
        )}
      />
      <AppNavigator />
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
    </View>
  );
};

export default FavoritesScreen;
