import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import TabBar from "./TabBar";
import BusinessHomeScreen from "../screens/BusinessStack/BusinessHomeScreen";
import ActivityScreen from "../screens/BusinessStack/ActivityScreen";

const Tab = createBottomTabNavigator();

export default function BusinessStack() {
  return (
    <Tab.Navigator
      tabBar={(props) => <TabBar {...props} />}
      initialRouteName="Home"
      screenOptions={{ headerShown: false }}
    >
      <Tab.Screen name="Home" component={BusinessHomeScreen} />
      <Tab.Screen name="Activity" component={ActivityScreen} />
    </Tab.Navigator>
  );
}
