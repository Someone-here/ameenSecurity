import { useContext, useEffect, useState } from "react";
import { AuthenticatedUserContext } from "../providers/AuthenticatedUserProvider";
import { UpdateUserDataContext, UserDataContext } from "../providers/UserDataProvider";
import firestore from "@react-native-firebase/firestore";
import ClientStack from "./ClientStack";
import BusinessStack from "./BusinessStack";
import { ActivityIndicator } from "react-native";

export default function AppStack() {
    const { user } = useContext(AuthenticatedUserContext);
    const { userData } = useContext(UserDataContext);
    const { updateUserData } = useContext(UpdateUserDataContext);
    
    useEffect(() => {
        updateUserData(user.uid);
    }, [user]);

    if (!userData) return <ActivityIndicator size="large" style={{position: "absolute", alignSelf: "center"}} />

    else if (userData?.role === "guard" || userData?.role === "steward") {
        return <ClientStack />
    } else {
        return <BusinessStack />
    }
}