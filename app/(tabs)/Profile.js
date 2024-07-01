import React, { useState, useEffect } from 'react'
import { Alert, Image, Text, TouchableOpacity, View } from 'react-native'
import { router } from 'expo-router'
import { onValue, ref } from 'firebase/database'
import { FIREBASE_AUTH, FIREBASE_DB } from '../../FirebaseConfig'
import styles from '../../StyleSheet'

export default function Profile() {

  const [profileImage, setProfileImage] = useState(null);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');

  useEffect(() => {
    const currentUserUID = FIREBASE_AUTH.currentUser.uid;
    const starCountRef = ref(FIREBASE_DB, `users/${currentUserUID}`);
    onValue(starCountRef, (snapshot) => {
      const fetchedData = snapshot.val();
      setName(fetchedData.userdetails.name);
      setEmail(fetchedData.userdetails.email);
      setPhone(fetchedData.userdetails.phoneNumber);
    });
  }, []);

  const signout = () => {
    try {
      FIREBASE_AUTH.signOut();
      console.log("FUELDASH: Signed out successfuly!")
      Alert.alert("Signed out successfuly!");
    } catch (error) {
      console.log("FUELDASH: Error while signout: ", error)
      Alert.alert("Error while signout: ", error.message);
    }
  }

  return (
    <View>

      <Image source={profileImage ? { uri: profileImage } : require('../../assets/images/default-user.png')} style={{ width: 108, height: 100, borderRadius: 30, alignSelf: 'center', marginBottom: 10, }} />

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
        <TouchableOpacity onPress={signout} style={styles.button}>
          <Text>Signout</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => { router.push("/Screens/ContactUs") }} style={styles.button}>
          <Text>Contact us</Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}