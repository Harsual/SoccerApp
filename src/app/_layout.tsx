import { Stack } from "expo-router";
import { Colors } from "@/src/constants/Colors";
export default function RootLayout() {
  return (
    <Stack>
      <Stack.Screen name="index" />
      <Stack.Screen
        name="screens/IntroScreen"
        //options={{ headerShown: false }}
      />
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
      <Stack.Screen
        name="screens/SignUpScreen"
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="screens/VerificationScreen"
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="screens/SuccessScreen"
        options={{ headerShown: false }}
      />

      <Stack.Screen
        name="screens/ForgotPasswordScreen"
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="screens/ResetPasswordScreen"
        options={{ headerShown: false }}
      />

      <Stack.Screen
        name="screens/CreateProfileScreen"
        //options={{ headerShown: false }}
      />

      <Stack.Screen
        name="screens/FieldScreen"
        //options={{ headerShown: false }}
      />

      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
    </Stack>
  );
}
