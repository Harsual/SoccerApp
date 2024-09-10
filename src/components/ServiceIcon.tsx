import React from "react";
import { ThemedText } from "./ThemedText";
import { View } from "react-native";

interface ServiceIconInputProps {
  text: string;
  iconName: string;
  iconComponent: React.ComponentType<{
    name: string;
    size?: number;
    color?: string;
  }>;
}

export default function ServiceIcon({
  iconComponent: IconComponent,
  text,
  iconName,
}: ServiceIconInputProps) {
  return (
    <View
      style={{
        flexDirection: "row",
        alignItems: "center",
        //borderWidth: 3,
        paddingHorizontal: 7,
      }}
    >
      <IconComponent name={iconName} />
      <ThemedText> {text}</ThemedText>
    </View>

    //   <IconComponent name={""}></IconComponent>
  );
}
