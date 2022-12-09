import ClientHomeScreen from "../screens/ClientStack/ClientHomeScreen";
import FindScreen from "../screens/ClientStack/FindScreen";
import MessagesScreen from "../screens/ClientStack/MessagesScreen";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import TabBar from "./TabBar";
import ActivityScreen from "../screens/ClientStack/ActivityScreen";
import ShiftDetailScreen from "../screens/ClientStack/ShiftDetailScreen";
import ContactScreen from "../screens/AuthStack/ContactScreen";
import BusinessProfileScreen from "../screens/ClientStack/BusinessProfileScreen";

const Tab = createBottomTabNavigator();

export default function ClientStack() {
  return (
    <Tab.Navigator
      tabBar={(props) => <TabBar {...props} />}
      initialRouteName="Home"
      screenOptions={{ headerShown: false }}
    >
      <Tab.Screen name="Home" component={ClientHomeScreen} />
      <Tab.Screen name="Find" component={FindScreen} />
      <Tab.Screen name="Activity" component={ActivityScreen} />
      <Tab.Screen
        name="Messages"
        component={MessagesScreen}
        screenOptions={{ tabBarIconStyle: { display: "none" } }}
      />
      <Tab.Screen
        name="ShiftDetail"
        component={ShiftDetailScreen}
        screenOptions={{ tabBarIconStyle: { display: "none" } }}
      />
      <Tab.Screen
        name="Contact"
        component={ContactScreen}
        screenOptions={{ tabBarIconStyle: { display: "none" } }}
      />
      <Tab.Screen
        name="BusinessProfile"
        component={BusinessProfileScreen}
        screenOptions={{tabBarIconStyle: { display: "none" }}}
      />
    </Tab.Navigator>
  );
}
