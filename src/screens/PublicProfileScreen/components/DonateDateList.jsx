import { View } from "react-native";
import CustomText from "../../../components/Text/CustomText";
import colors from "../../../theme/colors";

export default DonateDateList = ({ index, date }) => {
  return (
    <View
      style={{
        backgroundColor: colors.grey,
        padding: 10,
        borderRadius: 5,
        marginBottom: 10,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
      }}
    >
      <CustomText style={{ color: colors.red }}>{index}</CustomText>
      <CustomText style={{ color: colors.red }}>{date}</CustomText>
    </View>
  );
};
