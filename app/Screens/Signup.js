import React, { useState, useCallback } from 'react';
import { Text, TextInput, View, TouchableOpacity, Alert } from 'react-native';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import styles from '../../StyleSheet';
import { FIREBASE_AUTH, FIREBASE_DB } from '../../FirebaseConfig';
import { ref, set } from 'firebase/database';

function debounce(func, delay) {
  let timer;
  return function(...args) {
    clearTimeout(timer);
    timer = setTimeout(() => func.apply(this, args), delay);
  };
}

export default function Signup() {
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

  const isValidated = nameErrorMessage || emailErrorMessage || phoneNumberErrorMessage || passwordErrorMessage || confirmPasswordErrorMessage || !email || !name || !phoneNumber || !password || !confirmPassword;

  const handleSignup = async () => {
    try {
      await createUserWithEmailAndPassword(FIREBASE_AUTH, email, password);
      const currentUserUID = FIREBASE_AUTH.currentUser.uid;
      await set(ref(FIREBASE_DB, `users/${currentUserUID}/userdetails`), { name, phoneNumber, email });
      Alert.alert('User created successfully!');
    } catch (error) {
      Alert.alert('Error while signup:', error.message);
    }
  };

  const validateName = useCallback(
    debounce((name) => {
      setNameErrorMessage(!name ? 'Name cannot be empty.' : '');
    }, 300),
    []
  );

  const validateEmail = useCallback(
    debounce((email) => {
      const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      setEmailErrorMessage(!email || !re.test(String(email).toLowerCase()) ? 'Please enter a valid email address.' : '');
    }, 300),
    []
  );

  const validatePhoneNumber = useCallback(
    debounce((phoneNumber) => {
      setPhoneNumberErrorMessage(!phoneNumber ? 'Phone number cannot be empty.' : phoneNumber.length !== 10 ? 'Not a valid number.' : '');
    }, 300),
    []
  );

  const validatePassword = useCallback(
    debounce((password) => {
      setPasswordErrorMessage(!password ? 'Password is required.' : password.length < 6 ? 'Password must be at least 6 characters long.' : '');
    }, 300),
    []
  );

  const validateConfirmPassword = useCallback(
    debounce((confirmPassword) => {
      setConfirmPasswordErrorMessage(confirmPassword !== password ? 'Passwords do not match.' : '');
    }, 300),
    [password]
  );

  return (
    <View style={styles.container}>
      <TextInput
        placeholder='Name'
        placeholderTextColor="grey"
        style={styles.input}
        onChangeText={(text) => {
          setName(text);
          validateName(text);
        }}
        value={name}
      />
      {nameErrorMessage ? <Text style={styles.errorText}>{nameErrorMessage}</Text> : null}

      <TextInput
        placeholder='Phone'
        placeholderTextColor="grey"
        style={styles.input}
        onChangeText={(text) => {
          setPhoneNumber(text);
          validatePhoneNumber(text);
        }}
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
        onChangeText={(text) => {
          setEmail(text);
          validateEmail(text);
        }}
        value={email}
      />
      {emailErrorMessage ? <Text style={styles.errorText}>{emailErrorMessage}</Text> : null}

      <TextInput
        autoCapitalize='none'
        secureTextEntry={true}
        placeholder='Password'
        placeholderTextColor="grey"
        style={styles.input}
        onChangeText={(text) => {
          setPassword(text);
          validatePassword(text);
        }}
        value={password}
      />
      {passwordErrorMessage ? <Text style={styles.errorText}>{passwordErrorMessage}</Text> : null}

      <TextInput
        autoCapitalize='none'
        secureTextEntry={true}
        placeholder='Confirm Password'
        placeholderTextColor="grey"
        style={styles.input}
        onChangeText={(text) => {
          setConfirmPassword(text);
          validateConfirmPassword(text);
        }}
        value={confirmPassword}
      />
      {confirmPasswordErrorMessage ? <Text style={styles.errorText}>{confirmPasswordErrorMessage}</Text> : null}

      <TouchableOpacity
        onPress={handleSignup}
        style={isValidated ? styles.buttonDisabled : styles.button}
        disabled={isValidated}
      >
        <Text style={isValidated && styles.disabled_button_text}>Signup</Text>
      </TouchableOpacity>
    </View>
  );
}
