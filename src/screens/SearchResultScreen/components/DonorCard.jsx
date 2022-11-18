import { Pressable, StyleSheet, View } from "react-native";
import CustomText from "../../../components/Text/CustomText";
import colors from "../../../theme/colors";
import { Ionicons } from "@expo/vector-icons";

export default DonorCard = () => {
  return (
    <View style={styles.donorCardContainer}>
      <View style={styles.userImgWrapper}></View>
      <View style={styles.contentWrapper}>
        <View style={{ width: "25%" }} />
        <View style={styles.donarInfo}>
          <CustomText style={{ color: colors.red }}>Donor Name</CustomText>
          <CustomText preset="small">Blood Group: A+</CustomText>
          <CustomText preset="small">Last Donation: 12-12-2022</CustomText>
        </View>
        <Pressable
          style={{
            width: "15%",
            justifyContent: "center",
            alignItems: "flex-start",
          }}
        >
          <Ionicons name="call" size={24} color={colors.red} />
        </Pressable>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  donorCardContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-end",
    position: "relative",
    height: 90,
    marginBottom: 10,
  },
  contentWrapper: {
    width: "100%",
    backgroundColor: colors.grey,
    flexDirection: "row",
    borderBottomLeftRadius: 10,
  },
  userImgWrapper: {
    height: 90,
    width: "25%",
    borderBottomLeftRadius: 5,
    borderTopRightRadius: 5,
    borderTopLeftRadius: 5,
    backgroundColor: colors.darkGrey,
    position: "absolute",
    bottom: 0,
    zIndex: 2,
  },
  donarInfo: {
    width: "60%",
    paddingLeft: 15,
    paddingVertical: 10,
  },
});
