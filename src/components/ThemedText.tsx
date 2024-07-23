import { Text, type TextProps, StyleSheet, View } from "react-native";

import { useThemeColor } from "@/src/hooks/useThemeColor";

import { useFonts } from "expo-font";
import {
  Poppins_400Regular,
  Poppins_700Bold,
} from "@expo-google-fonts/poppins";

export type ThemedTextProps = TextProps & {
  lightColor?: string;
  darkColor?: string;
  type?: "default" | "title" | "defaultSemiBold" | "subtitle" | "link";
};

export function ThemedText({
  style,
  lightColor,
  darkColor,
  type = "default",
  ...rest
}: ThemedTextProps) {
  const [fontsLoaded] = useFonts({
    Poppins_400Regular,
    Poppins_700Bold,
  });
  const color = useThemeColor({ light: lightColor, dark: darkColor }, "text");

  if (!fontsLoaded) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Text>Loading fonts...</Text>
      </View>
    );
  } else {
    return (
      <Text
        style={[
          { color },
          type === "default" ? styles.default : undefined,
          type === "title" ? styles.title : undefined,
          type === "defaultSemiBold" ? styles.defaultSemiBold : undefined,
          type === "subtitle" ? styles.subtitle : undefined,
          type === "link" ? styles.link : undefined,
          style,
        ]}
        {...rest}
      />
    );
  }
}

const styles = StyleSheet.create({
  default: {
    fontSize: 16,
    //lineHeight: 24,
    fontFamily: "Poppins_400Regular",
  },
  defaultSemiBold: {
    fontSize: 16,
    //lineHeight: 24,
    fontWeight: "600",
    fontFamily: "Poppins_700Bold",
  },
  title: {
    fontSize: 32,
    fontWeight: "bold",
    lineHeight: 32,
    fontFamily: "Poppins_700Bold",
  },
  subtitle: {
    fontSize: 20,
    fontWeight: "bold",
    fontFamily: "Poppins_400Regular",
  },
  link: {
    lineHeight: 30,
    fontSize: 16,
    fontFamily: "Poppins_400Regular",
    color: "#0a7ea4",
  },
});
