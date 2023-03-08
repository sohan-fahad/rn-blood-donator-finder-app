import React from "react";
import { Image, Pressable, StyleSheet, View } from "react-native";
import * as ImagePicker from "expo-image-picker";
import { UserServieApi } from "../services/user.service";
import { useDispatch } from "react-redux";
import { showMessage } from "react-native-flash-message";
import { addUserInfo } from "../store/reducers/userInfoSlice";
import CustomText from "./Text/CustomText";
import moment from "moment";
import { Feather } from "@expo/vector-icons";
import { useEffect } from "react";
import mime from "mime";

const UserProfileInfo = (props) => {
  const { name, address, lastDonated, avatar, id = "" } = props;

  const dispatch = useDispatch();

  useEffect(() => {
    askForPermission();
  }, []);

  const askForPermission = async () => {
    if (Platform.OS !== "web") {
      const { status } =
        await ImagePicker.requestMediaLibraryPermissionsAsync();

      if (status !== "granted") {
        alert("Permisson denied");
      }
    }
  };

  const handleUploadImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [3, 4],
      quality: 1,
    });

    if (result.canceled) {
      return;
    }
    const imageUri = result.assets[0].uri;

    const file = {
      uri: imageUri,
      type: mime.getType(imageUri),
      name: imageUri.split("/").pop(),
    };

    try {
      const response = await UserServieApi.updateImage(file, id);
      if (response.statusCode === 200) {
        dispatch(addUserInfo(response?.payload));
        showMessage({
          message: "",
          description: "Profile image updated!",
          type: "success",
        });
      } else {
        showMessage({
          message: "",
          description: "Unable to update profile image",
          type: "danger",
        });
      }
    } catch (error) {
      console.log(error.message, "errror");
    }
  };

  return (
    <View style={styles.profileInfoWrapper}>
      <View style={styles.infoView}>
        <View style={{ marginBottom: 10 }}>
          <CustomText preset="h4" style={styles.userInfoTextColor}>
            Name:
          </CustomText>
          <CustomText style={styles.userInfoTextColor}>{name}</CustomText>
        </View>

        <View style={{ marginBottom: 10 }}>
          <CustomText preset="h4" style={styles.userInfoTextColor}>
            Address:
          </CustomText>
          <CustomText style={styles.userInfoTextColor}>{address}</CustomText>
        </View>
        <View style={{ marginBottom: 10 }}>
          <CustomText preset="h4" style={styles.userInfoTextColor}>
            Last Donation:
          </CustomText>
          <CustomText style={styles.userInfoTextColor}>
            {moment(lastDonated).format("DD-MM-YYYY")}
          </CustomText>
        </View>
      </View>
      <View style={styles.imageView}>
        {id && (
          <Pressable style={styles.imgEditBtn} onPress={handleUploadImage}>
            <Feather name="edit" size={15} color={colors.white} />
          </Pressable>
        )}
        {avatar && <Image source={{ uri: avatar, height: 200 }} />}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  profileInfoWrapper: {
    flexDirection: "row",
    justifyContent: "space-between",
    backgroundColor: colors.red,
    borderRadius: 10,
    padding: 20,
  },
  infoView: {
    width: "60%",
    paddingRight: 20,
  },
  imageView: {
    width: "40%",
    backgroundColor: colors.grey,
    position: "relative",
    borderRadius: 10,
    overflow: "hidden",
    maxHeight: 180,
  },
  imgEditBtn: {
    backgroundColor: colors.red,
    height: 40,
    width: 40,
    position: "absolute",
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
    top: 5,
    right: 5,
    zIndex: 10,
  },
  userInfoTextColor: {
    color: colors.white,
  },
});

export default UserProfileInfo;
