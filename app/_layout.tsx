import { Tabs } from 'expo-router';

export default function Layout() {
  return (
    <Tabs>
      <Tabs.Screen name="home" options={{ title: 'Home' }} />
      <Tabs.Screen name="quiz" options={{ title: 'Quiz' }} />
      <Tabs.Screen name="games" options={{ title: 'Games' }} />
      <Tabs.Screen name="stories" options={{ title: 'Stories' }} />
      <Tabs.Screen name="videos" options={{ title: 'Videos' }} />
    </Tabs>
  );
}