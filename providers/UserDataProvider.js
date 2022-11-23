import React, { useState, createContext } from 'react';
import firestore from "@react-native-firebase/firestore";
import auth from "@react-native-firebase/auth";

export const UserDataContext = createContext({});

export const UserDataProvider = ({ children }) => {
    const [userData, setUserData] = useState(null);

    function updateUserData(data) {
        if (!userData || !user) return;
        console.log(user.uid, data);
    }

    return (
        <UserDataContext.Provider value={{ userData, setUserData, updateUserData }}>
            {children}
        </UserDataContext.Provider>
    );

}