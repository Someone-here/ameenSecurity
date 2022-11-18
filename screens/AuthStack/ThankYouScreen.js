import { View, Text, Image, TouchableOpacity, StyleSheet, Dimensions } from "react-native";
import theme from "../../config/theme";
import AuthPage from "../../layouts/AuthPage";

export default function ThankYouScreen({ navigation, route }) {
    return (
        <AuthPage>
            <View style={styles.container}>
                <Image source={require("../../assets/logo.png")} resizeMode="contain" style={{ width: "100%", height: 500 }} />
                <Text style={styles.title}>Thank You!</Text>
                <Text style={styles.subtitle}>{route.params?.message ? route.params.message : ""}</Text>
                <View style={styles.bottomRow}>
                    <TouchableOpacity onPress={() => navigation.navigate("SigninScreen")}>
                        <Text style={{ fontSize: 22, fontWeight: "bold" }}>Sign In</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => navigation.navigate("SignupScreen")}>
                        <Text style={{ fontSize: 22, fontWeight: "bold" }}>Sign Up</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </AuthPage>
    )
}

const styles = StyleSheet.create({
    title: {
        fontSize: 28,
        marginBottom: 24,
        fontWeight: "bold",
        alignSelf: "center"
    },
    subtitle: {
        fontSize: 24,
        textAlign: "center",
    },
    container: {
        paddingTop: 48,
        height: "100%"
    },
    row: {
        flexDirection: "row",
        justifyContent: "space-around"
    },
    bottomRow: {
        position: "absolute",
        paddingHorizontal: 28,
        flexDirection: "row",
        width: "100%",
        justifyContent: "space-between",
        transform: [
            { translateY: Dimensions.get("window").height - 80 }
        ],
    },
})