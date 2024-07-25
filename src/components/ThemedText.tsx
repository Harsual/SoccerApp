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
  type?:
    | "default"
    | "title"
    | "defaultSemiBold"
    | "subtitle"
    | "description"
    | "link";
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
  let color;
  if (type === "description")
    color = useThemeColor(
      { light: lightColor, dark: darkColor },
      "description"
    );
  else color = useThemeColor({ light: lightColor, dark: darkColor }, "text");

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
          type === "description" ? styles.description : undefined,
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
    fontSize: 24,
    //fontWeight: "bold",
    //lineHeight: 32,
    fontWeight: "600",
    fontFamily: "Poppins_700Regular",
  },
  subtitle: {
    fontSize: 16,
    //fontWeight: "bold",
    fontWeight: "200",
    fontFamily: "Poppins_700Regular",
  },
  description: {
    fontSize: 13,
    lineHeight: 16,
    fontStyle: "normal",
    fontWeight: 400,
  },
  link: {
    lineHeight: 30,
    fontSize: 16,
    fontFamily: "Poppins_400Regular",
    color: "#0a7ea4",
  },
});
