import { Stack } from "expo-router";
import { Colors } from "@/src/constants/Colors";
export default function RootLayout() {
  return (
    <Stack>
      <Stack.Screen name="index" />
      <Stack.Screen name="screens/IntroScreen" />
      <Stack.Screen
        name="screens/LoginScreen"
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="screens/LogoSplashScreen"
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="screens/OnboardingScreen"
        options={{ headerShown: false }}
      />
    </Stack>
  );
}
