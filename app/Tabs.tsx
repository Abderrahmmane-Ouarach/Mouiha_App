import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Text, TouchableOpacity, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import GamesNavigation from "./games/navigation";
import HomeScreen from "./home/index";
import QuizNavigator from "./quizz/navigation";
import StoriesNavigator from "./stories/navigation";
import VideosNavigation from "./videos/navigation";

const Tab = createBottomTabNavigator();

export default function AppTabs() {
  const insets = useSafeAreaInsets();

  return (
    <View style={{ flex: 1 }}>
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
          tabBarStyle: {
            flexDirection: "row",
            backgroundColor: '#000', 
          },
        })}
        tabBar={(props) => {
          const { state, descriptors, navigation } = props;

          const reorderedRoutes = [
            state.routes.find((route) => route.name === "Stories"),
            state.routes.find((route) => route.name === "Games"),
            state.routes.find((route) => route.name === "Quiz"),
            state.routes.find((route) => route.name === "Videos"),
            state.routes.find((route) => route.name === "Home"),
          ].filter(
            (route): route is NonNullable<typeof route> => route !== undefined
          );

          return (
            <View
              style={{
                flexDirection: "row",
                backgroundColor: "#fff",
                paddingTop: 6,
                paddingBottom: insets.bottom ,
                borderTopWidth: 1,
                borderTopColor: "#e0e0e0",
                elevation: 8,
                shadowColor: "#000",
                shadowOffset: { width: 0, height: -2 },
                shadowOpacity: 0.1,
                shadowRadius: 4,
              }}
            >
              {reorderedRoutes.map((route, index) => {
                const { options } = descriptors[route.key];
                const isFocused =
                  state.index ===
                  state.routes.findIndex((r) => r.key === route.key);

                const onPress = () => {
                  const event = navigation.emit({
                    type: "tabPress",
                    target: route.key,
                    canPreventDefault: true,
                  });

                  if (!isFocused && !event.defaultPrevented) {
                    navigation.navigate(route.name);
                  }
                };

                return (
                  <TouchableOpacity
                    key={route.key}
                    style={{ flex: 1, alignItems: "center" }}
                    onPress={onPress}
                  >
                    <MaterialIcons
                      name={
                        route.name === "Home"
                          ? "home"
                          : route.name === "Quiz"
                          ? "quiz"
                          : route.name === "Games"
                          ? "sports-esports"
                          : route.name === "Stories"
                          ? "menu-book"
                          : "ondemand-video"
                      }
                      size={24}
                      color={isFocused ? "#007acc" : "#888"}
                    />
                    <Text
                      style={{
                        fontFamily: "Tajawal-Bold",
                        color: isFocused ? "#007acc" : "#888",
                        fontSize: 9.5,
                        marginTop: 4,
                      }}
                    >
                      {typeof options.tabBarLabel === "string"
                        ? options.tabBarLabel
                        : route.name === "Home"
                        ? "الرئيسية"
                        : route.name === "Stories"
                        ? "قصص"
                        : route.name === "Games"
                        ? "ألعاب"
                        : route.name === "Quiz"
                        ? "أسئلة"
                        : route.name === "Videos"
                        ? "فيديوهات"
                        : route.name}
                    </Text>
                  </TouchableOpacity>
                );
              })}
            </View>
          );
        }}
      >
        <Tab.Screen
          name="Home"
          component={HomeScreen}
          options={{
            tabBarLabel: "الرئيسية",
            tabBarLabelStyle: {
              fontFamily: "Tajawal-Bold",
            },
          }}
        />
        <Tab.Screen
          name="Stories"
          component={StoriesNavigator}
          options={{
            tabBarLabel: "قصص",
            tabBarLabelStyle: {
              fontFamily: "Tajawal-Bold",
            },
          }}
        />
        <Tab.Screen
          name="Games"
          component={GamesNavigation}
          options={{
            tabBarLabel: "ألعاب",
            tabBarLabelStyle: {
              fontFamily: "Tajawal-Bold",
            },
          }}
        />
        <Tab.Screen
          name="Quiz"
          component={QuizNavigator}
          options={{
            tabBarLabel: "أسئلة",
            tabBarLabelStyle: {
              fontFamily: "Tajawal-Bold",
            },
          }}
        />
        <Tab.Screen
          name="Videos"
          component={VideosNavigation}
          options={{
            tabBarLabel: "فيديوهات",
            tabBarLabelStyle: {
              fontFamily: "Tajawal-Bold",
            },
          }}
        />
      </Tab.Navigator>
    </View>
  );
}
