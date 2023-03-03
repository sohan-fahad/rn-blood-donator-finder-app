import { useState } from "react";
import {
  FlatList,
  Pressable,
  ScrollView,
  StyleSheet,
  View,
} from "react-native";
import { showMessage } from "react-native-flash-message";
import { useDispatch, useSelector } from "react-redux";
import { LocationApiService } from "../../services/location.service";
import { addAreas, getAreaList } from "../../store/reducers/addAreaListSlice";
import CrossIcon from "../../svg/CrossIcon";
import CustomText from "../Text/CustomText";
import Input from "../Text/Input";

const AreaPcker = ({ handleSelect, closeModal, cityId }) => {
  const areaList = useSelector(getAreaList);

  const [areas, setAreas] = useState(areaList);

  const dispatch = useDispatch();

  const handleSearch = async (text = "") => {
    if (text) {
      try {
        if (cityId) {
          const response = await LocationApiService.getAreas(cityId, text);
          if (response.statusCode === 200) {
            // dispatch(addAreas(response?.payload));
            setAreas(response?.payload);
          } else {
            showMessage({
              message: "",
              description: response?.message,
              type: "danger",
            });
          }
        }
      } catch (error) {
        showMessage({
          message: "",
          description: error.message,
          type: "danger",
        });
      }
    }
  };

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
      <View style={styles.modalBox}>
        <View style={styles.closeWrapper}>
          <Pressable onPress={closeModal}>
            <CrossIcon />
          </Pressable>
        </View>
        <Input
          style={styles.searchInput}
          handleTextInput={(text) => handleSearch(text)}
          placeholder="Seerch here"
        />
        <View style={{ width: "100%" }}>
          <FlatList
            data={areas}
            renderItem={renderItem}
            keyExtractor={(item) => item.id}
          />
        </View>
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
    maxHeight: "80%",
    borderRadius: 5,
    position: "relative",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "column",
  },
  searchInput: {
    borderWidth: 1,
    borderColor: colors.red,
    paddingHorizontal: 15,
    paddingVertical: 5,
    borderRadius: 5,
    marginBottom: 10,
    marginTop: 60,
    width: "100%",
  },
  closeWrapper: {
    position: "absolute",
    right: 5,
    top: 5,
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

export default AreaPcker;
