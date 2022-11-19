import { View, Text, ScrollView, TextInput, StyleSheet, TouchableOpacity, Dimensions, Modal } from "react-native";
import AuthPage from "../../layouts/AuthPage";
import { Formik, ErrorMessage } from "formik";
import theme from "../../config/theme";
import * as Yup from "yup";
import { useState } from "react";
import { getDocumentAsync } from "expo-document-picker";
import storage from '@react-native-firebase/storage';
import firestore from "@react-native-firebase/firestore";

const initial = {
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    dateOfBirth: "",
    phoneNumber: "",
}

const config = {
    firstName: {
        placeholder: "First Name",
        validation: Yup.string().required(),
    },
    lastName: {
        placeholder: "Last Name",
        validation: Yup.string().required(),
    },
    dateOfBirth: {
        placeholder: "Date Of Birth",
        validation: Yup.date().required(),
    },
    email: {
        placeholder: "Email",
        validation: Yup.string().email().required()
    },
    password: {
        placeholder: "Password",
        validation: Yup.string(),
    },
    phoneNumber: {
        placeholder: "Phone number",
        validation: Yup.string().matches(/^\+?[1-9][0-9]{7,14}$/, "Please enter a valid number")
    },
}

let schema = {};
for (const i of Object.keys(config)) {
    schema[i] = config[i].validation
}

schema = Yup.object(schema);

function sendApplication(app) {
    let payload = app;
    payload.role = "steward";
    const ref = firestore().collection("pending").doc("users").collection("applications");
    return ref.add(payload);
}

export default function StewardSignupScreen({ navigation }) {

    const [modal, setModal] = useState(false);
    const [application, setApplication] = useState({});
    const [IDProof, setIDProof] = useState(null);

    return (
        <AuthPage>
            <View style={styles.container}>
                <Text style={styles.title}>Sign Up Steward</Text>
                <Formik
                    initialValues={initial}
                    validationSchema={schema}
                    onSubmit={(app) => {
                        setApplication(app);
                        setModal(true);
                    }}
                >
                    {({ handleChange, handleBlur, handleSubmit, values }) => (
                        <>
                            <ScrollView style={styles.main}>
                                {Object.keys(initial).map((e) => (
                                    <View key={e}>
                                        <TextInput
                                            name={e}
                                            {...config[e]}
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
                <Modal
                    visible={modal}
                    onRequestClose={() => setModal(false)}
                    animationType="fade"
                    statusBarTranslucent={true}
                >
                    <AuthPage>
                        <View style={styles.container}>
                            <View style={styles.section}>
                                <Text style={styles.title}>Upload ID proof</Text>
                                <TouchableOpacity style={styles.submitDoc} onPress={() =>
                                    getDocumentAsync({ type: "image/*" })
                                        .then((doc) => {
                                            if (doc.type == "cancel") return;
                                            setIDProof(doc);
                                        })
                                }>
                                    <Text>{IDProof ? IDProof.name : "Choose File"}</Text>
                                </TouchableOpacity>
                            </View>
                            <TouchableOpacity onPress={async () => {
                                if (IDProof && application) {
                                    const { id } = await sendApplication(application);
                                    const IDExt = IDProof.uri.split(".").pop();
                                    const IDProofRef = storage().ref(`/proofs/ID-${id}.${IDExt}`);
                                    IDProofRef.putFile(IDProof.uri).catch((E) => console.log(E));
                                    navigation.navigate("ThankYouScreen", { message: "Your Application will be reviewed" });
                                }
                            }}>
                                <Text style={styles.submit}>Send Application</Text>
                            </TouchableOpacity>
                        </View>
                    </AuthPage>
                </Modal>
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
    section: {
        marginTop: 56,
        backgroundColor: "#cacaca5a",
        padding: 28,
        borderRadius: 24

    },
    submitDoc: {
        marginTop: 24,
        backgroundColor: theme.colors.lightBlue,
        alignSelf: "center",
        paddingHorizontal: 26,
        paddingVertical: 18,
        fontSize: 20,
        borderRadius: 12
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