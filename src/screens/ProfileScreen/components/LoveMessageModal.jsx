import React from "react";
import { Pressable, ScrollView, StyleSheet, View } from "react-native";
import CrossIcon from "../../../svg/CrossIcon";
import Message from "./Message";

const LoveMessageModal = ({ closeModal }) => {
  return (
    <View style={styles.modalBox}>
      <View style={styles.closeWrapper}>
        <Pressable onPress={closeModal}>
          <CrossIcon />
        </Pressable>
      </View>
      <ScrollView style={{ width: "100%", marginTop: 20 }}>
        <Message
          name="Sohan Fahad"
          message="Thank you so much for your generous contribution! Your kindness means a lot to me and will make a significant difference in my life."
        />
        <Message
          name="Shihub Munna"
          message="I am deeply grateful for your donation. Your support has truly touched my heart, and I appreciate your generosity more than words can express. Thank you!"
        />
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  modalBox: {
    padding: 15,
    backgroundColor: colors.white,
    width: "95%",
    maxHeight: "90%",
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
});

export default LoveMessageModal;
