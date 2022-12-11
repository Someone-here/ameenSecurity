import { StatusBar } from 'expo-status-bar';
import RootStackNav from './navigation/RootStackNav';
import { AuthenticatedUserProvider } from './providers/AuthenticatedUserProvider';
import { UserDataProvider } from './providers/UserDataProvider';
import { LogBox } from 'react-native';

LogBox.ignoreLogs(["Non-serializable values were found in the navigation state"])

export default function App() {
  return (
    <>
      <AuthenticatedUserProvider>
        <UserDataProvider>
          <RootStackNav />
        </UserDataProvider>
      </AuthenticatedUserProvider>
      <StatusBar style="dark" />
    </>
  );
}
