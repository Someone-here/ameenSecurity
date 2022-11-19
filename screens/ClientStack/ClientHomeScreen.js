import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import auth from "@react-native-firebase/auth";

export default function ClientHomeScreen() {
    return (
        <View style={styles.container}>
            <Text>HI HHHH</Text>
            <TouchableOpacity onPress={() => auth().signOut()}>
                <Text>Testing</Text>
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        padding: 20,
    }
})