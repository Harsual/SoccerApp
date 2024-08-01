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
} from "react-native";
import Button from "@/src/components/Button";
import { Link, router, useLocalSearchParams } from "expo-router";
import { ROUTES } from "../navigationConstants";
import CountryCodeDropdownPicker from "react-native-dropdown-country-picker";
//import PhoneInput from "react-phone-input-2";
//import "react-phone-input-2/lib/style.css";
import PhoneInput from "@/src/components/PhoneInput";
import PasswordInput from "@/src/components/PasswordInput";
import { ExternalLink } from "@/src/components/ExternalLink";
import axios from "axios";
import * as SecureStore from "expo-secure-store";

export default function ResetPasswordScreen() {
  const [code, setCode] = useState<string | undefined>();
  const [newPassword, setNewPassword] = useState<string | undefined>();
  const [confirmPassword, setConfirmPassword] = useState<string | undefined>();
  const [errorMessage, setErrorMessage] = useState("");
  const { email } = useLocalSearchParams();

  const handlePasswordReset = async () => {
    if (!newPassword || !confirmPassword || !code) {
      setErrorMessage("Please fill in all fields.");
    } else if (newPassword !== confirmPassword) {
      setErrorMessage("passwords must match.");
    } else {
      setErrorMessage("");
      try {
        // Send sign-up request
        const response = await axios.post(
          "http://localhost:4000/passwordReset",
          {
            email: email,
            newPassword: newPassword,
            code: code,
          }
        );

        const { message } = response.data;
        // Store the JWT securely
        //await SecureStore.setItemAsync("jwt", token);
        console.log(message);
        // Redirect to another screen or update the UI
        //router.push(ROUTES.VERIFY);
        router.push({
          pathname: ROUTES.SUCCESS,
          // params: { email: email },
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
      <Text style={styles.title}>Reset Password</Text>

      <ThemedText type="description" style={styles.description}>
        Please enter the code we sent along with the new password and confirm
        password
      </ThemedText>

      <View style={styles.inputContainer}>
        <ThemedText type="description" style={styles.inputDescription}>
          Reset Code
        </ThemedText>
        <TextInput
          style={styles.input}
          value={code}
          onChangeText={setCode}
          //placeholder="Email"
          //value={email ?? ""}
          //onChangeText={setEmail}
        ></TextInput>
        <ThemedText type="description" style={styles.inputDescription}>
          New Password
        </ThemedText>
        <PasswordInput
          password={newPassword}
          setPassword={setNewPassword}
          textContextType="newPassword"
          //style={styles.input}
          //placeholder="Email"
          //value={email ?? ""}
          //onChangeText={setEmail}
        ></PasswordInput>
        <ThemedText type="description" style={styles.inputDescription}>
          Confirm Password
        </ThemedText>
        <PasswordInput
          //style={styles.input}
          password={confirmPassword}
          setPassword={setConfirmPassword}
          textContextType="none"
          //placeholder="Email"
          //value={email ?? ""}
          //onChangeText={setEmail}
        ></PasswordInput>
      </View>

      <Text style={styles.error}>{errorMessage}</Text>

      <Button
        title="Reset Password"
        onPress={handlePasswordReset}
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
