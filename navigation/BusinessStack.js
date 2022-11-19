import { createNativeStackNavigator } from "@react-navigation/native-stack";
import BusinessHomeScreen from "../screens/BusinessStack/BusinessHomeScreen";

const Stack = createNativeStackNavigator();

export default function BusinessStack() {
    return (
        <Stack.Navigator initialRouteName="BusinessHomeScreen" screenOptions={{headerShown: false}}>
            <Stack.Screen name="BusinessHomeScreen" component={BusinessHomeScreen} />
        </Stack.Navigator>
    )
}