import { getAuthTokenFromSecureStore } from './storage';

export const API_URL = process.env.EXPO_PUBLIC_API_URL!;

export const DEFAULT_HEADERS = {
  Accept: 'application/json',
  'Content-Type': 'application/json',
};

export const getDefaultHeaders = async (includeAuth: boolean = false) => {
  return { ...DEFAULT_HEADERS, ...(includeAuth ? await createAuthHeader() : {}) };
};

export const createAuthHeader = async () => {
  const authToken = await getAuthTokenFromSecureStore();

  const authHeader = { Authorization: `Bearer ${authToken}` };

  return authHeader;
};
