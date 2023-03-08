import {
  Image,
  Platform,
  Pressable,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  View,
} from "react-native";
import spacing from "../../theme/spacing";
import { AntDesign, MaterialIcons, Feather } from "@expo/vector-icons";
import colors from "../../theme/colors";
import CustomText from "../../components/Text/CustomText";
import DonateDateList from "./components/DonateDateList";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { removeBloodGroup } from "../../store/reducers/addBloodGroupSlice";
import globalStyles from "../../theme/globalStyles";
import {
  addUserInfo,
  getUserInfo,
  removeUserInfo,
} from "../../store/reducers/userInfoSlice";
import { removeAsyncStorageItem } from "../../utils/asyncStorage";
import moment from "moment";
import { UserServieApi } from "../../services/user.service";
import { getTokenInfo, removeTokenInfo } from "../../store/reducers/tokenSlice";
import { AuthApiService } from "../../services/auth.service";
import SettingsSvg from "../../svg/SettingsSvg";
import EditIconSvg from "../../svg/EditIconSvg";
import MessagesIconSvg from "../../svg/MessagesIconSvg";
import UpdateLastDonationData from "./components/UpdateLastDonationData";
import UpdateUserInfoModal from "./components/UpdateUserInfoModal";
import UserProfileInfo from "../../components/UserProfileInfo";
import UserMenu from "./components/UserMenu";
import {
  getModalData,
  openProfileEditModal,
  openUpdateLastDonateModa,
} from "../../store/reducers/globalModalsSlice";
import { increment } from "../../store/reducers/counterSlice";

export default ProfileScreen = ({ navigation }) => {
  const [donationHistory, setDonationHistory] = useState([]);

  const dispatch = useDispatch();
  const userInfo = useSelector(getUserInfo);
  const { isUpdateLastDonateModal } = useSelector(getModalData);

  useEffect(() => {
    init();
  }, [isUpdateLastDonateModal]);

  const init = async () => {
    if (isUpdateLastDonateModal) return;
    await getProfileData();
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
        <UserProfileInfo
          name={userInfo?.firstName}
          address={userInfo?.division}
          avatar={userInfo?.avatar}
          lastDonated={userInfo?.lastDonated}
          id={userInfo?.id}
        />

        <View style={styles.user_credit_wrapper}>
          <CustomText style={{ color: colors.white }}>
            Credit Balance:
          </CustomText>
          <CustomText style={{ color: colors.white }}>0.00</CustomText>
        </View>

        <UserMenu />

        {/* Donation history */}
        <View style={styles.donationListTitle}>
          <CustomText style={{ color: colors.red }}>Donation List</CustomText>
          <Pressable
            style={styles.editBtn}
            onPress={() => dispatch(openUpdateLastDonateModa())}
          >
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
