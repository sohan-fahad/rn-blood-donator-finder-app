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
  addUserInfo,
  getUserInfo,
  removeUserInfo,
} from "../../store/reducers/userInfoSlice";
import { removeAsyncStorageItem } from "../../utils/asyncStorage";
import moment from "moment";
import { UserServieApi } from "../../services/user.service";
import { getTokenInfo, removeTokenInfo } from "../../store/reducers/tokenSlice";
import mime from "mime";
import { AuthApiService } from "../../services/auth.service";
import SettingsSvg from "../../svg/SettingsSvg";
import EditIconSvg from "../../svg/EditIconSvg";
import MessagesIconSvg from "../../svg/MessagesIconSvg";
import UpdateLastDonationData from "./components/UpdateLastDonationData";
import UpdateUserInfoModal from "./components/UpdateUserInfoModal";

export default ProfileScreen = ({ navigation }) => {
  const [isDonationDateModal, setIsDonationDateModal] = useState(false);
  const [isUserInfoUpdateModal, setIsUserInfoUpdateModa] = useState(false);
  const [donationHistory, setDonationHistory] = useState([]);

  const dispatch = useDispatch();
  const userInfo = useSelector(getUserInfo);

  useEffect(() => {
    init();
  }, []);

  const init = async () => {
    await getProfileData();
    await askForPermission();
    await getDonationHistory();
  };

  const handleLogout = async () => {
    dispatch(removeBloodGroup());
    dispatch(removeUserInfo());
    dispatch(removeTokenInfo());
    await removeAsyncStorageItem("token");
    await removeAsyncStorageItem("refreshToken");
    navigation.navigate("Index");
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
      const response = await UserServieApi.updateImage(file, userInfo?.id);
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

  const getProfileData = async () => {
    try {
      const response = await AuthApiService.authInfo();
      if (response?.statusCode === 200) {
        dispatch(addUserInfo(response?.payload));
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  const getDonationHistory = async () => {
    const response = await UserServieApi.getDonationHitory(userInfo?.id);
    if (response?.success) {
      setDonationHistory(response?.payload?.donationHistories);
    }
  };

  const toggleDonationUpdateModal = () => {
    setIsDonationDateModal(!isDonationDateModal);
  };

  const toggleUserInfoUpdateModal = () => {
    setIsUserInfoUpdateModa(!isUserInfoUpdateModal);
  };

  return (
    <>
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

        <View style={styles.user_credit_wrapper}>
          <CustomText style={{ color: colors.white }}>
            Credit Balance:
          </CustomText>
          <CustomText style={{ color: colors.white }}>0.00</CustomText>
        </View>

        <View style={styles.menus_wrapper}>
          <Pressable style={styles.menu_icon_wrapper}>
            <SettingsSvg />
            <CustomText style={{ color: colors.red }}>Settings</CustomText>
          </Pressable>
          <Pressable
            style={styles.menu_icon_wrapper}
            onPress={toggleUserInfoUpdateModal}
          >
            <EditIconSvg />
            <CustomText style={{ color: colors.red }}>Edit</CustomText>
          </Pressable>
          <Pressable style={styles.menu_icon_wrapper}>
            <MessagesIconSvg />
            <CustomText style={{ color: colors.red }}>Loves</CustomText>
          </Pressable>
        </View>

        {/* Donation history */}
        <View style={styles.donationListTitle}>
          <CustomText style={{ color: colors.red }}>Donation List</CustomText>
          <Pressable style={styles.editBtn} onPress={toggleDonationUpdateModal}>
            <Feather name="edit" size={20} color={colors.red} />
            <CustomText style={{ color: colors.red, marginLeft: 5 }}>
              Update
            </CustomText>
          </Pressable>
        </View>
        <ScrollView style={{ marginTop: 20 }}>
          {donationHistory.length > 0 ? (
            donationHistory.map((list, index) => (
              <Pressable key={index}>
                <DonateDateList
                  key={index}
                  index={index + 1}
                  date={moment(list?.lastDonated).format("DD-MM-YYYY")}
                />
              </Pressable>
            ))
          ) : (
            <CustomText style={{ color: colors.red }}>
              No donation history found!
            </CustomText>
          )}
        </ScrollView>
        {/* Donation history */}
      </SafeAreaView>
      {isDonationDateModal && (
        <UpdateLastDonationData
          closeModal={toggleDonationUpdateModal}
          getDonationHistory={getDonationHistory}
        />
      )}

      {isUserInfoUpdateModal && (
        <UpdateUserInfoModal
          closeModal={toggleUserInfoUpdateModal}
          userInfo={userInfo}
        />
      )}
    </>
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
  user_credit_wrapper: {
    backgroundColor: colors.red,
    padding: 10,
    borderRadius: 10,
    marginTop: 10,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  menus_wrapper: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 10,
  },
  menu_icon_wrapper: {
    backgroundColor: colors.darkGrey,
    justifyContent: "space-between",
    alignItems: "center",
    borderRadius: 10,
    gap: 4,
    paddingHorizontal: 4,
    paddingVertical: 8,
    width: "32%",
    maxHeight: 80,
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
