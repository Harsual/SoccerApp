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
//import ProfilePic from "@/src/assets/icons/ProfilePic.svg";
import Feather from "@expo/vector-icons/Feather";
import FontAwesome from "@expo/vector-icons/FontAwesome";

export default function CreateProfileScreen() {
  //const [phone, setPhone] = React.useState("");
  const [listShown, setListShown] = useState(false);
  const [numberInfo, setNumberInfo] = useState<string | null>(null);
  const [email, setEmail] = useState<string | null>(null);
  const [password, setPassword] = useState<string | undefined>();
  const [errorMessage, setErrorMessage] = useState("");

  const hideDropdown = () => {
    if (listShown) {
      setListShown(false);
    }
    console.log("hanlding");
  };

  const handleSignUp = async () => {
    if (!numberInfo || !email || !password) {
      setErrorMessage("Please fill in all fields.");
    } else if (!email.includes("@")) {
      setErrorMessage("Please Enter a valid email");
    } else {
      setErrorMessage("");
      try {
        // Send sign-up request
        const response = await axios.post("http://localhost:4000/signup", {
          numberInfo: numberInfo,
          email: email,
          password: password,
        });

        const { message } = response.data;
        // Store the JWT securely
        //await SecureStore.setItemAsync("jwt", token);
        console.log(message);
        // Redirect to another screen or update the UI
        //router.push(ROUTES.VERIFY);
        router.push({
          pathname: ROUTES.VERIFY,
          params: { email: email },
        });
        //console.log("Signed up successfully");
      } catch (err) {
        //setError('Sign-up failed');
        console.log("signup failed");
      }
    }
  };

  return (
    <ThemedView style={styles.container}>
      <Text style={styles.title}>Create profile</Text>
      <ThemedView style={styles.iconContainer}>
        <FontAwesome
          name="user-circle"
          size={80}
          //color={"#345351"}
          style={{ opacity: 1 }}
        ></FontAwesome>
        <ThemedView style={styles.overlay} />
        <ThemedView style={styles.camIcon}>
          <Feather name="camera" size={30} color="white" />
        </ThemedView>
      </ThemedView>
      <Button
        title="Add Photo"
        style={{
          backgroundColor: "grey",
          paddingVertical: 5,
          paddingHorizontal: 10,
        }}
        textStyle={{ fontSize: 12 }}
      ></Button>

      <View style={styles.inputContainer}>
        <View style={styles.nameContainerPar}>
          <View style={styles.nameContainer}>
            <ThemedText type="description" style={styles.inputDescription}>
              First Name
            </ThemedText>
            <TextInput
              style={styles.input}
              //placeholder="Email"
              value={email ?? ""}
              onChangeText={setEmail}
              //</View>secureTextEntry={!isPasswordVisible}
            ></TextInput>
          </View>
          <View style={styles.nameContainer}>
            <ThemedText type="description" style={styles.inputDescription}>
              Last Name
            </ThemedText>
            <TextInput
              style={styles.input}
              //placeholder="Email"
              value={email ?? ""}
              onChangeText={setEmail}
              //</View>secureTextEntry={!isPasswordVisible}
            ></TextInput>
          </View>
        </View>

        <ThemedText type="description" style={styles.inputDescription}>
          Username
        </ThemedText>
        <TextInput
          style={styles.input}
          //placeholder="Email"
          value={email ?? ""}
          onChangeText={setEmail}
          //</View>secureTextEntry={!isPasswordVisible}
        ></TextInput>
        <ThemedText type="description" style={styles.inputDescription}>
          Location
        </ThemedText>
        <TextInput
          style={styles.input}
          //placeholder="Email"
          value={email ?? ""}
          onChangeText={setEmail}
          //</View>secureTextEntry={!isPasswordVisible}
        ></TextInput>
        <ThemedText type="description" style={styles.inputDescription}>
          Age
        </ThemedText>
        <TextInput
          style={styles.input}
          //placeholder="Email"
          value={email ?? ""}
          onChangeText={setEmail}
          //</View>secureTextEntry={!isPasswordVisible}
        ></TextInput>
      </View>
      <Text style={{ color: "red" }}>{errorMessage}</Text>

      <Button title="Sign Up" onPress={handleSignUp} style={{ width: "90%" }} />
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
    //alignSelf: "flex-start",
    marginBottom: 47,
    flexDirection: "row",
  },

  overlay: {
    ...StyleSheet.absoluteFillObject, // Fills the parent container
    backgroundColor: "rgba(0, 0, 0, 0.5)", // Dark overlay with 50% opacity
    borderRadius: 45,
  },

  camIcon: {
    position: "absolute",
    zIndex: 100,
    backgroundColor: "transparent",
    //borderWidth: 3,
  },

  nameContainerPar: {
    flexDirection: "row",
    justifyContent: "space-between",

    //borderWidth: 2,
  },

  nameContainer: {
    //borderWidth: 2,
    //flex: 1,
    //paddingRight: 20,
    width: 140,
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
    //zIndex: 20,
    //borderWidth: 2,
    justifyContent: "center",
    alignItems: "center",
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
