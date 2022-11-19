import { createNativeStackNavigator } from "@react-navigation/native-stack";
import ClientHomeScreen from "../screens/ClientStack/ClientHomeScreen";

const Stack = createNativeStackNavigator();

export default function ClientStack() {
    return (
        <Stack.Navigator initialRouteName="ClientHomeScreen" screenOptions={{headerShown: false}}>
            <Stack.Screen name="ClientHomeScreen" component={ClientHomeScreen} />
        </Stack.Navigator>
    )
}