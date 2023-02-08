import { Pressable, SafeAreaView, StyleSheet, View } from "react-native";
import { Picker } from "@react-native-picker/picker";
import LogoutIconSvg from "../../svg/LogoutIconSvg";
import UserIconSvg from "../../svg/UserIconSvg";
import colors from "../../theme/colors";
import spacing from "../../theme/spacing";
import { useEffect, useState } from "react";
import CustomText from "../../components/Text/CustomText";
import typography from "../../theme/typography";
import HomeBloodDonarSvg from "../../svg/HomeBloodDonar";
import globalStyles from "../../theme/globalStyles";
import useFirebase from "../../hooks/useFirebase";
import { useDispatch } from "react-redux";
import { removeBloodGroup } from "../../store/reducers/addBloodGroupSlice";
import { showMessage } from "react-native-flash-message";
import { addDonatorFilter } from "../../store/reducers/donorListFilterSlice";
import { removeDonors } from "../../store/reducers/donarsListSlice";
import { LocationApiService } from "../../services/location.service";
import { removeUserInfo } from "../../store/reducers/userInfoSlice";
import { removeAsyncStorageItem } from "../../utils/asyncStorage";
import { removeTokenInfo } from "../../store/reducers/tokenSlice";

export default HomeScreen = ({ navigation }) => {
  const [bloodGroup, setBloodGroup] = useState("");
  const [division, setDivision] = useState("");
  const [city, setCity] = useState("");
  const [area, setArea] = useState("");
  const [donateType, setDonateType] = useState("");

  const [cityList, setCityList] = useState([]);
  const [areaList, setAreaList] = useState([]);

  const bloodGroups = ["A+", "B+", "O+", "AB+", "A-", "B-", "O-", "AB-"];

  const dispatch = useDispatch();

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

  const handleLogout = async () => {
    dispatch(removeBloodGroup());
    dispatch(removeUserInfo());
    dispatch(removeTokenInfo());
    await removeAsyncStorageItem("token");
    await removeAsyncStorageItem("refreshToken");
    navigation.navigate("Index");
  };

  const handleSearch = async () => {
    if (bloodGroup && division && city) {
      dispatch(
        addDonatorFilter({ bloodGroup, donateType, division, city, area })
      );
      navigation.navigate("Search");
      resetData();
    } else {
      if (!bloodGroup) {
        showMessage({
          message: "",
          description: "Select a blood group",
          type: "danger",
        });
      } else if (!division) {
        showMessage({
          message: "",
          description: "Select a divisin",
          type: "danger",
        });
      } else {
        showMessage({
          message: "",
          description: "Select a district",
          type: "danger",
        });
      }
    }
  };

  const resetData = () => {
    setCity("");
    setDivision("");
    setArea("");
    setBloodGroup("");
    setAreaList([]);
    setCityList([]);
  };
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.topReactAngel} />
      <View style={styles.contentWrapper}>
        <View style={styles.topViewContainer}>
          <Pressable onPress={() => navigation.navigate("Profile")}>
            <UserIconSvg />
          </Pressable>
          <Pressable onPress={() => handleLogout()}>
            <LogoutIconSvg />
          </Pressable>
        </View>
        <View style={styles.fliterContainer}>
          {/* Blood Group List Picker */}
          <View style={styles.selectInput}>
            <Picker
              selectedValue={bloodGroup}
              onValueChange={(itemValue) => setBloodGroup(itemValue)}
            >
              <Picker.Item label="Select Blood Group" value="" />
              {bloodGroups?.map((item, index) => (
                <Picker.Item key={index} label={item} value={item} />
              ))}
            </Picker>
          </View>

          {/* <View style={styles.selectInput}>
            <Picker
              selectedValue={donateType}
              onValueChange={(itemValue) => setDonateType(itemValue)}
            >
              <Picker.Item label="Select Donation Type" value="" />
              <Picker.Item label="Blood Donate" value="donate" />
              <Picker.Item label="Fertilize Donate" value="fertilize" />
            </Picker>
          </View> */}
          {/* Division List Picker */}
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

          {/* District List picker */}
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
                  <Picker.Item
                    key={index}
                    label={city?.name}
                    value={city?.id}
                  />
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
                  <Picker.Item
                    key={index}
                    label={item?.name}
                    value={item?.id}
                  />
                ))}
              </Picker>
            )}
          </View>
          <CustomText preset="small" style={{ marginBottom: 10 }}>
            *sub district is not required
          </CustomText>

          <Pressable onPress={handleSearch}>
            <CustomText style={styles.searchBtn}>Search</CustomText>
          </Pressable>
        </View>

        <View style={styles.footerView}>
          <HomeBloodDonarSvg />
          <CustomText preset="h4" style={styles.footerText}>
            Search donator by giving blood group and place information
          </CustomText>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    ...globalStyles.adroidSafeArea,
    flex: 1,
    width: "100%",
    position: "relative",
  },
  topReactAngel: {
    height: 240,
    width: "100%",
    backgroundColor: colors.red,
    position: "absolute",
    top: 0,
    left: 0,
  },
  contentWrapper: {
    padding: spacing[5],
  },
  topViewContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingBottom: 20,
  },
  fliterContainer: {
    padding: 20,
    backgroundColor: colors.white,
    shadowColor: colors.black,
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
    elevation: 3,
    borderRadius: 10,
  },
  selectInput: {
    borderColor: colors.red,
    borderWidth: 0.5,
    paddingVertical: 0,
    paddingHorizontal: 10,
    borderRadius: 5,
    marginBottom: 10,
  },
  searchBtn: {
    backgroundColor: colors.red,
    color: colors.white,
    fontFamily: typography.primaryBold,
    textAlign: "center",
    paddingVertical: 15,
    borderRadius: 10,
  },

  footerView: {
    alignItems: "center",
    justifyContent: "center",
    marginTop: 30,
  },
  footerText: {
    color: colors.red,
    textAlign: "center",
    marginTop: 20,
  },
});
