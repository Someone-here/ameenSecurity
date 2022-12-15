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

const Tab = createMaterialTopTabNavigator();

async function getShiftsData(shifts) {
  const resp = await Promise.all(shifts.map((shift) => shift.get()));
  return resp.map((shift) => {
    const data = shift.data();
    data.id = shift.id;
    return data;
  });
}

function Advertised({ shifts, navigation }) {
  const [advertised, setAdvertised] = useState();
  useEffect(() => {
    getShiftsData(shifts).then((dat) => setAdvertised(dat));
  }, [shifts]);

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
      >
        <Text style={common.h5}>Add Shift</Text>
      </TouchableOpacity>
    </View>
  );
}

function Confirmed({ shifts, navigation }) {
  const [confirmed, setConfirmed] = useState();
  useEffect(() => {
    getShiftsData(shifts).then((dat) => setConfirmed(dat));
  }, [shifts]);

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

function Completed({ shifts }) {
  const [completed, setCompleted] = useState();
  useEffect(() => {
    getShiftsData(shifts).then((dat) => setCompleted(dat));
  }, [shifts]);

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
  const { userData } = useContext(UserDataContext);

  return (
    <HomePage style={{ height: hp(92) }}>
      <Tab.Navigator
        style={{ marginTop: 18 }}
        sceneContainerStyle={{ backgroundColor: theme.colors.background }}
      >
        <Tab.Screen name="Advertised">
          {(props) => <Advertised shifts={userData.advertised} {...props} />}
        </Tab.Screen>
        <Tab.Screen name="Confirmed">
          {(props) => <Confirmed shifts={userData.confirmed} {...props} />}
        </Tab.Screen>
        <Tab.Screen name="Completed">
          {(props) => <Completed shifts={userData.completed} {...props} />}
        </Tab.Screen>
      </Tab.Navigator>
    </HomePage>
  );
}
