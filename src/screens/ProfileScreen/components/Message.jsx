import { StyleSheet, View, Image } from "react-native";
import CustomText from "../../../components/Text/CustomText";
import colors from "../../../theme/colors";

const Message = ({ name, message, avatar }) => {
  return (
    <View style={styles.messageBox}>
      <View style={styles.profileInfo}>
        {avatar ? (
          <Image
            source={{ uri: avatar, height: 40 }}
            style={{
              width: 40,
              height: 40,
              borderRadius: 20,
              borderColor: colors.red,
              borderWidth: 1,
            }}
          />
        ) : (
          <Image
            style={{
              width: 40,
              height: 40,
              borderRadius: 20,
              borderColor: colors.red,
              borderWidth: 1,
            }}
            source={require("../../../../assets/user-avater.png")}
          />
        )}
        <CustomText style={styles.name}>{name}</CustomText>
      </View>
      <View>
        <CustomText style={{ textAlign: "left" }}>{message}</CustomText>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  messageBox: {
    padding: 10,
    borderWidth: 1,
    borderColor: colors.red,
    borderRadius: 5,
    width: "100%",
    gap: 10,
    marginBottom: 10,
  },

  profileInfo: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 5,
  },

  name: {
    color: colors.red,
    fontWeight: "700",
    marginLeft: 5,
  },
});

export default Message;
