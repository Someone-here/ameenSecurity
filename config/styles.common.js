import { StyleSheet } from "react-native";
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from "react-native-responsive-screen";

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

export default styles;