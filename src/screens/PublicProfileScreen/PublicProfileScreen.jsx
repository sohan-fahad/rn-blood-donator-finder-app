import React, { useEffect, useState } from "react";
import { Pressable, SafeAreaView, ScrollView, View } from "react-native";
import colors from "../../theme/colors";
import { AntDesign, Feather, MaterialIcons } from "@expo/vector-icons";
import { StyleSheet } from "react-native";
import globalStyles from "../../theme/globalStyles";
import spacing from "../../theme/spacing";
import { removeBloodGroup } from "../../store/reducers/addBloodGroupSlice";
import { removeUserInfo } from "../../store/reducers/userInfoSlice";
import { removeTokenInfo } from "../../store/reducers/tokenSlice";
import { removeAsyncStorageItem } from "../../utils/asyncStorage";
import { useDispatch } from "react-redux";
import UserProfileInfo from "../../components/UserProfileInfo";
import { openUpdateLastDonateModa } from "../../store/reducers/globalModalsSlice";
import CustomText from "../../components/Text/CustomText";
import DonateDateList from "./components/DonateDateList";
import { UserServieApi } from "../../services/user.service";
import moment from "moment";
import PublicProfileMenu from "./components/PublicProfileMenu";

const PublicProfileScreen = ({ navigation, route }) => {
  const [donationHistory, setDonationHistory] = useState([]);
  const dispatch = useDispatch();

  const { donorInfo } = route.params;

  const init = async () => {
    await getDonationHistory();
  };

  useEffect(() => {
    init();
  }, [donationHistory.length]);

  const handleLogout = async () => {
    dispatch(removeBloodGroup());
    dispatch(removeUserInfo());
    dispatch(removeTokenInfo());
    await removeAsyncStorageItem("token");
    await removeAsyncStorageItem("refreshToken");
    navigation.navigate("Index");
  };

  const getDonationHistory = async () => {
    const response = await UserServieApi.getDonationHitory(donorInfo?.id);
    if (response?.success) {
      setDonationHistory(response?.payload?.donationHistories);
    }
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
      <UserProfileInfo
        name={donorInfo?.firstName}
        address={donorInfo?.division}
        avatar={donorInfo?.avatar}
        lastDonated={donorInfo?.lastDonated}
        id={donorInfo?.id}
        isPublicProfile={true}
      />
      <PublicProfileMenu
        phoneNumber={donorInfo?.phoneNumber}
        id={donorInfo?.id}
      />
      {/* Donation history */}
      <View style={styles.donationListTitle}>
        <CustomText style={{ color: colors.red }}>
          Donation Histories
        </CustomText>
        {/* <Pressable
          style={styles.editBtn}
          onPress={() => dispatch(openUpdateLastDonateModa())}
        >
          <Feather name="edit" size={20} color={colors.red} />
          <CustomText style={{ color: colors.red, marginLeft: 5 }}>
            Update
          </CustomText>
        </Pressable> */}
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

export default PublicProfileScreen;
