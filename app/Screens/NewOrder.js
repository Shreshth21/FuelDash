import { View, Text, TouchableOpacity, Alert } from 'react-native'
import React from 'react'
import { FIREBASE_AUTH, FIREBASE_DB } from '../../FirebaseConfig'
import { ref, set } from 'firebase/database'
import styles from "../../StyleSheet";

export default function NewOrder() {

    const date = new Date()
    const handleOnClick = async () => {
        try {
          set(ref(FIREBASE_DB, `tp`), { tp: date.toString() });
          Alert.alert('User created successfully!');
        } catch (error) {
          Alert.alert("Error while adding to DB: ", error);
        }
      }

  return (
    <View style={styles.container}>
      <Text>NewOrder</Text>
      <TouchableOpacity onPress={handleOnClick} style={styles.button}> 
        <Text>Add to DB</Text>
      </TouchableOpacity>
    </View>
  )
}