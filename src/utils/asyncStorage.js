import AsyncStorage from "@react-native-async-storage/async-storage";
// import { AsyncStorage } from "react-native";

export const setAsyncStorageValue = async (key, value) => {
  try {
    await AsyncStorage.setItem(`@${key}`, value);
  } catch (error) {
    console.log(error.message);
  }
};

export const setAsyncStorageStringify = async (key, value) => {
  try {
    await AsyncStorage.setItem(`@${key}`, JSON.stringify(value));
  } catch (error) {
    console.log(error.message);
  }
};

export const getAsyncStorageValue = async (key) => {
  try {
    const data = await AsyncStorage.getItem(`@${key}`);
    return data;
  } catch (error) {
    console.log(error.message);
  }
};

export const getAsyncStorageStringfyValue = async (key) => {
  try {
    const data = await AsyncStorage.getItem(`@${key}`);
    return JSON.parse(data);
  } catch (error) {
    console.log(error.message);
  }
};

export const removeAsyncStorageItem = async (key) => {
  try {
    await AsyncStorage.removeItem(`@${key}`);
  } catch (error) {
    console.log(error.message);
  }
};
