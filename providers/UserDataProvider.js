import React, { useState, createContext } from 'react';
import firestore from "@react-native-firebase/firestore";

export const UserDataContext = createContext({});
export const UpdateUserDataContext = createContext({});

export const UserDataProvider = ({ children }) => {
    const [userData, setRootData] = useState(null);

    function updateUserData(id) {
        const userRef = firestore().collection("users").doc(id);
        userRef.onSnapshot((snap) => {
            console.log("Updating....  ", id);
            if (snap.exists) setRootData(snap.data());
        })
    }

    return (
        <UserDataContext.Provider value={{ userData, setRootData }}>
          <UpdateUserDataContext.Provider value={{updateUserData}}>
            {children}
          </UpdateUserDataContext.Provider>
        </UserDataContext.Provider>
    );

}