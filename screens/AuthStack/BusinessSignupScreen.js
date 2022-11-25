import { View, Text, ScrollView, TextInput, StyleSheet, TouchableOpacity, Dimensions } from "react-native";
import AuthPage from "../../layouts/AuthPage";
import { Formik, ErrorMessage } from "formik";
import theme from "../../config/theme";
import * as Yup from "yup";
import firestore from "@react-native-firebase/firestore";

const initial = {
    name: "",
    address: "",
    venueType: "",
    email: "",
    password: "",
    pointOfContactName: "",
    pointOfContactNumber: "",
}

const placeholders = {
    name: "Name",
    address: "Address",
    venueType: "Type of Venue",
    email: "Email",
    password: "Password",
    pointOfContactName: "Point of Contact Name",
    pointOfContactNumber: "Point of Contact Number"
}

const schema = Yup.object({
    name: Yup.string().required(),
    address: Yup.string().required(),
    venueType: Yup.string().required(),
    email: Yup.string().required().email(),
    password: Yup.string().required().min(8, "Password must be at least 8 characters"),
    pointOfContactName: Yup.string().required(),
    pointOfContactNumber: Yup.string().required()
});

function sendApplication(app) {
    app.role = "business";
    const applications = firestore().collection("pending");
    return applications.add(app);
}

export default function BusinessSignupScreen({ navigation }) {
    return (
        <AuthPage>
            <View style={styles.container}>
                <Text style={styles.title}>Sign Up Business</Text>
                <Formik
                    initialValues={initial}
                    validationSchema={schema}
                    onSubmit={(app) => 
                        sendApplication(app)
                        .then(() => 
                            navigation.navigate("ThankYouScreen", { message:"You application is sent to be reviewed" }
                        ))
                    }
                > 
                    {({ handleChange, handleBlur, handleSubmit, values }) => (
                        <>
                            <ScrollView style={styles.main}>
                                {Object.keys(initial).map((e) => (
                                    <View key={e}>
                                        <TextInput
                                            name={e}
                                            placeholder={placeholders[e]}
                                            onChangeText={handleChange(e)}
                                            onBlur={handleBlur(e)}
                                            value={values[e]}
                                            style={styles.input}
                                        />
                                        <ErrorMessage name={e}>
                                            {(msg) => <Text style={styles.error}>{msg}</Text>}
                                        </ErrorMessage>
                                    </View>
                                ))}
                            </ScrollView>
                            <TouchableOpacity style={styles.submit} onPress={handleSubmit}>
                                <Text style={{ fontSize: 20, fontWeight: "500" }}>Submit</Text>
                            </TouchableOpacity>
                        </>
                    )}
                </Formik>
                <View style={styles.bottomRow}>
                    <TouchableOpacity onPress={() => navigation.navigate("SigninScreen")}>
                        <Text style={{ fontSize: 22, fontWeight: "bold" }}>Sign In</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => navigation.navigate("ContactScreen")}>
                        <Text style={{ fontSize: 22, fontWeight: "bold" }}>Contact</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </AuthPage>
    )
}

const styles = StyleSheet.create({
    container: {
        width: "100%",
        paddingTop: 150,
        paddingHorizontal: 12,
    },
    input: {
        backgroundColor: "#e5e5e5",
        borderRadius: 12,
        fontSize: 18,
        padding: 12,
        marginTop: 12,
    },
    main: {
        maxHeight: "78%",
    },
    error: {
        color: "red",
        marginBottom: 12,
    },
    title: {
        fontSize: 24,
        marginBottom: 12,
        fontWeight: "bold",
        alignSelf: "center"
    },
    submit: {
        marginTop: 32,
        backgroundColor: theme.colors.blue,
        alignSelf: "center",
        paddingHorizontal: 26,
        borderRadius: 12,
        paddingVertical: 12,
    },
    bottomRow: {
        position: "absolute",
        transform: [
            { translateY: Dimensions.get("window").height - 80 }
        ],
        alignItems: "flex-end",
        flexDirection: "row",
        width: "100%",
        justifyContent: "space-between",
        paddingHorizontal: 18,
    }
})