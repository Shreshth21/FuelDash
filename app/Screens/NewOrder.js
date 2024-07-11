import React, { useEffect, useState } from "react";
import { ActivityIndicator, Alert, Modal, Text, TextInput, TouchableOpacity, View, FlatList, Platform, KeyboardAvoidingView } from "react-native";
import { Dropdown } from "react-native-element-dropdown";
import AntDesign from "@expo/vector-icons/AntDesign";
import * as Location from "expo-location";
import { ref, set, push, onValue } from 'firebase/database';
import { FIREBASE_AUTH, FIREBASE_DB } from "../../FirebaseConfig";
import styles from "../../StyleSheet";
import axios from 'axios';
import DateTimeAndroid from "../../components/android/DateTimeAndroid";
import DateTimeIos from "../../components/ios/DateTimeIos";
import { showToastMessage } from '../../components/ToastMessage';
import { whatsAppMessage } from '../../components/WhatsAppMessage';

export default function NewOrder() {

  const [fuelType, setFuelType] = useState(null);
  const [quantity, setQuantity] = useState(0);
  const [name, setName] = useState('');
  const [scheduledDate, setScheduledDate] = useState(new Date());
  const [address, setAddress] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [suggestions, setSuggestions] = useState([]);
  const [phone, setPhone] = useState();
  const [location, setLocation] = useState();
  const [isLocationUpdate, setIsLocationUpdate] = useState(false);

  const [errorMessage, setErrorMessage] = useState(null);


  useEffect(() => {
    const getLocation = async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();

      if (status !== "granted") {
        Alert.alert("Please grant location permission");
        await Location.requestForegroundPermissionsAsync();
        return;
      }

      setIsLoading(true);
      let currentLocation = await Location.getCurrentPositionAsync();
      setLocation(currentLocation);

      const currentAddress = await Location.reverseGeocodeAsync({
        longitude: currentLocation?.coords?.longitude,
        latitude: currentLocation?.coords?.latitude,
      });

      setIsLoading(false);
      const addressObject = currentAddress[0];
      addressString = addressObject?.district + ", " + addressObject?.city + ", " + addressObject?.region + ", " + addressObject?.country + ", " + addressObject?.postalCode;
      setAddress(addressString);
    };
    getLocation();
  }, []);

  useEffect(() => {
    const currentUser = FIREBASE_AUTH.currentUser;
    const starCountRef = ref(FIREBASE_DB, `users/${currentUser.uid}`);
    onValue(starCountRef, (snapshot) => {
      const fetchedData = snapshot.val();
      setPhone(fetchedData.userdetails.phoneNumber);
    });
  }, []);

  const onTimeChange = (selectedDate) => {
    setScheduledDate(selectedDate);
  };

  const geocode = async () => {
    const geocodedLocation = await Location.geocodeAsync(address);
    return geocodedLocation[0];
  };

  const clearConsole = () => {
    setAddress('');
    setQuantity('');
    setName('');
    setFuelType(null);
  }

  const addDataToDB = async () => {
    if (isValid()) {
      try {

        let longitude = location?.coords?.longitude;
        let latitude = location?.coords?.latitude;
        console.log("original: ", longitude, latitude)
        console.log("location value: ", isLocationUpdate)
        if (isLocationUpdate) {
          const newLocation = await geocode();
          longitude = newLocation?.longitude;
          latitude = newLocation?.latitude;
          console.log("new: ", longitude, latitude)
        }


        const currentUserUID = FIREBASE_AUTH.currentUser.uid;

        const data = { createdDate: new Date().getTime(), scheduledDate: scheduledDate.getTime(), fuelType, name, quantity, address }
        const dataRef = ref(FIREBASE_DB, `users/${currentUserUID}/orderhistory`);
        const newEntryRef = push(dataRef);
        await set(newEntryRef, data);
        console.log('Data stored successfully with unique ID:', newEntryRef.key);
        showToastMessage("Order requested successfully!");
        clearConsole();
        whatsAppMessage(newEntryRef.key, name, (quantity + " liters"), phone, scheduledDate.toLocaleString(), address, longitude, latitude);
      } catch (error) {
        console.log("error while adding a new entry to DB: ", error);
        setErrorMessage(error.message);
      }

    }
  }

  const fetchSuggestions = async (text) => {
    setIsLocationUpdate(true);
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

  const isValid = () => {
    if (!fuelType) {
      setErrorMessage('Please select a fuel type.');
    } else if (!name) {
      setErrorMessage('Name cannot be empty.');
    } else if (!quantity) {
      setErrorMessage('Quantity cannot be empty.');
    } else if (quantity < 500) {
      setErrorMessage('Minimum quanity is 500 liters.');
    } else if (!address) {
      setErrorMessage('Address cannot be empty.');
    } else {
      setErrorMessage(null);
      return true;
    }
    return false;
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
          placeholder="Enterprise Name"
          placeholderTextColor="grey"
          style={styles.new_order_input}
          onChangeText={setName}
          value={name}
        />
      </View>

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
      <KeyboardAvoidingView>
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
      </KeyboardAvoidingView>

      {(Platform.OS === 'android') && <DateTimeAndroid
        onTimeChange={onTimeChange}
      />}

      {(Platform.OS === 'ios') && <DateTimeIos
        onTimeChange={onTimeChange}
      />}

      <View style={styles.container}>

        {errorMessage ? <Text style={styles.errorText}>{errorMessage}</Text> : null}

        <TouchableOpacity onPress={addDataToDB}
          style={styles.new_order_button}
        >
          <Text>Submit Order</Text>
        </TouchableOpacity>
      </View>



    </View>
  )
}