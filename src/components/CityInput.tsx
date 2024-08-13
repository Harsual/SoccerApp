import React, { useCallback, useRef, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Pressable,
  FlatList,
  TextInput,
  TouchableWithoutFeedback,
  Alert,
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
//import Entypo from "@expo/vector-icons/Entypo";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import * as Location from "expo-location";
import debounce from "lodash.debounce";

interface CityInputProps {
  listShown?: boolean;
  setListShown?: React.Dispatch<React.SetStateAction<boolean>>;
  selectedCity?: string | null;
  setSelectedCity: React.Dispatch<React.SetStateAction<string | null>>;
}

const filterByPopulation = (cities: any[], minPopulation: number) => {
  return cities.filter((city) => city.population >= minPopulation);
};

export default function CityInput({
  listShown,
  setListShown,
  selectedCity,
  setSelectedCity,
}: CityInputProps) {
  // const [iconName, setIconName] = useState<"caretdown" | "caretup">(
  //   "caretdown"
  // );
  const [city, setCity] = useState<string | undefined>();
  //const [selectedCity, setSelectedCity] = useState<string | undefined>();
  const [cityList, setCityList] = useState<string[]>();
  const [errorMessage, setErrorMessage] = useState("");

  const listRef = useRef(null);

  const fetchData = async (text: string) => {
    try {
      // Replace with your actual API call
      // const response = await fetch(
      //   `http://api.geonames.org/searchJSON?q=${text}&maxRows=10&country=CA&featureClass=P&fuzzy=&username=harsual`
      // );

      const response = await fetch(
        `http://api.geonames.org/searchJSON?q=${text}&maxRows=10&country=CA&featureClass=P&minPopulation=100000&fuzzy=0.2&username=harsual`
      );

      //http://api.geonames.org/findNearbyPlaceNameJSON?lat=47.3&lng=9&username=demo

      // test =
      //   "https://www.geonames.org/advanced-search.html?q=Ottaw&country=CA&featureClass=P&continentCode=&fuzzy=0.6";
      const data = await response.json();
      const cities = filterByPopulation(data.geonames, 100000);
      const names = cities.map((city) => city.name);
      setCityList(names);
      console.log("API data:", data);
      console.log("filtered:", cities);

      console.log(names);
      // Handle the data
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const debouncedFetchData = useCallback(
    debounce(async (text: string) => {
      await fetchData(text);
    }, 500),
    []
  );

  const handleCityChange = (text: string) => {
    setCity(text);
    debouncedFetchData(text);
  };

  const handleCityPress = (text: string) => {
    setCityList(undefined);
    setCity(text);
    setSelectedCity(text);
  };
  const getGPSLocation = async () => {
    // Check for existing permissions
    const { status: currentStatus } =
      await Location.getForegroundPermissionsAsync();

    if (currentStatus !== "granted") {
      // If permission is not granted, request it
      const { status: newStatus } =
        await Location.requestForegroundPermissionsAsync();

      if (newStatus !== "granted") {
        // If permission is still not granted, handle it
        //Alert.alert('Permission Denied', 'Location permission is required to access your location.');
        return;
      }
    }

    let loc = await Location.getCurrentPositionAsync({});

    try {
      let [address] = await Location.reverseGeocodeAsync({
        latitude: loc.coords.latitude,
        longitude: loc.coords.longitude,
      });

      console.log(address.city);

      if (address && address.city) {
        setCity(address.city);
        setSelectedCity(address.city);
        //setErrorMessage("Successful");
      } else {
        setErrorMessage("Unable to determine city");
      }
    } catch (error) {
      //setErrorMessage(String(error));
      console.log(error);
    }
    //setLocation(loc);
  };

  return (
    <View style={styles.container}>
      {/* <Text style={styles.title}>{canada.flag}</Text> */}
      {/* <Icon name="canada"> </Icon> */}
      <View
        style={{
          //flex: 1,
          flexDirection: "row",
          //alignItems: "center",
          //borderWidth: 1,
          justifyContent: "space-between",
          //height: 50,
          borderColor: "#F0F0F0",

          borderBottomWidth: 2,
        }}
      >
        <TextInput
          style={styles.input}
          //placeholder="number"
          value={city}
          onChangeText={handleCityChange}
          //keyboardType="phone-pad"
          //autoCapitalize="none"
        />
        <Pressable onPress={getGPSLocation}>
          <MaterialIcons name="gps-fixed" size={24} color="black" />
        </Pressable>
      </View>

      {/* <Text style={{ color: "red" }}>{errorMessage}</Text> */}

      {true && (
        <FlatList
          data={cityList}
          keyExtractor={(item, index) => index.toString()}
          ref={listRef}
          style={styles.listContainer}
          renderItem={({ item, index }) => (
            <Pressable
              onPress={() => handleCityPress(item)}
              style={styles.listItemContainer}
            >
              <Text>{item}</Text>
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
    flex: 1,
    //marginLeft: 10,
    //borderWidth: 1,
    //width: 200,
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
    //height: 180,
    //width: 250,
    //borderWidth: 2,
    position: "absolute",
    top: 30,
    //fontSize: 12,
    //borderBottomWidth: 2,
    //borderColor: "white",
    borderRadius: 20,
    zIndex: 1000,
  },

  listItemContainer: {
    flexDirection: "row",
    //borderWidth: 1,
    alignItems: "center",
    paddingHorizontal: 10,
    paddingVertical: 7,
    //borderBottomWidth: 1,
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
