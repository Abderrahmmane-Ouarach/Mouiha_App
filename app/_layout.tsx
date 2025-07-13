import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from './home/index'
import QuizScreen from './quiz/index'
import GamesScreen from './games/index'
import StoriesScreen from './stories/index'
import VideosScreen from './videos/index'

const Tab = createBottomTabNavigator();

export default function AppTabs() {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Quiz" component={QuizScreen} />
      <Tab.Screen name="Games" component={GamesScreen} />
      <Tab.Screen name="Stories" component={StoriesScreen} />
      <Tab.Screen name="Videos" component={VideosScreen} />
    </Tab.Navigator>
  );
}
