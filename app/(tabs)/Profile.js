import React, { useState, useEffect } from 'react'
import { Text, TouchableOpacity, View, Modal, TextInput, StyleSheet } from 'react-native'
import { router } from 'expo-router'
import { onValue, ref, remove } from 'firebase/database'
import { FIREBASE_AUTH, FIREBASE_DB } from '../../FirebaseConfig'
import styles from '../../StyleSheet'
import { createAvatar } from '@dicebear/core';
import { adventurerNeutral } from '@dicebear/collection';
import { SvgXml } from 'react-native-svg';
import { showToastMessage } from '../../components/ToastMessage';
import { deleteUser, reauthenticateWithCredential, EmailAuthProvider } from 'firebase/auth'


export default function Profile() {

  const [profileImage, setProfileImage] = useState();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [currentUser, setCurrentUser] = useState();

  useEffect(() => {
    const currentUser = FIREBASE_AUTH.currentUser;
    setCurrentUser(currentUser);
    const starCountRef = ref(FIREBASE_DB, `users/${currentUser.uid}`);
    onValue(starCountRef, (snapshot) => {
      const fetchedData = snapshot.val();
      setName(fetchedData.userdetails.name);
      setEmail(fetchedData.userdetails.email);
      setPhone(fetchedData.userdetails.phoneNumber);

      const randomSeed = fetchedData.userdetails.profileImagRandomSeed
      const avatar = createAvatar(adventurerNeutral, {
        seed: randomSeed ? randomSeed : 'abcd',
        radius: 10,
      }).toString();

      setProfileImage(avatar);
    });
  }, []);

  const signout = () => {
    try {
      FIREBASE_AUTH.signOut();
      console.log("FUELDASH: Signed out successfuly!")
    } catch (error) {
      console.log("FUELDASH: Error while signout: ", error)
      showToastMessage("Error while signout: " + error.message)
    }
  }



  return (
    <View>
      {profileImage && <SvgXml xml={profileImage} style={{ width: 108, height: 100, borderRadius: 10, alignSelf: 'center', marginBottom: 10, marginTop: 20, }} />}
      <View style={styles.section}>
        <Text style={styles.label}>Name:</Text>
        <Text style={styles.content}>{name}</Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.label}>Email:</Text>
        <Text style={styles.content}>{email}</Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.label}>Phone Number:</Text>
        <Text style={styles.content}>{phone}</Text>
      </View>

      <View style={styles.container}>
        <TouchableOpacity onPress={signout} style={styles.delete_button}>
          <Text>Signout</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => { router.push("/Screens/ContactUs") }} style={styles.delete_button}>
          <Text>Contact us</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => { router.push("/Screens/DeleteAccount") }} style={styles.delete_button}>
          <Text>Delete Account</Text>
        </TouchableOpacity>
      </View>

    </View>
  )
}