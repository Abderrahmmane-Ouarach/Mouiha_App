// import { Stack } from "expo-router";

// export default function RootLayout() {
//   return <Stack />;
// }

import { Stack } from 'expo-router';

export default function Layout() {
  return (
    <Stack
      screenOptions={{
        headerShown: false, // 👈 hides the header for all screens
      }}
    />
  );
}

