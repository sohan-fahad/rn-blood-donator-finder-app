import { Pressable, StyleSheet, View } from "react-native";
import colors from "../../theme/colors";
import spacing from "../../theme/spacing";
import CustomText from "../Text/CustomText";
import { AntDesign } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

export default PlanetHeader = ({ isBackBtm }) => {
  const navigation = useNavigation();
  return (
    <View style={styles.container}>
      {isBackBtm && (
        <Pressable
          style={{ marginRight: 10 }}
          onPress={() => navigation.goBack()}
        >
          <AntDesign name="left" size={24} color={colors.white} />
        </Pressable>
      )}
      <CustomText preset="h2">THE PLANETS</CustomText>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: spacing[5],
    borderBottomWidth: 0.5,
    borderBottomColor: colors.white,
    flexDirection: "row",
    alignItems: "center",
  },
});
