import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LandingScreen from './index'; // This is your app/index.tsx
import AppTabs from './Tabs'; // The tab navigator

const Stack = createNativeStackNavigator();

export default function RootLayout() {
  return (
    <Stack.Navigator initialRouteName="Landing" screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Landing" component={LandingScreen} />
      <Stack.Screen name="Main" component={AppTabs} />
    </Stack.Navigator>
  );
}