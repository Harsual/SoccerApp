// app/screens/LoginScreen.tsx
import { ThemedText } from "@/src/components/ThemedText";
import { ThemedView } from "@/src/components/ThemedView";
import React, { useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import Button from "@/src/components/Button";
import { Link, router, useLocalSearchParams } from "expo-router";
import PhoneInput from "@/src/components/PhoneInput";
import PasswordInput from "@/src/components/PasswordInput";
import { ExternalLink } from "@/src/components/ExternalLink";
import { ROUTES } from "../navigationConstants";
import axios from "axios";
import * as SecureStore from "expo-secure-store";
import VerifyInput from "@/src/components/VerifyInput";
import SuccessIcon from "@/src/assets/icons/Success.svg";

export default function SuccessScreen() {
  //const [phone, setPhone] = React.useState("");

  //const router = useRouter();

  //   const handleVerify = async () => {
  //     const codeVerify = code.join("");
  //     console.log(codeVerify.length);
  //     if (codeVerify.length < 4) {
  //       setErrorMessage("Please fill all fields");
  //     } else {
  //       setErrorMessage("");
  //       console.log("handleVerify");
  //       try {
  //         // Send sign-up request
  //         const response = await axios.post("http://localhost:4000/verify", {
  //           code: codeVerify,
  //           email: email,
  //         });
  //         //const { token } = response.data;
  //         // Store the JWT securely
  //         //await SecureStore.setItemAsync("jwt", token);
  //         // Redirect to another screen or update the UI
  //         console.log("Verified successfully");
  //       } catch (err) {
  //         //setError('Sign-up failed');
  //         console.log("Verification failed");
  //       }
  //     }
  //     // if (!numberInfo || !email || !password) {
  //     //   setErrorMessage("Please fill in all fields.");
  //     // } else if (!email.includes("@")) {
  //     //   setErrorMessage("Please Enter a valid email");
  //     // } else {
  //     //   setErrorMessage("");
  //     //   try {
  //     //     // Send sign-up request
  //     //     const response = await axios.post("http://localhost:4000/signup", {
  //     //       numberInfo: numberInfo,
  //     //       email: email,
  //     //       password: password,
  //     //     });
  //     //     const { token } = response.data;
  //     //     // Store the JWT securely
  //     //     await SecureStore.setItemAsync("jwt", token);
  //     //     // Redirect to another screen or update the UI
  //     //     console.log("Signed up successfully");
  //     //   } catch (err) {
  //     //     //setError('Sign-up failed');
  //     //     console.log("signup failed");
  //     //   }
  //     // }
  //   };

  return (
    <ThemedView style={styles.container}>
      <SuccessIcon></SuccessIcon>

      <Text style={styles.title}>Congrats!</Text>

      <ThemedText type="description" style={styles.inputDescription}>
        your account has been successfully created
      </ThemedText>

      {/* <VerificationInput></VerificationInput> */}

      <Button
        title="Continue"
        onPress={() => router.replace(ROUTES.LOGIN)}
        style={{ width: "90%" }}
      />

      {/* <View style={{ flexDirection: "row", alignItems: "center" }}>
          <ThemedText type="description">SignUp as</ThemedText>
          <Button title="Referee" style={{ backgroundColor: "grey" }}></Button>
          <Button title="Coach"></Button>
        </View> */}
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },

  account: {
    alignSelf: "flex-start",
    marginBottom: 47,
    flexDirection: "row",
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
    //borderWidth: 1,
    //borderColor: "black",
  },
  title: {
    //alignSelf: "flex-start",
    fontSize: 24,
    marginTop: 30,
    marginBottom: 26,
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
    //color: "#898F95",

    marginBottom: 70,
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
