import {
  Linking,
  Pressable,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import PlanetsHeader from "../../components/HeaderComponents/PlanetsHeader";
import globalStyles from "../../theme/globalStyles";
import colors from "../../theme/colors";
import Planet from "../../svg/Planet";
import CustomText from "../../components/Text/CustomText";
import spacing from "../../theme/spacing";
import PlanetInfoComponent from "./components/PlanetInfoComponent";

export default DetailsScreen = ({ route }) => {
  const { planet } = route.params;
  return (
    <SafeAreaView style={styles.container}>
      <PlanetsHeader isBackBtm={true} />
      <ScrollView style={styles.scrollView}>
        <View style={styles.imageView}>
          <Planet />
        </View>
        <View>
          <CustomText preset="h1" style={styles.planetName}>
            {planet.name}
          </CustomText>
          <CustomText preset="default" style={styles.description}>
            {planet.description}
          </CustomText>
        </View>
        <View style={styles.wikiLinkView}>
          <CustomText>Visit:</CustomText>
          <Pressable onPress={() => Linking.openURL(planet.wikiLink)}>
            <CustomText preset="bold" style={styles.wikiLink}>
              Wikipidia
            </CustomText>
          </Pressable>
        </View>
        <View style={{ marginTop: 20, marginBottom: 40 }}>
          <PlanetInfoComponent
            title="rotationTime"
            info={planet.rotationTime}
          />
          <PlanetInfoComponent
            title="revolutionTime"
            info={planet.revolutionTime}
          />
          <PlanetInfoComponent title="radius" info={planet.radius} />
          <PlanetInfoComponent title="avgTemp" info={planet.avgTemp} />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    ...globalStyles.adroidSafeArea,
    backgroundColor: colors.black,
  },
  scrollView: {
    padding: spacing[8],
  },
  imageView: {
    marginTop: 40,
    marginBottom: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  planetName: {
    textAlign: "center",
    textTransform: "uppercase",
    color: colors.orange,
  },
  description: {
    lineHeight: 20,
    textAlign: "center",
  },
  wikiLinkView: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 20,
  },
  wikiLink: {
    color: colors.orange,
    textDecorationLine: "underline",
    textDecorationColor: colors.blue,
    marginLeft: 10,
  },
});
