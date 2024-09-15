// app/screens/LoginScreen.tsx
import React, { useEffect, useState } from "react";
import { View, Text, TextInput, StyleSheet, Alert } from "react-native";
import Button from "@/src/components/Button";
import { Link, router } from "expo-router";
import { Colors } from "@/src/constants/Colors";
import { ThemedView } from "@/src/components/ThemedView";
import { ThemedText } from "@/src/components/ThemedText";
import Logo from "@/src/assets/icons/LogoIcon.svg";
import { ROUTES } from "../navigationConstants";
import * as SecureStore from "expo-secure-store";
import Constants from "expo-constants";
import axios from "axios";
import semver from "semver";

export default function LogoSplashScreen() {
  const firstSignIn = SecureStore.getItem("firstSignIn");
  const currentAppVersion = Constants.expoConfig?.version;
  console.log(currentAppVersion);
  const HOST = Constants.expoConfig?.extra?.HOST;

  const showAlert = () => {
    Alert.alert(
      "Update Required",
      "A new version of the app is available. Please update to continue using the app.",
      [
        {
          text: "Update Now",
          onPress: () => {
            // Handle the update logic, such as opening the app store
            console.log("User pressed Update Now");
          },
        },
        {
          text: "Cancel",
          onPress: () => {
            console.log("User pressed Cancel");
          },
          style: "cancel",
        },
      ],
      { cancelable: false } // Set to true if you want the alert to be dismissible by tapping outside
    );
  };

  // useEffect(() => {
  //   const timer = setTimeout(() => {
  //     if (firstSignIn) {
  //       router.replace(ROUTES.LOGIN);
  //     } else {
  //       router.replace(ROUTES.ONBOARDING);
  //     }
  //   }, 2000);

  //   return () => clearTimeout(timer);
  // }, []);

  // useEffect(() => {
  //   const checkVersionAndNavigate = async () => {
  //     try {
  //       const response = await axios.get(`http://${HOST}:4000/version`);
  //       const versionData = response.data;

  //       if (!currentAppVersion) {
  //         // Handle the case when currentAppVersion is still undefined
  //         throw new Error("App version is not defined");
  //       }
  //       const isOldVersion = semver.lt(
  //         currentAppVersion,
  //         versionData.minimumSupportedVersion
  //       );
  //       if (isOldVersion) {
  //         //showUpdatePrompt();
  //         console.log("App is old");
  //       } else {
  //         const timer = setTimeout(() => {
  //           if (firstSignIn) {
  //             router.replace(ROUTES.LOGIN);
  //           } else {
  //             router.replace(ROUTES.ONBOARDING);
  //           }
  //         }, 2000);

  //         return () => clearTimeout(timer);
  //       }
  //     } catch (error) {
  //       console.error("Version check failed", error);
  //     }
  //   };

  //   checkVersionAndNavigate();
  // }, []);

  useEffect(() => {
    const checkVersionAndNavigate = async () => {
      try {
        // Fetch version data from the backend using axios
        const response = await axios.get(`http://${HOST}:4000/version`);
        const versionData = response.data;

        // Ensure currentAppVersion is defined
        if (!currentAppVersion) {
          throw new Error("App version is not defined");
        }

        // Check if the current app version is less than the minimum supported version
        const isOldVersion = semver.lt(
          currentAppVersion,
          versionData.minimumSupportedVersion
        );

        if (isOldVersion) {
          // Prompt the user to update and block access
          console.log("App is outdated, prompting for update...");
          showAlert();

          //showUpdatePrompt(); // Replace this with actual prompt logic
        } else {
          // Proceed with navigation if the app version is up-to-date
          const timer = setTimeout(() => {
            if (firstSignIn) {
              router.replace(ROUTES.LOGIN);
            } else {
              router.replace(ROUTES.ONBOARDING);
            }
          }, 2000);

          return () => clearTimeout(timer);
        }
      } catch (error) {
        console.error("Version check failed", error);
      }
    };

    checkVersionAndNavigate();
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
