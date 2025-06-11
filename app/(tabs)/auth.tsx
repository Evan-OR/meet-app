import CustomButton from '@/components/CustomButton';
import CustomInput from '@/components/CustomInput';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { Colors } from '@/constants/Colors';
import useUser from '@/hooks/useUser';
import { setAuthTokenInSecureStore, setUserDataInStorage } from '@/lib/storage';
import { AuthFormErrors } from '@/types';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { router } from 'expo-router';
import { useState } from 'react';
import { KeyboardAvoidingView, Pressable, SafeAreaView, StyleSheet } from 'react-native';

const auth = () => {
  const { setUser } = useUser();

  const [isLogin, setIsLogin] = useState(true);

  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [errors, setErrors] = useState<AuthFormErrors>({});

  const { title, actionText, oppositeActionText, switchActionText, route } = isLogin
    ? {
        title: 'Welcome back!',
        actionText: 'Log In',
        oppositeActionText: 'Sign Up',
        switchActionText: "Don't have an account?",
        route: 'login',
      }
    : {
        title: 'Welcome!',
        actionText: 'Sign Up',
        oppositeActionText: 'Log In',
        switchActionText: 'Already have an account?',
        route: 'signup',
      };

  const isFormvalid = (): boolean => {
    const errors: AuthFormErrors = {};

    if (!firstName && !isLogin) {
      errors.firstName = 'First name is required';
    }
    if (!lastName && !isLogin) {
      errors.lastName = 'LAst name is required';
    }
    if (!email) {
      errors.email = 'Email is required';
    }
    if (!password) {
      errors.password = 'Password is required';
    }

    setErrors(errors);

    return Object.keys(errors).length === 0;
  };

  const submitForm = async () => {
    if (!isFormvalid()) {
      console.log('THE FORM IS NOT VALID: ');
      return;
    }
    console.log('VALID FORM');

    try {
      const res = await fetch(`http://192.168.1.9:3000/auth/${route}`, {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          firstName,
          lastName,
          email,
          password,
        }),
      });

      const data = await res.json();

      const authToken = data['authToken'];
      const userData = data['userData'];

      await setAuthTokenInSecureStore(authToken);
      await setUserDataInStorage(userData);
      setUser(userData);
      router.replace('/setup');

      console.log(authToken);
      console.log(userData);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <KeyboardAvoidingView style={styles.container} behavior="padding" keyboardVerticalOffset={100}>
      <ThemedView style={styles.container}>
        <SafeAreaView>
          <ThemedView style={styles.header}>
            <ThemedText type="title">{title}</ThemedText>
            <ThemedText type="default">{actionText}</ThemedText>
          </ThemedView>

          <ThemedView style={styles.contentWrapper}>
            {!isLogin && (
              <CustomInput
                placeholder="First name"
                value={firstName}
                setValue={setFirstName}
                textContentType="givenName"
              />
            )}
            {!isLogin && (
              <CustomInput
                placeholder="Last name"
                value={lastName}
                setValue={setLastName}
                textContentType="familyName"
              />
            )}

            <CustomInput placeholder="e-mail" value={email} setValue={setEmail} textContentType="emailAddress" />
            <CustomInput
              placeholder="Password"
              value={password}
              setValue={setPassword}
              isPassword
              textContentType="password"
            />

            <ThemedText style={{ justifyContent: 'center' }}>or</ThemedText>

            <ThemedView style={{ flexDirection: 'row', gap: 16 }}>
              <FontAwesome style={styles.icon} name="twitter" size={32} color={Colors.light.text} />
              <FontAwesome style={styles.icon} name="google" size={32} color={Colors.light.text} />
              <FontAwesome style={styles.icon} name="linkedin-square" size={32} color={Colors.light.text} />
            </ThemedView>

            <CustomButton onPress={submitForm} text={actionText} styles={{ marginTop: 16, width: '100%' }} />

            <ThemedView style={styles.helperTextWrapper}>
              <ThemedText>{switchActionText}</ThemedText>

              <Pressable style={styles.helperTextButton} onPress={() => setIsLogin((prev) => !prev)}>
                <ThemedText style={{ color: Colors.light.tint }}>{oppositeActionText}</ThemedText>
              </Pressable>
            </ThemedView>
          </ThemedView>
        </SafeAreaView>
      </ThemedView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    marginTop: 64,
    alignItems: 'center',
  },
  contentWrapper: {
    marginTop: 32,
    paddingHorizontal: 32,
    gap: 16,
    alignItems: 'center',
  },
  icon: {
    width: 54,
    height: 54,
    borderStyle: 'solid',
    borderWidth: 1,
    borderColor: Colors.light.text,
    paddingHorizontal: 12,
    paddingVertical: 10,
    borderRadius: '100%',
  },
  helperTextWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  helperTextButton: {
    paddingVertical: 4,
    paddingHorizontal: 8,
  },
});

export default auth;
