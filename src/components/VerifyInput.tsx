import React, { useRef, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Pressable,
} from "react-native";
import { ThemedText } from "./ThemedText";

interface VerifyInputProps {
  code: string;
  setCode: React.Dispatch<React.SetStateAction<string>>;
}

const CODE_LENGTH = 4;

export default function VerifyInput({ code, setCode }: VerifyInputProps) {
  //const [code, setCode] = useState<string>("");
  const [containerIsFocused, setContainerIsFocused] = useState(true);

  const codeDigitsArray = new Array(CODE_LENGTH).fill(0);

  const toDigitInput = (_value: number, idx: number) => {
    const emptyInputChar = " ";
    const digit = code[idx] || emptyInputChar;

    const isCurrentDigit = idx === code.length;
    const isLastDigit = idx === CODE_LENGTH - 1;
    const isCodeFull = code.length === CODE_LENGTH;

    const isFocused = isCurrentDigit || (isLastDigit && isCodeFull);

    const boxStyle =
      containerIsFocused && isFocused
        ? { ...styles.input, ...styles.inputContainerFocused }
        : styles.input;

    return (
      <View key={idx} style={boxStyle}>
        <ThemedText type="default">{digit}</ThemedText>
      </View>
    );
  };

  const ref = useRef<TextInput>(null);

  const handleOnPress = () => {
    ref?.current?.focus();
  };

  const handleOnBlur = () => {
    setContainerIsFocused(false);
  };
  return (
    <Pressable onPress={handleOnPress} style={styles.codeContainer}>
      {/* <Pressable style={styles.inputsContainer}>
        {codeDigitsArray.map(toDigitInput)}
      </Pressable>
      <TextInput style={styles.invisibleField}></TextInput> */}
      {codeDigitsArray.map(toDigitInput)}

      <TextInput
        ref={ref}
        style={styles.invisibleField}
        value={code}
        onChangeText={setCode}
        onSubmitEditing={handleOnBlur}
        autoFocus={true}
        //returnKeyType="done"
        maxLength={CODE_LENGTH}
        textContentType="oneTimeCode"
        keyboardType="number-pad"
      ></TextInput>
      {/* {code.map((digit, index) => (
        <TextInput
          key={index}
          ref={(ref) => (inputRefs.current[index] = ref)}
          style={styles.input}
          keyboardType="number-pad"
          maxLength={1}
          value={digit}
          onChangeText={(text) => handleChange(text, index)}
          autoFocus={index === 0}
        />
      ))} */}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  invisibleField: {
    opacity: 0,
    height: 0,
    width: 0,
    position: "absolute",
  },
  inputsContainer: {
    //width: "60%",
    flexDirection: "row",
    justifyContent: "space-between",
    //borderWidth: 2,
    borderColor: "black",
  },

  input: {
    //alignSelf: "center",
    width: 60,
    height: 60,
    //borderWidth: 1,
    //borderColor: "grey",
    backgroundColor: "white",
    textAlign: "center",
    borderRadius: 18,
    alignItems: "center",
    justifyContent: "center",

    //marginLeft: 10,
    //borderWidth: 1,
    //width: 200,
  },
  inputContainerFocused: {
    borderWidth: 2,
    borderColor: "#0EAD69",
  },

  codeContainer: {
    flexDirection: "row",
    //flex: 1,
    //justifyContent: "center",
    //borderWidth: 1,
    //borderWidth: 10,
    borderColor: "grey",
    width: "100%",
    justifyContent: "space-around",
    //borderColor: "#F0F0F0",
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
