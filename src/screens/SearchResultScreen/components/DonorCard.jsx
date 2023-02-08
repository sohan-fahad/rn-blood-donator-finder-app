import { Image, Linking, Pressable, StyleSheet, View } from "react-native";
import CustomText from "../../../components/Text/CustomText";
import colors from "../../../theme/colors";
import { Ionicons } from "@expo/vector-icons";
import moment from "moment";

export default DonorCard = ({ donor }) => {
  const { firstName, bloodGroup, lastDonated, avatar, phoneNumber } = donor;
  const goDialPad = () => {
    Linking.openURL(`tel:${phoneNumber}`);
  };
  return (
    <View style={styles.donorCardContainer}>
      <View style={styles.userImgWrapper}>
        {avatar !== "" ? (
          <Image source={{ uri: avatar, height: 90 }} />
        ) : (
          <Image
            style={{ height: 90, width: "100%" }}
            source={require("../../../../assets/user-avater.png")}
          />
        )}
      </View>
      <View style={styles.contentWrapper}>
        <View style={{ width: "25%" }} />
        <View style={styles.donarInfo}>
          <CustomText style={{ color: colors.red }}>{firstName}</CustomText>
          <CustomText preset="small">Blood Group: {bloodGroup}</CustomText>
          <CustomText preset="small">
            Last Donation: {moment(lastDonated).format("DD-MM-YYYY")}
          </CustomText>
        </View>
        <Pressable
          style={{
            width: "15%",
            justifyContent: "center",
            alignItems: "flex-start",
          }}
        >
          <Ionicons
            name="call"
            size={24}
            color={colors.red}
            onPress={goDialPad}
          />
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
    overflow: "hidden",
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
