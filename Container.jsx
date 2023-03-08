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
import CustomText from "./src/components/Text/CustomText";
import ModalConatiner from "./src/components/Modals/ModalConatiner";

const Stack = createNativeStackNavigator();

const Container = () => {
  const [isLoading, setIsLoading] = useState(true);

  const { token } = useSelector(getTokenInfo);

  const dispatch = useDispatch();

  useEffect(() => {
    if (token) {
      setIsLoading(false);
    } else {
      checkAuth();
    }
  }, []);

  const checkAuth = async () => {
    setIsLoading(true);
    const _token = await getAsyncStorageValue("token");
    const refreshToken = await getAsyncStorageValue("refreshToken");
    if (_token) {
      dispatch(addTokenInfo({ token: _token, refreshToken }));
    } else {
      dispatch(removeTokenInfo());
    }
    setIsLoading(false);
  };
  if (isLoading) {
    return (
      <View
        style={{
          flex: 1,
          flexDirection: "row",
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: colors.red,
        }}
      >
        <CustomText style={{ color: "white" }}>Loading</CustomText>
      </View>
    );
  }

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
      <ModalConatiner />
    </>
  );
};

export default Container;
