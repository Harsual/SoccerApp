// app/screens/LoginScreen.tsx
import React, { useEffect, useState } from "react";
import { View, Text, TextInput, StyleSheet } from "react-native";
import Button from "@/src/components/Button";
import { Link, router } from "expo-router";
import { Colors } from "@/src/constants/Colors";
import { ThemedView } from "@/src/components/ThemedView";
import { ThemedText } from "@/src/components/ThemedText";
//import SplashIcon1 from "@/src/assets/LogoIcon.svg";
//import SplashIcon2 from "@/src/assets/LogoIcon.svg";
//import SplashIcon3 from "@/src/assets/LogoIcon.svg";
import { ROUTES } from "../navigationConstants";
import AppIntroSlider from "react-native-app-intro-slider";

export default function OnboardingScreen() {
  const [showHomePage, setShowHomePage] = useState(false);
  const slides = [
    {
      id: 1,
      title: "Discover Best Places",
      description: "s",
      image: "icon1",
    },
    {
      id: 2,
      title: "Discover Best Places",
      description: "s",
      image: "icon2",
    },
    {
      id: 3,
      title: "Discover Best Places",
      description: "s",
      image: "icon3",
    },
  ];

  if (!showHomePage) {
    return (
      <AppIntroSlider
        data={slides}
        renderItem={({ item }) => {
          return (
            <ThemedView>
              {/*<SplashIcon1></SplashIcon1>*/}
              <ThemedText>{item.title}</ThemedText>
              <ThemedText>{item.description}</ThemedText>
            </ThemedView>
          );
        }}
      />
    );
  }

  //return <View></View>;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "flex-start",
    alignItems: "center",
    padding: 16,
  },

  logoWrapper: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },

  logoIcon: {
    marginBottom: 100,
  },

  logoName: {
    color: "#0EAD69",
    textAlign: "center",
    //fontFamily: "Poppins",
    //lineHeight: 'normal',
    marginBottom: 40,
    fontSize: 40,
    //fontStyle: 'normal',
    //fontWeight: 600,
    //lineHeight: 'normal',
  },
});
