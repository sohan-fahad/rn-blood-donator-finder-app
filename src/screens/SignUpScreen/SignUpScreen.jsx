import CustomText from "../../components/Text/CustomText";
import { AntDesign } from "@expo/vector-icons";
import {
  Pressable,
  StyleSheet,
  View,
  Button,
  ScrollView,
  ActivityIndicator,
  FlatList,
} from "react-native";
import { showMessage } from "react-native-flash-message";
import colors from "../../theme/colors";
import BloodDonateVector from "../../svg/BloodDonateVector";
import Input from "../../components/Text/Input";
import { useEffect, useRef, useState } from "react";
import { Picker } from "@react-native-picker/picker";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import moment from "moment/moment";
import spacing from "../../theme/spacing";
import intializeFirebase from "../../firebase/firebase.init";
import useFirebase from "../../hooks/useFirebase";
import { useDispatch, useSelector } from "react-redux";
import { selectBloodGroup } from "../../store/reducers/addBloodGroupSlice";
import {
  selectLoagingState,
  startLoading,
  stopLoading,
} from "../../store/reducers/isLoadingBtnSlice";
import { LocationApiService } from "../../services/location.service";
import { AuthApiService } from "../../services/auth.service";
import { addUserInfo } from "../../store/reducers/userInfoSlice";
import { setAsyncStorageValue } from "../../utils/asyncStorage";
// import { setAsyncStorageValue } from "../../utils/asyncStorage";

export default SignUpScreen = ({ navigation }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [password, setPassword] = useState("");
  const [division, setDivision] = useState("");
  const [city, setCity] = useState("");
  const [area, setArea] = useState("");
  const [donationDate, setDonationDate] = useState("");
  const [datePickerPlaceHolder, setDatePickerPlaceHolder] = useState();

  const [cityList, setCityList] = useState([]);
  const [areaList, setAreaList] = useState([]);
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const { createAccount } = useFirebase();

  const dispatch = useDispatch();

  const bloodGroup = useSelector(selectBloodGroup);
  // const isLoading = useSelector(selectLoagingState);

  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const handleLastDonate = (date) => {
    setDonationDate(moment(date));
    setDatePickerPlaceHolder(moment(date).format("DD-MM-YYYY"));
    hideDatePicker();
  };

  const handleDivision = (divisionName) => {
    if (divisionName) {
      setDivision(divisionName);
      getCities(divisionName);
    } else {
      setDivision("");
      setCity("");
      setArea("");
      setCityList([]);
      setAreaList([]);
    }
  };

  const handleCity = (cityId) => {
    if (cityId) {
      setCity(cityId);
      getAreas(cityId);
    } else {
      setCity("");
      setArea("");
      setAreaList([]);
    }
  };

  const handleArea = (subDistrict) => {
    if (subDistrict) {
      setArea(subDistrict);
    } else {
      setArea("");
    }
  };

  const getCities = async (division) => {
    try {
      if (division) {
        const response = await LocationApiService.getCities(division);
        if (response.statusCode === 200) {
          setCityList(response?.payload);
        } else {
          showMessage({
            message: "",
            description: response?.message,
            type: "danger",
          });
        }
      }
    } catch (error) {
      showMessage({
        message: "",
        description: error.message,
        type: "danger",
      });
    }
  };

  const getAreas = async (id) => {
    try {
      if (id) {
        const response = await LocationApiService.getAreas(id);
        if (response.statusCode === 200) {
          setAreaList(response?.payload);
        } else {
          showMessage({
            message: "",
            description: response?.message,
            type: "danger",
          });
        }
      }
    } catch (error) {
      showMessage({
        message: "",
        description: error.message,
        type: "danger",
      });
    }
  };

  const userRegister = async () => {
    if (
      email &&
      password &&
      name &&
      phoneNumber &&
      division &&
      city &&
      area &&
      bloodGroup &&
      donationDate
    ) {
      setIsLoading(true);
      const requestObj = {
        identifier: phoneNumber,
        firstName: name,
        email: email,
        password: password,
        bloodGroup: bloodGroup,
        lastDonated: new Date(donationDate),
        division,
        cityId: city,
        areaId: area,
      };
      try {
        const response = await AuthApiService.register(requestObj);

        if (response.statusCode === 200) {
          dispatch(addUserInfo(response.payload?.createdUser));
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
      } catch (error) {
        console.log(error.message);
        setIsLoading(false);
      }
    } else {
      showMessage({
        message: "",
        description: "required all inputs!",
        type: "danger",
      });
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.topRedCircleView} />
      <Pressable
        style={styles.backArrowView}
        onPress={() => navigation.goBack()}
      >
        <AntDesign name="arrowleft" size={30} color={colors.red} />
      </Pressable>
      <ScrollView style={styles.inputView} showsVerticalScrollIndicator={false}>
        <Input
          style={styles.input}
          placeholder="Enter Name"
          handleTextInput={(text) => setName(text)}
          autoCapitalize="words"
        />
        <Input
          style={styles.input}
          placeholder="Enter Email"
          handleTextInput={(text) => setEmail(text)}
          keyboardType="email-address"
        />
        <Input
          style={styles.input}
          placeholder="Enter Phone Number"
          handleTextInput={(text) => setPhoneNumber(text)}
          keyboardType="phone-pad"
        />
        <View style={styles.selectInput}>
          <Picker
            selectedValue={division}
            onValueChange={(itemValue) => handleDivision(itemValue)}
          >
            <Picker.Item label="Select Division" value="" />
            <Picker.Item label="Dhaka" value="Dhaka" />
            <Picker.Item label="Chittagong" value="Chittagong" />
            <Picker.Item label="Khulna" value="Khulna" />
            <Picker.Item label="Rajshahi" value="Rajshahi" />
            <Picker.Item label="Barisal" value="Barisal" />
            <Picker.Item label="Sylhet" value="Sylhet" />
            <Picker.Item label="Mymensingh" value="Mymensingh" />
            <Picker.Item label="Rangpur" value="Rangpur" />
          </Picker>
        </View>

        {/* City List picker */}
        <View style={styles.selectInput}>
          {cityList?.length == 0 ? (
            <Picker enabled={false} selectedValue="">
              <Picker.Item label="Select Division First" />
            </Picker>
          ) : (
            <Picker
              selectedValue={city}
              onValueChange={(itemValue) => handleCity(itemValue)}
            >
              <Picker.Item label="Select City" value="" />

              {cityList?.map((city, index) => (
                <Picker.Item key={index} label={city?.name} value={city?.id} />
              ))}
            </Picker>
          )}
        </View>

        {/*Sub District List picker */}
        <View style={styles.selectInput}>
          {areaList.length == 0 ? (
            <Picker enabled={false}>
              <Picker.Item label="Select City First" />
            </Picker>
          ) : (
            <Picker
              selectedValue={area}
              onValueChange={(itemValue) => handleArea(itemValue)}
            >
              <Picker.Item label="Select Area" value="" />
              {areaList.map((item, index) => (
                <Picker.Item key={index} label={item?.name} value={item?.id} />
              ))}
            </Picker>
          )}
        </View>

        {/* Date Picker */}
        <View>
          <Pressable onPress={showDatePicker}>
            <CustomText style={[styles.input, { paddingVertical: 14 }]}>
              {datePickerPlaceHolder
                ? datePickerPlaceHolder
                : "Pick Last Donation Date"}
            </CustomText>
          </Pressable>
          <DateTimePickerModal
            isVisible={isDatePickerVisible}
            mode="date"
            onConfirm={handleLastDonate}
            onCancel={hideDatePicker}
          />
        </View>

        <Input
          style={styles.input}
          placeholder="Enter Password"
          handleTextInput={(text) => setPassword(text)}
          isPasswordInput={true}
        />
        {isLoading === true ? (
          <CustomText style={styles.signUpBtn}>
            <ActivityIndicator size={23} color={colors.white} />
          </CustomText>
        ) : (
          <Pressable
            style={{ flex: 1, justifyContent: "flex-end" }}
            onPress={userRegister}
          >
            <CustomText style={styles.signUpBtn}>Sign Up</CustomText>
          </Pressable>
        )}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
    position: "relative",
    padding: spacing[5],
  },
  topRedCircleView: {
    position: "absolute",
    top: -125,
    right: -125,
    height: 200,
    width: 200,
    borderRadius: 100,
    backgroundColor: colors.red,
  },
  svgView: {},
  backArrowView: {
    alignItems: "flex-start",
    width: "100%",
    paddingVertical: 10,
  },
  viewSvgImage: {
    justifyContent: "center",
    alignItems: "center",
  },
  inputView: {
    marginTop: 40,
    flex: 1,
  },
  input: {
    borderColor: colors.red,
    borderWidth: 0.5,
    paddingVertical: 14,
    paddingHorizontal: 15,
    borderRadius: 5,
    marginBottom: 10,
  },
  selectInput: {
    borderColor: colors.red,
    borderWidth: 0.5,
    paddingVertical: 0,
    paddingHorizontal: 10,
    borderRadius: 5,
    marginBottom: 10,
  },
  signUpBtn: {
    backgroundColor: colors.red,
    backgroundColor: colors.red,
    color: colors.white,
    padding: 18,
    fontFamily: typography.primaryBold,
    textAlign: "center",
    justifyContent: "center",
    borderRadius: 10,
  },
});
