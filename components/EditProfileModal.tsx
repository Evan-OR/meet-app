import { useState } from 'react';
import { Button, ScrollView, StyleSheet, View } from 'react-native';
import CustomInput from './CustomInput';
import { ThemedText } from './ThemedText';
import { ThemedView } from './ThemedView';

type EditProfileModalProps = {
  toggleModal: () => void;
  name: string;
  age: number;
  city: string;
  job: string;
  description: string;
  interests: string[];
};

const EditProfileModal = ({ toggleModal, name, age, city, job, description, interests }: EditProfileModalProps) => {
  const [userName, setUsername] = useState(name);
  const [desc, setDesc] = useState(description);

  return (
    <ThemedView style={styles.container}>
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        <View style={styles.contentWrapper}>
          <ThemedText type="title">Edit Your Profile</ThemedText>

          <View style={styles.inputsWrapper}>
            <CustomInput value={name} setValue={setUsername} placeholder="First name" />

            <CustomInput value={desc} setValue={setDesc} placeholder="Your description" isMultiline />
          </View>

          <View style={styles.buttonWrapper}>
            <Button title="Save" onPress={toggleModal} />
            <Button title="Close" onPress={toggleModal} />
          </View>
        </View>
      </ScrollView>
    </ThemedView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 50,
  },
  customInputWrapper: {
    flexDirection: 'row',
    gap: 4,
    backgroundColor: 'red',
  },
  contentWrapper: {
    padding: 12,
    gap: 16,
  },
  inputsWrapper: {
    gap: 8,
  },
  input: {
    backgroundColor: 'blue',
    flexGrow: 1,
  },
  buttonWrapper: {
    // flexDirection: 'row',
  },
});

export default EditProfileModal;
