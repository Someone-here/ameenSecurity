import {
  View,
  ActivityIndicator,
  FlatList,
  Text,
  TouchableOpacity,
} from "react-native";
import HomePage from "../../layouts/HomePage";
import { useContext, useEffect, useState } from "react";
import { UserDataContext } from "../../providers/UserDataProvider";
import { heightPercentageToDP as hp } from "react-native-responsive-screen";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import theme from "../../config/theme";
import Shift from "../../components/Shift";
import common from "../../config/styles.common";
import firestore from "@react-native-firebase/firestore";
import { AuthenticatedUserContext } from "../../providers/AuthenticatedUserProvider";

const Tab = createMaterialTopTabNavigator();

function Advertised({ uid, navigation }) {
  const [advertised, setAdvertised] = useState(null);
  
  useEffect(() => {
    firestore().collection(`users/${uid}/shifts`).where("status", "==", "advertised").onSnapshot(snap => {
      setAdvertised(snap.docs.map(doc => ({id: doc.id, ...doc.data()})));
    });
  }, []);

  if (!advertised)
    return (
      <ActivityIndicator
        size="large"
        style={{ position: "absolute", alignSelf: "center" }}
      />
    );

  return (
    <View style={{ paddingHorizontal: 16, marginTop: 20, height: "100%" }}>
      <FlatList
        data={advertised}
        renderItem={({ item }) => (
          <Shift
            shift={item}
            onPress={() =>
              navigation.navigate("ShiftDetail", {
                item,
                status: "advertised",
              })
            }
          />
        )}
      />
      <TouchableOpacity
        style={[
          common.button,
          { position: "absolute", bottom: hp(6), right: 12, backgroundColor: theme.colors.red },
        ]}
        onPress={() => navigation.navigate("AddShift")}
      >
        <Text style={common.h5}>Add Shift</Text>
      </TouchableOpacity>
    </View>
  );
}

function Confirmed({ uid, navigation }) {
  const [confirmed, setConfirmed] = useState();

  useEffect(() => {
    firestore().collection(`users/${uid}/shifts`).where("status", "==", "confirmed").onSnapshot(snap => {
      setConfirmed(snap.docs.map(doc => ({id: doc.id, ...doc.data()})));
    });
  }, []);

  if (!confirmed)
    return (
      <ActivityIndicator
        size="large"
        style={{ position: "absolute", alignSelf: "center" }}
      />
    );

  return (
    <View style={{ paddingHorizontal: 16, marginTop: 20, height: "100%" }}>
      <FlatList
        data={confirmed}
        renderItem={({ item }) => (
          <Shift
            shift={item}
            onPress={() =>
              navigation.navigate("ShiftDetail", {
                item,
                status: "confirmed",
              })
            }
          />
        )}
      />
    </View>
  );
}

function Completed({ uid }) {
  const [completed, setCompleted] = useState();
  
  useEffect(() => {
    firestore().collection(`users/${uid}/completed`).onSnapshot(snap => {
      setCompleted(snap.docs.map(doc => ({id: doc.id, ...doc.data()})));
    });
  }, []);

  if (!completed)
    return (
      <ActivityIndicator
        size="large"
        style={{ position: "absolute", alignSelf: "center" }}
      />
    );

  return (
    <View style={{ paddingHorizontal: 16, marginTop: 20, height: "100%" }}>
      <FlatList
        data={completed}
        renderItem={({ item }) => (
          <Shift
            shift={item}
            onPress={() =>
              navigation.navigate("ShiftDetail", {
                item,
                status: "completed",
              })
            }
          />
        )}
      />
    </View>
  );
}

export default function ActivityScreen({ navigation }) {
  const { user: { uid } } = useContext(AuthenticatedUserContext);

  return (
    <HomePage style={{ height: hp(92) }}>
      <Tab.Navigator
        style={{ marginTop: 18 }}
        sceneContainerStyle={{ backgroundColor: theme.colors.background }}
      >
        <Tab.Screen name="Advertised">
          {(props) => <Advertised uid={uid} {...props} />}
        </Tab.Screen>
        <Tab.Screen name="Confirmed">
          {(props) => <Confirmed uid={uid} {...props} />}
        </Tab.Screen>
        <Tab.Screen name="Completed">
          {(props) => <Completed uid={uid} {...props} />}
        </Tab.Screen>
      </Tab.Navigator>
    </HomePage>
  );
}
