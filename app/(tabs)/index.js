import React from 'react'
import { Text, View, TouchableOpacity } from 'react-native'
import { router } from "expo-router";
import { onAuthStateChanged } from 'firebase/auth'
import { FIREBASE_AUTH } from "../../FirebaseConfig";
import { useEffect } from "react";
import styles from '../../StyleSheet';

export default function Index() {

  useEffect(() => {
    onAuthStateChanged(FIREBASE_AUTH, (user) => {
      if (user) {
        console.log("user authenticated successfully")
        router.replace("/");
      }
      else {
        console.log("user not authenticated")
        router.replace("/Screens/Login");
      }
    });

  }, []);

  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Text>Edit app/index.js to edit this screen.</Text>

      <TouchableOpacity onPress={() => { router.push("/Screens/NewOrder") }} style={styles.button}>
        <Text>New Order</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => { router.push("/Screens/Login") }} style={styles.button}>
        <Text>Login</Text>
      </TouchableOpacity>

    </View>
  );
}
