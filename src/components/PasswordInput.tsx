import React, { useRef, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
} from "react-native";

import Feather from "@expo/vector-icons/Feather";

interface PasswordInputProps {
  password: string | undefined;
  setPassword: React.Dispatch<React.SetStateAction<string | undefined>>;
  textContextType?: "password" | "newPassword" | "none";
}

export default function PasswordInput({
  password,
  setPassword,
  textContextType = "password",
}: PasswordInputProps) {
  //const [password, setPassword] = useState<string>("");
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  const togglePasswordVisibility = () => {
    setIsPasswordVisible((prev) => !prev);
  };

  return (
    <View style={styles.passwordContainer}>
      <TextInput
        style={styles.input}
        //placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry={!isPasswordVisible}
        textContentType={textContextType}
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
  );
}

const styles = StyleSheet.create({
  input: {
    //alignSelf: "center",
    height: 30,
    //borderWidth: 1,
    flex: 1,
    //marginLeft: 10,
    //borderWidth: 1,
    //width: 200,
  },

  passwordContainer: {
    flexDirection: "row",
    //flex: 1,
    //justifyContent: "center",
    //borderWidth: 1,
    justifyContent: "space-between",

    borderColor: "#F0F0F0",

    borderBottomWidth: 2,
    color: "#273240",
  },
  iconContainer: {
    //padding: 5,
    zIndex: 20,
  },
});

const pickerSelectStyles = StyleSheet.create({
  inputIOS: {
    fontSize: 16,
    paddingVertical: 12,
    paddingHorizontal: 10,
    borderWidth: 1,
    borderColor: "gray",
    borderRadius: 4,
    color: "black",
    paddingRight: 30, // to ensure the text is never behind the icon
  },
  inputAndroid: {
    fontSize: 16,
    paddingVertical: 8,
    paddingHorizontal: 10,
    borderWidth: 0.5,
    borderColor: "purple",
    borderRadius: 8,
    color: "black",
    paddingRight: 30, // to ensure the text is never behind the icon
  },
});
