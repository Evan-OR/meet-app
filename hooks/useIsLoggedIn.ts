import { UserContext } from '@/context/UserContext';
import { useContext } from 'react';

const useIsLoggedIn = () => {
  const userContext = useContext(UserContext);

  return !!userContext?.user;
};

export default useIsLoggedIn;
