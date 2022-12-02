import { View, Text, TouchableOpacity } from "react-native";
import auth from "@react-native-firebase/auth";
import { useContext } from "react";
import { UserDataContext } from "../../providers/UserDataProvider"; 
import HomePage from "../../layouts/HomePage";

export default function BusinessHomeScreen() {

    const { userData, setUserData } = useContext(UserDataContext);

    console.log(userData);

    return (
        <HomePage>
            <Text>HI B</Text>
            <TouchableOpacity onPress={() => { auth().signOut(); setUserData(null) }}>
                <Text>Sign Out</Text>
            </TouchableOpacity>
        </HomePage>
    )
}