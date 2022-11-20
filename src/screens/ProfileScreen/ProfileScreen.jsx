import { Button, Pressable, ScrollView, StyleSheet, View } from "react-native";
import HeaderComponent from "../../components/Layout/HeaderComponent";
import spacing from "../../theme/spacing";
import { AntDesign, MaterialIcons, Feather } from "@expo/vector-icons";
import colors from "../../theme/colors";
import CustomText from "../../components/Text/CustomText";
import DonateDateList from "./components/DonateDateList";
import { useDispatch, useSelector } from "react-redux";
import { increment, selectCount } from "../../store/reducers/counterSlice";

export default ProfileScreen = () => {
  // const dispatch = useDispatch();
  // const count = useSelector(selectCount);

  return (
    <View style={styles.container}>
      <View style={styles.headerView}>
        <Pressable>
          <AntDesign name="arrowleft" size={24} color={colors.red} />
        </Pressable>
        <Pressable>
          <MaterialIcons name="logout" size={24} color={colors.red} />
        </Pressable>
      </View>
      <View style={styles.profileInfoWrapper}>
        <View style={styles.infoView}>
          <View style={{ marginBottom: 10 }}>
            <CustomText preset="h4" style={styles.userInfoTextColor}>
              Name:
            </CustomText>
            <CustomText style={styles.userInfoTextColor}>Donor Name</CustomText>
          </View>

          <View style={{ marginBottom: 10 }}>
            <CustomText preset="h4" style={styles.userInfoTextColor}>
              Address:
            </CustomText>
            <CustomText style={styles.userInfoTextColor}>
              Feni Sadar, Feni, Chittagong
            </CustomText>
          </View>
          <View style={{ marginBottom: 10 }}>
            <CustomText preset="h4" style={styles.userInfoTextColor}>
              Last Donation:
            </CustomText>
            <CustomText style={styles.userInfoTextColor}>21/12/2021</CustomText>
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
        <DonateDateList index={1} date="12/12/2021" />
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
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
