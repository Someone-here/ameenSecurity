import { View, Text, ScrollView, TextInput, StyleSheet, TouchableOpacity, Dimensions } from "react-native";
import AuthPage from "../../layouts/AuthPage";
import { Formik, ErrorMessage } from "formik";
import theme from "../../config/theme";
import * as Yup from "yup";
import firestore from "@react-native-firebase/firestore";

const initial = {
    name: "",
    email: "",
    enquiry: "",
}

const placeholders = {
    name: "Name",
    email: "Email",
    enquiry: "Enquiry",
}

const schema = Yup.object({
    name: Yup.string().required(),
    email: Yup.string().required().email(),
    enquiry: Yup.string().required()
});

function sendEnquiry(enq) {
    return firestore().collection("messages").add(enq)
}

export default function ContactScreen({ navigation }) {
    return (
        <AuthPage>
            <View style={styles.container}>
                <Text style={styles.title}>Contact Us</Text>
                <Formik
                    initialValues={initial}
                    validationSchema={schema}
                    onSubmit={(enq) => sendEnquiry(enq).then(() => navigation.navigate("ThankYouScreen", { message: "We will be in touch shortly"}))}
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
                                            style={[styles.input, e == "enquiry" ? styles.tallInput: null]}
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
                    <TouchableOpacity onPress={() => navigation.navigate("SignupScreen")}>
                        <Text style={{ fontSize: 22, fontWeight: "bold" }}>Sign Up</Text>
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
    tallInput: {
        textAlignVertical: "top",
        height: 150,
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