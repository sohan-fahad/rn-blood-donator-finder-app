import React, { useState } from "react";
import { Pressable, StyleSheet, View } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { getModalData } from "../../store/reducers/globalModalsSlice";

const Modal = ({ children }) => {
  const dispatch = useDispatch();
  const { isGlobalModal } = useSelector(getModalData);
  return <>{isGlobalModal && <View style={styles.wrapper}>{children}</View>}</>;
};

const styles = StyleSheet.create({
  wrapper: {
    height: "100%",
    width: "100%",
    padding: 20,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    position: "absolute",
    top: 0,
    right: 0,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default Modal;
