import ClientHomeScreen from "../screens/ClientStack/ClientHomeScreen";
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import TabBar from "./TabBar";

const Tab = createBottomTabNavigator();

export default function ClientStack() {
    return (
        <Tab.Navigator tabBar={props => <TabBar {...props} />} initialRouteName="ClientHomeScreen" screenOptions={{headerShown: false}}>
            <Tab.Screen name="Home" component={ClientHomeScreen} />
            <Tab.Screen name="Find" component={ClientHomeScreen} />
            <Tab.Screen name="Activity" component={ClientHomeScreen} />
        </Tab.Navigator>
    )
}