import { User } from '@/types';

export const getUserAgeFromISO = (iosString: string | null) => {
  if (!iosString) return null;

  const dob = new Date(iosString);
  const today = new Date();

  let age = today.getFullYear() - dob.getFullYear();

  const hasHadBirthdayThisYear =
    today.getMonth() > dob.getMonth() || (today.getMonth() === dob.getMonth() && today.getDate() >= dob.getDate());

  if (!hasHadBirthdayThisYear) {
    age--;
  }

  return age;
};

export const formatUserData = (user: User) => {
  return { ...user, age: getUserAgeFromISO(user.date_of_birth) };
};
