import { useState } from "react";
import { ActivityIndicator, Pressable, StyleSheet, View } from "react-native";
import CustomText from "../../components/Text/CustomText";
import Input from "../../components/Text/Input";
import BloodDonateVector from "../../svg/BloodDonateVector";
import colors from "../../theme/colors";
import spacing from "../../theme/spacing";
import typography from "../../theme/typography";
import { showMessage } from "react-native-flash-message";
import useFirebase from "../../hooks/useFirebase";
import { async } from "@firebase/util";
import { AuthApiService } from "../../services/auth.service";
import { useDispatch } from "react-redux";
import { setAsyncStorageValue } from "../../utils/asyncStorage";
import { addUserInfo } from "../../store/reducers/userInfoSlice";
import { addTokenInfo } from "../../store/reducers/tokenSlice";

export default LoginScreen = ({ navigation }) => {
  const [phoneNumber, setPhoneNumber] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { login } = useFirebase();

  const dispatch = useDispatch();

  const handlePhoneNumber = (text) => {
    setPhoneNumber(text);
  };
  const handlePassword = (text) => {
    setPassword(text);
  };

  const handleLogin = async () => {
    setIsLoading(true);
    try {
      if (phoneNumber && password) {
        const requestObj = {
          identifier: phoneNumber,
          password,
        };
        // console.log(phoneNumber, password);
        const response = await AuthApiService.login(requestObj);
        console.log(response);
        if (response.statusCode === 200) {
          dispatch(addUserInfo(response.payload?.user));
          dispatch(
            addTokenInfo({
              token: response?.payload?.token,
              refreshToken: response?.payload?.refreshToken,
            })
          );
          await setAsyncStorageValue("token", response?.payload?.token);
          await setAsyncStorageValue(
            "refreshToken",
            response?.payload?.refreshToken
          );

          showMessage({
            message: "",
            description: "Sign up successfull!",
            type: "success",
          });
          navigation.navigate("Home");
        } else {
          showMessage({
            message: "",
            description: response?.message,
            type: "danger",
          });
        }
        setIsLoading(false);
      } else {
        setIsLoading(false);
        showMessage({
          message: "",
          description: "invalid number or password",
          type: "danger",
        });
      }
    } catch (error) {
      setIsLoading(false);
      showMessage({
        message: "",
        description: error.message,
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
          placeholder="Mobile number"
          keyboardType="phone-pad"
          handleTextInput={handlePhoneNumber}
          style={styles.input}
        />
        <Input
          placeholder="Password"
          handleTextInput={handlePassword}
          style={styles.input}
          secureTextEntry={true}
          isPasswordInput={true}
        />
        <Pressable>
          <CustomText style={styles.forgotPinText}>Forgot your pin?</CustomText>
        </Pressable>

        {isLoading ? (
          <CustomText style={styles.loginBtn}>
            <ActivityIndicator size={23} color={colors.white} />
          </CustomText>
        ) : (
          <Pressable onPress={handleLogin}>
            <CustomText style={styles.loginBtn}>Login</CustomText>
          </Pressable>
        )}
        <View style={styles.footerView}>
          <CustomText>Don't have an account?</CustomText>
          <Pressable onPress={() => navigation.navigate("BloodPicker")}>
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
