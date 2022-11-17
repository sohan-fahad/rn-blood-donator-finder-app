import { Picker } from "@react-native-picker/picker";

export default CustomPicker = ({items, style}) => {
  return (
    <Picker
      selectedValue={selectedLanguage}
      onValueChange={(itemValue, index) => setSelectedLanguage(itemValue)}
      style={...style}
    >
      {items.map((item, index) => {
        <Picker.Item key={index} label={item.name} value={item.value} />;
      })}
    </Picker>
  );
};
