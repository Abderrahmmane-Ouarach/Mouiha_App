import { createNativeStackNavigator } from '@react-navigation/native-stack';
import FlipMatcher from './game';
import GameHome from './index';

const Stack = createNativeStackNavigator();

export default function GamesNavigation() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="GameHome" component={GameHome} />
      <Stack.Screen name="FlipMacher" component={FlipMatcher} />
    </Stack.Navigator>
  );
}