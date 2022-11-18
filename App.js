import { StatusBar } from 'expo-status-bar';
import RootStackNav from './navigation/RootStackNav';
import { AuthenticatedUserProvider } from './providers/AuthenticatedUserProvider';
import theme from './config/theme';

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
