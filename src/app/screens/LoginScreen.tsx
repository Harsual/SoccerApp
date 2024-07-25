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
import { Link } from "expo-router";

export default function LoginScreen() {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  const togglePasswordVisibility = () => {
    setIsPasswordVisible((prev) => !prev);
  };

  const handleLogin = () => {
    // Perform login logic here
    console.log("Email:", email);
    console.log("Password:", password);
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
        <View style={styles.passwordContainer}>
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
        </View>
      </View>
      <Link
        href={"/IntroScreen"}
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
          href={"/IntroScreen"}
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
    paddingBottom: 16,
    borderRadius: 20,
  },
  title: {
    alignSelf: "flex-start",
    fontSize: 24,
    marginTop: 100,
    marginBottom: 100,
  },
  input: {
    width: "80%",
    //alignSelf: "center",
    height: 30,
    marginLeft: 20,

    borderColor: "#F0F0F0",
    //borderWidth: 1,
    //borderRadius: 30,
    borderBottomWidth: 1,
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
    paddingTop: 16,
    paddingLeft: 20,
    //color: "#898F95",
  },

  passwordContainer: {
    flexDirection: "row",
    //justifyContent: "center",
  },
});

//export default LoginScreen;
