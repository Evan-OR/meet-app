import { User } from '@/types';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as SecureStore from 'expo-secure-store';

export const getAuthTokenFromSecureStore = async () => await SecureStore.getItemAsync('authToken');
export const deleteAuthTokenFromSecureStore = async () => await SecureStore.deleteItemAsync('authToken');
export const setAuthTokenInSecureStore = async (authToken: string) =>
  await SecureStore.setItemAsync('authToken', authToken);

export const getUserDataFromStorage = async () => await AsyncStorage.getItem('userData');
export const deleteUserDataFromStorage = async () => await AsyncStorage.removeItem('userData');
export const setUserDataInStorage = async (userData: User) => {
  await AsyncStorage.setItem('userData', JSON.stringify(userData));
};
