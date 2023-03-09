import {
  Pressable,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  View,
} from "react-native";
import { useSelector } from "react-redux";
import { selectFilterObj } from "../../store/reducers/donorListFilterSlice";
import spacing from "../../theme/spacing";
import { AntDesign } from "@expo/vector-icons";
import colors from "../../theme/colors";
import CustomText from "../../components/Text/CustomText";
import typography from "../../theme/typography";
import DonorCard from "./components/DonorCard";
import { useEffect, useState } from "react";
import globalStyles from "../../theme/globalStyles";

import { UserServieApi } from "../../services/user.service";

export default SearchResultScreen = ({ navigation }) => {
  const [donors, setDonors] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const { bloodGroup, donateType, division, city, area } =
    useSelector(selectFilterObj);

  useEffect(() => {
    if (bloodGroup) {
      getSearchResult();
      // getSearchResult(bloodGroup, division, district, subDistrict);
    }
  }, [!bloodGroup]);

  const getSearchResult = async () => {
    setIsLoading(true);
    try {
      if (bloodGroup && division && city) {
        const response = await UserServieApi.getDonors(
          bloodGroup.id,
          division,
          city,
          area
        );

        console.log(response);

        if (response.statusCode === 200) {
          setDonors(response?.payload?.payload);
        }
      }
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      console.log(error.message);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.headerView}>
        <Pressable style={styles.backBtn} onPress={() => navigation.goBack()}>
          <AntDesign name="arrowleft" size={24} color={colors.red} />
        </Pressable>
        <CustomText style={styles.headerText}>Search Result</CustomText>
      </View>
      <ScrollView style={styles.scrollView}>
        {donors?.length > 0 && !isLoading ? (
          donors?.map((donor, index) => <DonorCard key={index} donor={donor} />)
        ) : (
          <CustomText>
            {isLoading ? "Searching..." : "No donor found!"}
          </CustomText>
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    ...globalStyles.adroidSafeArea,
    flex: 1,
    width: "100%",
  },
  scrollView: {
    paddingTop: 20,
    paddingBottom: 40,
    paddingHorizontal: spacing[5],
  },
  headerView: {
    position: "relative",
    paddingVertical: spacing[5],
    backgroundColor: colors.white,
    flexDirection: "row",
    justifyContent: "center",
  },
  backBtn: {
    position: "absolute",
    top: spacing[5],
    left: 10,
  },
  headerText: {
    fontFamily: typography.primaryMedium,
    color: colors.red,
  },
});
