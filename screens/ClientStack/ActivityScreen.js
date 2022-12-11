import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { View, Text, FlatList, ActivityIndicator } from "react-native";
import { useContext, useEffect, useState } from "react";
import theme from "../../config/theme";
import HomePage from "../../layouts/HomePage";
import { UserDataContext } from "../../providers/UserDataProvider";
import Shift from "../../components/Shift";
import { heightPercentageToDP as hp } from "react-native-responsive-screen";

const Tab = createMaterialTopTabNavigator();

async function getShiftsData(shifts) {
  const resp = await Promise.all(shifts.map((shift) => shift.get()));
  return resp.map((shift) => {
    const data = shift.data();
    data.id = shift.id;
    return data;
  });
}

function Applied({ shifts, parentNav }) {
  const [applied, setApplied] = useState(null);

  useEffect(() => {
    getShiftsData(shifts).then((shift) => setApplied(shift));
  }, [shifts]);

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

function Confirmed({ shifts, parentNav }) {
  const [confirmed, setConfirmed] = useState(null);

  useEffect(() => {
    getShiftsData(shifts).then((shift) => setConfirmed(shift));
  }, [shifts]);

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

function Completed({ shifts, parentNav }) {
  const [completed, setCompleted] = useState(null);

  useEffect(() => {
    getShiftsData(shifts).then((shift) => setCompleted(shift));
  }, [shifts]);

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
  const { userData } = useContext(UserDataContext);

  return (
    <HomePage style={{ height: hp(92) }}>
      <Tab.Navigator
        style={{ marginTop: 18 }}
        sceneContainerStyle={{ backgroundColor: theme.colors.background }}
      >
        <Tab.Screen name="Applied">
          {() => <Applied shifts={userData.applied} parentNav={navigation} />}
        </Tab.Screen>
        <Tab.Screen name="Confirmed">
          {() => (
            <Confirmed shifts={userData.confirmed} parentNav={navigation} />
          )}
        </Tab.Screen>
        <Tab.Screen name="Completed">
          {() => (
            <Completed shifts={userData.completed} parentNav={navigation} />
          )}
        </Tab.Screen>
      </Tab.Navigator>
    </HomePage>
  );
}
