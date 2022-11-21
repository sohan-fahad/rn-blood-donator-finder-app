import { Pressable, ScrollView, StyleSheet, View } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { selectFilterObj } from "../../store/reducers/donorListFilterSlice";
import spacing from "../../theme/spacing";
import { AntDesign } from "@expo/vector-icons";
import colors from "../../theme/colors";
import CustomText from "../../components/Text/CustomText";
import typography from "../../theme/typography";
import DonorCard from "./components/DonorCard";
import HeaderComponent from "../../components/Layout/HeaderComponent";
import useFirebase from "../../hooks/useFirebase";
import { useEffect, useState } from "react";
import globalStyles from "../../theme/globalStyles";
import { collection, onSnapshot, query, where } from "firebase/firestore";
import {
  addDonars,
  removeDonors,
  selectedDonorList,
} from "../../store/reducers/donarsListSlice";

export default SearchResultScreen = ({ navigation }) => {
  const [donors, setDonors] = useState(null);

  const dispatch = useDispatch();

  let list = [];

  const { bloodGroup, division, district, subDistrict } =
    useSelector(selectFilterObj);

  const donorList = useSelector(selectedDonorList);
  const { db } = useFirebase();

  useEffect(() => {
    if (bloodGroup) {
      getSearchResult(bloodGroup, division, district, subDistrict);
    }
  }, [!bloodGroup, !donors]);

  const getSearchResult = (bloodGroup, division, district, subDistrict) => {
    dispatch(removeDonors());
    const q = query(
      collection(db, "users"),
      where("bloodGroup", "==", bloodGroup),
      where("division", "==", division),
      where("district", "==", district),
      where("subDistrict", "==", subDistrict)
    );

    // setDonors([]);
    onSnapshot(q, (querySnapshot) => {
      querySnapshot.docs.forEach((item) => {
        dispatch(addDonars(item.data()));
      });
    });
  };

  return (
    <View style={styles.container}>
      <View style={styles.headerView}>
        <Pressable style={styles.backBtn} onPress={() => navigation.goBack()}>
          <AntDesign name="arrowleft" size={24} color={colors.red} />
        </Pressable>
        <CustomText style={styles.headerText}>Search Result</CustomText>
      </View>
      <ScrollView style={styles.scrollView}>
        {donorList.length > 0 ? (
          donorList.map((donor, index) => (
            <DonorCard key={index} donor={donor} />
          ))
        ) : (
          <CustomText>No donor found!</CustomText>
        )}
      </ScrollView>
    </View>
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
