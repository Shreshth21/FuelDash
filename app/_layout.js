import { Stack } from "expo-router";
import { RootSiblingParent } from 'react-native-root-siblings';

export default function RootLayout() {
  return (
    <RootSiblingParent>
      <Stack>
        <Stack.Screen name="(tabs)" options={{ title: "", headerShown: false }} />
        <Stack.Screen name="Screens/Login" options={{ headerTitle: "Login" }} />
        <Stack.Screen name="Screens/Signup" options={{ headerTitle: "Signup" }} />
        <Stack.Screen name="Screens/ContactUs" options={{ headerTitle: 'Contact Us' }} />
        <Stack.Screen name="Screens/NewOrder" options={{ headerTitle: 'New Order' }} />
        <Stack.Screen name="Screens/DeleteAccount" options={{ headerTitle: 'Delete Account' }} />
      </Stack>
    </RootSiblingParent>
  );
}
