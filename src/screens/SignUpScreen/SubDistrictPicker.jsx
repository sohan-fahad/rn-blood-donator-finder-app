import { Picker } from "@react-native-picker/picker";
import { StyleSheet, View } from "react-native";
import CustomText from "../../components/Text/CustomText";
import colors from "../../theme/colors";

export default SubDistrictPicker = (
  subDistrict = "",
  districtList = [],
  handleSubDistrict
) => {
  const list = subDistrict;
  //   console.log(list);
  //   return (
  //     <View style={styles.selectInput}>
  //       {list.length == 0 ? (
  //         <CustomText style={{ paddingVertical: 16, color: colors.darkGrey }}>
  //           Select A Division First
  //         </CustomText>
  //       ) : (
  //         <Picker
  //           selectedValue={district}
  //           onValueChange={(itemValue) => handleDistrict(itemValue)}
  //         >
  //           <Picker.Item label="Select District" value="" />
  //           {list?.map((district) => (
  //             <Picker.Item
  //               key={district.id}
  //               label={district.districtName}
  //               value={district.districtName}
  //             />
  //           ))}
  //         </Picker>
  //       )}
  //     </View>
  //   );
};

const styles = StyleSheet.create({
  selectInput: {
    borderColor: colors.red,
    borderWidth: 0.5,
    paddingVertical: 0,
    paddingHorizontal: 15,
    borderRadius: 5,
    marginBottom: 10,
  },
});
