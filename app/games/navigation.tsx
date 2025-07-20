import { createNativeStackNavigator } from '@react-navigation/native-stack';
import GameHome from './index'
import FlipMatcher from './game'

const Stack = createNativeStackNavigator();

export default function GamesNavigation() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="GameHome" component={GameHome} />
      <Stack.Screen name="FlipMacher" component={FlipMatcher} />
    </Stack.Navigator>
  );
}