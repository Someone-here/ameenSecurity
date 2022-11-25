import { useContext, useEffect, useState } from "react";
import { AuthenticatedUserContext } from "../providers/AuthenticatedUserProvider";
import { UserDataContext } from "../providers/UserDataProvider";
import firestore from "@react-native-firebase/firestore";
import ClientStack from "./ClientStack";
import BusinessStack from "./BusinessStack";
import { ActivityIndicator } from "react-native";

export default function AppStack() {
    const { user } = useContext(AuthenticatedUserContext);
    const { userData, setUserData } = useContext(UserDataContext);
    
    useEffect(() => {
        if (!userData || userData.email !== user.email) {
            const store = firestore();
            const userRef = store.collection("users").doc(user.uid);
            userRef.get().then((doc) => {
                if (doc.exists) setUserData(doc.data());
            });
        }
    }, []);

    if (!userData) return <ActivityIndicator size="large" style={{position: "absolute", alignSelf: "center"}} />

    else if (userData?.role === "guard" || userData?.role === "steward") {
        return <ClientStack />
    } else {
        return <BusinessStack />
    }
}