import { View, TouchableOpacity, Image, StyleSheet } from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import theme from "../config/theme";

export default function HomePage({
  helpPress,
  signOutPress,
  children,
}) {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Image
          source={require("../assets/icon.png")}
          style={styles.topLogo}
          resizeMode="contain"
        />
        <View style={{ flexDirection: "row" }}>
          <TouchableOpacity style={{ marginRight: 20 }} onPress={helpPress}>
            <FontAwesome
              name="headphones"
              size={35}
              color={theme.colors.blue}
            />
          </TouchableOpacity>
          <TouchableOpacity onPress={signOutPress}>
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
  },
  topLogo: {
    width: 80,
    aspectRatio: 0.7,
  },
});
