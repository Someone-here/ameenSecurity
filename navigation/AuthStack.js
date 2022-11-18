import { createNativeStackNavigator } from '@react-navigation/native-stack';
import SigninScreen from "../screens/AuthStack/SigninScreen";
import SignupScreen from '../screens/AuthStack/SignupScreen';
import BusinessSignupScreen from '../screens/AuthStack/BusinessSignupScreen';
import GuardSignupScreen from '../screens/AuthStack/GuardSignupScreen';
import StewardSignupScreen from '../screens/AuthStack/StewardSignupScreen';
import ForgotPasswordScreen from "../screens/AuthStack/ForgotPasswordScreen";
import ContactScreen from '../screens/AuthStack/ContactScreen';
import ThankYouScreen from '../screens/AuthStack/ThankYouScreen';

const StackNav = createNativeStackNavigator();

export default function AuthStack() {
    return (
        <StackNav.Navigator initialRouteName="SigninScreen" screenOptions={{ headerShown: false }}>
            <StackNav.Screen name="SigninScreen" component={SigninScreen} />
            <StackNav.Screen name="SignupScreen" component={SignupScreen} />
            <StackNav.Screen name="BusinessSignupScreen" component={BusinessSignupScreen} />
            <StackNav.Screen name="GuardSignupScreen" component={GuardSignupScreen} />
            <StackNav.Screen name="StewardSignupScreen" component={StewardSignupScreen} />
            <StackNav.Screen name="ForgotPasswordScreen" component={ForgotPasswordScreen} />
            <StackNav.Screen name="ContactScreen" component={ContactScreen} />
            <StackNav.Screen name="ThankYouScreen" component={ThankYouScreen} />
        </StackNav.Navigator>
    )
}