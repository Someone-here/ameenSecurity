import { View, Text, TouchableOpacity } from "react-native";
import { useContext } from "react";
import { AuthenticatedUserContext } from "../providers/AuthenticatedUserProvider";
import auth from "@react-native-firebase/auth";

function logout() {
    auth().signOut();
}

export default function AppStack() {
    const { user } = useContext(AuthenticatedUserContext);
    console.log(user);
    return (
        <View style={{padding: 30}}>
            <Text>{user.email}</Text>
            <TouchableOpacity onPress={() => auth().signOut()}>
                <Text>Logout</Text>
            </TouchableOpacity>
        </View>
    )
}