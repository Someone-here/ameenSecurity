import { useContext, useEffect, useState } from "react";
import { AuthenticatedUserContext } from "../providers/AuthenticatedUserProvider";
import { UserDataContext } from "../providers/UserDataProvider";
import firestore from "@react-native-firebase/firestore";
import ClientStack from "./ClientStack";
import BusinessStack from "./BusinessStack";
import { ActivityIndicator, View } from "react-native";

export default function AppStack() {
    const { user } = useContext(AuthenticatedUserContext);
    const { userData, setUserData } = useContext(UserDataContext);
    
    useEffect(() => {
        if (!userData) {
            const store = firestore();
            const userRef = store.collection("users").doc(user.uid);
            const businessRef = store.collection("businesses").doc(user.uid);
            console.log(user.uid);
            userRef.get().then((doc) => {
                if (doc.exists) setUserData(doc.data());
            });
            businessRef.get().then((doc) => {
                if (doc.exists) setUserData(doc.data());
            })
        } else console.log(userData);
    }, []);

    if (!userData) return <ActivityIndicator size="large" style={{position: "absolute", alignSelf: "center"}} />

    if (userData?.role === "guard" || userData?.role === "steward") {
        return <ClientStack />
    } else {
        return <BusinessStack />
    }
}