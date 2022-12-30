import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Image,
  ActivityIndicator,
} from "react-native";
import { useState, useEffect } from "react";
import theme from "../../config/theme";
import HomePage from "../../layouts/HomePage";
import { FontAwesome } from "@expo/vector-icons";
import common from "../../config/styles.common";
import { AirbnbRating } from "react-native-ratings";
import firestore from "@react-native-firebase/firestore";
import functionInstance from "../../config/firebase.functions";

function cancelShift({ userId, shiftId }) {
  const action = functionInstance.httpsCallable("deselectShift");
  return action({ userId, shiftId });
}
export default function ClientHomeScreen({ navigation, route }) {
  const [userData, setUserData] = useState(null);
  const shiftId = route.params.shiftId;
  const userId = route.params.userId;
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    return firestore()
      .collection("users")
      .doc(route.params.userId)
      .onSnapshot((snap) => setUserData(snap.data()));
  }, []);

  if (!userData)
    return <ActivityIndicator size={"large"} color={theme.colors.blue} />;

  return (
    <HomePage>
      <View style={{ paddingHorizontal: 16 }}>
        <Text
          style={[
            common.h4,
            { alignSelf: "center", textTransform: "capitalize" },
          ]}
        >
          {userData.role}
        </Text>
        <View style={styles.infoBar}>
          <View>
            <Image
              source={{
                uri: userData.avatar,
              }}
              style={common.avatar}
            />
            <Text style={common.h5}>
              {userData?.firstName} {userData?.lastName}
            </Text>
          </View>
          <AirbnbRating
            size={20}
            count={5}
            defaultRating={userData?.rating}
            isDisabled={true}
            showRating={false}
          />
          <View
            style={{
              marginLeft: 28,
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <FontAwesome
              name="check-circle"
              size={48}
              color={theme.colors.blue}
            />
            <Text
              style={[common.normalText, { marginTop: 2, textAlign: "center" }]}
            >
              Verified
            </Text>
          </View>
        </View>
        <View style={common.details}>
          <View style={common.row}>
            <Text style={common.h5}>SIA ID:</Text>
            <Text style={common.normalText}>{userData?.SIA}</Text>
          </View>
          <View style={common.row}>
            <Text style={common.h5}>Shifts Completed</Text>
            <Text style={common.normalText}>{userData?.shiftsCompleted}</Text>
          </View>
          <View>
            <Text style={common.h5}>Skills:</Text>
            <View style={{ paddingLeft: 12, marginTop: 5 }}>
              {userData.skills &&
                userData.skills.map((skill) => (
                  <Text key={skill} style={common.normalText}>
                    • {skill}
                  </Text>
                ))}
            </View>
          </View>
        </View>
        <TouchableOpacity
          style={styles.cta}
          onPress={() => navigation.navigate("Messages")}
        >
          <Text style={common.h4}>Message</Text>
        </TouchableOpacity>
        <View
          style={[common.row, { justifyContent: "center", paddingTop: 32 }]}
        >
          <TouchableOpacity
          disabled={loading}
            onPress={() => {
              setLoading(true);
              cancelShift({ userId, shiftId }).then(() => {
                setLoading(false);
                navigation.navigate("Activity");
              })
            }}
            style={[common.button, { width: 120, backgroundColor: "#c88" }]}
          >
            { loading ? <ActivityIndicator color="#fff" /> : <Text style={common.h5}>Deselect</Text> }
          </TouchableOpacity>
        </View>
      </View>
    </HomePage>
  );
}

const styles = StyleSheet.create({
  cta: {
    backgroundColor: theme.colors.blue,
    width: "100%",
    height: 70,
    borderRadius: 16,
    marginTop: 18,
    alignItems: "center",
    justifyContent: "center",
  },
  infoBar: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around",
  },
});
