import React, { useState } from 'react'
import { Text, TextInput, View, TouchableOpacity, Alert } from 'react-native'
import { createUserWithEmailAndPassword } from 'firebase/auth'
import styles from '../../StyleSheet'
import { FIREBASE_AUTH, FIREBASE_DB } from '../../FirebaseConfig'
import { ref, set } from 'firebase/database'

export default function Signup() {

  console.log("FUELDASH: page signup loaded");


  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const [nameErrorMessage, setNameErrorMessage] = useState(null);
  const [emailErrorMessage, setEmailErrorMessage] = useState(null);
  const [phoneNumberErrorMessage, setPhoneNumberErrorMessage] = useState(null);
  const [passwordErrorMessage, setPasswordErrorMessage] = useState(null);
  const [confirmPasswordErrorMessage, setConfirmPasswordErrorMessage] = useState(null);

  let isValidated = (nameErrorMessage || emailErrorMessage || phoneNumberErrorMessage || passwordErrorMessage || confirmPasswordErrorMessage || !email || !name || !phoneNumber || !password || !confirmPassword);

  const handleSignup = async () => {
    try {
      await createUserWithEmailAndPassword(FIREBASE_AUTH, email, password);
      const currentUserUID = FIREBASE_AUTH.currentUser.uid;
      set(ref(FIREBASE_DB, `users/${currentUserUID}/userdetails`), { name, phoneNumber, email });
      Alert.alert('User created successfully!');
    } catch (error) {
      Alert.alert("Error while signup: ", error);
    }
  }

  const validateName = (name) => {
    setName(name);
    if (!name) {
      setNameErrorMessage('Name cannot be empty.');
    }
    else {
      setNameErrorMessage('');
    }
  };

  const validateEmail = (email) => {
    setEmail(email);
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email || !re.test(String(email).toLowerCase())) {
      setEmailErrorMessage('Please enter a valid email address.');
    }
    else {
      setEmailErrorMessage('');
    }
  };

  const validatePhoneNumber = (phoneNumber) => {
    setPhoneNumber(phoneNumber);
    if (!phoneNumber) {
      setPhoneNumberErrorMessage('Phone number cannot be empty.');
    }
    else if (phoneNumber.length != 10) {
      setPhoneNumberErrorMessage("Not a valid number.")
    }
    else {
      setPhoneNumberErrorMessage('');
    }
  };

  const validatePassword = (password) => {
    setPassword(password);
    if (!password) {
      setPasswordErrorMessage('Password is required.');
    }
    else if (password.length < 6) {
      setPasswordErrorMessage('Password must be at least 6 characters long.');
    }
    else {
      setPasswordErrorMessage('');
    }

  };

  const validateConfirmPassword = (confirmPassword) => {
    setConfirmPassword(confirmPassword);
    if (confirmPassword != password) {
      setConfirmPasswordErrorMessage('Passwords do not match.');
    }
    else {
      setConfirmPasswordErrorMessage('');
    }
  }

  return (

    <View style={styles.container}>

      <TextInput
        placeholder='Name'
        placeholderTextColor="grey"
        style={styles.input}
        onChangeText={validateName}
        value={name}
      />

      {nameErrorMessage ? <Text style={styles.errorText}>{nameErrorMessage}</Text> : null}

      <TextInput
        placeholder='Phone'
        placeholderTextColor="grey"
        style={styles.input}
        onChangeText={validatePhoneNumber}
        value={phoneNumber}
        keyboardType='number-pad'
      />

      {phoneNumberErrorMessage ? <Text style={styles.errorText}>{phoneNumberErrorMessage}</Text> : null}

      <TextInput
        autoCapitalize='none'
        placeholder='Email'
        placeholderTextColor="grey"
        inputMode='email'
        style={styles.input}
        onChangeText={validateEmail}
        value={email}
      />

      {emailErrorMessage ? <Text style={styles.errorText}>{emailErrorMessage}</Text> : null}

      <TextInput
        autoCapitalize='none'
        secureTextEntry={true}
        placeholder='Password'
        placeholderTextColor="grey"
        style={styles.input}
        onChangeText={validatePassword}
        value={password}
      />

      {passwordErrorMessage ? <Text style={styles.errorText}>{passwordErrorMessage}</Text> : null}

      <TextInput
        autoCapitalize='none'
        secureTextEntry={true}
        placeholder='Confirm Password'
        placeholderTextColor="grey"
        style={styles.input}
        onChangeText={validateConfirmPassword}
        value={confirmPassword}
      />

      {confirmPasswordErrorMessage ? <Text style={styles.errorText}>{confirmPasswordErrorMessage}</Text> : null}

      <TouchableOpacity
        onPress={handleSignup}
        style={isValidated ? styles.buttonDisabled : styles.button}
        disabled={isValidated}
      >
        <Text
          style={isValidated && styles.disabled_button_text}>Signup</Text>
      </TouchableOpacity>

    </View>

  )
}
