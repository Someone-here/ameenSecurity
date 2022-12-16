import { View, Text, Image, TouchableOpacity } from "react-native";
import common from "../../config/styles.common";
import HomePage from "../../layouts/HomePage";
import { FontAwesome } from "@expo/vector-icons";
import { useContext } from "react";
import theme from "../../config/theme";
import { UserDataContext } from "../../providers/UserDataProvider";

export default function BusinessProfileScreen({ navigation }) {

  const { userData } = useContext(UserDataContext);

  return (
    <HomePage>
      <Text style={[common.h4, { alignSelf: "center" }]}>{userData.name}</Text>
      <View style={{ paddingHorizontal: 16 }}>
        <View style={[common.row, { paddingHorizontal: 8 }]}>
          <Image
            source={{
              uri: userData.avatar,
            }}
            resizeMode="contain"
            style={common.avatar}
          />
          <View style={{ alignItems: "center" }}>
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
            <Text style={common.h5}>Venue Type</Text>
            <Text style={common.normalText}>{userData.venueType}</Text>
          </View>
          <View style={common.row}>
            <Text style={common.h5}>Contact Name</Text>
            <Text style={common.normalText}>{userData.pointOfContactName}</Text>
          </View>
          <View style={common.row}>
            <Text style={common.h5}>Contact Number</Text>
            <Text style={common.normalText}>{userData.pointOfContactNumber}</Text>
          </View>
          <View style={common.row}>
            <Text style={common.h5}>Venue Address</Text>
            <Text style={common.normalText}>{userData.address}</Text>
          </View>
        </View>
        <View style={{marginTop: 30}}>
          <TouchableOpacity style={common.button} onPress={() => navigation.navigate("Messages")}>
            <Text style={common.h5}>Messsages</Text>
          </TouchableOpacity>
        </View>
      </View>
    </HomePage>
  );
}
