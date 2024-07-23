// app/screens/LoginScreen.tsx
import React, { useState } from "react";
import { View, Text, TextInput, StyleSheet } from "react-native";
import Button from "@/src/components/Button";
import { Link } from "expo-router";

export default function IntroScreen() {
  const navigateCreateAccount = () => {
    // Perform login logic here
    //console.log("HLLO");
  };
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Start your footballing journey today!</Text>
      <Button title="create Account" onPress={navigateCreateAccount} />
      <Link href={"/screens/LoginScreen"}>login</Link>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 16,
    backgroundColor: "#f5f5f5",
  },
  title: {
    fontSize: 24,
    marginBottom: 16,
  },
  input: {
    width: "100%",
    height: 40,
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 8,
    marginBottom: 16,
    backgroundColor: "#fff",
  },
});
