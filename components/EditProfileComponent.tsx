import useUser from '@/hooks/useUser';
import { Gender, ProfileData } from '@/types';
import DateTimePicker, { DateTimePickerEvent } from '@react-native-community/datetimepicker';
import { Picker } from '@react-native-picker/picker';
import React, { useEffect, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import CustomButton from './CustomButton';
import CustomInput from './CustomInput';
import { ThemedText } from './ThemedText';

type EditProfileComponentProps = {
  onSave: (data: ProfileData) => void;
  onClose: () => void;
};

const EditProfileComponent = ({ onSave, onClose }: EditProfileComponentProps) => {
  const NineteenYearsAgo = new Date(new Date().getTime() - 1000 * 60 * 60 * 24 * 365 * 19);

  const { user } = useUser();

  const [userName, setUsername] = useState(user?.first_name || '');
  const [desc, setDesc] = useState(user?.description || '');
  const [date, setDate] = useState(NineteenYearsAgo);
  const [jobName, setJobName] = useState(user?.job || '');
  const [[gender, genderIndex], setGender] = useState<[Gender, number]>(['Male', 1]);
  const [[interestedIn, interestedInIndex], setInterestedIn] = useState<[Gender, number]>(['Female', 2]);

  const handleDateChange = (event: DateTimePickerEvent, selectedDate: Date | undefined) => {
    if (!selectedDate) return;

    setDate(selectedDate);
  };

  useEffect(() => {
    console.log(date);
  }, [date]);
  return (
    <View style={styles.contentWrapper}>
      <ThemedText type="title">Edit Your Profile</ThemedText>

      <View style={styles.inputsWrapper}>
        <CustomInput value={userName} setValue={setUsername} placeholder="First name" />

        <View style={styles.dateWrapper}>
          <ThemedText>DOB</ThemedText>
          <DateTimePicker
            value={date}
            mode="date"
            // is24Hour={true}
            onChange={handleDateChange}
            textColor="#f01111"
          />
        </View>

        <CustomInput value={desc} setValue={setDesc} placeholder="Your description" isMultiline />

        <CustomInput value={jobName} setValue={setJobName} placeholder="Job" />

        <ThemedText>Idk how we can do interests in a way that isn't very involved...</ThemedText>
      </View>

      <Picker
        selectedValue={gender}
        onValueChange={(itemValue, itemIndex) => {
          console.log(itemValue);
          setGender([itemValue, itemIndex + 1]);
        }}
        style={styles.picker}
      >
        <Picker.Item color="black" label="Male" value="Male" />
        <Picker.Item color="black" label="Female" value="Female" />
        <Picker.Item color="black" label="Non-binary" value="Non-binary" />
        <Picker.Item color="black" label="Other" value="Other" />
      </Picker>

      <Picker
        selectedValue={interestedIn}
        onValueChange={(itemValue, itemIndex) => {
          console.log(itemValue);
          setInterestedIn([itemValue, itemIndex + 1]);
        }}
        style={styles.picker}
      >
        <Picker.Item color="black" label="Male" value="Male" />
        <Picker.Item color="black" label="Female" value="Female" />
        <Picker.Item color="black" label="Non-binary" value="Non-binary" />
        <Picker.Item color="black" label="All" value="All" />
      </Picker>

      <View style={styles.buttonWrapper}>
        <CustomButton
          text="Save"
          onPress={() =>
            onSave({
              displayName: userName,
              description: desc,
              job: jobName,
              dateOfBirth: date.toISOString(),
              gender: genderIndex,
              interestedIn: interestedInIndex,
            })
          }
        />
        <CustomButton text="Close" onPress={onClose} lightButton />
      </View>
    </View>
  );
};

export default EditProfileComponent;

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
  dateWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  buttonWrapper: {
    gap: 8,
  },
  picker: {
    width: '100%',
  },
});
