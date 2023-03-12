import { DateTimePickerAndroid } from "@react-native-community/datetimepicker";
import moment from "moment";
import { useState } from "react";
import { Pressable, StyleSheet, View } from "react-native";
import { showMessage } from "react-native-flash-message";
import CustomText from "../../../components/Text/CustomText";
import { localStoreKeys } from "../../../data/localStoreKeys";
import CrossIcon from "../../../svg/CrossIcon";
import colors from "../../../theme/colors";
import {
  getAsyncStorageStringfyValue,
  setAsyncStorageStringify,
} from "../../../utils/asyncStorage";

const SetReminderModal = ({ closeModal }) => {
  const [date, setDate] = useState(new Date());
  const [error, setError] = useState("");

  const onChange = (event, selectedDate) => {
    setError(false);
    const currentDate = selectedDate;
    setDate(currentDate);
  };

  const showMode = (currentMode) => {
    DateTimePickerAndroid.open({
      value: date,
      onChange,
      mode: currentMode,
      is24Hour: false,
    });
  };

  const showDatepicker = () => {
    showMode("date");
  };

  const showTimepicker = () => {
    showMode("time");
  };

  const setReminder = async () => {
    const currentDateTime = moment().unix();
    const selectedDateTime = moment(date).unix();
    if (selectedDateTime <= currentDateTime) {
      setError("Please Select a future time!");
    } else {
      const preAlerms = await getAsyncStorageStringfyValue(
        localStoreKeys.alerm
      );

      if (!preAlerms || preAlerms.length < 1) {
        await setAsyncStorageStringify(localStoreKeys.alerm, [
          { id: Math.floor(Date.now() / 1000), date: moment(date).format() },
        ]);
      } else if (preAlerms.length > 0) {
        const newAlermsArr = [
          ...preAlerms,
          { id: Math.floor(Date.now() / 1000), date: moment(date).format() },
        ];
        await setAsyncStorageStringify(localStoreKeys.alerm, newAlermsArr);
        setDate(new Date());
      }
      showMessage({
        message: "",
        description: `Set a reminder successfully!`,
        type: "success",
      });
      closeModal();
    }
  };

  return (
    <View style={styles.modalBox}>
      <View style={styles.closeWrapper}>
        <Pressable onPress={closeModal}>
          <CrossIcon />
        </Pressable>
      </View>
      <View style={styles.formWrapper}>
        <Pressable onPress={showDatepicker}>
          <View style={styles.input}>
            <CustomText style={styles.text}>
              {moment(date).format("DD-MM-YYYY")}
            </CustomText>
          </View>
        </Pressable>
        <Pressable onPress={showTimepicker}>
          <View style={styles.input}>
            <CustomText style={styles.text}>
              {moment(date).format("hh:mm A")}
            </CustomText>
          </View>
        </Pressable>
        {error && <CustomText style={styles.text}>*{error}</CustomText>}
        <Pressable onPress={setReminder}>
          <View style={styles.updateBtn}>
            <CustomText style={{ color: colors.white }}>
              Set Reminder
            </CustomText>
          </View>
        </Pressable>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
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
    padding: 10,
    borderRadius: 5,
    flexDirection: "row",
    justifyContent: "center",
    color: colors.white,
    borderWidth: 1,
    borderColor: colors.red,
    marginBottom: 5,
  },
  updateBtn: {
    backgroundColor: colors.red,
    padding: 10,
    borderRadius: 5,
    flexDirection: "row",
    justifyContent: "center",
    color: colors.white,
  },

  text: {
    color: colors.red,
  },
});

export default SetReminderModal;
