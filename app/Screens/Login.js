import React, { useState } from 'react'
import { Text, TextInput, View, TouchableOpacity, Alert } from 'react-native'
import { signInWithEmailAndPassword } from 'firebase/auth'
import { FIREBASE_AUTH } from '../../FirebaseConfig'
import styles from '../../StyleSheet'
import { router } from 'expo-router'


export default function Login() {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [errorMessage, setErrorMessage] = useState(null);

  const handleLogin = async () => {
    if (isValid()) {
      try {
        await signInWithEmailAndPassword(FIREBASE_AUTH, email, password);
        console.log("FUELDASH: User logged in successfully!");
        Alert.alert('User logged in successfully!');
        router.replace("/");
      } catch (error) {
        console.log("FUELDASH: Error while signin: ", error);
        setErrorMessage(error.message);
      }
    }
  }

  const isValid = () => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email || !re.test(String(email).toLowerCase())) {
      setErrorMessage('Please enter a valid email address.');
    } else if (!password) {
      setErrorMessage('Password is required.');
    } else {
      setErrorMessage(null);
      return true;
    }
    return false;
  }

  return (
    <View style={styles.container}>
      <TextInput
        placeholder='Email'
        placeholderTextColor="grey"
        inputMode='email'
        autoCapitalize='none'
        style={styles.input}
        onChangeText={setEmail}
        value={email}
      />

      <TextInput
        placeholder='Password'
        secureTextEntry={true}
        placeholderTextColor="grey"
        autoCapitalize='none'
        style={styles.input}
        onChangeText={setPassword}
        value={password}
      />

      {errorMessage ? <Text style={styles.errorText}>{errorMessage}</Text> : null}

      <TouchableOpacity
        onPress={handleLogin}
        style={styles.button}
      >
        <Text>Login</Text>
      </TouchableOpacity>

      <View style={styles.row}>
        <Text style={styles.text}>Don't have an account?</Text>
        <TouchableOpacity
          style={styles.linkButton}
          onPress={() => router.push('/Screens/Signup')}
        >
          <Text style={styles.linkText}>Create account</Text>
        </TouchableOpacity>
      </View>

    </View>
  )
}