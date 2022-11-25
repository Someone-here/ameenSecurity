import { ActivityIndicator, Text, View, StyleSheet, TouchableOpacity } from "react-native";
import { useContext, useEffect, useState } from "react";
import { UserDataContext } from "../../providers/UserDataProvider";
import HomePage from "../../layouts/HomePage";
import auth from "@react-native-firebase/auth";
import firestore from "@react-native-firebase/firestore";
import theme from "../../config/theme";
import common from "../../config/styles.common";
import dayjs from "dayjs";

function test() {
    const ref = firestore().collection("shifts").doc("iBpVwrozfwpozjBdNpOh");
    ref.get().then((doc) => {
        firestore().collection("shifts").add(doc.data());
    })
}

export default function FindScreen({ navigation }) {

    const { userData, setUserData } = useContext(UserDataContext);
    const [shifts, setShifts]  = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const ref = firestore().collection("shifts");
        return ref.onSnapshot((snap) => {
            setShifts(snap.docs.map(doc => ({ ...doc.data(), id: doc.id})));
            setLoading(false);
        })
    }, []);

    return (
        <HomePage signOutPress={() => { auth().signOut(); setUserData(null);}}>
            <View>
                <TouchableOpacity onPress={test}>
                    <Text>[TEST] Add Shift demo</Text>
                </TouchableOpacity>
                <Text style={[common.h4, {alignSelf: "center", marginBottom: 24}]}>Available Shifts</Text>
                { loading ? <ActivityIndicator size={35} color={theme.colors.red} /> : (
                    <View>
                        { shifts.map((shift) => ( 
                            <TouchableOpacity style={styles.shift} key={shift.id}>
                                <View style={styles.date}>
                                    <Text style={common.h4}>{dayjs(shift.start.toDate()).format("MMM")}</Text>
                                    <Text style={common.h4}>{dayjs(shift.start.toDate()).format("DD")}</Text>
                                </View>
                                <View style={styles.shiftRow}>
                                    <View style={{ flexDirection: "row", justifyContent: "space-between", width: "80%" }}>
                                        <Text style={common.h5}>{shift.venue}</Text>
                                        <Text style={common.h5}>({dayjs(shift.end.toDate()).diff(shift.start.toDate(), "hours")} hours)</Text>
                                        <Text style={common.h5}>£ {shift.payPerHour} /hour</Text>
                                    </View>
                                    <View style={{ flexDirection: "row", justifyContent: "space-between", width: "80%" }}>
                                        <Text style={common.h5}>{dayjs(shift.start.toDate()).format("HH:mm")} - {dayjs(shift.end.toDate()).format("HH:mm")}</Text>
                                        <Text style={[common.h5, {textTransform: "capitalize"}]}>{shift.serviceRequired}</Text>
                                    </View>
                                </View>
                            </TouchableOpacity> 
                        )) }
                    </View>
                ) }
            </View>
        </HomePage>
    )
}

const styles = StyleSheet.create({
    shift: {
        backgroundColor: theme.colors.lightBlue,
        padding: 12,
        borderRadius: 12,
        flexDirection: "row",
        marginBottom: 12,
    },
    date: {
        alignItems: "center",
        backgroundColor: theme.colors.red,
        width: "20%",
        padding: 8,
        borderRadius: 12,
    },
    shiftRow: { width: "80%", flexDirection: "column", justifyContent: "space-around", alignItems: "center" },

})