import { AntDesign } from "@expo/vector-icons";
import { Pressable, StyleSheet, View } from "react-native";

export default HeaderComponent = () => {
  return (
    <View style={styles.headerView}>
      <Pressable style={styles.backBtn}>
        <AntDesign name="arrowleft" size={24} color={colors.red} />
      </Pressable>
      <CustomText style={styles.headerText}>Search Result</CustomText>
    </View>
  );
};

const styles = StyleSheet.create({
  headerView: {
    position: "relative",
    paddingVertical: spacing[5],
    backgroundColor: colors.white,
    flexDirection: "row",
    justifyContent: "center",
  },
  backBtn: {
    position: "absolute",
    top: spacing[5],
    left: 0,
  },
  headerText: {
    fontFamily: typography.primaryMedium,
    color: colors.red,
  },
});
