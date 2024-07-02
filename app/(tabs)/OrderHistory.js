import React, { useCallback, useEffect, useState } from 'react'
import { FlatList, Text, View } from 'react-native'
import { ref, onValue } from 'firebase/database'
import { FIREBASE_DB, FIREBASE_AUTH } from '../../FirebaseConfig'
import styles from '../../StyleSheet'

export default function OrderHistory() {

  const [data, setData] = useState([]);

  useEffect(() => {
    const currentUserUID = FIREBASE_AUTH.currentUser.uid;
    const starCountRef = ref(FIREBASE_DB, `users/${currentUserUID}`);
    onValue(starCountRef, (snapshot) => {
      const fetchedData = snapshot.val();
      if (fetchedData && fetchedData.orderhistory) {
        const dataArray = Object.entries(fetchedData.orderhistory).map(([timestamp, details]) => {
          return {
            timestamp,
            ...details
          };
        });
        setData(dataArray);
      }

    });
  }, []);

  const renderItem = useCallback(({ item }) => (
    <View style={styles.card}>
      <Text style={styles.cardTitle}>{item.timestamp}</Text>
      <Text style={styles.cardText}>Fuel Type: {item.fuelType}</Text>
      <Text style={styles.cardText}>Name: {item.name}</Text>
      <Text style={styles.cardText}>Quantity: {item.quantity}</Text>
      <Text style={styles.cardText}>Address: {item.address}</Text>
      <Text style={styles.cardText}>Scheduled time: {item.scheduledDate}</Text>
    </View>
  ), []);

  return (
    <View style={styles.container}>
      {
        data.length > 0 ?
          <FlatList
            data={data}
            renderItem={renderItem}
            keyExtractor={(item) => item.timestamp}
            initialNumToRender={10}
            maxToRenderPerBatch={10}
            windowSize={21}
            removeClippedSubviews={true}
          /> :
          <Text style={styles.noOrdersText}>The orders will appear here!</Text>
      }
    </View>
  )
}