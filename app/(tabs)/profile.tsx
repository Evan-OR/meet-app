import ProfileDisplay from '@/components/ProfileDisplay';
import { ThemedView } from '@/components/ThemedView';
import useIsLoggedIn from '@/hooks/useIsLoggedIn';
import useUser from '@/hooks/useUser';
import { deleteAuthTokenFromSecureStore, deleteUserDataFromStorage } from '@/lib/storage';
import { formatUserData } from '@/lib/user';
import { Redirect } from 'expo-router';
import React from 'react';
import { Button, ScrollView, StyleSheet } from 'react-native';

const ProfilePage = () => {
  // YEAH IDK WHATS HAPPENING THIS SHOULD BE DONE DIFFERENT 4 SURE. Causes error idk why, should be done with a hook or some shit?
  const isLoggedIn = useIsLoggedIn();
  if (!isLoggedIn) {
    return <Redirect href={'/auth'} />;
  }

  const { user, setUser } = useUser();
  const formattedUserData = user ? formatUserData(user) : null;

  return (
    <ThemedView style={styles.container}>
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        <ProfileDisplay
          name={formattedUserData?.name!}
          age={formattedUserData?.age!}
          city="Dublin"
          job={formattedUserData?.job!}
          interests={["Being 1 guy'd", 'Dollhouses', 'Clowns', 'Rats', 'Cooking']}
          description={formattedUserData?.description!}
          isLoggedInUserProfile
        />
        <Button
          onPress={async () => {
            await deleteAuthTokenFromSecureStore();
            await deleteUserDataFromStorage();
            setUser(null);
          }}
          title={'Sign Out'}
        />
      </ScrollView>
    </ThemedView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingBottom: 100,
  },
});

export default ProfilePage;
