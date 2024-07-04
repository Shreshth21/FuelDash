import { View, Text, ScrollView, TouchableOpacity, Alert } from 'react-native'
import React from 'react'
import * as MailComposer from 'expo-mail-composer';
import * as Linking from 'expo-linking';
import styles from '../../StyleSheet';
import { showToastMessage } from '../../components/ToastMessage';

export default function ContactUs() {

  const sendEmail = () => {
    MailComposer.composeAsync({
      recipients: ['pankhil.bhatia@gmail.com'],
    })
      .catch(error => {
        console.error(error);
        showToastMessage('An error occurred while sending the email.');
      });
  };

  const makeCall = (phoneNumber) => {
    Linking.openURL(`tel:${phoneNumber}`);
  };

  const handleOpenMap = () => {
    const latitude = 22.557389;
    const longitude = 72.990806;
    const url = `https://maps.google.com/?q=${latitude},${longitude}`;

    Linking.openURL(url);
  };

  return (
    <ScrollView contentContainerStyle={styles.contact_container}>

      <Text style={styles.intro}>We are here to help! If you have any questions, concerns, or feedback, please reach out to us.</Text>

      <View style={styles.contact_section}>
        <Text style={styles.contact_label}>Pankhil Bhatia</Text>
        <TouchableOpacity onPress={() => { makeCall("+91 99982 76465") }}>
          <Text style={styles.contact_content}>+91 99982 76465</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={sendEmail}>
          <Text style={styles.contact_content}>pankhil.bhatia@gmail.com</Text>
        </TouchableOpacity>
        <Text style={styles.contact_description}>Managing partner</Text>
      </View>

      <View style={styles.contact_section}>
        <Text style={styles.contact_label}>Sudhir Bhatia</Text>
        <TouchableOpacity onPress={() => { makeCall("+91 92271 22444") }}>
          <Text style={styles.contact_content}>+91 92271 22444</Text>
        </TouchableOpacity>
        <Text style={styles.contact_description}>Managing partner</Text>
      </View>

      <View style={styles.contact_section}>
        <Text style={styles.contact_label}>Visit Us</Text>
        <TouchableOpacity onPress={handleOpenMap}>
          <Text style={styles.contact_content}>F2, Vahanvati complex,</Text>
          <Text style={styles.contact_content}>Chikhodra crossing,</Text>
          <Text style={styles.contact_content}>Chikhodra, Anand,</Text>
          <Text style={styles.contact_content}>Gujarat 388320</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.contact_section}>
        <Text style={styles.contact_label}>Business Hours</Text>
        <Text style={styles.contact_content}>Monday to Sunday</Text>
        <Text style={styles.contact_content}>(6 AM - 10 PM)</Text>
      </View>

    </ScrollView>
  );
}