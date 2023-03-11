import React from "react";
import { StyleSheet, View } from "react-native";
import CustomText from "../../../components/Text/CustomText";
import colors from "../../../theme/colors";

const SearchTerm = ({ searchTermName, searchTermValue }) => {
  return (
    <View style={styles.searchTermWrapper}>
      <CustomText>{searchTermName}:</CustomText>
      <CustomText style={styles.term}>
        {searchTermValue.slice(0, 15)}
      </CustomText>
    </View>
  );
};

const styles = StyleSheet.create({
  searchTermWrapper: {
    flexDirection: "row",
    gap: 4,
  },
  term: {
    color: colors.red,
    marginLeft: 5,
  },
});

export default SearchTerm;
