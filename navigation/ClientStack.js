import ClientHomeScreen from "../screens/ClientStack/ClientHomeScreen";
import FindScreen from "../screens/ClientStack/FindScreen";
import MessagesScreen from "../screens/ClientStack/MessagesScreen";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import TabBar from "./TabBar";
import ActivityScreen from "../screens/ClientStack/ActivityScreen";
import ShiftDetailScreen from "../screens/ClientStack/ShiftDetailScreen";
import ContactScreen from "../screens/AuthStack/ContactScreen";
import BusinessProfileScreen from "../screens/ClientStack/BusinessProfileScreen";
import ChatScreen from "../screens/ClientStack/ChatScreen";
import BackArrow from "../components/BackArrow";
import { useNavigation } from "@react-navigation/native";

const Tab = createBottomTabNavigator();

export default function ClientStack() {
  const navigation = useNavigation();

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
        options={{
          headerShown: true,
          headerLeft: () => (
            <BackArrow onPress={() => navigation.navigate("Home")} />
          ),
        }}
      />
      <Tab.Screen name="ShiftDetail" component={ShiftDetailScreen} />
      <Tab.Screen name="Contact" component={ContactScreen} />
      <Tab.Screen name="BusinessProfile" component={BusinessProfileScreen} />
      <Tab.Screen
        name="Chat"
        component={ChatScreen}
        options={{
          headerShown: true,
          tabBarHideOnKeyboard: true,
          headerLeft: () => (
            <BackArrow onPress={() => navigation.navigate("Messages")} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}
