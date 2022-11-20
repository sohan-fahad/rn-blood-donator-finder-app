import { useFonts } from "expo-font";
import { StatusBar } from "expo-status-bar";
import { Button, SafeAreaView, StyleSheet, Text, View } from "react-native";
import { Provider } from "react-redux";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import BloodPickScreen from "./src/screens/BloodPickScreen/BloodPickScreen";
import HomeScreen from "./src/screens/HomeScreen/HomeScreen";
import IndexScreen from "./src/screens/IndexScreen/IndexScreen";
import LoginScreen from "./src/screens/LoginScreen/LoginScreen";
import ProfileScreen from "./src/screens/ProfileScreen/ProfileScreen";
import SearchResultScreen from "./src/screens/SearchResultScreen/SearchResultScreen";
import SignUpScreen from "./src/screens/SignUpScreen/SignUpScreen";
import store from "./src/store";
import globalStyles from "./src/theme/globalStyles";
import FlashMessage from "react-native-flash-message";
import { useEffect } from "react";
import useFirebase from "./src/hooks/useFirebase";

const Stack = createNativeStackNavigator();

export default function App() {
  const { user } = useFirebase();

  const [fontsLoaded] = useFonts({
    "Inter-Bold": require("./assets/fonts/Inter-Bold.ttf"),
    "Inter-Light": require("./assets/fonts/Inter-Light.ttf"),
    "Inter-Medium": require("./assets/fonts/Inter-Medium.ttf"),
    "Inter-Regular": require("./assets/fonts/Inter-Regular.ttf"),
    "Inter-SemiBold": require("./assets/fonts/Inter-SemiBold.ttf"),
    "Outfit-Bold": require("./assets/fonts/Outfit-Bold.ttf"),
    "Outfit-Light": require("./assets/fonts/Outfit-Light.ttf"),
    "Outfit-Medium": require("./assets/fonts/Outfit-Medium.ttf"),
    "Outfit-Regular": require("./assets/fonts/Outfit-Regular.ttf"),
    "Outfit-SemiBold": require("./assets/fonts/Outfit-SemiBold.ttf"),
  });

  if (!fontsLoaded) {
    return <Text>Font loading...!</Text>;
  }
  // useEffect(() => {
  //   AsyncStorage.clear();
  // });

  // const user = false;

  return (
    <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator screenOptions={{ headerShown: false }}>
          {user ? (
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
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    ...globalStyles.adroidSafeArea,
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
