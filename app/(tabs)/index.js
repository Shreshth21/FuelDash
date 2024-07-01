import { Text, TouchableOpacity, View } from "react-native";
import styles from "../../StyleSheet";
import { router } from "expo-router";

export default function Index() {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Text>Edit app/index.js to edit this screen.</Text>

      <TouchableOpacity onPress={() => { router.push("/Screens/NewOrder") }} style={styles.button}>
        <Text>New Order</Text>
      </TouchableOpacity>

    </View>
  );
}
