import ProfileDisplay from '@/components/ProfileDisplay';
import { ThemedView } from '@/components/ThemedView';
import { useEffect } from 'react';
import { ScrollView, StyleSheet } from 'react-native';

import useIsLoggedIn from '@/hooks/useIsLoggedIn';
import * as Location from 'expo-location';

export default function HomeScreen() {
  const isLoggedIn = useIsLoggedIn();

  useEffect(() => {
    async function getCurrentLocation() {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        console.log('Permission to access location was denied');
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      console.log('Location: ', location);
    }

    getCurrentLocation();
  }, []);

  useEffect(() => {
    console.log(isLoggedIn);
  });

  return (
    <ThemedView style={styles.container}>
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        <ProfileDisplay
          name="Ana De Armas"
          age={37}
          city="California"
          job="Actor"
          description="Lorem ipsum dolor sit amet, consectetur adipiscing elit. In ultrices semper urna, nec interdum ante laoreet
            eget."
          interests={['Acting', 'Gym', 'Music', 'Traveling', 'Dogs']}
        />
      </ScrollView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  eventWrapper: {
    paddingTop: 10,
    paddingBottom: 10,
  },
});
