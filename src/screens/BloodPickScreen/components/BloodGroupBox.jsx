import { StyleSheet, View } from "react-native";
import CustomText from "../../../components/Text/CustomText";
import colors from "../../../theme/colors";
import typography from "../../../theme/typography";

export default BloodGroupBox = ({ name }) => {
  return (
    <View style={styles.bloodGroupView}>
      <CustomText preset="h3" style={styles.groupNameText}>
        {name}
      </CustomText>
    </View>
  );
};

const styles = StyleSheet.create({
  bloodGroupView: {
    width: 140,
    height: 70,
    backgroundColor: colors.grey,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
    margin: 5,
  },
  groupNameText: {
    fontFamily: typography.primaryMedium,
  },
});
