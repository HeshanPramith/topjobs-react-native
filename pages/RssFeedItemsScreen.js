import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  StatusBar,
  ActivityIndicator,
  TouchableOpacity,
  Linking,
} from "react-native";
import { parse } from "react-native-rss-parser";

const RssFeedItemsScreen = ({ route, navigation }) => {
  const { rssLink } = route.params;
  const [rssItems, setRssItems] = useState([]);
  const [loading, setLoading] = useState(true);

  const handleRssLinkClick = (item) => {
    const link = `https://www.topjobs.lk/employer/JobAdvertismentServlet?ac=${item.ac}&jc=${item.jc}&ec=${item.ec}`;
    Linking.openURL(link).catch((err) =>
      console.error("Error opening link:", err)
    );
  };

  useEffect(() => {
    StatusBar.setBarStyle("light-content");
    setLoading(true);
    fetch(rssLink)
      .then((response) => response.text())
      .then((responseData) => parse(responseData))
      .then((rss) => {
        setRssItems(rss.items);
        navigation.setOptions({ title: rss.title || "RSS Feed Items" }); // Set the title based on the RSS feed title
      })
      .catch((error) => console.error("Error fetching RSS feed:", error))
      .finally(() => setLoading(false));
  }, [rssLink, navigation]);

  return (
    <View style={styles.container}>
      <Text>RSS Feed Items for: {rssLink}</Text>
      <Text>Total Items: {rssItems.length}</Text>
      {loading ? (
        <ActivityIndicator size="large" color="#0000ff" />
      ) : (
        <FlatList
          data={rssItems}
          keyExtractor={(item, index) => `${item.title}-${index}`}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={styles.rssItemContainer}
              onPress={() => {
                handleRssLinkClick(item);
              }}
            >
              <Text>{item.title}</Text>
              <Text>{item.description}</Text>
              <Text>{item.publisher}</Text>
              <Text>{item.jc}</Text>
              <Text>{item.ec}</Text>
            </TouchableOpacity>
          )}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 10,
  },
  rssItemContainer: {
    marginBottom: 10,
    padding: 10,
    backgroundColor: "#e0e0e0",
    borderRadius: 5,
  },
});

export default RssFeedItemsScreen;
