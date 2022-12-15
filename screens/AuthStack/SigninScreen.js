import { View, TextInput, Image, Text, Dimensions, StyleSheet, TouchableOpacity, KeyboardAvoidingView } from "react-native";
import AuthPage from "../../layouts/AuthPage";
import { Formik, ErrorMessage } from "formik";
import theme from "../../config/theme";
import auth from "@react-native-firebase/auth";
import * as Yup from "yup";


function login({ email, password }, { setErrors }) {
    auth().signInWithEmailAndPassword(email, password)
        .then((res) => console.log(res))
        .catch((err) => { 
            const msg = err.code === "auth/user-not-found" ? "Account does not exist": err.message;
            setErrors({ "password": msg }) 
        });
}

const schema = Yup.object({
    email: Yup.string().required().email(),
    password: Yup.string()
        .required('Password is required')
})

export default function SignInScreen({ navigation }) {
    return (
        <AuthPage>
            <View style={styles.container}>
                <Image source={require("../../assets/logo.png")} style={{ width: "100%", height: 400 }} resizeMode="contain" />
                <Text style={styles.title}>Sign In</Text>
                <Formik
                    initialValues={{ email: '', password: '' }}
                    onSubmit={login}
                    validationSchema={schema}
                >
                    {({ handleChange, handleBlur, handleSubmit, values, errors }) => (
                        <>
                            <KeyboardAvoidingView behavior="position">
                                <View style={{ backgroundColor: theme.colors.background }}>
                                    <TextInput
                                        name="email"
                                        placeholder="Email Address"
                                        onChangeText={handleChange('email')}
                                        onBlur={handleBlur('email')}
                                        value={values.email}
                                        style={styles.input}
                                        keyboardType="email-address"
                                    />
                                    <ErrorMessage name="email">
                                        {(msg) => <TextInput style={styles.error}>{msg}</TextInput>}
                                    </ErrorMessage>
                                    <TextInput
                                        name="password"
                                        placeholder="Password"
                                        onChangeText={handleChange('password')}
                                        onBlur={handleBlur('password')}
                                        value={values.password}
                                        style={styles.input}
                                        secureTextEntry
                                    />
                                    <ErrorMessage name="password">
                                        {(msg) => <TextInput style={styles.error}>{msg}</TextInput>}
                                    </ErrorMessage>
                                </View>
                            </KeyboardAvoidingView>
                            <TouchableOpacity onPress={handleSubmit} style={styles.submit}>
                                <Text style={{ fontSize: 20 }}>Sign In</Text>
                            </TouchableOpacity>
                        </>
                    )}
                </Formik>
                <View style={styles.bottomRow}>
                    <TouchableOpacity onPress={() => navigation.navigate("ForgotPasswordScreen")}>
                        <Text style={{ fontSize: 22, fontWeight: "bold" }}>Forgot Password</Text>
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
        height: "100%",
        paddingVertical: 72,
        paddingHorizontal: 12,
    },
    input: {
        backgroundColor: "#e5e5e5",
        borderRadius: 12,
        fontSize: 18,
        padding: 12,
        marginBottom: 12,
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
        marginVertical: 18,
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