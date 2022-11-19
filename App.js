import { StatusBar } from 'expo-status-bar';
import RootStackNav from './navigation/RootStackNav';
import { AuthenticatedUserProvider } from './providers/AuthenticatedUserProvider';
import { UserDataProvider } from './providers/UserDataProvider';

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
