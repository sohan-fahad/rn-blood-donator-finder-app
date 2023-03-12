import moment from "moment";
import React, { useEffect, useState } from "react";
import {
  FlatList,
  Pressable,
  ScrollView,
  StyleSheet,
  View,
} from "react-native";
import { showMessage } from "react-native-flash-message";
import { useDispatch } from "react-redux";
import CustomText from "../../../components/Text/CustomText";
import { localStoreKeys } from "../../../data/localStoreKeys";
import { closeReminderListModal } from "../../../store/reducers/globalModalsSlice";
import AlermIconSvg from "../../../svg/AlermIconSvg";
import CrossIcon from "../../../svg/CrossIcon";
import DeleteIconSvg from "../../../svg/DeleteIconSvg";
import colors from "../../../theme/colors";
import {
  getAsyncStorageStringfyValue,
  setAsyncStorageStringify,
} from "../../../utils/asyncStorage";

const ReminderList = () => {
  const dispatch = useDispatch();

  const [reminders, setReminders] = useState([]);
  const [state, setState] = useState("");

  useEffect(() => {
    setState("Loading");
    getReminders();
  }, []);

  const getReminders = async () => {
    const reminderList = await getAsyncStorageStringfyValue(
      localStoreKeys.alerm
    );
    console.log(reminderList);
    if (reminderList.length > 0) {
      setState("");
      setReminders(reminderList);
    } else {
      setState("No reminder found!");
    }
  };

  const removeReminder = async (id) => {
    const remaining = reminders.filter((item) => item.id != id);
    if (remaining.length > 0) {
      setReminders(remaining);
      await setAsyncStorageStringify(localStoreKeys.alerm, remaining);
      showMessage({
        message: "",
        description: `Delete a reminder successfully!`,
        type: "success",
      });
    } else {
      setState("No reminder found!");
    }
  };

  const renderItem = ({ item }) => (
    <View style={styles.reminderCard}>
      <View style={styles.reminderInfo}>
        <AlermIconSvg height={20} width={20} style={{ marginRight: 5 }} />
        <CustomText style={{ color: colors.red, fontSize: 14 }}>
          {moment(item.date).format("hh:mm A DD-MMM-YY")}
        </CustomText>
      </View>
      <Pressable onPress={() => removeReminder(item.id)}>
        <DeleteIconSvg height={20} width={20} />
      </Pressable>
    </View>
  );

  return (
    <View style={styles.modalBox}>
      <View style={styles.closeWrapper}>
        <Pressable onPress={() => dispatch(closeReminderListModal())}>
          <CrossIcon />
        </Pressable>
      </View>
      <View style={styles.reminderWrapper}>
        {state ? (
          <CustomText style={{ textAlign: "center" }}>{state}</CustomText>
        ) : (
          <FlatList
            data={reminders}
            renderItem={renderItem}
            keyExtractor={(item) => item.id}
          />
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  modalBox: {
    padding: 15,
    backgroundColor: colors.white,
    width: "95%",
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
  reminderWrapper: {
    width: "100%",
    marginTop: 30,
  },
  reminderCard: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 10,
    width: "100%",
    borderWidth: 1,
    padding: 10,
    borderRadius: 5,
    borderColor: colors.red,
  },
  reminderInfo: {
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
  },
});
export default ReminderList;
