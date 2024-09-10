// app/screens/LoginScreen.tsx
import React, { useEffect, useState } from "react";
import { View, Text, TextInput, StyleSheet } from "react-native";
import Button from "@/src/components/Button";
import { Link, router } from "expo-router";
import { Colors } from "@/src/constants/Colors";
import { ThemedView } from "@/src/components/ThemedView";
import { ThemedText } from "@/src/components/ThemedText";
import Logo from "@/src/assets/icons/LogoIcon.svg";
import { ROUTES } from "../navigationConstants";
import * as SecureStore from "expo-secure-store";

export default function LogoSplashScreen() {
  const firstSignIn = SecureStore.getItem("firstSignIn");

  useEffect(() => {
    const timer = setTimeout(() => {
      if (firstSignIn) {
        router.replace(ROUTES.LOGIN);
      } else {
        router.replace(ROUTES.ONBOARDING);
      }
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <ThemedView style={styles.container}>
      <ThemedView style={styles.logoWrapper}>
        {/* <ThemedText style={styles.logo}>
          Start your footballing journey today!
        </ThemedText> */}
        <Logo style={styles.logoIcon}></Logo>
      </ThemedView>
      <ThemedText type="defaultSemiBold" style={styles.logoName}>
        Clickora
      </ThemedText>
    </ThemedView>
  );
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
