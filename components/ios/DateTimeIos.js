import { View } from 'react-native'
import React, { useState } from 'react'
import DateTimePicker from '@react-native-community/datetimepicker';
import styles from '../../StyleSheet';

export default function DateTimeIos({ onTimeChange }) {
    const [scheduledDate, setScheduledDate] = useState(new Date());

    const onChange = (e, selectedDate) => {
        setScheduledDate(selectedDate);
        onTimeChange(selectedDate);
    };

    return (
        <View style={{ alignItems: 'center' }}>

            <DateTimePicker
                style={styles.date}
                mode="datetime"
                value={scheduledDate}
                onChange={onChange}
            />

        </View>
    )
}