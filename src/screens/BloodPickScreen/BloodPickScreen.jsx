import { Pressable, SafeAreaView, StyleSheet, View } from "react-native";
import { showMessage, hideMessage } from "react-native-flash-message";
import CustomText from "../../components/Text/CustomText";
import BloodDropRedSVG from "../../svg/BloodDropRedSvg";
import typography from "../../theme/typography";
import BloodGroupBox from "./components/BloodGroupBox";
import { AntDesign } from "@expo/vector-icons";
import colors from "../../theme/colors";
import { useState } from "react";
import spacing from "../../theme/spacing";
import globalStyles from "../../theme/globalStyles";
import { useDispatch, useSelector } from "react-redux";
import {
  addBloodGroup,
  selectBloodGroup,
} from "../../store/reducers/addBloodGroupSlice";
import { selectCount } from "../../store/reducers/counterSlice";

export default BloodPickScreen = ({ navigation }) => {
  const bloodGroups = ["A", "B", "O", "AB"];
  const [selectedGroup, setSelectedGroup] = useState("");
  const [selectedVarient, setSelectedVarient] = useState("");

  const dispatch = useDispatch();
  // const gr = useSelector(selectBloodGroup);

  const handleSelectGroup = (name) => {
    setSelectedGroup(name);
  };

  const handleGroupVarient = (name) => {
    setSelectedVarient(name);
  };

  const pickBloodGroup = () => {
    if (selectedGroup && selectedVarient) {
      dispatch(addBloodGroup("A+"));
      navigation.navigate("SignUp");
    } else {
      if (!selectedGroup) {
        showMessage({
          message: "",
          description: "Pick your blood group!",
          type: "danger",
        });
      } else if (!selectedVarient) {
        showMessage({
          message: "",
          description: "Pick your blood group varient!",
          type: "danger",
        });
      }
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* <CustomText>{gr}</CustomText> */}
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
            <BloodGroupBox
              key={index}
              name={group}
              handleSelectGroup={handleSelectGroup}
              selectedGroup={selectedGroup}
            />
          ))}
        </View>

        <View style={styles.PosNegView}>
          <Pressable
            style={[
              styles.pressableGroupPosNeg,
              {
                backgroundColor:
                  selectedVarient == "plus" ? colors.red : colors.darkGrey,
              },
            ]}
            onPress={() => handleGroupVarient("plus")}
          >
            <AntDesign
              name="plus"
              size={24}
              color={selectedVarient == "plus" ? colors.white : colors.black}
            />
          </Pressable>
          <Pressable
            style={[
              styles.pressableGroupPosNeg,
              {
                backgroundColor:
                  selectedVarient == "minus" ? colors.red : colors.darkGrey,
              },
            ]}
            onPress={() => handleGroupVarient("minus")}
          >
            <AntDesign
              name="minus"
              size={24}
              color={selectedVarient == "minus" ? colors.white : colors.black}
            />
          </Pressable>
        </View>
        <View style={styles.nextBtnView}>
          <Pressable onPress={pickBloodGroup}>
            <CustomText style={styles.nextBtn}>Next</CustomText>
          </Pressable>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    ...globalStyles.adroidSafeArea,
    flex: 1,
    padding: spacing[5],
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
