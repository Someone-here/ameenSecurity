import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { View, Text, FlatList, ActivityIndicator } from "react-native";
import { useContext, useEffect, useState } from "react";
import theme from "../../config/theme";
import HomePage from "../../layouts/HomePage";
import firestore from "@react-native-firebase/firestore";
import Shift from "../../components/Shift";
import { heightPercentageToDP as hp } from "react-native-responsive-screen";
import { AuthenticatedUserContext } from "../../providers/AuthenticatedUserProvider";

const Tab = createMaterialTopTabNavigator();

function Applied({ userId, parentNav }) {
  const [applied, setApplied] = useState(null);

  useEffect(() => {
    firestore().collection(`users/${userId}/shifts`).where("status", "==", "applied").onSnapshot((snap) => {
      setApplied(snap.docs.map(doc => ({id: doc.id, ...doc.data()})));
    })
  }, [userId]);

  if (applied) {
    return (
      <View style={{ paddingHorizontal: 16, marginTop: 20, height: "100%" }}>
        <FlatList
          data={applied}
          renderItem={({ item }) => (
            <Shift
              shift={item}
              onPress={() =>
                parentNav.navigate("ShiftDetail", {
                  item,
                  status: "applied",
                })
              }
            />
          )}
        />
      </View>
    );
  } else return <ActivityIndicator size={48} />;
}

function Confirmed({ userId, parentNav }) {
  const [confirmed, setConfirmed] = useState(null);

  useEffect(() => {
    firestore().collection(`users/${userId}/shifts`).where("status", "==", "selected").onSnapshot((snap) => {
      setConfirmed(snap.docs.map(doc => ({id: doc.id, ...doc.data()})));
    });
  }, [userId]);

  if (confirmed) {
    return (
      <View style={{ paddingHorizontal: 16, marginTop: 20, height: "100%" }}>
        <FlatList
          data={confirmed}
          renderItem={({ item }) => (
            <Shift
              shift={item}
              onPress={() =>
                parentNav.navigate("ShiftDetail", {
                  item,
                  status: "confirmed",
                })
              }
            />
          )}
        />
      </View>
    );
  } else return <ActivityIndicator size={48} />;
}

function Completed({ userId, parentNav }) {
  const [completed, setCompleted] = useState(null);

  useEffect(() => {
    firestore().collection(`users/${userId}/completed`).onSnapshot((snap) => {
      setCompleted(snap.docs.map(doc => ({id: doc.id, ...doc.data()})));
    })
  }, [userId]);

  if (completed) {
    return (
      <View style={{ paddingHorizontal: 16, marginTop: 20, height: "100%" }}>
        <FlatList
          data={completed}
          renderItem={({ item }) => (
            <Shift
              shift={item}
              onPress={() =>
                parentNav.navigate("ShiftDetail", {
                  item,
                  status: "completed",
                })
              }
            />
          )}
        />
      </View>
    );
  } else return <ActivityIndicator size={48} />;
}

export default function ActivityScreen({ navigation }) {
  const { user: { uid } } = useContext(AuthenticatedUserContext);

  return (
    <HomePage style={{ height: hp(92) }}>
      <Tab.Navigator
        style={{ marginTop: 18 }}
        sceneContainerStyle={{ backgroundColor: theme.colors.background }}
      >
        <Tab.Screen name="Applied">
          {() => <Applied userId={uid} parentNav={navigation} />}
        </Tab.Screen>
        <Tab.Screen name="Confirmed">
          {() => (
            <Confirmed userId={uid} parentNav={navigation} />
          )}
        </Tab.Screen>
        <Tab.Screen name="Completed">
          {() => (
            <Completed userId={uid} parentNav={navigation} />
          )}
        </Tab.Screen>
      </Tab.Navigator>
    </HomePage>
  );
}
