import { Colors } from '@/constants/Colors';
import Color from 'color';
import { Pressable, StyleProp, StyleSheet, ViewStyle } from 'react-native';
import { ThemedText } from './ThemedText';

type CustomButtonProps = {
  text: string;
  lightButton?: boolean;
  styles?: StyleProp<ViewStyle>;
  onPress?: () => void;
};

const CustomButton = ({ text, lightButton = false, styles = {}, onPress = () => '' }: CustomButtonProps) => {
  const themeStyles = lightButton
    ? {
        background: buttonStyles.lightButtonBackground,
        textColor: buttonStyles.lightButtonText,
        pressedColor: buttonStyles.lightButtonPressed,
      }
    : {
        background: buttonStyles.darkButtonBackground,
        textColor: buttonStyles.darkButtonText,
        pressedColor: buttonStyles.darkButtonPressed,
      };

  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [
        buttonStyles.buttonWrapper,
        themeStyles.background,
        pressed && themeStyles.pressedColor,
        styles,
      ]}
    >
      <ThemedText style={themeStyles.textColor}>{text}</ThemedText>
    </Pressable>
  );
};

const buttonStyles = StyleSheet.create({
  buttonWrapper: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    alignItems: 'center',
    borderRadius: 4,
  },
  lightButtonBackground: {
    borderColor: Colors.light.text,
    borderWidth: 2,
    borderStyle: 'solid',
    backgroundColor: 'white',
  },
  lightButtonText: {
    color: Colors.light.text,
  },
  lightButtonPressed: {
    backgroundColor: Color('white').darken(0.1).hex(),
  },
  darkButtonBackground: {
    backgroundColor: Colors.light.text,
  },
  darkButtonText: {
    color: 'white',
  },
  darkButtonPressed: {
    backgroundColor: Color(Colors.light.text).lighten(1).hex(),
  },
});

export default CustomButton;
