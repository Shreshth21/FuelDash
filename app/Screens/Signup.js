import React, { useState } from 'react'
import { Text, TextInput, View, TouchableOpacity, Alert, Button, StyleSheet, TouchableHighlight } from 'react-native'
import { signInWithEmailAndPassword } from 'firebase/auth'
import { FIREBASE_AUTH } from '../../FirebaseConfig'
import styles from '../../StyleSheet'
import { router } from 'expo-router'


export default function Signup() {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    try {
      await signInWithEmailAndPassword(FIREBASE_AUTH, email, password);
      Alert.alert('User logged in successfully!');
    } catch (error) {
      console.log("Error while signin: ", error);
      const errorMessage = "Login failed. Please check your credentials.";
      Alert.alert("Login Failed", errorMessage);
    }

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
          onPress={() => router.push('/Screens/Login')}
        >
          <Text style={styles.linkText}>Create account</Text>
        </TouchableOpacity>
      </View>

    </View>
  )
}