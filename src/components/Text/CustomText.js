import { Text as RNText, StyleSheet } from "react-native";
import presets from "./text.preset";

export default CustomText = ({ children, preset = "default", style }) => {
  const textStyle = StyleSheet.compose(presets[preset], style);
  return <RNText style={textStyle}>{children}</RNText>;
};
