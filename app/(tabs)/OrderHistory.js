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
        const dataArray = Object.entries(fetchedData.orderhistory).map(([key, value]) => {
          return {
            ...value,
            id: key
          };
        });
        const sortedData = dataArray.sort((a, b) => b.createdDate-a.createdDate);
        setData(sortedData);
      }

    });
  }, []);

  const formatDate = (timestamp) => {
    const date = new Date(timestamp);
    const day = String(date.getDate()).padStart(2, '0');
    const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    const month = monthNames[date.getMonth()];
    const year = String(date.getFullYear()).slice(-2);

    const hours = date.getHours();
    const minutes = String(date.getMinutes()).padStart(2, '0');
    const ampm = hours >= 12 ? 'PM' : 'AM';
    const formattedHours = hours % 12 || 12;

    return `${day} ${month}'${year} ${formattedHours}:${minutes} ${ampm}`;
  };

  const renderItem = useCallback(({ item }) => (
    <View style={styles.card}>
      <Text style={styles.cardTitle}>{formatDate(item.createdDate)}</Text>
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
            keyExtractor={(item) => item.id}
            initialNumToRender={10}
            maxToRenderPerBatch={10}
            windowSize={21}
            removeClippedSubviews={true}
            showsVerticalScrollIndicator={false}
          /> :
          <Text style={styles.noOrdersText}>The orders will appear here!</Text>
      }
    </View>
  )
}