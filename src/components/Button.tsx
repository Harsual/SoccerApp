import React from "react";
import { Text, StyleSheet, Pressable, View, ButtonProps } from "react-native";
import { useColorScheme } from "@/src/hooks/useColorScheme";
import { Colors } from "@/src/constants/Colors";
import { useThemeColor } from "@/src/hooks/useThemeColor";

export type NewButtonProps = ButtonProps & {
  onPress?: () => void;
  title?: string;
  bottomMargin?: number;
  style?: object;
  textStyle?: object;
};

export default function Button({
  bottomMargin,
  onPress,
  title = "button",
  style,
  textStyle,
}: NewButtonProps) {
  //const { onPress, title = 'Save' } = props;
  // return (
  //   <Pressable style={styles.button} onPress={onPress}>
  //     <Text style={styles.text}>{title}</Text>
  //   </Pressable>
  // );

  const color = useThemeColor({}, "tabIconSelected");

  if (onPress) {
    return (
      <Pressable
        onPress={onPress}
        style={[
          { backgroundColor: color, marginBottom: bottomMargin },
          styles.button,
          style,
        ]}
      >
        <Text style={[styles.text, textStyle]}>{title}</Text>
      </Pressable>
    );
  } else {
    return (
      <View
        style={[
          { backgroundColor: color, marginBottom: bottomMargin },
          styles.button,
          style,
        ]}
      >
        <Text style={[styles.text, textStyle]}>{title}</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  button: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 15,
    elevation: 3,
  },
  text: {
    fontSize: 16,
    lineHeight: 21,
    fontWeight: "bold",
    letterSpacing: 0.25,
    color: "white",
  },
});
