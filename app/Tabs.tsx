import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import GamesNavigation from './games/navigation';
import HomeScreen from './home/index';
import QuizScreen from './quiz/index';
import StoriesScreen from './stories/index';
import VideosScreen from './videos/index';

const Tab = createBottomTabNavigator();

export default function AppTabs() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarIcon: ({ focused, color, size }) => {
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
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Quiz" component={QuizScreen} />
      <Tab.Screen name="Games" component={GamesNavigation} />
      <Tab.Screen name="Stories" component={StoriesScreen} />
      <Tab.Screen name="Videos" component={VideosScreen} />
      
      
      <Tab.Screen name="Games" component={GamesNavigation} options={{
          tabBarLabel: "ألعاب",
          tabBarLabelStyle: {
            fontFamily: "Tajawal-Bold", // your custom font
            color: "#007acc", // you can also set color here
          },
        }}/>
      <Tab.Screen name="Stories" component={StoriesScreen} options={{
          tabBarLabel: "قصص",
          tabBarLabelStyle: {
            fontFamily: "Tajawal-Bold", // your custom font
            color: "#007acc", // you can also set color here
          },
        }}/>
        <Tab.Screen name="Quiz" component={QuizScreen} options={{
          tabBarLabel: "اسئلة",
          tabBarLabelStyle: {
            fontFamily: "Tajawal-Bold", // your custom font
            color: "#007acc", // you can also set color here
          },
        }}/>
      <Tab.Screen name="Videos" component={VideosScreen} options={{
          tabBarLabel: "فيديوهات",
          tabBarLabelStyle: {
            fontFamily: "Tajawal-Bold", // your custom font
            color: "#007acc", // you can also set color here
          },
        }}/>
        <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          tabBarLabel: "الرئيسية",
          tabBarLabelStyle: {
            fontFamily: "Tajawal-Bold", // your custom font
            color: "#007acc", // you can also set color here
          },
        }}
      />
      
    </Tab.Navigator>
  );
}
