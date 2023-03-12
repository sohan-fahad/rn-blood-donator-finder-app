import { Feather } from "@expo/vector-icons";
import { DateTimePickerAndroid } from "@react-native-community/datetimepicker";
import React from "react";
import { useState } from "react";
import { Pressable, StyleSheet, View } from "react-native";
import { useDispatch } from "react-redux";
import CustomText from "../../../components/Text/CustomText";
import {
  openProfileEditModal,
  openReminderListModal,
  openReminderModal,
} from "../../../store/reducers/globalModalsSlice";
import AlermIconSvg from "../../../svg/AlermIconSvg";
import CalenderClockIconSvg from "../../../svg/CalenderClockIconSvg";
import EditIconSvg from "../../../svg/EditIconSvg";
import HistoryIconSvg from "../../../svg/HistoryIconSvg";
import MessagesIconSvg from "../../../svg/MessagesIconSvg";
import SettingsSvg from "../../../svg/SettingsSvg";
import colors from "../../../theme/colors";

const UserMenu = () => {
  const dispatch = useDispatch();

  return (
    <>
      <View style={styles.menus_wrapper}>
        <Pressable style={styles.menu_icon_wrapper}>
          <SettingsSvg />
          <CustomText style={styles.menu_text}>Settings</CustomText>
        </Pressable>
        <Pressable
          style={styles.menu_icon_wrapper}
          onPress={() => dispatch(openProfileEditModal())}
        >
          <EditIconSvg />
          <CustomText style={styles.menu_text}>Edit</CustomText>
        </Pressable>
        <Pressable style={styles.menu_icon_wrapper}>
          <MessagesIconSvg />
          <CustomText style={styles.menu_text}>Loves</CustomText>
        </Pressable>
        <Pressable style={styles.menu_icon_wrapper}>
          <HistoryIconSvg />
          <CustomText style={styles.menu_text}>History</CustomText>
        </Pressable>

        <Pressable
          style={styles.menu_icon_wrapper}
          onPress={() => dispatch(openReminderModal())}
        >
          <AlermIconSvg />
          <CustomText style={styles.menu_text}>Set Reminder</CustomText>
        </Pressable>
        <Pressable
          style={styles.menu_icon_wrapper}
          onPress={() => dispatch(openReminderListModal())}
        >
          <CalenderClockIconSvg />
          <CustomText style={styles.menu_text}>Reminder List</CustomText>
        </Pressable>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  menus_wrapper: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    gap: 4,
  },
  menu_icon_wrapper: {
    backgroundColor: colors.darkGrey,
    justifyContent: "space-between",
    alignItems: "center",
    borderRadius: 10,
    paddingHorizontal: 4,
    paddingVertical: 8,
    width: "32%",
    maxHeight: 80,
    marginTop: 8,
  },
  menu_text: {
    color: colors.red,
    fontSize: 12,
  },
});

export default UserMenu;
