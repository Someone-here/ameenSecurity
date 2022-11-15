import { StatusBar } from 'expo-status-bar';
import RootStackNav from './navigation/RootStackNav';
import { View, Text } from "react-native";
import { AuthenticatedUserProvider } from './providers/AuthenticatedUserProvider';

export default function App() {
  return (
    <>
      <AuthenticatedUserProvider>
        <RootStackNav />
      </AuthenticatedUserProvider>
      <StatusBar style="dark" />
    </>
  );
}
