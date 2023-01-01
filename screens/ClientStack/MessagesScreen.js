import { View, Text, FlatList, Image, TouchableOpacity } from "react-native";
import { useContext, useEffect, useState } from "react";
import common from "../../config/styles.common";
import { useNavigation } from "@react-navigation/native";
import firestore from "@react-native-firebase/firestore";
import { AuthenticatedUserContext } from "../../providers/AuthenticatedUserProvider";

export default function MessagesScreen() {
  const { user } = useContext(AuthenticatedUserContext);
  const [contacts, setContacts] = useState([]);
  useEffect(() => {
    return firestore().collection(`users/${user.uid}/contacts`).onSnapshot((snap) => {
      setContacts(snap.docs.map(doc => ({ id: doc.id, ...doc.data() })));
    })
  }, [])
  const navigation = useNavigation();

  return (
    <View>
      <FlatList
        data={contacts}
        renderItem={({ item }) => (
          <TouchableOpacity
            onPress={() => navigation.navigate("Chat", { userId: user.uid, businessId: item.id, businessName: item.name })}
            style={{ width: "100%", backgroundColor: "#fffa", padding: 12 }}
          >
            <View style={common.row}>
              <Image
                style={{width: 80, aspectRatio: 1}}
                source={{
                  uri: item.avatar,
                }}
              />
              <View style={{width: "70%", margin: "auto"}}>
              <Text style={common.h4}>{item.name}</Text>
              <Text style={[common.normalText, {marginTop: 8}]}>{item.lastMessage}</Text>
                </View>
            </View>
          </TouchableOpacity>
        )}
      />
    </View>
  );
}
