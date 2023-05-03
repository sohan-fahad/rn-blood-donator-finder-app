import React, { useEffect, useState } from "react";
import { Pressable, ScrollView, StyleSheet, View } from "react-native";
import CrossIcon from "../../../svg/CrossIcon";
import Message from "./Message";
import { MessageApiService } from "../../../services/message.service";
import CustomText from "../../../components/Text/CustomText";
import colors from "../../../theme/colors";

const LoveMessageModal = ({ closeModal }) => {
  const [appreciations, setAppreciations] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    getAppreciations();
  }, [appreciations.length]);

  const getAppreciations = async () => {
    try {
      setIsLoading(true);
      const response = await MessageApiService.getAppreciations();
      if (!response?.success) return;
      setAppreciations(response?.payload?.data);
    } catch (error) {
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <View style={styles.modalBox}>
      <View style={styles.closeWrapper}>
        <Pressable onPress={closeModal}>
          <CrossIcon />
        </Pressable>
      </View>
      <ScrollView style={{ width: "100%", marginTop: 20 }}>
        {isLoading && appreciations.length < 1 && (
          <CustomText style={{ color: colors.red }}>Loading</CustomText>
        )}

        {!isLoading && appreciations.length < 1 && (
          <CustomText style={{ color: colors.red }}>
            No appreciation found!
          </CustomText>
        )}

        {!isLoading &&
          appreciations.length > 0 &&
          appreciations.map((el, index) => (
            <Message
              key={index}
              name={el?.appreciator?.firstName}
              message={el?.appreciationMessage}
              avatar={el?.appreciator?.avatar}
            />
          ))}
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
