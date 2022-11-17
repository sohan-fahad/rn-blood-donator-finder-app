import { Pressable, StyleSheet, View } from "react-native";
import CustomText from "../../components/Text/CustomText";
import BloodDropRedSVG from "../../svg/BloodDropRedSvg";
import typography from "../../theme/typography";
import BloodGroupBox from "./components/BloodGroupBox";
import { AntDesign } from "@expo/vector-icons";
import colors from "../../theme/colors";

export default BloodPickScreen = () => {
  const bloodGroups = ["A", "B", "O", "AB"];
  return (
    <View style={styles.container}>
      <View style={styles.svgView}>
        <BloodDropRedSVG />
      </View>
      <View style={styles.bloodGroupView}>
        <CustomText preset="h1" style={styles.titleText}>
          Please pick your blood type
        </CustomText>

        <View
          style={{
            flexDirection: "row",
            flexWrap: "wrap",
            justifyContent: "center",
            marginTop: 40,
          }}
        >
          {bloodGroups.map((group, index) => (
            <BloodGroupBox key={index} name={group} />
          ))}
        </View>

        <View style={styles.PosNegView}>
          <Pressable style={styles.pressableGroupPosNeg}>
            <AntDesign name="plus" size={24} color="black" />
          </Pressable>
          <Pressable style={styles.pressableGroupPosNeg}>
            <AntDesign name="minus" size={24} color="black" />
          </Pressable>
        </View>
        <View style={styles.nextBtnView}>
          <Pressable>
            <CustomText style={styles.nextBtn}>Next</CustomText>
          </Pressable>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  svgView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  bloodGroupView: {
    flex: 2,
  },
  titleText: {
    textAlign: "center",
    fontFamily: typography.primaryLight,
  },
  PosNegView: {
    flexDirection: "row",
    justifyContent: "center",
  },
  pressableGroupPosNeg: {
    backgroundColor: colors.grey,
    height: 50,
    width: 50,
    borderRadius: 5,
    justifyContent: "center",
    alignItems: "center",
    marginHorizontal: 5,
    marginTop: 20,
  },
  nextBtnView: {
    flex: 1,
    justifyContent: "flex-end",
  },
  nextBtn: {
    backgroundColor: colors.red,
    color: colors.white,
    padding: 18,
    fontFamily: typography.primaryBold,
    textAlign: "center",
    borderRadius: 10,
  },
});
