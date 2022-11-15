import { View, Text, SafeAreaView } from "react-native";
import AuthPage from "../layouts/AuthPage";
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { SignInScreen } from "../screens/SignInScreen";

const StackNav = createNativeStackNavigator();

export default function AuthStack() {
    return (
        <StackNav.Navigator initialRouteName="signInScreen" screenOptions={{ headerShown: false }}>
            <StackNav.Screen name="signInScreen" component={SignInScreen} />
        </StackNav.Navigator>
    )
}