import { Colors, PastelColors } from '@/constants/Colors';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { router } from 'expo-router';
import { Dimensions, Image, Pressable, StyleSheet, View } from 'react-native';
import IconWithText from './IconWithText';
import { ThemedText } from './ThemedText';
import Chip from './ui/Chip';

const profilePic = require('@/assets/images/profilPic.png');
const JermaImage = require('@/assets/images/Jerma.jpg');
const screenWidth = Dimensions.get('window').width;

type ProfileDisplayProps = {
  name: string;
  age: number;
  city: string;
  job: string;
  description: string;
  interests: string[];
  isLoggedInUserProfile?: boolean;
};

const ProfileDisplay = ({
  name,
  age,
  city,
  job,
  description,
  interests,
  isLoggedInUserProfile = false,
}: ProfileDisplayProps) => {
  const getRandomColor = () => PastelColors[Math.floor(Math.random() * PastelColors.length)];

  const toggleModal = () => {
    router.replace('/setup');
  };

  return (
    <View style={styles.contentContainer}>
      <View style={[styles.imageWrapper, styles.shadow]}>
        <Image source={isLoggedInUserProfile ? JermaImage : profilePic} style={styles.image} resizeMode="cover"></Image>
      </View>

      <View style={styles.textContainer}>
        <View>
          <View style={styles.titleWrapper}>
            <ThemedText type="title" style={styles.title}>
              {name}, {age}
            </ThemedText>

            {isLoggedInUserProfile && (
              <Pressable onPress={toggleModal}>
                <FontAwesome style={{ marginTop: 7 }} name="edit" size={32} color={Colors.light.icon} />
              </Pressable>
            )}
          </View>

          <View>
            <IconWithText icon="briefcase" text={job} />
            <IconWithText icon="mappin" text={city} />
          </View>
        </View>

        <View>
          <ThemedText type="defaultSemiBold">About</ThemedText>
          <ThemedText lightenedText>{description}</ThemedText>
        </View>

        <View>
          <ThemedText type="defaultSemiBold">Interests</ThemedText>
          <View style={styles.interestContainer}>
            {interests.map((interest) => (
              <Chip key={interest} text={interest} bgColor={getRandomColor()} />
            ))}
          </View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  contentContainer: {
    flex: 1,
  },
  imageWrapper: {
    width: '100%',
    height: screenWidth,
  },
  image: {
    width: screenWidth,
    height: screenWidth,
    borderBottomRightRadius: 32,
    borderBottomLeftRadius: 32,
  },
  textContainer: {
    padding: 12,
    gap: 16,
  },
  titleWrapper: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  title: { marginTop: 8 },
  shadow: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 10,
  },
  interestContainer: {
    gap: 4,
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
});

export default ProfileDisplay;
