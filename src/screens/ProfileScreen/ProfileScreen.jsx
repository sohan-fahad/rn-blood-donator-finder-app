import {
  Image,
  Platform,
  Pressable,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  View,
} from "react-native";
import HeaderComponent from "../../components/Layout/HeaderComponent";
import spacing from "../../theme/spacing";
import { AntDesign, MaterialIcons, Feather } from "@expo/vector-icons";
import colors from "../../theme/colors";
import CustomText from "../../components/Text/CustomText";
import DonateDateList from "./components/DonateDateList";
import { useDispatch, useSelector } from "react-redux";
import useFirebase from "../../hooks/useFirebase";
import { useEffect, useState } from "react";
import { removeBloodGroup } from "../../store/reducers/addBloodGroupSlice";
import * as ImagePicker from "expo-image-picker";
import globalStyles from "../../theme/globalStyles";
import { showMessage } from "react-native-flash-message";
import {
  getUserInfo,
  removeUserInfo,
} from "../../store/reducers/userInfoSlice";
import { removeAsyncStorageItem } from "../../utils/asyncStorage";
import moment from "moment";
import { UserServieApi } from "../../services/user.service";

export default ProfileScreen = ({ navigation }) => {
  const [controller, setController] = useState(false);

  const dispatch = useDispatch();
  const userInfo = useSelector(getUserInfo);

  useEffect(() => {
    askForPermission();
  }, []);

  const handleLogout = async () => {
    dispatch(removeBloodGroup());
    dispatch(removeUserInfo());
    await removeAsyncStorageItem("token");
    await removeAsyncStorageItem("refreshToken");
  };

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
      base64: false,
    });

    if (result.canceled) {
      return;
    }
    let localUri = result.assets[0].uri;
    let filename = localUri.split("/").pop();
    let match = /\.(\w+)$/.exec(filename);
    let type = match ? `image/${match[1]}` : `image`;

    const response = await UserServieApi.updateImage(localUri, filename, type);
    // if (response.data.display_url) {
    //   // await updateImage(response.data.display_url);
    //   setController(!controller);
    //   showMessage({
    //     message: "",
    //     description: "Profile image updated!",
    //     type: "success",
    //   });
    // } else {
    //   showMessage({
    //     message: "",
    //     description: "Unable to update profile image",
    //     type: "danger",
    //   });
    // }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.headerView}>
        <Pressable onPress={() => navigation.goBack()}>
          <AntDesign name="arrowleft" size={24} color={colors.red} />
        </Pressable>
        <Pressable onPress={handleLogout}>
          <MaterialIcons name="logout" size={24} color={colors.red} />
        </Pressable>
      </View>
      <View style={styles.profileInfoWrapper}>
        <View style={styles.infoView}>
          <View style={{ marginBottom: 10 }}>
            <CustomText preset="h4" style={styles.userInfoTextColor}>
              Name:
            </CustomText>
            <CustomText style={styles.userInfoTextColor}>
              {userInfo?.firstName}
            </CustomText>
          </View>

          <View style={{ marginBottom: 10 }}>
            <CustomText preset="h4" style={styles.userInfoTextColor}>
              Address:
            </CustomText>
            <CustomText style={styles.userInfoTextColor}>
              {userInfo?.division}
            </CustomText>
          </View>
          <View style={{ marginBottom: 10 }}>
            <CustomText preset="h4" style={styles.userInfoTextColor}>
              Last Donation:
            </CustomText>
            <CustomText style={styles.userInfoTextColor}>
              {moment(userInfo?.lastDonated).format("DD-MM-YYYY")}
            </CustomText>
          </View>
        </View>
        <View style={styles.imageView}>
          <Pressable style={styles.imgEditBtn} onPress={handleUploadImage}>
            <Feather name="edit" size={15} color={colors.white} />
          </Pressable>
          {userInfo?.avatar && (
            <Image source={{ uri: userInfo?.avatar, height: 200 }} />
          )}
        </View>
      </View>
      {/* <View style={styles.donationListTitle}>
        <CustomText style={{ color: colors.red }}>Donation List</CustomText>
        <Pressable style={styles.editBtn}>
          <Feather name="edit" size={20} color={colors.red} />
          <CustomText style={{ color: colors.red, marginLeft: 5 }}>
            Edit
          </CustomText>
        </Pressable>
      </View>
      <ScrollView style={{ marginTop: 20 }}>
        {userInfo?.donationList.map((date, index) => (
          <DonateDateList key={index} index={index + 1} date={date} />
        ))}
      </ScrollView> */}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    ...globalStyles.adroidSafeArea,
    paddingHorizontal: spacing[5],
    flex: 1,
    width: "100%",
  },
  headerView: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 20,
  },
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
  donationListTitle: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingBottom: 10,
    borderBottomColor: colors.red,
    borderBottomWidth: 0.5,
    alignItems: "center",
    marginTop: 20,
  },
  editBtn: {
    flexDirection: "row",
  },
});
