import { Feather } from "@expo/vector-icons";
import { DateTimePickerAndroid } from "@react-native-community/datetimepicker";
import React from "react";
import { useState } from "react";
import { Linking, Pressable, StyleSheet, View } from "react-native";
import { useDispatch } from "react-redux";
import CustomText from "../../../components/Text/CustomText";
import {
  openLoveMessageModal,
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

const PublicProfileMenu = ({ phoneNumber }) => {
  const dispatch = useDispatch();
  const goDialPad = () => {
    Linking.openURL(`tel:${phoneNumber}`);
  };
  return (
    <>
      <View style={styles.menus_wrapper}>
        <Pressable style={styles.menu_icon_wrapper} onPress={goDialPad}>
          <SettingsSvg />
          <CustomText style={styles.menu_text}>Call</CustomText>
        </Pressable>
        <Pressable
          style={styles.menu_icon_wrapper}
          onPress={() => dispatch(openProfileEditModal())}
        >
          <EditIconSvg />
          <CustomText style={styles.menu_text}>Message</CustomText>
        </Pressable>
        <Pressable
          style={styles.menu_icon_wrapper}
          onPress={() => dispatch(openLoveMessageModal())}
        >
          <MessagesIconSvg />
          <CustomText style={styles.menu_text}>Send Love</CustomText>
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

export default PublicProfileMenu;
