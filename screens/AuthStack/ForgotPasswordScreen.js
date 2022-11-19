import { View, Text, TextInput, StyleSheet, TouchableOpacity, Dimensions } from "react-native";
import AuthPage from "../../layouts/AuthPage";
import { Formik, ErrorMessage } from "formik";
import theme from "../../config/theme";
import * as Yup from "yup";
import auth from "@react-native-firebase/auth";

export default function ForgotPasswordScreen({ navigation }) {
    return (
        <AuthPage>
            <View style={styles.container}>
                <Text style={styles.title}>Forgot Password</Text>
                <Text style={styles.info}>
                    Please enter the email address associated with your account
                </Text>
                    <Formik
                        initialValues={{ email: "" }}
                        validationSchema={Yup.object({ email: Yup.string().required().email() })}
                        onSubmit={({email}, {setErrors}) => {
                            auth().sendPasswordResetEmail(email)
                            .then(() => console.log("Email sent"))
                            .catch((e) => setErrors({email: e.message}));
                        }}
                    >
                    {({ handleChange, handleBlur, handleSubmit, values }) => (
                        <View style={styles.main}>
                            <TextInput 
                                name="email"
                                placeholder="Email"
                                onBlur={handleBlur("email")}
                                onChangeText={handleChange("email")}
                                value={values.email}
                                style={styles.input}
                            />
                            <ErrorMessage name="email">
                                {(msg) => <Text style={styles.error}>{msg}</Text>}
                            </ErrorMessage>
                            <TouchableOpacity style={styles.submit} onPress={handleSubmit}>
                                <Text style={{fontSize: 20, fontWeight: "500"}}>Submit</Text>
                            </TouchableOpacity>
                        </View>
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
        flexDirection: "column",
    },
    input: {
        backgroundColor: "#e5e5e5",
        borderRadius: 12,
        fontSize: 18,
        padding: 12,
        marginTop: 12,
    },
    error: {
        color: "red",
        marginBottom: 12,
    },
    info: {
        fontSize: 24,
        textAlign: "center",
        marginTop: 24,
        marginBottom: 42
    },
    title: {
        fontSize: 24,
        marginBottom: 42,
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