import { useState } from "react";
import { SafeAreaView, Text, TouchableOpacity, View } from "react-native";
import DateTimePicker from '@react-native-community/datetimepicker';
import styles from "../../StyleSheet";

export default function DateTimeAndroid({ onTimeChange }) {

    const [scheduledDate, setScheduledDate] = useState(new Date());
    const [mode, setMode] = useState('date');
    const [show, setShow] = useState(false);

    const onChange = (event, selectedDate) => {
        const currentDate = selectedDate;
        setShow(false);
        setScheduledDate(currentDate);
        onTimeChange(currentDate);
    };

    const showMode = (currentMode) => {
        setShow(true);
        setMode(currentMode);
    };

    const showDatepicker = () => {
        showMode('date');
    };

    const showTimepicker = () => {
        showMode('time');
    };


    return (
        <SafeAreaView style={{ alignItems: 'center' }}>
            <View style={styles.buttonContainer}>

                <TouchableOpacity style={styles.date_button} onPress={showDatepicker}>
                    <Text style={{ color: '#616060' }}>{scheduledDate?.toDateString()}</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.time_button} onPress={showTimepicker}>
                    <Text style={{ color: '#616060' }}>{scheduledDate?.toLocaleTimeString()}</Text>
                </TouchableOpacity>

            </View>

            {show && (
                <DateTimePicker
                    testID="dateTimePicker"
                    value={scheduledDate}
                    mode={mode}
                    is24Hour={true}
                    onChange={onChange}
                />
            )}
        </SafeAreaView>
    )
}