import CustomText from "../../components/Text/CustomText";
import { AntDesign } from "@expo/vector-icons";
import { Pressable, StyleSheet, View, Button, ScrollView } from "react-native";
import colors from "../../theme/colors";
import BloodDonateVector from "../../svg/BloodDonateVector";
import Input from "../../components/Text/Input";
import { useEffect, useState } from "react";
import locationList from "../../data/locationList";
import { Picker } from "@react-native-picker/picker";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import moment from "moment/moment";
import spacing from "../../theme/spacing";

export default SignUpScreen = () => {
  const [name, setName] = useState("");
  const [division, setDivision] = useState("");
  const [district, setDistrict] = useState("");
  const [subDistrict, setSubDistrict] = useState("");
  const [donationDate, setDonationDate] = useState("");

  const [locations, setLocations] = useState(locationList);
  const [districtList, setDistrictList] = useState([]);
  const [subDistrictList, setSubDistrictList] = useState([]);
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);

  useEffect(() => {
    setLocations(locationsList);
  }, [!locations]);

  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const handleConfirm = (date) => {
    setDonationDate(moment(date).format("DD-MM-YYYY"));
    hideDatePicker();
  };

  const handleTextInput = (text) => {
    setName(text);
  };

  const handleDivision = (divisionName) => {
    if (divisionName) {
      setDivision(divisionName);
      const filterDivision = locations.filter(
        (location) => location.division == divisionName
      );
      setDistrictList(filterDivision[0].district);
    } else {
      setDivision("");
      setDistrict("");
      setSubDistrict("");
      setDistrictList([]);
      setSubDistrictList([]);
    }
  };

  const handleDistrict = (districtName) => {
    if (districtName) {
      setDistrict(districtName);
      const filterSubDistrict = districtList.filter(
        (item) => item.districtName == districtName
      );

      setSubDistrictList(filterSubDistrict[0].subDistrict);
    } else {
      setDistrict("");
      setSubDistrict("");
      setSubDistrictList([]);
    }
  };

  const handleSubDistrict = (subDistrict) => {
    if (subDistrict) {
      setSubDistrict(subDistrict);
    } else {
      setSubDistrict("");
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.topRedCircleView} />
      <Pressable style={styles.backArrowView}>
        <AntDesign name="arrowleft" size={30} color={colors.red} />
      </Pressable>
      {/* <View style={styles.viewSvgImage}>
        <BloodDonateVector />
      </View> */}
      <ScrollView style={styles.inputView} showsVerticalScrollIndicator={false}>
        <Input
          style={styles.input}
          placeholder="Enter Name"
          handleTextInput={handleTextInput}
          autoCapitalize="words"
        />
        <Input
          style={styles.input}
          placeholder="Enter Email"
          handleTextInput={handleTextInput}
          keyboardType="email-address"
        />
        <Input
          style={styles.input}
          placeholder="Enter Phone Number"
          handleTextInput={handleTextInput}
          keyboardType="phone-pad"
        />
        <View style={styles.selectInput}>
          <Picker
            selectedValue={division}
            onValueChange={(itemValue) => handleDivision(itemValue)}
          >
            <Picker.Item label="Select Division" value="" />
            {locations?.map((location) => (
              <Picker.Item
                key={location.id}
                label={location.division}
                value={location.division}
              />
            ))}
          </Picker>
        </View>

        {/* District List picker */}
        <View style={styles.selectInput}>
          {districtList?.length == 0 ? (
            <Picker enabled={false} selectedValue="">
              <Picker.Item label="Select Division First" />
            </Picker>
          ) : (
            <Picker
              selectedValue={district}
              onValueChange={(itemValue) => handleDistrict(itemValue)}
            >
              <Picker.Item label="Select District" value="" />
              {districtList?.map((district, index) => (
                <Picker.Item
                  key={index}
                  label={district.districtName}
                  value={district.districtName}
                />
              ))}
            </Picker>
          )}
        </View>

        {/*Sub District List picker */}
        <View style={styles.selectInput}>
          {subDistrictList.length == 0 ? (
            <Picker enabled={false}>
              <Picker.Item label="Select District First" />
            </Picker>
          ) : (
            <Picker
              selectedValue={subDistrict}
              onValueChange={(itemValue) => handleSubDistrict(itemValue)}
            >
              <Picker.Item label="Select District" value="" />
              {subDistrictList.map((item, index) => (
                <Picker.Item key={index} label={item} value={item} />
              ))}
            </Picker>
          )}
        </View>

        {/* Date Picker */}
        <View>
          <Pressable onPress={showDatePicker}>
            <CustomText style={[styles.input, { paddingVertical: 14 }]}>
              {donationDate ? donationDate : "Pick Last Donation Date"}
            </CustomText>
          </Pressable>
          <DateTimePickerModal
            isVisible={isDatePickerVisible}
            mode="date"
            onConfirm={handleConfirm}
            onCancel={hideDatePicker}
          />
        </View>

        <Input
          style={styles.input}
          placeholder="Enter Password"
          handleTextInput={handleTextInput}
          isPasswordInput={true}
        />
        <Pressable style={{ flex: 1, justifyContent: "flex-end" }}>
          <CustomText style={styles.signUpBtn}>Sign Up</CustomText>
        </Pressable>
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
    borderRadius: 10,
  },
});
