import { View, Text, StyleSheet } from "react-native";
import theme from "../config/theme";

export default function AuthPage({ children }) {
    return (
        <View style={styles.root}>
            <View style={[styles.circle, styles.leftCircle]} />
            <View style={[styles.circle, styles.rightCircle]} />
            <View style={styles.container}>
                {children}
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    root: { 
        width: "100%", 
        height: "100%", 
        backgroundColor: theme.colors.background
    },
    container: {
        paddingVertical: 20,
        paddingHorizontal: 10,
    },
    circle: {
        width: 250,
        height: 250,
        borderRadius: 250,
        position: "absolute",
    },
    leftCircle: {
        top: -50,
        left: -125,
        backgroundColor: theme.colors.red,
    },
    rightCircle: {
        top: -120,
        backgroundColor: theme.colors.lightRed,
    }
})