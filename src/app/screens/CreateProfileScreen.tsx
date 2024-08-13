// app/screens/LoginScreen.tsx
import { ThemedText } from "@/src/components/ThemedText";
import { ThemedView } from "@/src/components/ThemedView";
import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Platform,
  Pressable,
  Modal,
  Alert,
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
import * as Location from "expo-location";
import CityInput from "@/src/components/CityInput";
import DateTimePicker from "@react-native-community/datetimepicker";

export default function CreateProfileScreen() {
  const [birthdate, setBirthDate] = useState(new Date());
  const [showPicker, setShowPicker] = useState(false);
  const [firstName, setFirstName] = useState<string | undefined>();
  const [lastName, setLastName] = useState<string | undefined>();
  const [errorMessage, setErrorMessage] = useState("");
  const [location, setLocation] = useState<
    Location.LocationObject | undefined
  >();
  const [selectedCity, setSelectedCity] = useState<string | null>(null);
  const [errorMsg, setErrorMsg] = useState("");

  const onChange = (event: any, selectedDate?: Date) => {
    if (Platform.OS === "android") {
      if (event.type === "dismissed") {
        // Handle the cancel event
        setShowPicker(false);
        return;
      }

      if (event.type === "set") {
        setBirthDate(selectedDate ?? birthdate);
        setShowPicker(false); // Close the modal after date is picked
      }
    }

    //const currentDate = selectedDate || birthdate;
    //setShowPicker(Platform.OS === "ios");
    setBirthDate(selectedDate ?? birthdate);
    //setShowPicker(false);
  };

  const handleShowDatePicker = () => {
    setShowPicker(!showPicker);
  };

  function isOver18(dateOfBirth: Date): boolean {
    const today = new Date();
    const eighteenYearsAgo = new Date(
      today.getFullYear() - 18,
      today.getMonth(),
      today.getDate()
    );

    return dateOfBirth <= eighteenYearsAgo;
  }

  const handleAlertPress = () => {
    router.replace(ROUTES.SUCCESS);
  };

  const handleProfileCreate = async () => {
    if (!firstName || !lastName || !selectedCity) {
      setErrorMessage("Please fill in all fields");
      console.log("A field was not filled");
      return;
    }

    if (selectedCity !== "St John's") {
      //Alert("")
      Alert.alert(
        "City not avialable",
        "The App is not available in your city yet. We will keep your email to notify you when it is available. you can delete your accounts from the settings.",
        [
          {
            text: "Cancel",
            onPress: () => console.log("Cancel Pressed"),
            style: "cancel",
          },
          { text: "OK", onPress: () => handleAlertPress },
        ],
        { cancelable: true } // Allows the alert to be dismissed by tapping outside of it
      );
    } else if (!isOver18(birthdate)) {
      setErrorMessage("Sorry, you're not old enough to use the App");
    } else {
      router.replace(ROUTES.SUCCESS);
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
              value={firstName ?? ""}
              onChangeText={setFirstName}
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
              value={lastName ?? ""}
              onChangeText={setLastName}
              //</View>secureTextEntry={!isPasswordVisible}
            ></TextInput>
          </View>
        </View>

        <ThemedText type="description" style={styles.inputDescription}>
          City
        </ThemedText>
        <CityInput setSelectedCity={setSelectedCity}></CityInput>
        <ThemedText type="description" style={styles.inputDescription}>
          Date of Birth
        </ThemedText>
        <Pressable
          style={{ borderBottomWidth: 2 }}
          onPress={handleShowDatePicker}
        >
          <ThemedText>{birthdate.toDateString()}</ThemedText>
        </Pressable>
        <View>
          {showPicker && (
            <DateTimePicker
              value={birthdate}
              mode="date"
              //is24Hour={true}
              display="inline"
              onChange={onChange}
              style={{
                position: "absolute",
                backgroundColor: "white",
                borderColor: "#F0F0F0",

                //borderBottomWidth: 2,

                //alignSelf: "flex-start",
                //position: "absolute",
                //width: "auto",
                borderWidth: 3,
              }}
              //onTouchCancel={() => setShowPicker(false)}
            />

            // <Modal
            //   transparent={true}
            //   animationType="slide"
            //   visible={showPicker}
            //   onRequestClose={() => setShowPicker(false)}
            // >
            //   <View /*style={styles.modalBackground}*/>
            //     <View /*style={styles.modalContent}*/>
            //       <DateTimePicker
            //         testID="dateTimePicker"
            //         value={birthdate}
            //         mode="date"
            //         display="spinner"
            //         onChange={onChange}
            //         //style={styles.datePicker}
            //       />
            //       <TouchableOpacity
            //         //style={styles.closeButton}
            //         onPress={() => setShowPicker(false)}
            //       >
            //         <Text /*style={styles.closeButtonText}*/>Done</Text>
            //       </TouchableOpacity>
            //     </View>
            //   </View>
            // </Modal>
          )}
        </View>

        {/* <TextInput
          style={styles.input}
          //placeholder=""
          value={birthdate.toDateString() ?? ""}
          onFocus={showDatePicker}
          editable={false}
          //onChangeText={setEmail}
          //</View>secureTextEntry={!isPasswordVisible}
        ></TextInput> */}
      </View>
      <Text style={{ color: "red" }}>{errorMessage}</Text>

      <Button
        title="Create Profile"
        onPress={handleProfileCreate}
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

  dateContainer: {
    borderWidth: 2,
    width: 130,
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
    //height: 35,

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
