import AntDesign from "@expo/vector-icons/AntDesign";
import axios from 'axios';
import * as Location from "expo-location";
import { onValue, push, ref, set } from 'firebase/database';
import { useCallback, useEffect, useRef, useState } from "react";
import {
  ActivityIndicator,
  Alert,
  FlatList,
  KeyboardAvoidingView,
  Modal,
  Platform,
  Text,
  TextInput,
  TouchableOpacity,
  View
} from "react-native";
import { Dropdown } from "react-native-element-dropdown";
import DateTimeAndroid from "../../components/android/DateTimeAndroid";
import DateTimeIos from "../../components/ios/DateTimeIos";
import { showToastMessage } from '../../components/ToastMessage';
import { whatsAppMessage } from '../../components/WhatsAppMessage';
import { FIREBASE_AUTH, FIREBASE_DB } from "../../FirebaseConfig";
import styles from "../../StyleSheet";

export default function NewOrder() {
  const [fuelType, setFuelType] = useState(null);
  const [quantity, setQuantity] = useState('');
  const [name, setName] = useState('');
  const [scheduledDate, setScheduledDate] = useState(new Date());
  const [address, setAddress] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [suggestions, setSuggestions] = useState([]);
  const [phone, setPhone] = useState();
  const [location, setLocation] = useState();
  const [isLocationUpdate, setIsLocationUpdate] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);
  const debounceTimer = useRef(null);

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

      const addressParts = [
        addressObject?.district,
        addressObject?.city,
        addressObject?.region,
        addressObject?.country,
        addressObject?.postalCode,
      ];
      const addressString = addressParts.filter(Boolean).join(', ');
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

  useEffect(() => {
    return () => {
      if (debounceTimer.current) {
        clearTimeout(debounceTimer.current);
      }
    };
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
    if (!isValid()) return;

    try {
      let longitude = location?.coords?.longitude;
      let latitude = location?.coords?.latitude;

      if (isLocationUpdate) {
        const newLocation = await geocode();
        longitude = newLocation?.longitude;
        latitude = newLocation?.latitude;
      }

      const currentUserUID = FIREBASE_AUTH.currentUser.uid;
      const data = {
        createdDate: new Date().getTime(),
        scheduledDate: scheduledDate.getTime(),
        fuelType,
        name,
        quantity: Number(quantity),
        address
      };

      const dataRef = ref(FIREBASE_DB, `users/${currentUserUID}/orderhistory`);
      const newEntryRef = push(dataRef);
      await set(newEntryRef, data);

      showToastMessage("Order requested successfully!");
      clearConsole();

      whatsAppMessage(
        newEntryRef.key,
        name,
        `${quantity} liters`,
        phone,
        scheduledDate.toLocaleString(),
        address,
        longitude,
        latitude
      );

    } catch (error) {
      console.log("error while adding a new entry to DB: ", error);
      setErrorMessage(error.message);
    }
  }

  const fetchSuggestions = async (text) => {
    if (text.length <= 2) {
      setSuggestions([]);
      return;
    }

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
  };

  const handleAddressChange = useCallback((text) => {
    setIsLocationUpdate(true);
    setAddress(text);

    if (debounceTimer.current) {
      clearTimeout(debounceTimer.current);
    }

    debounceTimer.current = setTimeout(() => {
      fetchSuggestions(text);
    }, 600);
  }, []);

  const clearAddress = () => {
    setAddress('');
    setSuggestions([]);
  }

  const isValid = () => {
    if (!fuelType) {
      setErrorMessage('Please select a fuel type.');
    } else if (!name) {
      setErrorMessage('Name cannot be empty.');
    } else if (!quantity) {
      setErrorMessage('Quantity cannot be empty.');
    } else if (Number(quantity) < 500) {
      setErrorMessage('Minimum quantity is 500 liters.');
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

      {isLoading && (
        <Modal transparent={true} animationType="none" visible={isLoading}>
          <View style={styles.modalBackground}>
            <View style={styles.activityIndicatorWrapper}>
              <ActivityIndicator animating={isLoading} size="large" color="#0000ff" />
              <Text style={styles.loadingText}>Fetching location...</Text>
            </View>
          </View>
        </Modal>
      )}

      <Dropdown
        style={styles.dropdown}
        data={[{ dropDownLabel: "Diesel", dropDownValue: "Diesel" }]}
        maxHeight={300}
        labelField="dropDownLabel"
        valueField="dropDownValue"
        placeholder="Select fuel type"
        placeholderTextColor="grey"
        value={fuelType}
        onChange={(item) => setFuelType(item.dropDownValue)}
        renderLeftIcon={() => (
          <AntDesign style={styles.icon} color="black" name="Safety" size={20} />
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
          onChangeText={(text) => setQuantity(text.replace(/[^0-9]/g, ''))}
          value={quantity}
          keyboardType='number-pad'
        />
      </View>

      <View style={styles.inputWithButtonContainer}>
        <TextInput
          placeholder="Enter Address"
          placeholderTextColor="grey"
          value={address}
          onChangeText={handleAddressChange}
          style={{ padding: 10, borderWidth: 1, borderColor: "grey", borderRadius: 5 }}
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
              <TouchableOpacity
                onPress={() => {
                  setAddress(item.display_name);
                  setSuggestions([]);
                }}
              >
                <Text style={{ padding: 10, borderBottomWidth: 1, borderBottomColor: '#ccc' }}>
                  {item.display_name}
                </Text>
              </TouchableOpacity>
            )}
            style={{ maxHeight: 200, borderWidth: 1, borderColor: '#ccc', borderRadius: 5 }}
          />
        )}
      </KeyboardAvoidingView>

      {Platform.OS === 'android' && <DateTimeAndroid onTimeChange={onTimeChange} />}
      {Platform.OS === 'ios' && <DateTimeIos onTimeChange={onTimeChange} />}

      <View style={styles.container}>
        {errorMessage && <Text style={styles.errorText}>{errorMessage}</Text>}

        <TouchableOpacity onPress={addDataToDB} style={styles.new_order_button}>
          <Text>Submit Order</Text>
        </TouchableOpacity>
      </View>

    </View>
  );
}
