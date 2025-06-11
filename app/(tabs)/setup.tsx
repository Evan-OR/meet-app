import EditProfileComponent from '@/components/EditProfileComponent';
import { ThemedView } from '@/components/ThemedView';
import useUser from '@/hooks/useUser';
import { API_URL, getDefaultHeaders } from '@/lib/requests';
import { setUserDataInStorage } from '@/lib/storage';
import { ProfileData } from '@/types';
import { router } from 'expo-router';
import React from 'react';
import { SafeAreaView, ScrollView, StyleSheet } from 'react-native';

const setup = () => {
  const { user, setUser } = useUser();

  const onSave = async (data: ProfileData) => {
    if (user === null) {
      console.log('NOT USER ID FOUND!');
      onClose();
      return;
    }

    console.log(data);

    try {
      const defaultHeaders = await getDefaultHeaders(true);

      const req = await fetch(`${API_URL}/users/${user.id}`, {
        method: 'PATCH',
        headers: defaultHeaders,
        body: JSON.stringify(data),
      });

      const jsonRes = await req.json();

      console.log(jsonRes);
      await setUserDataInStorage(jsonRes.userData);
      setUser(jsonRes.userData);
      onClose();
    } catch (err) {
      console.log('FAILED TO UPDATED USER DATA');
      console.log(err);
    }
  };

  const onClose = () => {
    router.replace('/profile');
  };

  return (
    <ThemedView style={styles.container}>
      <SafeAreaView>
        <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
          <EditProfileComponent onClose={onClose} onSave={onSave} />
        </ScrollView>
      </SafeAreaView>
    </ThemedView>
  );
};

export default setup;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingBottom: 100,
  },
});
