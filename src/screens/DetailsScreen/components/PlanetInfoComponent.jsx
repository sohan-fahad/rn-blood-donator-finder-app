import { StyleSheet, View } from "react-native";
import CustomText from "../../../components/Text/CustomText";
import colors from "../../../theme/colors";

const PlanetInfoComponent = ({ title, info }) => {
  return (
    <View style={styles.infoView}>
      <CustomText preset="h4">{title}:</CustomText>
      <CustomText preset="h3">{info}</CustomText>
    </View>
  );
};

const styles = StyleSheet.create({
  infoView: {
    borderWidth: 0.5,
    borderColor: colors.white,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 15,
    borderRadius: 5,
    marginBottom: 10,
  },
});

export default PlanetInfoComponent;
