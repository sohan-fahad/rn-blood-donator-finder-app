import {
  Button,
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
import { useDispatch } from "react-redux";
import useFirebase from "../../hooks/useFirebase";
import { useEffect } from "react";
import { removeBloodGroup } from "../../store/reducers/addBloodGroupSlice";
import globalStyles from "../../theme/globalStyles";

export default ProfileScreen = ({ navigation }) => {
  const { user, getUserData, userInfo, logOut } = useFirebase();
  const dispatch = useDispatch();

  useEffect(() => {
    if (user) {
      getUserData(user.uid);
    }
  }, [!user]);

  const handleLogout = () => {
    dispatch(removeBloodGroup());
    logOut();
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
              {userInfo?.name}
            </CustomText>
          </View>

          <View style={{ marginBottom: 10 }}>
            <CustomText preset="h4" style={styles.userInfoTextColor}>
              Address:
            </CustomText>
            <CustomText style={styles.userInfoTextColor}>
              {userInfo?.subDistrict}, {userInfo?.district},{" "}
              {userInfo?.division}
            </CustomText>
          </View>
          <View style={{ marginBottom: 10 }}>
            <CustomText preset="h4" style={styles.userInfoTextColor}>
              Last Donation:
            </CustomText>
            <CustomText style={styles.userInfoTextColor}>
              {userInfo?.donationLis[userInfo?.donationLis.length - 1]}
            </CustomText>
          </View>
        </View>
        <View style={styles.imageView}></View>
      </View>
      <View style={styles.donationListTitle}>
        <CustomText style={{ color: colors.red }}>Donation List</CustomText>
        <Pressable style={styles.editBtn}>
          <Feather name="edit" size={20} color={colors.red} />
          <CustomText style={{ color: colors.red, marginLeft: 5 }}>
            Edit
          </CustomText>
        </Pressable>
      </View>
      <ScrollView style={{ marginTop: 20 }}>
        {userInfo?.donationLis.map((date, index) => (
          <DonateDateList key={index} index={index + 1} date={date} />
        ))}
      </ScrollView>
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
