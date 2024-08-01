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

export default function SignUpScreen() {
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
    <TouchableWithoutFeedback onPress={hideDropdown}>
      <ThemedView style={styles.container}>
        <Text style={styles.title}>Create account</Text>
        <View style={styles.account}>
          <ThemedText type="description">Already have an Account? </ThemedText>
          <Link
            href={"/screens/LoginScreen"}
            style={{
              //textDecorationLine: "underline",
              color: "#0EAD69",
              fontWeight: 600,
            }}
          >
            Login
          </Link>
        </View>

        <View style={styles.inputContainer}>
          <ThemedText type="description" style={styles.inputDescription}>
            Phone number
          </ThemedText>
          <PhoneInput
            listShown={listShown}
            setListShown={setListShown}
            number={numberInfo ?? ""}
            setNumber={setNumberInfo}
          ></PhoneInput>
          <ThemedText type="description" style={styles.inputDescription}>
            Email address
          </ThemedText>
          <TextInput
            style={styles.input}
            //placeholder="Email"
            value={email ?? ""}
            onChangeText={setEmail}
            //</View>secureTextEntry={!isPasswordVisible}
          ></TextInput>

          <ThemedText type="description" style={styles.inputDescription}>
            Password
          </ThemedText>
          <PasswordInput
            password={password ?? ""}
            setPassword={setPassword}
            textContextType="none"
          ></PasswordInput>
          {/* <TextInput
            style={styles.input}
            //placeholder="Password"
            //value={password}
            //onChangeText={setPassword}
            //</View>secureTextEntry={!isPasswordVisible}
          ></TextInput> */}
          {/* <PhoneInput country={"us"} value={phone} onChange={setPhone} /> */}
        </View>
        <Text style={{ color: "red" }}>{errorMessage}</Text>
        <ThemedText type="description" style={{ paddingTop: 20 }}>
          By signing up, you agree to Cilckora's
        </ThemedText>
        <View style={styles.terms}>
          <ExternalLink
            href={"/test"}
            style={{
              //textDecorationLine: "underline",
              color: "#0EAD69",
              fontWeight: 600,
            }}
          >
            Term of Service{" "}
          </ExternalLink>
          <ThemedText type="description">and</ThemedText>
          <ExternalLink
            href={"/test"}
            style={{
              //textDecorationLine: "underline",
              color: "#0EAD69",
              fontWeight: 600,
            }}
          >
            {" "}
            Privacy Policy{" "}
          </ExternalLink>
        </View>

        <Button
          title="Sign Up"
          onPress={handleSignUp}
          style={{ width: "90%" }}
        />

        {/* <View style={{ flexDirection: "row", alignItems: "center" }}>
          <ThemedText type="description">SignUp as</ThemedText>
          <Button title="Referee" style={{ backgroundColor: "grey" }}></Button>
          <Button title="Coach"></Button>
        </View> */}
      </ThemedView>
    </TouchableWithoutFeedback>
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
