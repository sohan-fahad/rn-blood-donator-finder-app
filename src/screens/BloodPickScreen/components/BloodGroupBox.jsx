import { Pressable, StyleSheet, View } from "react-native";
import CustomText from "../../../components/Text/CustomText";
import colors from "../../../theme/colors";
import typography from "../../../theme/typography";

export default BloodGroupBox = ({ name, selectedGroup, handleSelectGroup }) => {
  return (
    <Pressable onPress={() => handleSelectGroup(name)}>
      <View
        style={[
          styles.bloodGroupView,
          {
            backgroundColor:
              selectedGroup == name ? colors.red : colors.darkGrey,
          },
        ]}
      >
        <CustomText
          preset="h3"
          style={[
            styles.groupNameText,
            { color: selectedGroup == name ? colors.white : colors.black },
          ]}
        >
          {name}
        </CustomText>
      </View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  bloodGroupView: {
    width: 140,
    height: 70,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
    margin: 5,
    backgroundColor: colors.grey,
  },
  groupNameText: {
    fontFamily: typography.primaryMedium,
  },
});
