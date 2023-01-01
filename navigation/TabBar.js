import { View, Text, StyleSheet, TouchableOpacity, Platform } from "react-native";
import Theme from "../config/theme";
import { useState, useEffect } from 'react';
import { Keyboard } from 'react-native';
import { FontAwesome } from "@expo/vector-icons";

const icons = {
    Home: "home",
    Find: "search",
    Activity: "list-alt",
};

const useKeyboardVisible = () => {
    const [isKeyboardVisible, setKeyboardVisible] = useState(false);

    useEffect(() => {
        const keyboardDidShowListener = Keyboard.addListener(
            'keyboardDidShow',
            () => {
                setKeyboardVisible(true);
            },
        );
        const keyboardDidHideListener = Keyboard.addListener(
            'keyboardDidHide',
            () => {
                setKeyboardVisible(false);
            },
        );

        return () => {
            keyboardDidHideListener.remove();
            keyboardDidShowListener.remove();
        };
    }, []);

    return isKeyboardVisible;
};

export default function NavBar({ state, descriptors, navigation }) {
    
    const visible = useKeyboardVisible();


    if (visible) return null;

    return (
        <View style={styles.container}>
            {state.routes.map((route, index) => {
                const { options } = descriptors[route.key];
                const label =
                    options.tabBarLabel !== undefined
                        ? options.tabBarLabel
                        : options.title !== undefined
                            ? options.title
                            : route.name;

                const isFocused = state.index === index;

                const onPress = () => {
                    const event = navigation.emit({
                        type: "tabPress",
                        target: route.key,
                        canPreventDefault: true,
                    });

                    if (!isFocused && !event.defaultPrevented) {
                        // The `merge: true` option makes sure that the params inside the tab screen are preserved
                        navigation.navigate({ name: route.name, merge: true });
                    }
                };

                const onLongPress = () => {
                    navigation.emit({
                        type: "tabLongPress",
                        target: route.key,
                    });
                };

                return icons[route.name] ? (
                    <TouchableOpacity
                        key={index}
                        accessibilityRole="button"
                        accessibilityState={isFocused ? { selected: true } : {}}
                        accessibilityLabel={options.tabBarAccessibilityLabel}
                        testID={options.tabBarTestID}
                        onPress={onPress}
                        onLongPress={onLongPress}
                        style={styles.btn}
                    >
                        <View
                            style={[
                                styles.link,
                                isFocused
                                    ? { backgroundColor: Theme.colors.red, borderRadius: 50 }
                                    : null,
                            ]}
                        >
                            <FontAwesome
                                name={icons[label]}
                                size={24}
                                color={isFocused ? "white" : "black"}
                            />
                        </View>
                        <Text style={styles.text}>{label}</Text>
                    </TouchableOpacity>
                ) : null;
            })}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        width: "100%",
        height: "8%",
        paddingTop: 10,
        backgroundColor: Theme.colors.background,
        flexDirection: "row",
        alignItems: "flex-end",
        justifyContent: "space-around",
        elevation: 20,
        bottom: Platform.OS === "ios" ? 20 : 0,
    },
    btn: {
        flex: 1,
        height: "100%",
        alignItems: "center",
        justifyContent: "center",
    },
    text: {
        fontSize: 14,
        fontWeight: "600"
    },
    link: {
        borderRadius: 50,
        height: 36,
        width: 66,
        marginBottom: 2,
        alignItems: "center",
        justifyContent: "center",
    },
});