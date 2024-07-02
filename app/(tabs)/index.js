import React, { useState } from 'react'
import { Text, View, TouchableOpacity, Image } from 'react-native'
import { router } from "expo-router";
import { onAuthStateChanged } from 'firebase/auth'
import { FIREBASE_AUTH } from "../../FirebaseConfig";
import { useEffect } from "react";
import * as SplashScreen from "expo-splash-screen";
import styles from '../../StyleSheet';

SplashScreen.preventAutoHideAsync();

export default function Index() {

  const [isAppReady, setIsAppReady] = useState(false);

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

    setIsAppReady(true);
    return unsubscribe;

  }, []);

  useEffect(() => {
    if (isAppReady) {
      SplashScreen.hideAsync();
    }
  }, [isAppReady]);

  if (!isAppReady) {
    return null;
  }

  return (
    <View style={styles.container}>

      <Text style={styles.title}>Doorstep Diesel Delivery</Text>

      <Image source={require('../../assets/images/FuelDash.png')} style={styles.image} />

      <Text style={styles.description}>
        Ensure seamless and efficient refueling for your static and heavy earthmoving equipment with our doorstep diesel delivery service. Enjoy the convenience of on-site refueling at the current market price, eliminating the hassle and cost of traveling to the RO. Our service guarantees no spillage or pilferage, saving you time and money. Trust us for reliable and hassle-free diesel delivery right where you need it.
      </Text>

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
