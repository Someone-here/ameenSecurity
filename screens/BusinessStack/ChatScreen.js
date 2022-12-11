import { View, Text } from "react-native";
import { useNavigation } from "@react-navigation/native";

export default function ChatScreen({ route }) {
  const contact = route.params.contact;
  console.log(contact.name);
  const navigation = useNavigation();
  navigation.setOptions({title: contact.name});
  return (
    <View>
      <Text>Chats</Text>
    </View>
  )
}