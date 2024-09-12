// app/screens/LoginScreen.tsx
import { ThemedText } from "@/src/components/ThemedText";
import { ThemedView } from "@/src/components/ThemedView";
import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Pressable,
} from "react-native";
import Button from "@/src/components/Button";
import { Link, router } from "expo-router";
import { ROUTES } from "../navigationConstants";
import CountryCodeDropdownPicker from "react-native-dropdown-country-picker";
//import PhoneInput from "react-phone-input-2";
//import "react-phone-input-2/lib/style.css";
import PhoneInput from "@/src/components/PhoneInput";
import PasswordInput from "@/src/components/PasswordInput";
import { ExternalLink } from "@/src/components/ExternalLink";
import axios from "axios";
import * as SecureStore from "expo-secure-store";
import Ionicons from "@expo/vector-icons/Ionicons";
import BackIcon from "@/src/assets/icons/back.svg";
import Constants from "expo-constants";

export default function ForgotPasswordScreen() {
  const [email, setEmail] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState("");
  const HOST = Constants.expoConfig?.extra?.HOST;

  const sendResetEmail = async () => {
    if (!email) {
      setErrorMessage("Please fill in all fields.");
    } else if (!email.includes("@")) {
      setErrorMessage("Please Enter a valid email");
    } else {
      setErrorMessage("");
      try {
        // Send sign-up request
        const response = await axios.post(`http://${HOST}:4000/sendReset`, {
          email: email,
        });

        const { message } = response.data;
        // Store the JWT securely
        //await SecureStore.setItemAsync("jwt", token);
        console.log(message);
        // Redirect to another screen or update the UI
        //router.push(ROUTES.VERIFY);
        router.push({
          pathname: ROUTES.RESET,
          params: { email: email },
        });
        //console.log("Signed up successfully");
      } catch (err) {
        //setError('Sign-up failed');
        console.log("email sending failed");
      }
    }
  };

  return (
    <ThemedView style={styles.container}>
      <Pressable
        onPress={() => {
          router.back();
        }}
        style={{ marginTop: 50, alignSelf: "flex-start" }}
      >
        <BackIcon></BackIcon>
      </Pressable>

      <Text style={styles.title}>Forgot Password</Text>

      <ThemedText type="description" style={styles.description}>
        Please enter your email below to receive your password reset
        instructions.
      </ThemedText>

      <View style={styles.inputContainer}>
        <ThemedText type="description" style={styles.inputDescription}>
          Email address
        </ThemedText>
        <TextInput
          style={styles.input}
          //placeholder="Email"
          value={email ?? ""}
          onChangeText={setEmail}
        ></TextInput>
      </View>
      <Text style={styles.error}>{errorMessage}</Text>

      <Button
        title="Continue"
        onPress={sendResetEmail}
        style={{ width: "90%" }}
      />
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    //justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },

  account: {
    alignSelf: "flex-start",
    marginBottom: 47,
    flexDirection: "row",
  },

  description: {
    marginVertical: 40,
  },

  error: {
    marginVertical: 20,
    color: "red",
  },

  inputContainer: {
    //width: "90%",
    //margin: 20,
    width: "100%",
    backgroundColor: "white",
    paddingBottom: 20,
    borderRadius: 20,
    zIndex: 1,
    paddingHorizontal: 20,
    //marginBottom: 20,
    //borderWidth: 1,
    //borderColor: "black",
  },
  title: {
    alignSelf: "flex-start",
    fontSize: 24,
    marginTop: 100,
    //marginBottom: 12,
  },
  input: {
    height: 35,

    zIndex: 2,

    borderColor: "#F0F0F0",

    borderBottomWidth: 2,
    color: "#273240",

    backgroundColor: "#fff",
  },

  iconContainer: {
    //padding: 5,
    zIndex: 20,
  },

  inputDescription: {
    paddingTop: 20,
    //paddingLeft: 20,
    //color: "#898F95",
  },

  passwordContainer: {
    flexDirection: "row",
    //justifyContent: "center",
  },

  link: { color: "#0EAD69", fontWeight: 600 },

  terms: {
    flexDirection: "row",
    paddingBottom: 20,
  },
});

//export default LoginScreen;
