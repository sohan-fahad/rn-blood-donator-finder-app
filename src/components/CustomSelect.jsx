import React, { useState } from "react";
import {
  FlatList,
  Pressable,
  ScrollView,
  StyleSheet,
  View,
} from "react-native";
import CrossIcon from "../svg/CrossIcon";
import colors from "../theme/colors";
import CustomText from "./Text/CustomText";
import Input from "./Text/Input";

const CustomSelect = ({
  elements,
  handleSelect,
  closeModal,
  isSearch = false,
  handleSearch = (text) => {},
}) => {
  const [elementsData, setElementsData] = useState(elements);

  // const handleSearch = (text) => {
  //   if (text) {
  //     const newArray = elementsData?.filter((item) => item.name.includes(text));
  //     setElementsData(newArray);
  //   } else {
  //     setElementsData(elements);
  //   }
  // };

  const selectItem = (item) => {
    handleSelect(item);
    closeModal();
  };

  const renderItem = ({ item }) => (
    <Pressable onPress={() => selectItem(item)}>
      <CustomText preset="bold" style={styles.element}>
        {item?.name}
      </CustomText>
    </Pressable>
  );

  return (
    <View style={styles.modalWrapper}>
      <View style={styles.closeWrapper}>
        <Pressable onPress={closeModal}>
          <CrossIcon />
        </Pressable>
      </View>
      <View style={styles.modalBox}>
        {isSearch && (
          <Input
            style={styles.searchInput}
            handleTextInput={(text) => handleSearch(text)}
            placeholder="Seerch here"
          />
        )}
        <ScrollView style={{ width: "100%" }}>
          <FlatList
            data={elementsData}
            renderItem={renderItem}
            keyExtractor={(item) => item.id}
          />
        </ScrollView>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  modalWrapper: {
    height: "100%",
    width: "100%",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    position: "absolute",
    bottom: 0,
    left: 0,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },

  modalBox: {
    padding: 30,
    backgroundColor: colors.white,
    width: "95%",
    height: "95%",
    borderRadius: 5,
    position: "relative",
    justifyContent: "center",
    alignItems: "center",
  },
  searchInput: {
    borderWidth: 1,
    borderColor: colors.red,
    paddingHorizontal: 15,
    paddingVertical: 5,
    borderRadius: 5,
    marginBottom: 10,
    width: "100%",
  },
  closeWrapper: {
    position: "absolute",
    right: 15,
    top: 15,
    zIndex: 10,
  },
  element: {
    textAlign: "center",
    padding: 10,
    color: colors.black,
    fontSize: 18,
    borderBottomWidth: 1,
  },
});

export default CustomSelect;
