import { UserContext } from '@/context/UserContext';
import { deleteAuthTokenFromSecureStore, deleteUserDataFromStorage } from '@/lib/storage';
import { useContext } from 'react';

const useUser = () => {
  const userContext = useContext(UserContext);

  if (userContext === undefined) {
    throw new Error('useUser needs to be used inside of a UserProvider');
  }

  const { user, setUser } = userContext;

  if (!user) {
    deleteAuthTokenFromSecureStore();
    deleteUserDataFromStorage();
  }

  return { user, setUser };
};

export default useUser;
