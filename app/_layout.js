import { Stack } from "expo-router";

export default function RootLayout() {
  return (
    <Stack>
      <Stack.Screen name="(tabs)" options={{ title: "", headerShown: false }} />
      <Stack.Screen name="Screens/Login" options={{ headerTitle: "Login" }} />
      <Stack.Screen name="Screens/Signup" options={{ headerTitle: "Signup" }} />
      <Stack.Screen name="Screens/ContactUs" options={{ headerTitle: 'Contact Us' }} />
      <Stack.Screen name="Screens/NewOrder" options={{ headerTitle: 'New Order' }} />
    </Stack>
  );
}
