import React from "react";
import { View, Text, FlatList, TouchableOpacity, Image } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import styles from "../assets/styles/styles";
import AppNavigator from "../configs/AppNavigator";
import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { Swipeable } from 'react-native-gesture-handler';

const FavoritesScreen = ({ }) => {
  const [favorites, setFavorites] = React.useState([]);
  const totalJobs = favorites.length;
  const swipeableRef = React.useRef(null);

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
                // Handle navigation to the details screen or any other action
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
                      <Text style={styles.rstxtttl}>{item.title}</Text>
                      <Text style={styles.rstxt}>{item.description}</Text>
                      <Text style={styles.rstxt}>{item.itunes.duration}</Text>
                      <Text style={styles.rstxtloca}>{item.itunes.explicit}</Text>
                      {item.categories.map((categoryObject, index) => (
                        <Text style={styles.rstxtexp} key={index}>Exp : {categoryObject.name}</Text>
                      ))}
                    </View></View>
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
    </View>
  );
};

export default FavoritesScreen;
