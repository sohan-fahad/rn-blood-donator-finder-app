import { Picker } from "@react-native-picker/picker";
import { useState } from "react";
import { Pressable, ScrollView, TextInput } from "react-native";
import { StyleSheet } from "react-native";
import { View } from "react-native";
import CrossIcon from "../../../svg/CrossIcon";
import colors from "../../../theme/colors";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import moment from "moment";

const UpdateUserInfoModal = ({ closeModal }) => {
  const [bloodGroup, setBloodGroup] = useState("");
  const [gender, setGender] = useState("");
  const [height, setHeight] = useState(0);
  const [weight, setWeight] = useState(0);
  const [dob, setDob] = useState("");

  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [datePickerPlaceHolder, setDatePickerPlaceHolder] = useState("");

  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const handleDateOfBirth = (date) => {
    setDob(moment(date));
    setDatePickerPlaceHolder(moment(date).format("DD-MM-YYYY"));
    hideDatePicker();
  };

  return (
    <View style={styles.modalWrapper}>
      <View style={styles.modalBox}>
        <View style={styles.closeWrapper}>
          <Pressable onPress={closeModal}>
            <CrossIcon />
          </Pressable>
        </View>

        <ScrollView
          style={styles.inputView}
          showsVerticalScrollIndicator={false}
        >
          <TextInput
            style={styles.input}
            placeholder="Enter Name"
            handleTextInput={(text) => setName(text)}
            autoCapitalize="words"
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

          <View
            style={{ flexDirection: "row", justifyContent: "space-between" }}
          >
            <TextInput
              style={[styles.input, { width: "48%" }]}
              placeholder="Enter Height"
              handleTextInput={(text) => setHeight(text)}
              keyboardType="phone-pad"
            />
            <TextInput
              style={[styles.input, { width: "48%" }]}
              placeholder="Enter weight"
              handleTextInput={(text) => setWeight(text)}
              keyboardType="phone-pad"
            />
          </View>

          <View>
            <Pressable onPress={showDatePicker}>
              <CustomText style={[styles.input, { paddingVertical: 14 }]}>
                {datePickerPlaceHolder
                  ? datePickerPlaceHolder
                  : "Date of Birth"}
              </CustomText>
            </Pressable>
            <DateTimePickerModal
              isVisible={isDatePickerVisible}
              mode="date"
              onConfirm={handleDateOfBirth}
              onCancel={hideDatePicker}
            />
          </View>
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
    top: 0,
    left: 0,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },

  modalBox: {
    padding: 15,
    backgroundColor: colors.white,
    width: "95%",
    height: "95%",
    borderRadius: 5,
    position: "relative",
    justifyContent: "center",
    alignItems: "center",
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
});

export default UpdateUserInfoModal;
