// app/screens/LoginScreen.tsx
import { ThemedText } from "@/src/components/ThemedText";
import { ThemedView } from "@/src/components/ThemedView";
import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, Pressable } from "react-native";
import Button from "@/src/components/Button";
import { Link, router, useLocalSearchParams } from "expo-router";
import PhoneInput from "@/src/components/PhoneInput";
import PasswordInput from "@/src/components/PasswordInput";
import { ExternalLink } from "@/src/components/ExternalLink";
import { ROUTES } from "../navigationConstants";
import axios from "axios";
import * as SecureStore from "expo-secure-store";
import VerifyInput from "@/src/components/VerifyInput";

export default function VerificationScreen() {
  //const [phone, setPhone] = React.useState("");

  //const router = useRouter();
  const { email } = useLocalSearchParams();

  const [errorMessage, setErrorMessage] = useState("");
  const [code, setCode] = useState<string>("");

  const [timeLeft, setTimeLeft] = useState(30);
  const [showResetLink, setShowResetLink] = useState(false);

  useEffect(() => {
    if (timeLeft === 0) {
      setShowResetLink(true);
      return;
    }

    // Update the timer every second
    const intervalId = setInterval(() => {
      setTimeLeft(timeLeft - 1);
    }, 1000);

    // Clean up the interval on component unmount
    return () => clearInterval(intervalId);
  }, [timeLeft]);

  const handleVerify = async () => {
    if (code.length < 4) {
      setErrorMessage("Please fill all fields");
    } else {
      setErrorMessage("");
      console.log("handleVerify");
      try {
        // Send sign-up request
        const response = await axios.post("http://localhost:4000/verify", {
          code: code,
          email: email,
        });
        //const { token } = response.data;
        // Store the JWT securely
        //await SecureStore.setItemAsync("jwt", token);
        // Redirect to another screen or update the UI
        router.replace(ROUTES.SUCCESS);
        console.log("Verified successfully");
      } catch (err) {
        //setError('Sign-up failed');
        console.log("Verification failed");
      }
    }
    // if (!numberInfo || !email || !password) {
    //   setErrorMessage("Please fill in all fields.");
    // } else if (!email.includes("@")) {
    //   setErrorMessage("Please Enter a valid email");
    // } else {
    //   setErrorMessage("");
    //   try {
    //     // Send sign-up request
    //     const response = await axios.post("http://localhost:4000/signup", {
    //       numberInfo: numberInfo,
    //       email: email,
    //       password: password,
    //     });
    //     const { token } = response.data;
    //     // Store the JWT securely
    //     await SecureStore.setItemAsync("jwt", token);
    //     // Redirect to another screen or update the UI
    //     console.log("Signed up successfully");
    //   } catch (err) {
    //     //setError('Sign-up failed');
    //     console.log("signup failed");
    //   }
    // }
  };

  const handleOnPress = async () => {
    try {
      // Send resend request
      setTimeLeft(30);
      setShowResetLink(false);
      const response = await axios.post("http://localhost:4000/resend", {
        email: email,
      });

      const { message } = response.data;
      // Store the JWT securely
      //await SecureStore.setItemAsync("jwt", token);
      console.log(message);
      // Redirect to another screen or update the UI
      //router.push(ROUTES.VERIFY);

      //console.log("Signed up successfully");
    } catch (err) {
      //setError('Sign-up failed');
      console.log("resend failed");
    }
  };

  // Convert timeLeft to minutes and seconds
  //const minutes = Math.floor(timeLeft / 60);
  //const seconds = timeLeft % 60;

  const resend_str = showResetLink
    ? "press to resend"
    : "Resend code in " + timeLeft;
  return (
    <ThemedView style={styles.container}>
      <Text style={styles.title}>Verification</Text>
      <View style={styles.account}>
        <ThemedText type="description">
          {"Enter 4 digit code we sent to"} {email}
        </ThemedText>
      </View>

      {/* <VerificationInput></VerificationInput> */}
      <VerifyInput code={code} setCode={setCode}></VerifyInput>
      <Text style={{ color: "red" }}>{errorMessage}</Text>
      <Pressable
        style={styles.resend}
        onPress={handleOnPress}
        disabled={!showResetLink}
      >
        <ThemedText type="default">{resend_str}</ThemedText>
      </Pressable>

      <Button title="Verify" onPress={handleVerify} style={{ width: "90%" }} />

      {/* <View style={{ flexDirection: "row", alignItems: "center" }}>
          <ThemedText type="description">SignUp as</ThemedText>
          <Button title="Referee" style={{ backgroundColor: "grey" }}></Button>
          <Button title="Coach"></Button>
        </View> */}
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  resend: {
    alignSelf: "flex-start",
    //justifyContent: "flex-start",
  },
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
    alignSelf: "flex-start",
    fontSize: 24,
    marginTop: 100,
    marginBottom: 12,
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
