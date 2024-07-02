import { View, Text, ScrollView, TouchableOpacity, Alert } from 'react-native'
import React from 'react'
import * as MailComposer from 'expo-mail-composer';
import * as Linking from 'expo-linking';
import styles from '../../StyleSheet';

export default function ContactUs() {

  const sendEmail = () => {
    MailComposer.composeAsync({
      recipients: ['pankhil.bhatia@gmail.com'],
    })
      .then(result => {
        if (result.status === MailComposer.MailComposerStatus.SENT) {
          Alert.alert('Success', 'Email sent successfully!');
        }
      })
      .catch(error => {
        Alert.alert('Error', 'An error occurred while sending the email.');
        console.error(error);
      });
  };

  const makeCall = (phoneNumber) => {
    Linking.openURL(`tel:${phoneNumber}`);
  };

  const handleOpenMap = () => {
    const latitude = 22.5485558;
    const longitude = 72.9744689;
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
        <Text style={styles.contact_content}>Monday to Friday: 9 AM - 6 PM</Text>
        <Text style={styles.contact_content}>Saturday: 10 AM - 4 PM</Text>
        <Text style={styles.contact_content}>Sunday: Closed</Text>
      </View>

    </ScrollView>
  );
}