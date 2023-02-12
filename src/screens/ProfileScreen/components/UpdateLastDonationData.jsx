import { View, StyleSheet, Pressable } from "react-native";
import CustomText from "../../../components/Text/CustomText";
import CrossIcon from "../../../svg/CrossIcon";
import colors from "../../../theme/colors";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { useState } from "react";
import moment from "moment";

const UpdateLastDonationData = ({ closeModal }) => {
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [datePickerPlaceHolder, setDatePickerPlaceHolder] = useState("");
  const [donationDate, setDonationDate] = useState("");

  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const handleLastDonate = (date) => {
    setDonationDate(moment(date));
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
        <View style={styles.formWrapper}>
          <View style={styles.dateWrapper}>
            <Pressable onPress={showDatePicker}>
              <CustomText style={[styles.input, { paddingVertical: 14 }]}>
                {datePickerPlaceHolder
                  ? datePickerPlaceHolder
                  : "Pick Last Donation Date"}
              </CustomText>
            </Pressable>
            <DateTimePickerModal
              isVisible={isDatePickerVisible}
              mode="date"
              onConfirm={handleLastDonate}
              onCancel={hideDatePicker}
            />
          </View>
          <Pressable>
            <View style={styles.updateBtn}>
              <CustomText>Update</CustomText>
            </View>
          </Pressable>
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
    top: 0,
    left: 0,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },

  modalBox: {
    padding: 15,
    backgroundColor: colors.white,
    width: "90%",
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
  formWrapper: {
    width: "100%",
    marginTop: 40,
  },
  input: {
    borderColor: colors.red,
    borderWidth: 0.5,
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 5,
    marginBottom: 10,
    color: colors.red,
  },
  updateBtn: {
    backgroundColor: colors.red,
    padding: 10,
    borderRadius: 5,
    flexDirection: "row",
    justifyContent: "center",
  },
});

export default UpdateLastDonationData;
