import { View, Text, TextInput, Button, StyleSheet, ScrollView, TouchableOpacity } from 'react-native'
import React from 'react'

export default function ContactUs() {
  return (
    <ScrollView contentContainerStyle={styles.container}>

      <Text style={styles.intro}>We are here to help! If you have any questions, concerns, or feedback, please reach out to us through one of the following methods.</Text>

      <View style={styles.section}>
        <Text style={styles.label}>Email Us</Text>
        <Text style={styles.content}>support@fueldash.com</Text>
        <Text style={styles.description}>For any queries or issues, feel free to send us an email. Our support team will get back to you within 24 hours.</Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.label}>Call Us</Text>
        <Text style={styles.content}>+91 9999999999</Text>
        <Text style={styles.description}>Our support team is available Monday to Friday, from 9 AM to 6 PM.</Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.label}>Visit Us</Text>
        <Text style={styles.content}>FuelDash Headquarters</Text>
        <Text style={styles.content}>1234 Fuel Lane</Text>
        <Text style={styles.content}>City, State, ZIP Code</Text>
        <Text style={styles.content}>Country</Text>
        <Text style={styles.description}>You are welcome to visit our office during business hours.</Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.label}>Follow Us</Text>
        <Text style={styles.content}>Facebook: facebook.com/fueldash</Text>
        <Text style={styles.content}>Twitter: twitter.com/fueldash</Text>
        <Text style={styles.content}>Instagram: instagram.com/fueldash</Text>
        <Text style={styles.content}>LinkedIn: linkedin.com/company/fueldash</Text>
        <Text style={styles.description}>Follow us on social media for the latest updates, promotions, and news.</Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.label}>Send Us Your Feedback</Text>
        <TextInput placeholderTextColor='grey' style={styles.input} placeholder="Name" />
        <TextInput placeholderTextColor='grey' style={styles.input} placeholder="Email" keyboardType="email-address" />
        <TextInput placeholderTextColor='grey' style={styles.textarea} placeholder="Message" multiline numberOfLines={4} />

        <View style={styles.container2}>
          <TouchableOpacity style={styles.button} onPress={() => {/* Submit feedback logic */ }}>
            <Text>Submit</Text>
          </TouchableOpacity>
        </View>
        <Text style={styles.description}>We value your feedback! Please fill out the form above to send us your comments or suggestions.</Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.label}>Business Hours</Text>
        <Text style={styles.content}>Monday to Friday: 9 AM - 6 PM</Text>
        <Text style={styles.content}>Saturday: 10 AM - 4 PM</Text>
        <Text style={styles.content}>Sunday: Closed</Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  intro: {
    fontSize: 16,
    marginBottom: 20,
  },
  section: {
    marginBottom: 20,
  },
  label: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  content: {
    fontSize: 16,
    marginBottom: 5,
  },
  description: {
    fontSize: 14,
    color: 'gray',
    marginBottom: 10,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    marginBottom: 10,
    borderRadius: 5,
  },
  textarea: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    marginBottom: 10,
    borderRadius: 5,
    height: 100,
  },
  button: {
    width: '25%',
    height: 30,
    borderColor: 'grey',
    borderWidth: 2,
    marginTop: -10,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 50,

  },
  container2: {
    flex: 1,
    alignItems: 'center',
    padding: 20,
},
});