import React, { useState } from "react";
import { Pressable, StyleSheet, View } from "react-native";
import CrossIcon from "../../../svg/CrossIcon";
import colors from "../../../theme/colors";
import Input from "../../../components/Text/Input";
import { useSelector } from "react-redux";
import { getSendCrediential } from "../../../store/reducers/sendMessageSlice";
import { MessageApiService } from "../../../services/message.service";
import { showMessage } from "react-native-flash-message";

const SendLoveModal = ({ closeModal }) => {
  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const sendMessageInfo = useSelector(getSendCrediential);
  console.log(sendMessageInfo);

  const send = async () => {
    try {
      setIsLoading(true);
      const reqBody = {
        appreciationMessage: message,
        appreciator: sendMessageInfo.appreciator,
        appreciated: sendMessageInfo?.appreciated,
      };
      const response = await MessageApiService.sendAppreciations(reqBody);

      if (!response.successs) closeModal();
      showMessage({
        message: "",
        description: "Message sended!",
        type: "success",
      });
    } catch (error) {
      showMessage({
        message: "Unable to send message",
        description: error.message,
        type: "danger",
      });
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
      <View style={styles.formWrapper}>
        <Input
          style={styles.input}
          placeholder="Write message"
          handleTextInput={(text) => setMessage(text)}
          multiline={true}
        />

        {!isLoading ? (
          <Pressable onPress={send}>
            <View style={styles.sendBtn}>
              <CustomText style={{ color: colors.white, textAlign: "center" }}>
                Send
              </CustomText>
            </View>
          </Pressable>
        ) : (
          <View style={styles.sendBtn}>
            <CustomText style={{ color: colors.white, textAlign: "center" }}>
              Loading
            </CustomText>
          </View>
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
  formWrapper: {
    width: "100%",
    marginTop: 40,
  },
  input: {
    borderColor: colors.red,
    borderWidth: 0.5,
    paddingVertical: 14,
    paddingHorizontal: 15,
    borderRadius: 5,
    marginBottom: 10,
    minHeight: 100,
  },
  sendBtn: {
    backgroundColor: colors.red,
    padding: 15,
    borderRadius: 5,
    color: colors.white,
    textAlign: "center",
  },
});

export default SendLoveModal;
