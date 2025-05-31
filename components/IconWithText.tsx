import { Colors } from '@/constants/Colors';
import { SymbolViewProps } from 'expo-symbols';
import { StyleSheet, View } from 'react-native';
import { ThemedText } from './ThemedText';
import { IconSymbol } from './ui/IconSymbol';

type IconWithTextProps = {
  text: string;
  icon: SymbolViewProps['name'];
  size?: number;
};

const IconWithText = ({ text, icon, size = 20 }: IconWithTextProps) => {
  return (
    <View style={styles.container}>
      <IconSymbol size={size} name={icon} color={Colors.light.icon} />
      <ThemedText>{text}</ThemedText>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
});

export default IconWithText;
