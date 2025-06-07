import { Colors } from '@/constants/Colors';
import Color from 'color';
import { Pressable, StyleProp, StyleSheet, ViewStyle } from 'react-native';
import { ThemedText } from './ThemedText';

type CustomButtonProps = {
  text: string;
  styles?: StyleProp<ViewStyle>;
  onPress?: () => void;
};

const CustomButton = ({ text, styles = {}, onPress = () => '' }: CustomButtonProps) => {
  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [buttonStyles.buttonWrapper, pressed && buttonStyles.buttonPressed, styles]}
    >
      <ThemedText style={buttonStyles.text}>{text}</ThemedText>
    </Pressable>
  );
};

const buttonStyles = StyleSheet.create({
  buttonWrapper: {
    backgroundColor: Colors.light.text,
    paddingHorizontal: 16,
    paddingVertical: 12,
    alignItems: 'center',
    borderRadius: 4,
  },
  buttonPressed: {
    backgroundColor: Color(Colors.light.text).lighten(1).hex(),
  },
  text: {
    color: 'white',
  },
});

export default CustomButton;
