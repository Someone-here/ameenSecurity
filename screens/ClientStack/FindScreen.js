import { Text, View, TouchableOpacity, FlatList } from "react-native";
import { useEffect, useState } from "react";
import HomePage from "../../layouts/HomePage";
import auth from "@react-native-firebase/auth";
import firestore from "@react-native-firebase/firestore";
import common from "../../config/styles.common";
import Shift from "../../components/Shift";
import { heightPercentageToDP as hp } from "react-native-responsive-screen";

function test() {
  const ref = firestore().collection("shifts").doc("iBpVwrozfwpozjBdNpOh");
  ref.get().then((doc) => {
    firestore().collection("shifts").add(doc.data());
  });
}

export default function FindScreen({ navigation }) {
  const [shifts, setShifts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const ref = firestore().collection("shifts");
    return ref.onSnapshot((snap) => {
      setShifts(snap.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
      setLoading(false);
    });
  }, [loading]);

  return (
    <HomePage style={{ maxHeight: hp(90) }}>
      <View style={{ paddingHorizontal: 16, height: "100%" }}>
        <Text style={[common.h4, { alignSelf: "center", marginBottom: 24 }]}>
          Available Shifts
        </Text>
          <FlatList
            data={shifts}
            style={{ height: "100%" }}
            renderItem={({ item }) => (
              <Shift
                shift={item}
                onPress={() => {
                  navigation.navigate("ShiftDetail", { item, status: "explore" });
                }}
              />
            )}
            refreshing={loading}
            onRefresh={() => setLoading(true)}
          />
        </View>
    </HomePage>
  );
}
