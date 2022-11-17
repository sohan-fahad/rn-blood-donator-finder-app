import {
  SafeAreaView,
  FlatList,
  StyleSheet,
  View,
  Pressable,
} from "react-native";
import PlanetsHeader from "../../components/HeaderComponents/PlanetsHeader";
import CustomText from "../../components/Text/CustomText";
import { PLANET_LIST } from "../../data/planets-list";
import colors from "../../theme/colors";
import globalStyles from "../../theme/globalStyles";
import spacing from "../../theme/spacing";
import { AntDesign } from "@expo/vector-icons";

export default HomeScreen = ({ navigation }) => {
  return (
    <SafeAreaView style={styles.container}>
      <PlanetsHeader />
      <FlatList
        data={PLANET_LIST}
        keyExtractor={(item, index) => index}
        renderItem={({ item }) => {
          return (
            <Pressable
              onPress={() => navigation.navigate("Details", { planet: item })}
            >
              <View style={styles.item}>
                <View style={styles.titleWrapper}>
                  <View
                    style={[styles.circle, { backgroundColor: item.color }]}
                  />
                  <CustomText preset="h4" style={styles.name}>
                    {item.name}
                  </CustomText>
                </View>
                <AntDesign name="right" size={16} color={colors.white} />
              </View>
            </Pressable>
          );
        }}
        ItemSeparatorComponent={() => <View style={styles.separator} />}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    ...globalStyles.adroidSafeArea,
    backgroundColor: colors.black,
  },
  item: {
    flex: 1,
    flexDirection: "row",
    padding: spacing[5],
    justifyContent: "space-between",
    alignItems: "center",
  },
  titleWrapper: {
    flexDirection: "row",
    alignItems: "center",
  },
  circle: {
    height: 30,
    width: 30,
    borderRadius: 15,
    marginRight: 10,
  },
  name: {
    textTransform: "uppercase",
  },
  separator: {
    borderBottomColor: colors.white,
    borderBottomWidth: 0.3,
  },
});
