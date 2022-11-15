import { View, TextInput, Image, Text, Button, StyleSheet, TouchableOpacity, KeyboardAvoidingView } from "react-native";
import AuthPage from "../layouts/AuthPage";
import { Formik, Field } from "formik";
import theme from "../config/theme";
import auth from "@react-native-firebase/auth"

function login({email, password}) {
    auth().signInWithEmailAndPassword(email, password).then((res) => console.log(res));
}

export function SignInScreen() {
    return (
        <AuthPage>
            <View style={styles.container}>
                <Image source={require("../assets/logo.png")} style={{width: "100%", height: 400}} resizeMode="contain" />
                <Text style={styles.title}>Sign In</Text>
                <Formik
                    initialValues={{ email: '', password: '' }}
                    onSubmit={login}
                >
                    {({ handleChange, handleBlur, handleSubmit, values }) => (
                        <>
                        <KeyboardAvoidingView behavior="position">
                            <TextInput
                                name="email"
                                placeholder="Email Address"
                                onChangeText={handleChange('email')}
                                onBlur={handleBlur('email')}
                                value={values.email}
                                style={styles.input}
                                keyboardType="email-address"
                            />
                            <TextInput
                                name="password"
                                placeholder="Password"
                                onChangeText={handleChange('password')}
                                onBlur={handleBlur('password')}
                                value={values.password}
                                style={styles.input}
                                secureTextEntry
                            />
                            </KeyboardAvoidingView>
                            <TouchableOpacity onPress={handleSubmit} style={styles.submit}>
                                <Text style={{fontSize: 20}}>Sign In</Text>
                            </TouchableOpacity>
                        </>
                    )}
                </Formik>
                <View style={styles.bottomRow}>
                        <TouchableOpacity><Text style={{fontSize: 22, fontWeight: "bold"}}>Forgot Password</Text></TouchableOpacity>
                    <TouchableOpacity><Text style={{ fontSize: 22, fontWeight: "bold" }}>Sign Up</Text></TouchableOpacity>
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
        marginBottom: 12
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
        flexDirection: "row",
        width: "100%",
        justifyContent: "space-between",
        paddingHorizontal: 18,
        marginTop: 32
    }
})