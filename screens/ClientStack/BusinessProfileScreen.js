import { View, Text, Image, ActivityIndicator, TouchableOpacity } from "react-native";
import common from "../../config/styles.common";
import HomePage from "../../layouts/HomePage";
import { FontAwesome } from "@expo/vector-icons";
import { useEffect, useState, useContext } from "react";
import theme from "../../config/theme";
import firestore from "@react-native-firebase/firestore";
import { AuthenticatedUserContext } from "../../providers/AuthenticatedUserProvider";

export default function BusinessProfileScreen({ navigation, route }) {
  const businessRef = route.params.businessRef;
  const [business, setBusiness] = useState(null);
  const [contact, setContact] = useState([]);
  const { user: {uid} } = useContext(AuthenticatedUserContext);

  useEffect(() => {
    businessRef.get().then((doc) => setBusiness(doc.data()));
    firestore().collection(`users/${uid}/contacts`).doc(businessRef.id).get().then(doc => setContact(doc.data()))
  }, []);

  if (!business) return <ActivityIndicator style={{ alignSelf: "center" }} />;

  return (
    <HomePage>
      <Text style={[common.h4, { alignSelf: "center" }]}>{business.name}</Text>
      <View style={{ paddingHorizontal: 16 }}>
        <View style={[common.row, { paddingHorizontal: 8 }]}>
          <Image
            source={{
              uri: "https://firebasestorage.googleapis.com/v0/b/ameen-security.appspot.com/o/avatars%2FJMWu6HDxHQavLch2QJD9lZgnv1I3.jpg?alt=media&token=d9d92bcf-1e50-4144-bc55-afcf85ec1ca2",
            }}
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
            <Text style={common.normalText}>{business.venueType}</Text>
          </View>
          <View style={common.row}>
            <Text style={common.h5}>Contact Name</Text>
            <Text style={common.normalText}>{business.pointOfContactName}</Text>
          </View>
          <View style={common.row}>
            <Text style={common.h5}>Venue Address</Text>
            <Text style={common.normalText}>{business.address}</Text>
          </View>
        </View>
        <View style={{marginTop: 30}}>
          <TouchableOpacity style={common.button} onPress={() => navigation.navigate("Chat", { contact })}>
            <Text style={common.h5}>Messsage</Text>
          </TouchableOpacity>
        </View>
      </View>
    </HomePage>
  );
}
