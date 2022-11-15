import { View, Text } from "react-native";
import { useContext } from "react";
import { AuthenticatedUserContext } from "../providers/AuthenticatedUserProvider";

export default function AppStack() {
    const { user, setUser } = useContext(AuthenticatedUserContext);
    return (
        <View>
            <Text>APPP</Text>
            <Text>{user.email}</Text>
        </View>
    )
}