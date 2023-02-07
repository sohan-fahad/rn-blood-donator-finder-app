import React from "react";

import { useFonts } from "expo-font";
import { StatusBar } from "expo-status-bar";
import { Button, SafeAreaView, StyleSheet, Text, View } from "react-native";
import { Provider, useSelector } from "react-redux";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import BloodPickScreen from "./src/screens/BloodPickScreen/BloodPickScreen";
import HomeScreen from "./src/screens/HomeScreen/HomeScreen";
import IndexScreen from "./src/screens/IndexScreen/IndexScreen";
import LoginScreen from "./src/screens/LoginScreen/LoginScreen";
import ProfileScreen from "./src/screens/ProfileScreen/ProfileScreen";
import SearchResultScreen from "./src/screens/SearchResultScreen/SearchResultScreen";
import SignUpScreen from "./src/screens/SignUpScreen/SignUpScreen";
import FlashMessage from "react-native-flash-message";
import { useEffect } from "react";
import { getUserInfo } from "./src/store/reducers/userInfoSlice";
import { getAsyncStorageValue } from "./src/utils/asyncStorage";
import { useState } from "react";

const Stack = createNativeStackNavigator();

const Container = ({ navigation }) => {
  const [token, setToken] = useState("");
  const user = useSelector(getUserInfo);

  useEffect(() => {
    checkAuth();
  }, [user]);

  const checkAuth = async () => {
    const _token = await getAsyncStorageValue("token");
    if (_token) {
      setToken(_token);
    } else {
      setToken("");
    }
  };

  return (
    <>
      <NavigationContainer>
        <Stack.Navigator screenOptions={{ headerShown: false }}>
          {user?.firstName ? (
            <>
              <Stack.Screen name="Home" component={HomeScreen} />
              <Stack.Screen name="Profile" component={ProfileScreen} />
              <Stack.Screen name="Search" component={SearchResultScreen} />
            </>
          ) : (
            <>
              <Stack.Screen name="Index" component={IndexScreen} />
              <Stack.Screen name="Login" component={LoginScreen} />
              <Stack.Screen name="SignUp" component={SignUpScreen} />
              <Stack.Screen name="BloodPicker" component={BloodPickScreen} />
            </>
          )}
        </Stack.Navigator>
      </NavigationContainer>
      <StatusBar style="light" />
      <FlashMessage position="top" />
    </>
  );
};

export default Container;
