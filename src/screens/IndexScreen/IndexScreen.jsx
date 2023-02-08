import { Button, Pressable, StyleSheet, View } from "react-native";
import CustomText from "../../components/Text/CustomText";
import BloodDropSVG from "../../svg/BloodDropSVG";
import colors from "../../theme/colors";
import spacing from "../../theme/spacing";
import typography from "../../theme/typography";

const IndexScreen = ({ navigation }) => {
  return (
    <View style={styles.cantainer}>
      <View style={styles.svgViews}>
        <BloodDropSVG />
      </View>
      <View style={styles.buttonsView}>
        <Pressable onPress={() => navigation?.navigate("Login")}>
          <CustomText style={styles.siginbutton}>Sign In</CustomText>
        </Pressable>
        <Pressable onPress={() => navigation.navigate("BloodPicker")}>
          <CustomText style={styles.createAccounBtn}>Create Account</CustomText>
        </Pressable>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  cantainer: {
    flex: 1,
    backgroundColor: colors.red,
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    padding: spacing[5],
  },
  svgViews: {
    flex: 1,
    justifyContent: "flex-end",
    width: "100%",
    alignItems: "center",
  },
  buttonsView: {
    flex: 1,
    justifyContent: "flex-end",
    width: "100%",
  },
  siginbutton: {
    backgroundColor: colors.white,
    color: colors.red,
    fontSize: 16,
    fontFamily: typography.secondaryBold,
    padding: 20,
    width: "100%",
    textAlign: "center",
    borderRadius: 10,
    marginBottom: 10,
  },
  createAccounBtn: {
    borderWidth: 1,
    borderColor: colors.white,
    color: colors.white,
    fontSize: 16,
    fontFamily: typography.secondaryBold,
    padding: 18,
    width: "100%",
    textAlign: "center",
    borderRadius: 10,
  },
});

export default IndexScreen;
