import React, { useState } from 'react'
import { Text, TextInput, View, TouchableOpacity, Alert } from 'react-native'
import { createUserWithEmailAndPassword } from 'firebase/auth'
import styles from '../../StyleSheet'
import { FIREBASE_AUTH, FIREBASE_DB } from '../../FirebaseConfig'
import { ref, set } from 'firebase/database'
import { router } from 'expo-router'


export default function Signup() {

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const [errorMessage, setErrorMessage] = useState(null);

  const handleSignup = async () => {
    if (isValid()) {
      try {
        await createUserWithEmailAndPassword(FIREBASE_AUTH, email, password);
        const currentUserUID = FIREBASE_AUTH.currentUser.uid;
        set(ref(FIREBASE_DB, `users/${currentUserUID}/userdetails`), { name, phoneNumber, email });
        console.log('User created successfully!');
        Alert.alert('User created successfully!');
        router.replace("/");
      } catch (error) {
        console.log("FUELDASH: Error while signup: ", error);
        setErrorMessage(error.message);
      }
    }
  }

  const isValid = () => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!name) {
      setErrorMessage('Name cannot be empty.');
    } else if (!phoneNumber || phoneNumber.length != 10) {
      setErrorMessage("Please enter a valid phone number.")
    } else if (!email || !re.test(String(email).toLowerCase())) {
      setErrorMessage('Please enter a valid email address.');
    } else if (!password || password.length < 6) {
      setErrorMessage('Password must be at least 6 characters long.');
    } else if (confirmPassword != password) {
      setErrorMessage('Passwords do not match.');
    } else {
      setErrorMessage(null);
      return true;
    }
    return false;
  }


  return (
    <View style={styles.container}>

      <TextInput
        placeholder='Name'
        placeholderTextColor="grey"
        style={styles.input}
        onChangeText={setName}
        value={name}
      />


      <TextInput
        placeholder='Phone'
        placeholderTextColor="grey"
        style={styles.input}
        onChangeText={setPhoneNumber}
        value={phoneNumber}
        keyboardType='number-pad'
      />


      <TextInput
        autoCapitalize='none'
        placeholder='Email'
        placeholderTextColor="grey"
        inputMode='email'
        style={styles.input}
        onChangeText={setEmail}
        value={email}
      />


      <TextInput
        autoCapitalize='none'
        secureTextEntry={true}
        placeholder='Password'
        placeholderTextColor="grey"
        style={styles.input}
        onChangeText={setPassword}
        value={password}
      />


      <TextInput
        autoCapitalize='none'
        secureTextEntry={true}
        placeholder='Confirm Password'
        placeholderTextColor="grey"
        style={styles.input}
        onChangeText={setConfirmPassword}
        value={confirmPassword}
      />

      {errorMessage ? <Text style={styles.errorText}>{errorMessage}</Text> : null}

      <TouchableOpacity
        onPress={handleSignup}
        style={styles.button}
      >
        <Text>Signup</Text>
      </TouchableOpacity>

    </View>
  )
}