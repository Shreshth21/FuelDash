import React, { useEffect, useState } from "react";
import { ActivityIndicator, Alert, Modal, Text, TextInput, TouchableOpacity, View, FlatList, Platform } from "react-native";
import { Dropdown } from "react-native-element-dropdown";
import AntDesign from "@expo/vector-icons/AntDesign";
import * as Location from "expo-location";
import { ref, set } from 'firebase/database';
import { FIREBASE_AUTH, FIREBASE_DB } from "../../FirebaseConfig";
import styles from "../../StyleSheet";
import axios from 'axios';
import DateTimeAndroid from "../../components/android/DateTimeAndroid";
import DateTimeIos from "../../components/ios/DateTimeIos";

export default function NewOrder() {

  const [fuelType, setFuelType] = useState(null);
  const [quantity, setQuantity] = useState(0);
  const [scheduledDate, setScheduledDate] = useState(new Date());
  const [location, setLocation] = useState();
  const [address, setAddress] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [suggestions, setSuggestions] = useState([]);

  useEffect(() => {
    const getLocation = async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();

      if (status !== "granted") {
        Alert.alert("Please grant location permission");
        return;
      }

      setIsLoading(true);
      let currentLocation = await Location.getCurrentPositionAsync();
      setLocation(currentLocation);

      const currentAddress = await Location.reverseGeocodeAsync({
        longitude: currentLocation.coords.longitude,
        latitude: currentLocation.coords.latitude,
      });

      setIsLoading(false);
      const addressObject = currentAddress[0];
      addressString = addressObject.district + ", " + addressObject.city + ", " + addressObject.region + ", " + addressObject.country + ", " + addressObject.postalCode;
      setAddress(addressString);
    };
    getLocation();
  }, []);

  const onTimeChange = (selectedDate) => {
    setScheduledDate(selectedDate);
  };

  const geocode = async () => {
    const geocodedLocation = await Location.geocodeAsync(address);
    setLocation(geocodedLocation);
  };

  const clearConsole = () => {
    setAddress('');
    setQuantity('');
    setFuelType(null);
    setLocation(null);
  }

  const addDataToDB = async () => {
    await geocode();
    const currentUserUID = FIREBASE_AUTH.currentUser.uid;

    set(ref(FIREBASE_DB, `users/${currentUserUID}/orderhistory/${formatDate(new Date())}`),
      { scheduledDate: formatDate(scheduledDate), fuelType, quantity, location, address });
    Alert.alert("Order requested successfully!");
    clearConsole();
  }

  const formatDate = (date) => {
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


  const fetchSuggestions = async (text) => {
    setAddress(text);
    if (text.length > 2) {
      try {
        const response = await axios.get(`https://nominatim.openstreetmap.org/search`, {
          params: {
            q: text,
            format: 'json',
            addressdetails: 1,
          },
        });
        setSuggestions(response.data);
      } catch (error) {
        console.error(error);
      }
    } else {
      setSuggestions([]);
    }
  };

  const clearAddress = () => {
    setAddress('')
    setSuggestions([]);
  }
  return (
    <View style={styles.new_order_container}>

      <View >
        {isLoading && (
          <Modal
            transparent={true}
            animationType="none"
            visible={isLoading}
            onRequestClose={() => { }}
          >
            <View style={styles.modalBackground}>
              <View style={styles.activityIndicatorWrapper}>
                <ActivityIndicator animating={isLoading} size="large" color="#0000ff" />
                <Text style={styles.loadingText}>Fetching location...</Text>
              </View>
            </View>

          </Modal>
        )}
      </View>

      <Dropdown
        style={styles.dropdown}
        data={[
          { dropDownLabel: "Diesel", dropDownValue: "Diesel" },
        ]}
        maxHeight={300}
        labelField="dropDownLabel"
        valueField="dropDownValue"
        placeholder="Select fuel type"
        placeholderTextColor="grey"
        value={fuelType}
        onChange={(item) => {
          setFuelType(item.dropDownValue);
        }}
        renderLeftIcon={() => (
          <AntDesign
            style={styles.icon}
            color="black"
            name="Safety"
            size={20}
          />
        )}
      />

      <View style={styles.inputContainer}>
        <TextInput
          placeholder="Quantity (in liters)"
          placeholderTextColor="grey"
          style={styles.new_order_input}
          onChangeText={setQuantity}
          value={quantity}
          keyboardType='number-pad'
        />
      </View>

      <View style={styles.inputWithButtonContainer}>
        <TextInput
          placeholder="Enter Address"
          placeholderTextColor="grey"
          value={address}
          onChangeText={(text) => fetchSuggestions(text)}
          style={{ padding: 10, borderWidth: 1, borderColor: "grey", borderRadius: 5, borderWidth: 2, }}
        />

        <TouchableOpacity style={styles.submitButton} onPress={clearAddress}>
          <Text style={styles.submitButtonText}>Clear</Text>
        </TouchableOpacity>
      </View>

      {suggestions.length > 0 && (
        <FlatList
          data={suggestions}
          keyExtractor={(item) => item.place_id}
          renderItem={({ item }) => (
            <TouchableOpacity onPress={() => {
              setAddress(item.display_name);
              setSuggestions([]);
            }}>
              <Text style={{ padding: 10, borderBottomWidth: 1, borderBottomColor: '#ccc' }}>
                {item.display_name}
              </Text>
            </TouchableOpacity>
          )}
          style={{ maxHeight: 200, borderWidth: 1, borderColor: '#ccc', borderRadius: 5 }}
        />
      )}


      {(Platform.OS === 'android') && <DateTimeAndroid
        onTimeChange={onTimeChange}
      />}

      {(Platform.OS === 'ios') && <DateTimeIos
        onTimeChange={onTimeChange}
      />}

      <View style={styles.container}>

        <TouchableOpacity onPress={addDataToDB}
          style={styles.new_order_button}
        >
          <Text>Submit Order</Text>
        </TouchableOpacity>
      </View>



    </View>
  )
}