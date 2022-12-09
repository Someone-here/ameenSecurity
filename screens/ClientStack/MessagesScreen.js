import { View, Text, FlatList, Image, TouchableOpacity } from "react-native";
import { useContext } from "react";
import { UserDataContext } from "../../providers/UserDataProvider";
import common from "../../config/styles.common";
import { useNavigation } from "@react-navigation/native";

export default function MessagesScreen() {
  const { userData } = useContext(UserDataContext);
  const navigation = useNavigation();

  return (
    <View>
      <FlatList
        data={userData.contacts}
        renderItem={({ item }) => (
          <TouchableOpacity
            onPress={() => navigation.navigate("Chat", {contact: item})}
            style={{ width: "100%", backgroundColor: "#fffa", padding: 12 }}
          >
            <View style={common.row}>
              <Image
                style={{width: 80, aspectRatio: 1}}
                source={{
                  uri: "https://firebasestorage.googleapis.com/v0/b/ameen-security.appspot.com/o/avatars%2FJMWu6HDxHQavLch2QJD9lZgnv1I3.jpg?alt=media&token=d9d92bcf-1e50-4144-bc55-afcf85ec1ca2",
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
