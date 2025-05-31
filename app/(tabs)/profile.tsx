import ProfileDisplay from '@/components/ProfileDisplay';
import { ThemedView } from '@/components/ThemedView';
import React from 'react';
import { ScrollView, StyleSheet } from 'react-native';

const ProfilePage = () => {
  return (
    <ThemedView style={styles.container}>
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        <ProfileDisplay
          name="Jeremy"
          age={62}
          city="Dollhouse"
          job="Literal Psychopath"
          interests={["Being 1 guy'd", 'Dollhouses', 'Clowns', 'Rats', 'Cooking']}
          description="Lorem ipsum dolor sit amet, consectetur adipiscing elit. In ultrices semper urna, nec interdum ante laoreet
            eget."
          isLoggedInUserProfile
        />
      </ScrollView>
    </ThemedView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default ProfilePage;
