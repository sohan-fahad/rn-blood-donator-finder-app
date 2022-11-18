import { Pressable, ScrollView, StyleSheet, View } from "react-native";
import spacing from "../../theme/spacing";
import { AntDesign } from "@expo/vector-icons";
import colors from "../../theme/colors";
import CustomText from "../../components/Text/CustomText";
import typography from "../../theme/typography";
import DonorCard from "./components/DonorCard";
import HeaderComponent from "../../components/Layout/HeaderComponent";

export default SearchResultScreen = () => {
  return (
    <View style={styles.container}>
      <View style={styles.headerView}>
        <Pressable style={styles.backBtn}>
          <AntDesign name="arrowleft" size={24} color={colors.red} />
        </Pressable>
        <CustomText style={styles.headerText}>Search Result</CustomText>
      </View>
      <ScrollView style={styles.scrollView}>
        <DonorCard />
        <DonorCard />
        <DonorCard />
        <DonorCard />
        <DonorCard />
        <DonorCard />
        <DonorCard />
        <DonorCard />
        <DonorCard />
        <DonorCard />
        <DonorCard />
        <DonorCard />
        <DonorCard />
        <DonorCard />
        <DonorCard />
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: spacing[5],
    flex: 1,
    width: "100%",
  },
  scrollView: {
    paddingTop: 20,
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
    left: 0,
  },
  headerText: {
    fontFamily: typography.primaryMedium,
    color: colors.red,
  },
});
