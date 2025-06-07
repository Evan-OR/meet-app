import { Colors } from '@/constants/Colors';
import { StyleSheet, TextInput, TextInputProps, View } from 'react-native';

type TextContentType = TextInputProps['textContentType'];

type CustomInputProps = {
  value: string;
  placeholder: string;
  setValue: (newValue: string) => void;
  isMultiline?: boolean;
  isPassword?: boolean;
  textContentType?: TextContentType;
};

const CustomInput = ({
  value,
  placeholder,
  isMultiline = false,
  isPassword = false,
  textContentType = 'none',
  setValue,
}: CustomInputProps) => {
  return (
    <View style={styles.customInputWrapper}>
      <TextInput
        textContentType={textContentType}
        secureTextEntry={isPassword}
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
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderStyle: 'solid',
    borderWidth: 2,
    borderRadius: 4,
    borderColor: Colors.light.text,
  },
});

export default CustomInput;
