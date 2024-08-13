import React, { useRef, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Pressable,
  FlatList,
  TextInput,
  TouchableWithoutFeedback,
} from "react-native";
import RNPickerSelect from "react-native-picker-select";
//import "/node_modules/flag-icons/css/flag-icons.min.css";
import Icon from "react-native-ico-flags";
import CountryFlag from "react-native-country-flag";
import AntDesign from "@expo/vector-icons/AntDesign";
import { TouchableOpacity } from "react-native-gesture-handler";
import DropShadow from "react-native-drop-shadow";
import { Shadow } from "react-native-shadow-2";
import { ThemedText } from "./ThemedText";
import { pList } from "@/src/assets/data/countryCodes";

// Define the Country interface
interface Country {
  code: string;
  name: string;
  isoCode: string;
}

interface PhoneInputProps {
  listShown: boolean;
  setListShown: React.Dispatch<React.SetStateAction<boolean>>;
  number: string | null;
  setNumber: React.Dispatch<React.SetStateAction<string | null>>;
}

export default function PhoneInput({
  listShown,
  setListShown,
  number,
  setNumber,
}: PhoneInputProps) {
  // const [iconName, setIconName] = useState<"caretdown" | "caretup">(
  //   "caretdown"
  // );
  const [selectedCountry, setSelectedCountry] = useState<Country>({
    code: "+1",
    name: "Canada",
    isoCode: "ca",
  });

  const [phoneNumber, setPhoneNumber] = useState("");

  const listRef = useRef(null);

  // Function to toggle the icon name
  const toggleCountryList = () => {
    // setIconName((prevIconName) =>
    //   prevIconName === "caretdown" ? "caretup" : "caretdown"
    // );
    setListShown(!listShown);
  };

  const countryList = selectedCountry ? [selectedCountry, ...pList] : pList;

  const updateSelectedCountry = (country: Country) => {
    listRef.current?.scrollToOffset({ offset: 0, animated: true });
    setSelectedCountry(country);
    setListShown(false);
  };

  const handleNumber = (input: string) => {
    setPhoneNumber(input);
    const numberInfo =
      selectedCountry.isoCode + "," + selectedCountry.code + "," + input;
    setNumber(numberInfo);

    //console.log("input:" + input);
    //console.log(numberInfo);
  };

  return (
    <View style={styles.container}>
      {/* <Text style={styles.title}>{canada.flag}</Text> */}
      {/* <Icon name="canada"> </Icon> */}
      <View
        style={{
          //flex: 1,
          flexDirection: "row",
          alignItems: "center",
          //borderWidth: 1,

          height: 50,
          borderColor: "#F0F0F0",

          borderBottomWidth: 2,
        }}
      >
        <Shadow style={styles.countryPickerContainer}>
          <Pressable
            onPress={() => toggleCountryList()}
            style={{
              flexDirection: "row",
              alignItems: "center",
              paddingVertical: 7,
              paddingHorizontal: 10,
              backgroundColor: "#F3F5F9",

              //boxShadow: 0 4 8 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
              //borderColor: "black",

              //bordewrWidth: 2,
              //justifyContent: "space-evenly",
            }}
          >
            <CountryFlag isoCode={selectedCountry?.isoCode} size={20} />
            {/* <Text>Canada</Text> */}
            <AntDesign
              name={listShown ? "caretup" : "caretdown"}
              size={14}
              color="#AAAACF"
              style={{ paddingLeft: 10 }}
            />
          </Pressable>
        </Shadow>
        <TextInput
          style={styles.input}
          placeholder="number"
          value={phoneNumber}
          onChangeText={handleNumber}
          keyboardType="phone-pad"
          autoCapitalize="none"
        />
      </View>

      {listShown && (
        <FlatList
          data={countryList}
          keyExtractor={(item, index) => index.toString()}
          ref={listRef}
          style={styles.listContainer}
          renderItem={({ item, index }) => (
            <Pressable
              onPress={() => updateSelectedCountry(item)}
              style={[
                styles.listItemContainer,
                index === 0 && {
                  borderBottomWidth: 2,
                  //border-bottom-color: rgba(0, 0, 0, 0.12);
                  borderColor: "rgba(0, 0, 0, 0.12)",
                },
              ]}
            >
              <CountryFlag isoCode={item.isoCode} size={15} />
              <Text style={[styles.text, { paddingHorizontal: 10 }]}>
                {item.name}
              </Text>
              <Text style={styles.text}>{`(${item.code})`}</Text>
            </Pressable>
          )}
        ></FlatList>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  shadowProp: {
    shadowColor: "black",
    shadowOffset: { width: 1, height: 3 },
    shadowOpacity: 0.6,
    shadowRadius: 4,
  },

  container: {
    //flex: 1,
    //justifyContent: "center",
    //alignItems: "center",
    //width: "90%",
    alignSelf: "flex-start",
    flexDirection: "column",
    width: "100%",
    zIndex: 500,

    //borderWidth:1
  },
  title: {
    fontSize: 38,
    //marginBottom: 20,
    color: "red",
    zIndex: 300,
  },
  selectedValue: {
    marginTop: 20,
    fontSize: 16,
  },
  input: {
    //alignSelf: "center",
    height: 30,
    marginLeft: 10,
    //borderWidth: 1,
    width: 200,
  },

  countryPickerContainer: {
    //flexDirection: "row",
    //width: 300,
    //backgroundColor: "red",
    //backgroundColor: "transparent",
    //borderWidth: 1,
    //marginVertical: 7,
  },

  listContainer: {
    backgroundColor: "#F3F5F9",
    height: 180,
    width: 250,
    position: "absolute",
    top: 40,
    //fontSize: 12,
    zIndex: 1000,
  },

  listItemContainer: {
    flexDirection: "row",
    //borderWidth: 1,
    alignItems: "center",
    paddingHorizontal: 5,
    paddingVertical: 7,
  },

  text: {
    fontSize: 11,
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
