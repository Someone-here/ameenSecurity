import { StyleSheet } from "react-native";
import theme from "../config/theme";
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from "react-native-responsive-screen";

const common = StyleSheet.create({
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
    button: {
        backgroundColor: theme.colors.blue,
        borderRadius: 24,
        paddingHorizontal: 18,
        height: 50,
        alignItems: "center",
        justifyContent: "center",
    },
    details: {
        marginTop: 18,
        backgroundColor: theme.colors.lightBlue,
        borderRadius: 16,
        paddingHorizontal: 24,
        paddingVertical: 24,
    },
    avatar: {
        width: hp(12),
        aspectRatio: 1,
        borderRadius: 100,
        marginBottom: 12,
    },
    h5: {
        fontSize: 20,
        fontWeight: "500"
    }
})

export default common;