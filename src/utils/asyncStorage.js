import AsyncStorage from "@react-native-community/async-storage";

export const setAsyncStorageValue = async (key, value) => {
  try {
    await AsyncStorage.setItem(key, JSON.stringify(value));
  } catch (error) {
    console.log(error.message);
  }
};

export const getAsyncStorageValue = async (key) => {
  try {
    const data = await JSON.parse(AsyncStorage.getItem(key));
    return data;
  } catch (error) {
    console.log(error.message);
  }
};

export const removeItem = async (key) => {
  try {
    await AsyncStorage.removeItem(key);
  } catch (error) {
    console.log(error.message);
  }
};
