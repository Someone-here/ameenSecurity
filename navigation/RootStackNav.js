import { useEffect, useContext, useState } from "react";
import { AuthenticatedUserContext } from "../providers/AuthenticatedUserProvider";
import AppStack from "./AppStack";
import AuthStack from "./AuthStack";
import { NavigationContainer } from '@react-navigation/native';
import auth from "@react-native-firebase/auth";
import { Text, View } from "react-native";
import { SignInScreen } from "../screens/SignInScreen";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

const Stack = createNativeStackNavigator();

export default function RootStackNav() {
    const {user, setUser} = useContext(AuthenticatedUserContext);

    useEffect(() => {
        const subscriber = auth().onAuthStateChanged(setUser);
        return subscriber;
    }, []);

    return (
        <NavigationContainer>
            { user ? <AppStack /> : <AuthStack /> }
        </NavigationContainer>
    )
}