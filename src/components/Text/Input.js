import { StyleSheet, TextInput } from "react-native";
import presets from "./text.preset";

export default Input = ({
  placeholder = "Default Placehod",
  preset = "default",
  style,
  isPasswordInput = false,
  handleTextInput,
  keyboardType = "default",
  autoCapitalize = "",
}) => {
  const textStyle = StyleSheet.compose(presets[preset], style);
  return (
    <TextInput
      style={textStyle}
      placeholder={placeholder}
      secureTextEntry={isPasswordInput}
      onChangeText={(text) => handleTextInput(text)}
      keyboardType={keyboardType}
      autoCapitalize={autoCapitalize}
      autoCorrect={false}
    />
  );
};
