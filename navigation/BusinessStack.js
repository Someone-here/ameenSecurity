import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import TabBar from "./TabBar";
import BusinessHomeScreen from "../screens/BusinessStack/BusinessHomeScreen";
import ActivityScreen from "../screens/BusinessStack/ActivityScreen";
import ShiftDetailScreen from "../screens/BusinessStack/ShiftDetailScreen";
import MessagesScreen from "../screens/BusinessStack/MessagesScreen";
import BackArrow from "../components/BackArrow";
import { useNavigation } from "@react-navigation/native";
import ChatScreen from "../screens/BusinessStack/ChatScreen";
import ContactScreen from "../screens/AuthStack/ContactScreen";
import AddShiftScreen from "../screens/BusinessStack/AddShiftScreen";
import ApplicantsScreen from "../screens/BusinessStack/ApplicantsScreen";
import ApplicantReviewScreen from "../screens/BusinessStack/ApplicantReviewScreen";
import SelectedScreen from "../screens/BusinessStack/SelectedScreen";
import SelectedReviewScreen from "../screens/BusinessStack/SelectedReviewScreen";

const Tab = createBottomTabNavigator();

export default function BusinessStack() {
  const navigation = useNavigation();

  return (
    <Tab.Navigator
      tabBar={(props) => <TabBar {...props} />}
      initialRouteName="Home"
      screenOptions={{ headerShown: false }}
    >
      <Tab.Screen name="Home" component={BusinessHomeScreen} />
      <Tab.Screen name="Activity" component={ActivityScreen} />
      <Tab.Screen
        name="ShiftDetail"
        component={ShiftDetailScreen}
        options={{ tabBarIconStyle: { display: "none" } }}
      />
      <Tab.Screen
        name="ApplicantReview"
        component={ApplicantReviewScreen}
        options={{ tabBarIconStyle: { display: "none" } }}
      />
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
      <Tab.Screen name="Selected" component={SelectedScreen} options={{ tabBarIconStyle: { display: "none" } }} />
      <Tab.Screen name="Applicants" component={ApplicantsScreen} options={{ tabBarIconStyle: { display: "none" } }} />
      <Tab.Screen name="AddShift" component={AddShiftScreen} />
      <Tab.Screen name="SelectedReview" component={SelectedReviewScreen} options={{ tabBarIconStyle: { display: "none" } }} />
      <Tab.Screen name="Contact" component={ContactScreen} />
      <Tab.Screen
        name="Chat"
        component={ChatScreen}
        options={{
          headerShown: true,
          headerLeft: () => (
            <BackArrow onPress={() => navigation.navigate("Messages")} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}
