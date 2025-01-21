/* eslint-disable react-native/no-inline-styles */
import React, {useState} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Alert,
  StyleSheet,
} from 'react-native';
import {useAuth} from '../context/AuthContext';

const LoginScreen = ({navigation}) => {
  const {loginWithEmail, registerWithEmail} = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [acceptedTerms] = useState(false);

  const handleEmailLogin = async () => {
    try {
      await loginWithEmail(email, password);
      Alert.alert('Sikeres bejelentkezés!');
    } catch (error) {
      Alert.alert(
        'Hiba',
        'Helytelen e-mail cím vagy jelszó. Kérjük, próbálja újra.',
      );
      console.error('Error logging in:', error);
    }
  };

  const handleEmailRegister = async () => {
    if (!acceptedTerms) {
      Alert.alert('Figyelem', 'Kérjük, fogadja el az ÁSZF-et!');
      return;
    }
    try {
      await registerWithEmail(email, password);
      Alert.alert('Sikeres regisztráció!');
    } catch (error) {
      console.error('Error registering:', error);
      if (error.code === 'auth/email-already-in-use') {
        Alert.alert('Hiba', 'Ez az email cím már regisztrálva van.');
      } else if (error.code === 'auth/invalid-email') {
        Alert.alert(
          'Hiba',
          'Érvénytelen email cím. Kérjük, adjon meg egy helyes email címet.',
        );
      } else if (error.code === 'auth/weak-password') {
        Alert.alert(
          'Hiba',
          'A jelszónak legalább 6 karakter hosszúnak kell lennie.',
        );
      } else {
        Alert.alert('Hiba', 'Regisztráció sikertelen. Próbálja újra.');
      }
    }
  };

  // const handleGoogleLogin = async () => {
  //   try {
  //     await loginWithGoogle();
  //     Alert.alert('Sikeres bejelentkezés Google fiókkal!');
  //   } catch (error) {
  //     Alert.alert('Hiba', 'Google bejelentkezés sikertelen.');
  //   }
  // };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Bejelentkezés</Text>

      {/* <TouchableOpacity style={styles.googleButton} onPress={handleGoogleLogin}>
        <Text style={styles.googleButtonText}>Google fiókkal</Text>
      </TouchableOpacity> */}

      {/* Email & Password */}
      <TextInput
        style={styles.input}
        placeholder="Email"
        onChangeText={text => setEmail(text)}
        value={email}
      />
      <TextInput
        style={styles.input}
        placeholder="Jelszó"
        secureTextEntry
        onChangeText={text => setPassword(text)}
        value={password}
      />
      <TouchableOpacity style={styles.button} onPress={handleEmailLogin}>
        <Text style={styles.buttonText}>Bejelentkezés</Text>
      </TouchableOpacity>

      {/* Register */}
      <Text style={styles.title}>Regisztráció</Text>
      <TextInput
        style={styles.input}
        placeholder="Email"
        onChangeText={text => setEmail(text)}
        value={email}
      />
      <TextInput
        style={styles.input}
        placeholder="Jelszó"
        secureTextEntry
        onChangeText={text => setPassword(text)}
        value={password}
      />

      {/* Terms Checkbox - In RN you can use a Switch or a checkbox library */}
      <TouchableOpacity onPress={() => navigation.navigate('TermsScreen')}>
        <Text style={{color: 'blue', marginVertical: 8}}>
          Megnézem az ÁSZF-et
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[
          styles.button,
          {backgroundColor: acceptedTerms ? '#28a745' : '#ccc'},
        ]}
        onPress={handleEmailRegister}
        disabled={!acceptedTerms}>
        <Text style={styles.buttonText}>Regisztráció</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
    backgroundColor: '#fff',
  },
  title: {fontSize: 20, marginVertical: 10, fontWeight: 'bold'},
  input: {borderWidth: 1, borderColor: '#ccc', padding: 10, marginVertical: 5},
  button: {
    backgroundColor: 'blue',
    padding: 12,
    marginVertical: 5,
    alignItems: 'center',
  },
  buttonText: {color: '#fff', fontSize: 16},
  googleButton: {
    backgroundColor: 'red',
    padding: 12,
    marginVertical: 5,
    alignItems: 'center',
  },
  googleButtonText: {color: '#fff', fontSize: 16},
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 5,
  },
  checkbox: {
    width: 20,
    height: 20,
    borderWidth: 1,
    borderColor: '#999',
    marginRight: 8,
  },
  checked: {backgroundColor: 'green'},
  checkboxLabel: {fontSize: 16},
});

export default LoginScreen;
