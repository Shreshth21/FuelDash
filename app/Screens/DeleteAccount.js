import { View, Text, TextInput, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import { FIREBASE_AUTH, FIREBASE_DB } from '../../FirebaseConfig';
import { onValue, ref, remove } from 'firebase/database'
import { deleteUser, reauthenticateWithCredential, EmailAuthProvider } from 'firebase/auth'
import styles from '../../StyleSheet';

export default function DeleteAccount() {

    const currentUser = FIREBASE_AUTH.currentUser;

    const [email, setEmail] = useState(currentUser.email);
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState(null);

    const deleteAccount = async () => {
        try {

            const credential = EmailAuthProvider.credential(email, password);
            await reauthenticateWithCredential(currentUser, credential)
                .then(() => {
                    console.log("line1")
                    console.log("line2")
                    deleteCurrentUser();
                    console.log("FUELDASH: deleted account successfully!");
                })
                .catch((error) => {
                    console.log("error while reauthenticate user: ", error)
                    setErrorMessage(error.message);
                })


        } catch (error) {
            console.log("FUELDASH: Error while deleting account: ", error)

        }
    }

    const deleteCurrentUser = async () => {

        try {
            await currentUser.delete();
            console.log("successfully deleted user")
        } catch (error) {
            console.log("error user: ", error)
        }

    }

    return (
        <View style={styles.container}>

            <Text style={{ marginTop: 10, marginBottom: 5 }}>Are you sure you want to delete your account?</Text>
            <Text style={{ marginBottom: 10 }}>This action cannot be undone.</Text>

            <TextInput
                placeholder='Email'
                placeholderTextColor="grey"
                inputMode='email'
                autoCapitalize='none'
                style={styles.input}
                onChangeText={setEmail}
                value={email}
                editable={false}
            />

            <TextInput
                placeholder='Password'
                secureTextEntry={true}
                placeholderTextColor="grey"
                autoCapitalize='none'
                style={styles.input}
                onChangeText={setPassword}
                value={password}
            />

            {errorMessage ? <Text style={styles.errorText}>{errorMessage}</Text> : null}

            <TouchableOpacity
                onPress={() => deleteAccount()}
                style={styles.delete_button}
            >
                <Text>Delete Account</Text>
            </TouchableOpacity>
        </View>
    )
}