import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import MainScreen from "./MainScreen"; // Update the import path if needed
import FavoriteItemsScreen from "./FavoriteItemsScreen"; // Update the import path if needed

const Tab = createBottomTabNavigator();

const AppNavigator = () => {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Main" component={MainScreen} />
      <Tab.Screen name="Favorites" component={FavoriteItemsScreen} />
    </Tab.Navigator>
  );
};

export default AppNavigator;
