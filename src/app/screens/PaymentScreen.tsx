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
import {
  presentPaymentSheet,
  StripeProvider,
} from "@stripe/stripe-react-native";
import { useStripe } from "@stripe/stripe-react-native";

//const [amount, setAmount] = useState(17950);

const amount = 5000;

const STRIPE_KEY =
  "pk_test_51PspLo01dzMPlnSknz1idnzFK8PgCZUj5DMTkalN0NQOc3EmehwhYA9MGT3V90jrq8cE1qNAFkcvI2fp2m08RYHY00TX7cwlXF";

export default function PaymentScreen() {
  //   const [firstName, setFirstName] = useState<string | undefined>();
  //   const [lastName, setLastName] = useState<string | undefined>();
  const [errorMessage, setErrorMessage] = useState("");

  const [cardName, setCardName] = useState<string | undefined>();
  const [cardNumber, setCardNumber] = useState<string | undefined>();
  const [expiry, setExpiry] = useState<string | undefined>();
  const [CVC, setCVC] = useState<string | undefined>();

  const stripe = useStripe();

  const handleAlertPress = () => {
    router.replace(ROUTES.SUCCESS);
  };

  const handlePayment = async () => {
    // if (!cardName || !cardNumber || !expiry || !CVC) {
    //   setErrorMessage("please fill in all fields");
    //   return;
    // }

    // const cardDetails = {
    //   number: cardNumber,
    //   exp_month: parseInt(expiry.split("/")[0], 10),
    //   exp_year: parseInt(expiry.split("/")[1], 10),
    //   cvc: CVC,
    // };
    // try {
    //   const { token, error } = await stripe.createToken({
    //     type: "Card",
    //     card: {
    //       number: cardNumber,
    //       expMonth: parseInt(expiry.split("/")[1], 10),
    //       expYear: parseInt(expiry.split("/")[1], 10),
    //       cvc: CVC,
    //     },
    //   });

    //   if (error) {
    //     Alert.alert("Error", error.message);
    //   } else {
    //     // Send token to your server to create a PaymentIntent
    //     console.log("Token:", token);
    //     Alert.alert("Success", "Payment token created successfully");
    //     // Here you would send the token to your server
    //   }
    // } catch (e) {
    //   console.error(e);
    //   Alert.alert("Error", "An unexpected error occurred");
    // }

    try {
      const response = await axios.post(
        "http://localhost:4000/payments/intents",
        { amount: amount },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      console.log(response.data);
      const initResponse = await stripe.initPaymentSheet({
        merchantDisplayName: "s",
        paymentIntentClientSecret: response.data.paymentIntent,
      });

      if (initResponse.error) {
        console.log(initResponse.error);
        return;
      }

      await stripe.presentPaymentSheet();
    } catch (err) {
      console.error("Error creating payment intent:", err);
      throw err;
    }
  };
  return (
    <StripeProvider publishableKey={STRIPE_KEY}>
      <ThemedView style={styles.container}>
        <Text style={styles.title}>Payment</Text>

        <View style={styles.inputContainer}>
          {/* <View style={styles.nameContainerPar}>
            
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
        </View> */}

          <ThemedText type="description" style={styles.inputDescription}>
            Cardholder Name
          </ThemedText>
          <TextInput
            style={styles.input}
            //placeholder="Email"
            value={cardName ?? ""}
            onChangeText={setCardName}
            keyboardType="email-address"
            autoCapitalize="none"
          />

          <ThemedText type="description" style={styles.inputDescription}>
            Card Number
          </ThemedText>
          <TextInput
            style={styles.input}
            //placeholder="Email"

            value={cardNumber}
            onChangeText={setCardNumber}
            keyboardType="number-pad"
            autoCapitalize="none"
          />

          <View style={styles.nameContainerPar}>
            <View style={styles.nameContainer}>
              <ThemedText type="description" style={styles.inputDescription}>
                Expiry Date
              </ThemedText>
              <TextInput
                style={styles.input}
                placeholder="MMYY"
                value={expiry}
                onChangeText={setExpiry}
                keyboardType="number-pad"
              ></TextInput>
            </View>
            <View style={styles.nameContainer}>
              <ThemedText type="description" style={styles.inputDescription}>
                CVC
              </ThemedText>
              <TextInput
                style={styles.input}
                value={CVC}
                onChangeText={setCVC}
                keyboardType="number-pad"
                //</View>secureTextEntry={!isPasswordVisible}
              ></TextInput>
            </View>
          </View>
        </View>
        <Text style={{ color: "red" }}>{errorMessage}</Text>

        <Button
          title="Pay for "
          onPress={handlePayment}
          style={{ width: "90%" }}
        />
      </ThemedView>
    </StripeProvider>
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
