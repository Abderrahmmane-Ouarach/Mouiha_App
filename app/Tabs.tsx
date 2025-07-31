import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import GamesNavigation from './games/navigation';
import HomeScreen from './home/index';
import QuizNavigator from './quizz/navigation'
import StoriesScreen from './stories/index';
import VideosNavigation from './videos/navigation';

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
      
          
      
      <Tab.Screen name="Stories" component={StoriesScreen} options={{
          tabBarLabel: "قصص",
          tabBarLabelStyle: {
            fontFamily: "Tajawal-Bold", // your custom font
            // color: "#007acc", // you can also set color here
          },
        }}/>
        <Tab.Screen name="Games" component={GamesNavigation} options={{
          tabBarLabel: "ألعاب",
          tabBarLabelStyle: {
            fontFamily: "Tajawal-Bold", // your custom font
            // color: "#007acc", // you can also set color here
          },
        }}/>
        <Tab.Screen name="Quiz" component={QuizNavigator} options={{
            tabBarLabel: "أسئلة",
            tabBarLabelStyle: {
              fontFamily: "Tajawal-Bold", // your custom font
            //   color: "#007acc", // you can also set color here
            },
          }}/>
      <Tab.Screen name="Videos" component={VideosNavigation} options={{
          tabBarLabel: "فيديوهات",
          tabBarLabelStyle: {
            fontFamily: "Tajawal-Bold", // your custom font
            // color: "#007acc", // you can also set color here
          },
        }}/>
        <Tab.Screen
      name="Home"
      component={HomeScreen}
      options={{
        tabBarLabel: "الرئيسية",
        tabBarLabelStyle: {
          fontFamily: "Tajawal-Bold", // your custom font
        //   color: "#007acc", // you can also set color here
        },
        }}
        />
      
    </Tab.Navigator>
  );
}
