import { useEffect, useContext, useState } from "react";
import { AuthenticatedUserContext } from "../providers/AuthenticatedUserProvider";
import AppStack from "./AppStack";
import AuthStack from "./AuthStack";
import { NavigationContainer } from '@react-navigation/native';
import auth from "@react-native-firebase/auth";
import { UserDataContext } from "../providers/UserDataProvider";

export default function RootStackNav() {
    const {user, setUser} = useContext(AuthenticatedUserContext);
    const { setRootData } = useContext(UserDataContext);

    useEffect(() => {
        const subscriber = auth().onAuthStateChanged((user) => {
            setUser(user);
            if (!user) setRootData(null);
        });
        return subscriber;
    }, []);

    return (
        <NavigationContainer>
            { user ? <AppStack /> : <AuthStack /> }
        </NavigationContainer>
    )
}