import React from 'react'
import { Text, View, TouchableOpacity } from 'react-native'
import { router } from "expo-router";
import { onAuthStateChanged } from 'firebase/auth'
import { FIREBASE_AUTH } from "../../FirebaseConfig";
import { useEffect } from "react";
import styles from '../../StyleSheet';

export default function Index() {

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(FIREBASE_AUTH, (user) => {
      if (user) {
        console.log("FUELDASH: user authenticated successfully")
        router.replace("/");
      }
      else {
        console.log("FUELDASH: user not authenticated")
        router.replace("/Screens/Login");
      }
    });

    return unsubscribe;

  }, []);

  return (
    <View style={styles.container}>

      <Text style={styles.header}>Welcome!</Text>

      <Text>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Ullam, architecto fuga quo placeat consequatur, voluptates sequi fugit excepturi aspernatur natus quis iusto velit impedit expedita. Nostrum, animi sed. Quo, eaque!</Text>

      <TouchableOpacity style={styles.button} onPress={() => { router.push("/Screens/NewOrder") }}>
        <Text>New Order</Text>
      </TouchableOpacity>

      <Text style={styles.sectionTitle}>Support</Text>

      <TouchableOpacity style={styles.button} onPress={() => { router.push("/Screens/ContactUs") }}>
        <Text>Contact Us</Text>
      </TouchableOpacity>

    </View>
  );
}
