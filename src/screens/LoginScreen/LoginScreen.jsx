import { useState } from "react";
import { Pressable, StyleSheet, View } from "react-native";
import CustomText from "../../components/Text/CustomText";
import Input from "../../components/Text/Input";
import BloodDonateVector from "../../svg/BloodDonateVector";
import colors from "../../theme/colors";
import spacing from "../../theme/spacing";
import typography from "../../theme/typography";
import { showMessage } from "react-native-flash-message";
import useFirebase from "../../hooks/useFirebase";

export default LoginScreen = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { login } = useFirebase();

  const handleEmail = (text) => {
    setEmail(text);
  };
  const handlePassword = (text) => {
    setPassword(text);
  };

  const handleLogin = () => {
    if (email && password) {
      login(email, password);
    } else {
      showMessage({
        message: "",
        description: "invalid email or password",
        type: "danger",
      });
    }
  };
  return (
    <View style={styles.container}>
      <View style={styles.topCircle} />
      <View style={styles.svgView}>
        <BloodDonateVector />
      </View>
      <View style={styles.inputContainer}>
        <Input
          placeholder="Email"
          keyboardType="email-address"
          handleTextInput={handleEmail}
          style={styles.input}
        />
        <Input
          placeholder="Password"
          handleTextInput={handlePassword}
          style={styles.input}
          secureTextEntry={true}
        />
        <Pressable>
          <CustomText style={styles.forgotPinText}>Forgot your pin?</CustomText>
        </Pressable>

        <Pressable onPress={handleLogin}>
          <CustomText style={styles.loginBtn}>Login</CustomText>
        </Pressable>
        <View style={styles.footerView}>
          <CustomText>Don't have an account?</CustomText>
          <Pressable onPress={() => navigation.navigate("SignUp")}>
            <CustomText style={styles.registerFooterBtn}>Register</CustomText>
          </Pressable>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: "relative",
    flex: 1,
    width: "100%",
    padding: spacing[5],
  },
  topCircle: {
    height: 200,
    width: 200,
    borderRadius: 100,
    backgroundColor: colors.red,
    position: "absolute",
    top: -100,
    left: -100,
  },
  svgView: {
    width: "100%",
    alignItems: "center",
    flex: 1,
    justifyContent: "center",
  },
  inputContainer: {
    flex: 1,
    width: "100%",
  },
  input: {
    borderColor: colors.red,
    borderWidth: 0.5,
    paddingVertical: 14,
    paddingHorizontal: 15,
    borderRadius: 5,
    marginBottom: 10,
  },
  forgotPinText: {
    textAlign: "right",
    fontFamily: typography.primarySemiBold,
  },
  loginBtn: {
    backgroundColor: colors.red,
    color: colors.white,
    borderRadius: 10,
    textAlign: "center",
    paddingVertical: 15,
    marginTop: 30,
    fontFamily: typography.primaryBold,
  },
  footerView: {
    flex: 1,
    flexDirection: "row",
    alignItems: "flex-end",
    justifyContent: "center",
    marginBottom: 10,
  },
  registerFooterBtn: {
    fontFamily: typography.primarySemiBold,
    marginLeft: 5,
  },
});
