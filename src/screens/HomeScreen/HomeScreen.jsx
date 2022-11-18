import { Pressable, StyleSheet, View } from "react-native";
import { Picker } from "@react-native-picker/picker";
import locationList from "../../data/locationList";
import LogoutIconSvg from "../../svg/LogoutIconSvg";
import UserIconSvg from "../../svg/UserIconSvg";
import colors from "../../theme/colors";
import spacing from "../../theme/spacing";
import { useState } from "react";
import CustomText from "../../components/Text/CustomText";
import typography from "../../theme/typography";
import HomeBloodDonarSvg from "../../svg/HomeBloodDonar";

export default HomeScreen = () => {
  const [division, setDivision] = useState("");
  const [district, setDistrict] = useState("");
  const [subDistrict, setSubDistrict] = useState("");
  const [bloodGroup, setBloodGroup] = useState("");

  const [locations, setLocations] = useState(locationList);
  const [districtList, setDistrictList] = useState([]);
  const [subDistrictList, setSubDistrictList] = useState([]);

  const bloodGroups = ["A+", "B+", "O+", "AB+", "A-", "B-", "O-", "AB-"];

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
      <View style={styles.topReactAngel} />
      <View style={styles.contentWrapper}>
        <View style={styles.topViewContainer}>
          <UserIconSvg />
          <LogoutIconSvg />
        </View>
        <View style={styles.fliterContainer}>
          {/* Blood Group List Picker */}
          <View style={styles.selectInput}>
            <Picker
              selectedValue={division}
              onValueChange={(itemValue) => setBloodGroup(itemValue)}
            >
              <Picker.Item label="Select Blood Group" value="" />
              {bloodGroups?.map((item, index) => (
                <Picker.Item key={index} label={item} value={item} />
              ))}
            </Picker>
          </View>

          {/* Division List Picker */}
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

          <Pressable>
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
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
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