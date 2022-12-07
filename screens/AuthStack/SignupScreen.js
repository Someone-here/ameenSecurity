import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
} from "react-native";
import theme from "../../config/theme";
import AuthPage from "../../layouts/AuthPage";
import Modal from "react-native-modal";
import { useState } from "react";

export default function SignupScreen({ navigation }) {
  const [visible, setVisible] = useState(false);

  return (
    <AuthPage>
      <View style={styles.container}>
        <Image
          source={require("../../assets/logo.png")}
          resizeMode="contain"
          style={{ width: "100%", height: 500 }}
        />
        <Text style={styles.title}>Signup Position</Text>
        <View style={styles.row}>
          <TouchableOpacity
            onPress={() => navigation.navigate("BusinessSignupScreen")}
            style={styles.selection}
          >
            <Text style={styles.selectionText}>Business</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.selection}
            onPress={() => setVisible(true)}
          >
            <Text style={styles.selectionText}>Personal</Text>
          </TouchableOpacity>
        </View>
        <Modal
          isVisible={visible}
          onBackdropPress={() => setVisible(false)}
          onSwipeComplete={() => setVisible(false)}
          swipeDirection="down"
          statusBarTranslucent={true}
          onBackButtonPress={() => setVisible(false)}
          backdropOpacity={0.4}
          hideModalContentWhileAnimating
        >
          <View style={styles.modalContainer}>
            <Text style={styles.title}>Choose Job</Text>
            <View style={styles.row}>
              <TouchableOpacity
                onPress={() => { setVisible(false); navigation.navigate("GuardSignupScreen")}}
                style={styles.selection}
              >
                <Text style={styles.selectionText}>Guard</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.selection}
                onPress={() => { setVisible(false); navigation.navigate("StewardSignupScreen")}}
              >
                <Text style={styles.selectionText}>Steward</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
        <View style={styles.bottomRow}>
          <TouchableOpacity onPress={() => navigation.navigate("SigninScreen")}>
            <Text style={{ fontSize: 22, fontWeight: "bold" }}>Sign In</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => navigation.navigate("ContactScreen")}
          >
            <Text style={{ fontSize: 22, fontWeight: "bold" }}>Contact</Text>
          </TouchableOpacity>
        </View>
      </View>
    </AuthPage>
  );
}

const styles = StyleSheet.create({
  title: {
    fontSize: 28,
    marginBottom: 24,
    fontWeight: "bold",
    alignSelf: "center",
  },
  modalContainer: {
    width: "98%",
    borderRadius: 12,
    paddingVertical: 38,
    alignSelf: "center",
    backgroundColor: theme.colors.background,
  },
  container: {
    paddingTop: 48,
    height: "100%",
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-around",
  },
  bottomRow: {
    position: "absolute",
    paddingHorizontal: 28,
    flexDirection: "row",
    width: "100%",
    justifyContent: "space-between",
    transform: [{ translateY: Dimensions.get("window").height - 80 }],
  },
  selection: {
    width: "42%",
    borderRadius: 12,
    paddingVertical: 12,
    backgroundColor: theme.colors.blue,
  },
  selectionText: {
    fontSize: 20,
    fontWeight: "500",
    textAlign: "center",
  },
});
