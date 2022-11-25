import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    normalText: {
        fontSize: 18,
        fontWeight: "400",
    },
    row: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginVertical: 2
    },
    h4: {
        fontSize: 22,
        fontWeight: "600",
    },
    avatar: {
        width: 120,
        height: 120,
        borderRadius: 100,
        marginBottom: 12,
    },
    h5: {
        fontSize: 20,
        fontWeight: "500"
    }
})

export default styles;