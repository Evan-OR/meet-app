import { Colors } from '@/constants/Colors';
import { StyleSheet, TextInput, View } from 'react-native';

type CustomInputProps = {
  value: string;
  placeholder: string;
  setValue: (newValue: string) => void;
  isMultiline?: boolean;
};

const CustomInput = ({ value, placeholder, isMultiline = false, setValue }: CustomInputProps) => {
  return (
    <View style={styles.customInputWrapper}>
      {/* <ThemedText>Name</ThemedText> */}
      <TextInput
        multiline={isMultiline}
        style={styles.input}
        placeholderTextColor={Colors.light.icon}
        value={value}
        onChangeText={(newText) => setValue(newText)}
        placeholder={placeholder}
      ></TextInput>
    </View>
  );
};

const styles = StyleSheet.create({
  customInputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  input: {
    flexGrow: 1,
    fontSize: 16,
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderStyle: 'solid',
    borderWidth: 2,
    borderRadius: 4,
    borderColor: Colors.light.text,
  },
});

export default CustomInput;
