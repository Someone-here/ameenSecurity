import { View, Text, TouchableOpacity, StyleSheet, Image } from "react-native";
import auth from "@react-native-firebase/auth";
import { useContext } from "react";
import { UserDataContext } from "../../providers/UserDataProvider";
import theme from "../../config/theme";
import HomePage from "../../layouts/HomePage";
import { FontAwesome } from "@expo/vector-icons";
import common from "../../config/styles.common";
import { AirbnbRating, Rating } from "react-native-ratings";

export default function ClientHomeScreen({ navigation }) {
  const { userData, setUserData } = useContext(UserDataContext);

  console.log(userData);
  return (
    <HomePage
      signOutPress={() => {
        auth().signOut();
      }}
    >
      <View style={{paddingHorizontal: 16}}>
      <Text style={[common.h4, { alignSelf: "center" }]}>
        Hello, {userData.firstName}!
      </Text>
      <View style={styles.infoBar}>
        <View>
          <Image
            source={{
              uri: "https://firebasestorage.googleapis.com/v0/b/ameen-security.appspot.com/o/avatars%2FJMWu6HDxHQavLch2QJD9lZgnv1I3.jpg?alt=media&token=d9d92bcf-1e50-4144-bc55-afcf85ec1ca2",
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
        <View style={{ marginLeft: 28, justifyContent: "center", alignItems: "center" }}>
          <FontAwesome
            name="check-circle"
            size={48}
            color={theme.colors.blue}
          />
          <Text style={[common.normalText, { marginTop: 2, textAlign: "center" }]}>
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
        <Text style={common.h4}>Messages</Text>
      </TouchableOpacity>
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
