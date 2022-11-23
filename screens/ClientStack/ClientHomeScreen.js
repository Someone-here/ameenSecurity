import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import auth from "@react-native-firebase/auth";
import { useContext } from "react";
import { UserDataContext } from "../../providers/UserDataProvider";

export default function ClientHomeScreen() {

    const { userData, setUserData } = useContext(UserDataContext);

    console.log(userData);
    return (
        <View style={styles.container}>
            <Text>{userData.firstName}</Text>
            <TouchableOpacity onPress={() => { auth().signOut(); setUserData(null) }}>
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