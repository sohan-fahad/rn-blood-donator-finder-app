import {
  Pressable,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  View,
} from "react-native";
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
import { useDispatch, useSelector } from "react-redux";
import { removeBloodGroup } from "../../store/reducers/addBloodGroupSlice";
import { showMessage } from "react-native-flash-message";
import { addDonatorFilter } from "../../store/reducers/donorListFilterSlice";
import { removeDonors } from "../../store/reducers/donarsListSlice";
import { LocationApiService } from "../../services/location.service";
import { removeUserInfo } from "../../store/reducers/userInfoSlice";
import { removeAsyncStorageItem } from "../../utils/asyncStorage";
import { removeTokenInfo } from "../../store/reducers/tokenSlice";
import CustomSelect from "../../components/CustomSelect";
import DownArrow from "../../svg/DownArrow";
import {
  addAreas,
  getAreaList,
  removeAreas,
} from "../../store/reducers/addAreaListSlice";
import AreaPcker from "../../components/Picker/AreaPicker";

export default HomeScreen = ({ navigation }) => {
  const [bloodGroup, setBloodGroup] = useState("");
  const [division, setDivision] = useState("");
  const [city, setCity] = useState({ name: "", id: "" });
  const [area, setArea] = useState({ name: "", id: "" });
  const [donateType, setDonateType] = useState("");

  const [cityList, setCityList] = useState([]);

  const [isBloodModal, setIsBloodModal] = useState(false);
  const [isDivisionModal, setIsDivisionModal] = useState(false);
  const [isCityModal, setIsCityModal] = useState(false);
  const [isAreaModal, setIsAreaModal] = useState(false);

  const bloodGroups = [
    { name: "A+", id: "A+" },
    { name: "B+", id: "B+" },
    { name: "O+", id: "O+" },
    { name: "AB+", id: "AB+" },
    { name: "A-", id: "A-" },
    { name: "B-", id: "B-" },
    { name: "O-", id: "O-" },
    { name: "AB-", id: "AB-" },
  ];
  const divisionList = [
    { name: "Dhaka", id: "Dhaka" },
    { name: "Chittagong", id: "Chittagong" },
    { name: "Khulna", id: "Khulna" },
    { name: "Rajshahi", id: "Rajshahi" },
    { name: "Barisal", id: "Barisal" },
    { name: "Mymensingh", id: "Mymensingh" },
    { name: "Sylhet", id: "Sylhet" },
    { name: "Rangpur", id: "Rangpur" },
  ];

  // const areaList = [];

  // const a = useSelector((state) => console.log(state));

  const dispatch = useDispatch();

  const handleDivision = (divisionName) => {
    if (divisionName) {
      setDivision(divisionName);
      getCities(divisionName);
    } else {
      setDivision("");
      setCity({});
      setArea({});
      setCityList([]);
      dispatch(removeAreas());
    }
  };

  const handleCity = (cityId, name) => {
    if (cityId) {
      setCity({ name, id: cityId });
      getAreas(cityId);
    } else {
      setCity({});
      setArea({});
      dispatch(removeAreas());
    }
  };

  const handleArea = (area) => {
    if (area) {
      setArea({ name: area?.name, id: area?.id });
    } else {
      setArea({});
    }
  };

  const getCities = async (division) => {
    try {
      if (division) {
        setCity({});
        setArea({});
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

  const getAreas = async (id, area = "") => {
    try {
      if (id || city.id) {
        const response = await LocationApiService.getAreas(
          id ? id : city.id,
          area
        );
        if (response.statusCode === 200) {
          dispatch(addAreas(response?.payload));
          // setAreaList(response?.payload);
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
        addDonatorFilter({
          bloodGroup,
          donateType,
          division,
          city: city?.id,
          area: area?.id,
        })
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
    dispatch(removeAreas());
    setCityList([]);
  };

  return (
    <>
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
              <Pressable onPress={() => setIsBloodModal(true)}>
                <View style={styles.selectOption}>
                  <CustomText>
                    {bloodGroup ? bloodGroup : "Select Blood Group"}
                  </CustomText>
                  <DownArrow width={20} height={20} />
                </View>
              </Pressable>
            </View>

            {/* Division List Picker */}
            <View style={styles.selectInput}>
              <Pressable onPress={() => setIsDivisionModal(true)}>
                <View style={styles.selectOption}>
                  <CustomText>
                    {division ? division : "Select Division"}
                  </CustomText>
                  <DownArrow width={20} height={20} />
                </View>
              </Pressable>
            </View>

            {/* District List picker */}
            <View style={styles.selectInput}>
              {!division ? (
                <CustomText style={styles.selectOption}>
                  Select Division First
                </CustomText>
              ) : (
                <Pressable onPress={() => setIsCityModal(true)}>
                  <View style={styles.selectOption}>
                    <CustomText>
                      {city?.name ? city?.name : "Select District"}
                    </CustomText>
                    <DownArrow width={20} height={20} />
                  </View>
                </Pressable>
              )}
            </View>

            {/*Sub District List picker */}
            <View style={styles.selectInput}>
              {!city.name ? (
                <CustomText style={styles.selectOption}>
                  Select City First
                </CustomText>
              ) : (
                <Pressable onPress={() => setIsAreaModal(true)}>
                  <View style={styles.selectOption}>
                    <CustomText>
                      {area?.name
                        ? area?.name.slice(0, 20) + "..."
                        : "Select Area"}
                    </CustomText>
                    <DownArrow width={20} height={20} />
                  </View>
                </Pressable>
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
      {isBloodModal && (
        <CustomSelect
          elements={bloodGroups}
          handleSelect={(item) => setBloodGroup(item?.name)}
          closeModal={() => setIsBloodModal(false)}
        />
      )}

      {isDivisionModal && (
        <CustomSelect
          elements={divisionList}
          handleSelect={(item) => handleDivision(item?.name)}
          closeModal={() => setIsDivisionModal(false)}
        />
      )}

      {isCityModal && (
        <CustomSelect
          elements={cityList}
          handleSelect={(item) => handleCity(item?.id, item?.name)}
          closeModal={() => setIsCityModal(false)}
          isSearch={true}
        />
      )}

      {isAreaModal && (
        <AreaPcker
          handleSelect={(item) => handleArea(item)}
          closeModal={() => setIsAreaModal(false)}
          cityId={city.id}
        />
      )}
    </>
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
    position: "relative",
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
  selectOption: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 12,
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
