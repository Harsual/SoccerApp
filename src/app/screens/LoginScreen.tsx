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
} from "react-native";
import Feather from "@expo/vector-icons/Feather";
import Button from "@/src/components/Button";
import { Link, router } from "expo-router";
import { ROUTES } from "../navigationConstants";
import PasswordInput from "@/src/components/PasswordInput";
import axios from "axios";
import * as SecureStore from "expo-secure-store";

export default function LoginScreen() {
  const [email, setEmail] = useState<string | undefined>();
  const [password, setPassword] = useState<string | undefined>();
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const FIRST_SIGN_IN_KEY = "firstSignIn";

  const togglePasswordVisibility = () => {
    setIsPasswordVisible((prev) => !prev);
  };

  async function handleFirstSignIn() {
    try {
      // Check if the key already exists
      const firstSignIn = await SecureStore.getItemAsync(FIRST_SIGN_IN_KEY);

      if (!firstSignIn) {
        // If the key does not exist, this is the first sign-in
        await SecureStore.setItemAsync(FIRST_SIGN_IN_KEY, "true");
        console.log("User signed in for the first time on this device.");
      } else {
        console.log("User has already signed in before on this device.");
      }
    } catch (error) {
      console.error("Error handling first sign-in:", error);
    }
  }

  async function storeToken(token: string) {
    try {
      await SecureStore.setItemAsync("authToken", token);
      console.log("TOKEN STORED");
    } catch (error) {
      console.error("Failed to store the token", error);
    }
  }

  async function getToken() {
    try {
      const token = await SecureStore.getItemAsync("authToken");
      return token;
    } catch (error) {
      console.error("Failed to retrieve the token", error);
      return null;
    }
  }

  async function deleteToken() {
    try {
      await SecureStore.deleteItemAsync("authToken");
    } catch (error) {
      console.error("Failed to delete the token", error);
    }
  }

  const handleLogin = async () => {
    // Perform login logic here
    console.log("Email:", email);
    console.log("Password:", password);

    if (!email || !password) {
      setErrorMessage("Please fill in all fields.");
    }
    setErrorMessage("");
    try {
      // Send login request
      const response = await axios.post("http://localhost:4000/login", {
        email: email,
        password: password,
      });

      const { token, message } = response.data;
      storeToken(token);
      await handleFirstSignIn();
      // Store the JWT securely
      //await SecureStore.setItemAsync("jwt", token);
      console.log(message);

      router.push({
        pathname: ROUTES.HOME,
      });
      //console.log("Signed up successfully");
    } catch (err) {
      //setError('Sign-up failed');

      setErrorMessage("email or password is incorrect");
      console.log("login failed");
    }
  };
  return (
    <ThemedView style={styles.container}>
      <Text style={styles.title}>Login</Text>
      <View style={styles.inputContainer}>
        <ThemedText type="description" style={styles.inputDescription}>
          Username or Email
        </ThemedText>
        <TextInput
          style={styles.input}
          //placeholder="Email"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          autoCapitalize="none"
        />
        <ThemedText type="description" style={styles.inputDescription}>
          Password
        </ThemedText>
        {/* <View style={styles.passwordContainer}>
          <TextInput
            style={styles.input}
            //placeholder="Password"
            value={password}
            onChangeText={setPassword}
            secureTextEntry={!isPasswordVisible}
          />
          <TouchableOpacity
            onPress={togglePasswordVisibility}
            style={styles.iconContainer}
          >
            <Feather
              name={isPasswordVisible ? "eye" : "eye-off"}
              size={24}
              color="grey"
            />
          </TouchableOpacity>
        </View> */}
        <PasswordInput
          password={password}
          setPassword={setPassword}
        ></PasswordInput>
      </View>
      <Text style={{ color: "red" }}>{errorMessage}</Text>
      <Link
        href={"/screens/ForgotPasswordScreen"}
        style={{
          textDecorationLine: "underline",
          color: "#898F95",
          marginBottom: 30,
        }}
      >
        Forgot Password?
      </Link>
      <Button title="Login" onPress={handleLogin} style={{ width: "90%" }} />
      <View style={{ flexDirection: "row", marginVertical: 20 }}>
        <ThemedText type="description"> Don't have an account?</ThemedText>
        <Link
          href={"/screens/SignUpScreen"}
          style={{
            textDecorationLine: "underline",
            color: "#0EAD69",
            fontWeight: 600,
          }}
        >
          SignUp
        </Link>
      </View>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    //justifyContent: "center",
    alignItems: "center",
    padding: 16,
  },

  inputContainer: {
    width: "90%",
    margin: 20,
    backgroundColor: "white",
    paddingBottom: 20,
    paddingHorizontal: 20,
    borderRadius: 20,
  },
  title: {
    alignSelf: "flex-start",
    fontSize: 24,
    marginTop: 100,
    marginBottom: 100,
  },
  input: {
    //width: "80%",
    //alignSelf: "center",
    height: 30,
    //marginLeft: 20,

    borderColor: "#F0F0F0",
    //borderWidth: 1,
    //borderRadius: 30,
    borderBottomWidth: 2,
    color: "#273240",
    //paddingHorizontal: 8,
    //paddingBottom: 16,
    backgroundColor: "#fff",
    //marginHorizontal: 100,
  },

  iconContainer: {
    //padding: 5,
    zIndex: 20,
  },

  inputDescription: {
    paddingTop: 20,
    //color: "#898F95",
  },

  passwordContainer: {
    flexDirection: "row",
    //justifyContent: "center",
  },
});

//export default LoginScreen;
