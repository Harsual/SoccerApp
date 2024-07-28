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

  //const [listShown, setListShown] = useState(false);

  // const pList: Country[] = [
  //   { code: "+93", name: "Afghanistan", isoCode: "af" },
  //   { code: "+355", name: "Albania", isoCode: "al" },
  //   { code: "+213", name: "Algeria", isoCode: "dz" },
  //   { code: "+1", name: "Andorra", isoCode: "ad" },
  //   { code: "+244", name: "Angola", isoCode: "ao" },
  //   { code: "+1", name: "Antigua and Barbuda", isoCode: "ag" },
  //   { code: "+54", name: "Argentina", isoCode: "ar" },
  //   { code: "+374", name: "Armenia", isoCode: "am" },
  //   { code: "+61", name: "Australia", isoCode: "au" },
  //   { code: "+43", name: "Austria", isoCode: "at" },
  //   { code: "+994", name: "Azerbaijan", isoCode: "az" },
  //   { code: "+1", name: "Bahamas", isoCode: "bs" },
  //   { code: "+973", name: "Bahrain", isoCode: "bh" },
  //   { code: "+880", name: "Bangladesh", isoCode: "bd" },
  //   { code: "+1", name: "Barbados", isoCode: "bb" },
  //   { code: "+375", name: "Belarus", isoCode: "by" },
  //   { code: "+32", name: "Belgium", isoCode: "be" },
  //   { code: "+501", name: "Belize", isoCode: "bz" },
  //   { code: "+229", name: "Benin", isoCode: "bj" },
  //   { code: "+1", name: "Bermuda", isoCode: "bm" },
  //   { code: "+975", name: "Bhutan", isoCode: "bt" },
  //   { code: "+591", name: "Bolivia", isoCode: "bo" },
  //   { code: "+387", name: "Bosnia and Herzegovina", isoCode: "ba" },
  //   { code: "+267", name: "Botswana", isoCode: "bw" },
  //   { code: "+55", name: "Brazil", isoCode: "br" },
  //   { code: "+673", name: "Brunei", isoCode: "bn" },
  //   { code: "+359", name: "Bulgaria", isoCode: "bg" },
  //   { code: "+226", name: "Burkina Faso", isoCode: "bf" },
  //   { code: "+257", name: "Burundi", isoCode: "bi" },
  //   { code: "+855", name: "Cambodia", isoCode: "kh" },
  //   { code: "+237", name: "Cameroon", isoCode: "cm" },
  //   { code: "+1", name: "Canada", isoCode: "ca" },
  //   { code: "+238", name: "Cape Verde", isoCode: "cv" },
  //   { code: "+236", name: "Central African Republic", isoCode: "cf" },
  //   { code: "+235", name: "Chad", isoCode: "td" },
  //   { code: "+56", name: "Chile", isoCode: "cl" },
  //   { code: "+86", name: "China", isoCode: "cn" },
  //   { code: "+57", name: "Colombia", isoCode: "co" },
  //   { code: "+269", name: "Comoros", isoCode: "km" },
  //   { code: "+243", name: "Congo (DRC)", isoCode: "cd" },
  //   { code: "+242", name: "Congo (Republic)", isoCode: "cg" },
  //   { code: "+682", name: "Cook Islands", isoCode: "ck" },
  //   { code: "+506", name: "Costa Rica", isoCode: "cr" },
  //   { code: "+225", name: "Côte d'Ivoire", isoCode: "ci" },
  //   { code: "+385", name: "Croatia", isoCode: "hr" },
  //   { code: "+53", name: "Cuba", isoCode: "cu" },
  //   { code: "+357", name: "Cyprus", isoCode: "cy" },
  //   { code: "+420", name: "Czech Republic", isoCode: "cz" },
  //   { code: "+45", name: "Denmark", isoCode: "dk" },
  //   { code: "+253", name: "Djibouti", isoCode: "dj" },
  //   { code: "+1", name: "Dominica", isoCode: "dm" },
  //   { code: "+1", name: "Dominican Republic", isoCode: "do" },
  //   { code: "+593", name: "Ecuador", isoCode: "ec" },
  //   { code: "+20", name: "Egypt", isoCode: "eg" },
  //   { code: "+503", name: "El Salvador", isoCode: "sv" },
  //   { code: "+240", name: "Equatorial Guinea", isoCode: "gq" },
  //   { code: "+291", name: "Eritrea", isoCode: "er" },
  //   { code: "+372", name: "Estonia", isoCode: "ee" },
  //   { code: "+251", name: "Ethiopia", isoCode: "et" },
  //   { code: "+679", name: "Fiji", isoCode: "fj" },
  //   { code: "+358", name: "Finland", isoCode: "fi" },
  //   { code: "+33", name: "France", isoCode: "fr" },
  //   { code: "+241", name: "Gabon", isoCode: "ga" },
  //   { code: "+220", name: "Gambia", isoCode: "gm" },
  //   { code: "+995", name: "Georgia", isoCode: "ge" },
  //   { code: "+49", name: "Germany", isoCode: "de" },
  //   { code: "+233", name: "Ghana", isoCode: "gh" },
  //   { code: "+30", name: "Greece", isoCode: "gr" },
  //   { code: "+299", name: "Greenland", isoCode: "gl" },
  //   { code: "+1", name: "Grenada", isoCode: "gd" },
  //   { code: "+502", name: "Guatemala", isoCode: "gt" },
  //   { code: "+44", name: "Guernsey", isoCode: "gg" },
  //   { code: "+224", name: "Guinea", isoCode: "gn" },
  //   { code: "+245", name: "Guinea-Bissau", isoCode: "gw" },
  //   { code: "+592", name: "Guyana", isoCode: "gy" },
  //   { code: "+509", name: "Haiti", isoCode: "ht" },
  //   { code: "+504", name: "Honduras", isoCode: "hn" },
  //   { code: "+852", name: "Hong Kong", isoCode: "hk" },
  //   { code: "+36", name: "Hungary", isoCode: "hu" },
  //   { code: "+354", name: "Iceland", isoCode: "is" },
  //   { code: "+91", name: "India", isoCode: "in" },
  //   { code: "+62", name: "Indonesia", isoCode: "id" },
  //   { code: "+98", name: "Iran", isoCode: "ir" },
  //   { code: "+964", name: "Iraq", isoCode: "iq" },
  //   { code: "+353", name: "Ireland", isoCode: "ie" },
  //   { code: "+44", name: "Isle of Man", isoCode: "im" },
  //   { code: "+972", name: "Israel", isoCode: "il" },
  //   { code: "+39", name: "Italy", isoCode: "it" },
  //   { code: "+1", name: "Jamaica", isoCode: "jm" },
  //   { code: "+81", name: "Japan", isoCode: "jp" },
  //   { code: "+44", name: "Jersey", isoCode: "je" },
  //   { code: "+962", name: "Jordan", isoCode: "jo" },
  //   { code: "+7", name: "Kazakhstan", isoCode: "kz" },
  //   { code: "+254", name: "Kenya", isoCode: "ke" },
  //   { code: "+686", name: "Kiribati", isoCode: "ki" },
  //   { code: "+383", name: "Kosovo", isoCode: "xk" },
  //   { code: "+965", name: "Kuwait", isoCode: "kw" },
  //   { code: "+996", name: "Kyrgyzstan", isoCode: "kg" },
  //   { code: "+856", name: "Laos", isoCode: "la" },
  //   { code: "+371", name: "Latvia", isoCode: "lv" },
  //   { code: "+961", name: "Lebanon", isoCode: "lb" },
  //   { code: "+266", name: "Lesotho", isoCode: "ls" },
  //   { code: "+231", name: "Liberia", isoCode: "lr" },
  //   { code: "+218", name: "Libya", isoCode: "ly" },
  //   { code: "+423", name: "Liechtenstein", isoCode: "li" },
  //   { code: "+370", name: "Lithuania", isoCode: "lt" },
  //   { code: "+352", name: "Luxembourg", isoCode: "lu" },
  //   { code: "+261", name: "Madagascar", isoCode: "mg" },
  //   { code: "+265", name: "Malawi", isoCode: "mw" },
  //   { code: "+60", name: "Malaysia", isoCode: "my" },
  //   { code: "+960", name: "Maldives", isoCode: "mv" },
  //   { code: "+223", name: "Mali", isoCode: "ml" },
  //   { code: "+356", name: "Malta", isoCode: "mt" },
  //   { code: "+692", name: "Marshall Islands", isoCode: "mh" },
  //   { code: "+596", name: "Martinique", isoCode: "mq" },
  //   { code: "+222", name: "Mauritania", isoCode: "mr" },
  //   { code: "+230", name: "Mauritius", isoCode: "mu" },
  //   { code: "+262", name: "Mayotte", isoCode: "yt" },
  //   { code: "+52", name: "Mexico", isoCode: "mx" },
  //   { code: "+691", name: "Micronesia", isoCode: "fm" },
  //   { code: "+233", name: "Moldova", isoCode: "md" },
  //   { code: "+377", name: "Monaco", isoCode: "mc" },
  //   { code: "+976", name: "Mongolia", isoCode: "mn" },
  //   { code: "+382", name: "Montenegro", isoCode: "me" },
  //   { code: "+1", name: "Montserrat", isoCode: "ms" },
  //   { code: "+212", name: "Morocco", isoCode: "ma" },
  //   { code: "+258", name: "Mozambique", isoCode: "mz" },
  //   { code: "+95", name: "Myanmar", isoCode: "mm" },
  //   { code: "+264", name: "Namibia", isoCode: "na" },
  //   { code: "+674", name: "Nauru", isoCode: "nr" },
  //   { code: "+977", name: "Nepal", isoCode: "np" },
  //   { code: "+31", name: "Netherlands", isoCode: "nl" },
  //   { code: "+687", name: "New Caledonia", isoCode: "nc" },
  //   { code: "+64", name: "New Zealand", isoCode: "nz" },
  //   { code: "+505", name: "Nicaragua", isoCode: "ni" },
  //   { code: "+227", name: "Niger", isoCode: "ne" },
  //   { code: "+234", name: "Nigeria", isoCode: "ng" },
  //   { code: "+683", name: "Niue", isoCode: "nu" },
  //   { code: "+672", name: "Norfolk Island", isoCode: "nf" },
  //   { code: "+1", name: "North Macedonia", isoCode: "mk" },
  //   { code: "+47", name: "Norway", isoCode: "no" },
  //   { code: "+968", name: "Oman", isoCode: "om" },
  //   { code: "+92", name: "Pakistan", isoCode: "pk" },
  //   { code: "+680", name: "Palau", isoCode: "pw" },
  //   { code: "+970", name: "Palestine", isoCode: "ps" },
  //   { code: "+507", name: "Panama", isoCode: "pa" },
  //   { code: "+675", name: "Papua New Guinea", isoCode: "pg" },
  //   { code: "+595", name: "Paraguay", isoCode: "py" },
  //   { code: "+51", name: "Peru", isoCode: "pe" },
  //   { code: "+63", name: "Philippines", isoCode: "ph" },
  //   { code: "+48", name: "Poland", isoCode: "pl" },
  //   { code: "+351", name: "Portugal", isoCode: "pt" },
  //   { code: "+1", name: "Puerto Rico", isoCode: "pr" },
  //   { code: "+974", name: "Qatar", isoCode: "qa" },
  //   { code: "+242", name: "Réunion", isoCode: "re" },
  //   { code: "+40", name: "Romania", isoCode: "ro" },
  //   { code: "+7", name: "Russia", isoCode: "ru" },
  //   { code: "+250", name: "Rwanda", isoCode: "rw" },
  //   { code: "+290", name: "Saint Helena", isoCode: "sh" },
  //   { code: "+1", name: "Saint Kitts and Nevis", isoCode: "kn" },
  //   { code: "+1", name: "Saint Lucia", isoCode: "lc" },
  //   { code: "+1", name: "Saint Vincent and the Grenadines", isoCode: "vc" },
  //   { code: "+685", name: "Samoa", isoCode: "ws" },
  //   { code: "+378", name: "San Marino", isoCode: "sm" },
  //   { code: "+239", name: "Sao Tome and Principe", isoCode: "st" },
  //   { code: "+966", name: "Saudi Arabia", isoCode: "sa" },
  //   { code: "+221", name: "Senegal", isoCode: "sn" },
  //   { code: "+381", name: "Serbia", isoCode: "rs" },
  //   { code: "+248", name: "Seychelles", isoCode: "sc" },
  //   { code: "+232", name: "Sierra Leone", isoCode: "sl" },
  //   { code: "+65", name: "Singapore", isoCode: "sg" },
  //   { code: "+1", name: "Sint Maarten", isoCode: "sx" },
  //   { code: "+421", name: "Slovakia", isoCode: "sk" },
  //   { code: "+386", name: "Slovenia", isoCode: "si" },
  //   { code: "+677", name: "Solomon Islands", isoCode: "sb" },
  //   { code: "+252", name: "Somalia", isoCode: "so" },
  //   { code: "+27", name: "South Africa", isoCode: "za" },
  //   { code: "+82", name: "South Korea", isoCode: "kr" },
  //   { code: "+34", name: "Spain", isoCode: "es" },
  //   { code: "+94", name: "Sri Lanka", isoCode: "lk" },
  //   { code: "+249", name: "Sudan", isoCode: "sd" },
  //   { code: "+597", name: "Suriname", isoCode: "sr" },
  //   { code: "+268", name: "Swaziland", isoCode: "sz" },
  //   { code: "+46", name: "Sweden", isoCode: "se" },
  //   { code: "+41", name: "Switzerland", isoCode: "ch" },
  //   { code: "+963", name: "Syria", isoCode: "sy" },
  //   { code: "+886", name: "Taiwan", isoCode: "tw" },
  //   { code: "+992", name: "Tajikistan", isoCode: "tj" },
  //   { code: "+255", name: "Tanzania", isoCode: "tz" },
  //   { code: "+66", name: "Thailand", isoCode: "th" },
  //   { code: "+670", name: "Timor-Leste", isoCode: "tl" },
  //   { code: "+228", name: "Togo", isoCode: "tg" },
  //   { code: "+690", name: "Tokelau", isoCode: "tk" },
  //   { code: "+676", name: "Tonga", isoCode: "to" },
  //   { code: "+1", name: "Trinidad and Tobago", isoCode: "tt" },
  //   { code: "+216", name: "Tunisia", isoCode: "tn" },
  //   { code: "+90", name: "Turkey", isoCode: "tr" },
  //   { code: "+993", name: "Turkmenistan", isoCode: "tm" },
  //   { code: "+1", name: "Turks and Caicos Islands", isoCode: "tc" },
  //   { code: "+688", name: "Tuvalu", isoCode: "tv" },
  //   { code: "+256", name: "Uganda", isoCode: "ug" },
  //   { code: "+380", name: "Ukraine", isoCode: "ua" },
  //   { code: "+971", name: "United Arab Emirates", isoCode: "ae" },
  //   { code: "+44", name: "United Kingdom", isoCode: "gb" },
  //   { code: "+1", name: "United States", isoCode: "us" },
  //   { code: "+598", name: "Uruguay", isoCode: "uy" },
  //   { code: "+998", name: "Uzbekistan", isoCode: "uz" },
  //   { code: "+678", name: "Vanuatu", isoCode: "vu" },
  //   { code: "+58", name: "Venezuela", isoCode: "ve" },
  //   { code: "+84", name: "Vietnam", isoCode: "vn" },
  //   { code: "+1", name: "Western Sahara", isoCode: "eh" },
  //   { code: "+967", name: "Yemen", isoCode: "ye" },
  //   { code: "+260", name: "Zambia", isoCode: "zm" },
  //   { code: "+263", name: "Zimbabwe", isoCode: "zw" },
  // ];

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
