import { View, TouchableOpacity, Image, StyleSheet } from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import theme from "../config/theme";
import { useNavigation } from "@react-navigation/native";
import auth from "@react-native-firebase/auth";
import { useContext } from "react";
import { AuthenticatedUserContext } from "../providers/AuthenticatedUserProvider";

export default function HomePage({
  children,
  style
}) {

  const navigation = useNavigation();

  const { setUser } = useContext(AuthenticatedUserContext)

  return (
    <View style={[styles.container, style]}>
      <View style={styles.header}>
        <Image
          source={require("../assets/icon.png")}
          style={styles.topLogo}
          resizeMode="contain"
        />
        <View style={{ flexDirection: "row" }}>
          <TouchableOpacity style={{ marginRight: 20 }} onPress={() => navigation.navigate("Contact")}>
            <FontAwesome
              name="headphones"
              size={35}
              color={theme.colors.blue}
            />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => { auth().signOut(); setUser(null); }}>
            <FontAwesome name="sign-out" color={theme.colors.blue} size={35} />
          </TouchableOpacity>
        </View>
      </View>
      {children}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 36,
    backgroundColor: theme.colors.background,
    height: "100%",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginVertical: 2,
    paddingHorizontal: 16,
    maxHeight: 100
  },
  topLogo: {
    width: 80,
    aspectRatio: 0.7,
  },
});
