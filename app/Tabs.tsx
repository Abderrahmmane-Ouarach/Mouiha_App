import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import GamesScreen from "./games/index";
import HomeScreen from "./home/index";
import QuizScreen from "./quiz/index";
import StoriesScreen from "./stories/index";
import VideosScreen from "./videos";

const Tab = createBottomTabNavigator();

export default function AppTabs() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarIcon: ({ color, size }) => {
          let iconName;
          if (route.name === "Home") iconName = "home";
          else if (route.name === "Quiz") iconName = "quiz";
          else if (route.name === "Games") iconName = "sports-esports";
          else if (route.name === "Stories") iconName = "menu-book";
          else iconName = "ondemand-video";
          return <MaterialIcons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: "#007acc",
        tabBarInactiveTintColor: "#888",
      })}
    >
      <Tab.Screen name="ال" component={HomeScreen} />
      <Tab.Screen name="Quiz" component={QuizScreen} />
      <Tab.Screen name="Games" component={GamesScreen} />
      <Tab.Screen name="Stories" component={StoriesScreen} />
      <Tab.Screen name="Videos" component={VideosScreen} />
    </Tab.Navigator>
  );
}
