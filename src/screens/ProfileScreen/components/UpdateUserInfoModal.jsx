import { Picker } from "@react-native-picker/picker";
import { useState } from "react";
import {
  ActivityIndicator,
  Pressable,
  ScrollView,
  TextInput,
} from "react-native";
import { StyleSheet } from "react-native";
import { View } from "react-native";
import CrossIcon from "../../../svg/CrossIcon";
import colors from "../../../theme/colors";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import moment from "moment";
import { UserServieApi } from "../../../services/user.service";
import CustomText from "../../../components/Text/CustomText";
import { showMessage } from "react-native-flash-message";
import { addUserInfo } from "../../../store/reducers/userInfoSlice";
import { useDispatch, useSelector } from "react-redux";
import Input from "../../../components/Text/Input";
import { getUserInfo } from "../../../store/reducers/userInfoSlice";

const UpdateUserInfoModal = ({ closeModal }) => {
  const userInfo = useSelector(getUserInfo);

  const [bloodGroup, setBloodGroup] = useState(userInfo?.bloodGroup);
  const [gender, setGender] = useState(userInfo?.gender);
  const [height, setHeight] = useState(userInfo?.height);
  const [weight, setWeight] = useState(userInfo?.weight);
  const [dob, setDob] = useState(userInfo?.dob || "");
  const [name, setName] = useState(userInfo?.firstName);

  const [datePickerPlaceHolder, setDatePickerPlaceHolder] = useState("");

  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const dispatch = useDispatch();

  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const handleDateOfBirth = (date) => {
    setDob(moment(date).format());
    setDatePickerPlaceHolder(moment(date).format("DD-MM-YYYY"));
    hideDatePicker();
  };

  const updateInfo = async () => {
    setIsLoading(true);
    try {
      const payload = {
        firstName: name,
        bloodGroup,
        gender,
        dob,
        height,
        weight,
      };
      const response = await UserServieApi.updateInfo(payload, userInfo?.id);
      if (response?.success) {
        dispatch(addUserInfo(response?.payload));
        showMessage({
          message: "",
          description: "Profile Data updated1",
          type: "success",
        });
      }
    } catch (error) {
      showMessage({
        message: "",
        description: error.message,
        type: "danger",
      });
    } finally {
      setIsLoading(false);
      closeModal();
    }
  };

  return (
    // <View style={styles.modalWrapper}>
    <View style={styles.modalBox}>
      <View style={styles.closeWrapper}>
        <Pressable onPress={closeModal}>
          <CrossIcon />
        </Pressable>
      </View>

      <ScrollView style={styles.inputView} showsVerticalScrollIndicator={false}>
        <Input
          style={styles.input}
          placeholder="Enter Name"
          handleTextInput={(text) => setName(text)}
          autoCapitalize="words"
          defaultValue={name}
        />

        <View style={styles.selectInput}>
          <Picker
            selectedValue={bloodGroup}
            onValueChange={(itemValue) => setBloodGroup(itemValue)}
          >
            <Picker.Item label="Select Blood Group" value="" />
            <Picker.Item label="A+" value="A+" />
            <Picker.Item label="B+" value="B+" />
            <Picker.Item label="O+" value="O+" />
            <Picker.Item label="AB+" value="AB+" />
            <Picker.Item label="A-" value="A-" />
            <Picker.Item label="B-" value="B-" />
            <Picker.Item label="O-" value="O-" />
            <Picker.Item label="AB-" value="AB-" />
          </Picker>
        </View>

        <View style={styles.selectInput}>
          <Picker
            selectedValue={gender}
            onValueChange={(itemValue) => setGender(itemValue)}
          >
            <Picker.Item label="Select Gender" value="" />
            <Picker.Item label="Male" value="Male" />
            <Picker.Item label="Female" value="Female" />
          </Picker>
        </View>

        <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
          <Input
            style={[styles.input, { width: "48%" }]}
            placeholder="Enter Height"
            handleTextInput={(text) => setHeight(text)}
            keyboardType="phone-pad"
            defaultValue={height}
          />
          <Input
            style={[styles.input, { width: "48%" }]}
            placeholder="Enter weight"
            handleTextInput={(text) => setWeight(text)}
            keyboardType="phone-pad"
            value={weight}
          />
        </View>

        <View>
          <Pressable onPress={showDatePicker}>
            <CustomText style={[styles.input, { paddingVertical: 14 }]}>
              {datePickerPlaceHolder ? datePickerPlaceHolder : "Date of Birth"}
            </CustomText>
          </Pressable>
          <DateTimePickerModal
            isVisible={isDatePickerVisible}
            mode="date"
            onConfirm={handleDateOfBirth}
            onCancel={hideDatePicker}
          />
        </View>
        {isLoading === true ? (
          <CustomText style={styles.updateBtn}>
            <ActivityIndicator size={23} color={colors.white} />
          </CustomText>
        ) : (
          <Pressable onPress={updateInfo}>
            <CustomText style={styles.updateBtn}>Update</CustomText>
          </Pressable>
        )}
      </ScrollView>
      {/* </View> */}
    </View>
  );
};

const styles = StyleSheet.create({
  modalWrapper: {
    height: "100%",
    width: "100%",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    position: "absolute",
    top: 0,
    right: 0,
    justifyContent: "center",
    alignItems: "center",
  },

  modalBox: {
    padding: 15,
    backgroundColor: colors.white,
    width: "95%",
    height: "70%",
    borderRadius: 5,
    position: "relative",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "column",
  },
  closeWrapper: {
    position: "absolute",
    right: 5,
    top: 5,
  },
  inputView: {
    marginTop: 40,
    flex: 1,
    width: "100%",
  },
  input: {
    borderColor: colors.red,
    borderWidth: 0.5,
    paddingVertical: 14,
    paddingHorizontal: 15,
    borderRadius: 5,
    marginBottom: 10,
  },
  selectInput: {
    borderColor: colors.red,
    borderWidth: 0.5,
    paddingVertical: 0,
    paddingHorizontal: 10,
    borderRadius: 5,
    marginBottom: 10,
  },
  updateBtn: {
    backgroundColor: colors.red,
    padding: 15,
    borderRadius: 5,
    color: colors.white,
    textAlign: "center",
  },
});

export default UpdateUserInfoModal;
