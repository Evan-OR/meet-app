import { Colors } from '@/constants/Colors';
import { StyleProp, StyleSheet, TextStyle, View } from 'react-native';
import { ThemedText } from '../ThemedText';

type ChipProps = {
  text: string;
  color?: string;
  bgColor?: string;
  textStyles?: StyleProp<TextStyle>;
};

const Chip = ({ text, color = Colors.light.lightenedText, bgColor = 'grey' }: ChipProps) => {
  return (
    <View style={[styles.container, { backgroundColor: bgColor }]}>
      <ThemedText style={{ color }}>{text}</ThemedText>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingVertical: 2,
    paddingHorizontal: 12,
    borderRadius: 16,
    alignSelf: 'flex-start',
  },
});

export default Chip;
