import React from "react";

import { useFonts } from "expo-font";
import { StatusBar } from "expo-status-bar";
import { Button, SafeAreaView, StyleSheet, Text, View } from "react-native";
import { Provider, useDispatch, useSelector } from "react-redux";
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
import {
  addUserInfo,
  getUserInfo,
  removeUserInfo,
} from "./src/store/reducers/userInfoSlice";
import { getAsyncStorageValue } from "./src/utils/asyncStorage";
import { useState } from "react";
import { tokenDecoded } from "./src/utils/jwt-decoder";
import {
  addTokenInfo,
  getTokenInfo,
  removeTokenInfo,
} from "./src/store/reducers/tokenSlice";

const Stack = createNativeStackNavigator();

const Container = () => {
  const { token } = useSelector(getTokenInfo);

  const dispatch = useDispatch();

  useEffect(() => {
    if (!token) {
      checkAuth();
    }
  }, []);

  const checkAuth = async () => {
    const _token = await getAsyncStorageValue("token");
    const refreshToken = await getAsyncStorageValue("refreshToken");
    if (_token) {
      const userInfo = await tokenDecoded(_token);
      dispatch(addUserInfo(userInfo));
      dispatch(addTokenInfo({ token: _token, refreshToken }));
    } else {
      dispatch(removeUserInfo());
      dispatch(removeTokenInfo());
    }
  };

  return (
    <>
      <NavigationContainer>
        <Stack.Navigator screenOptions={{ headerShown: false }}>
          {token ? (
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
