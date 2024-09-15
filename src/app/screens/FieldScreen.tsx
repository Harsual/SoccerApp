// app/screens/LoginScreen.tsx
import { ThemedText } from "@/src/components/ThemedText";
import { ThemedView } from "@/src/components/ThemedView";
import React, { useEffect, useRef, useState } from "react";
import {
  View,
  StyleSheet,
  Image,
  TouchableOpacity,
  ScrollView,
  Pressable,
  Text,
  Platform,
  Linking,
} from "react-native";

//import { ScrollView } from "react-native-gesture-handler";

import { router, useLocalSearchParams } from "expo-router";

import PagerView from "react-native-pager-view";
//import FontAwesome5 from "@expo/vector-icons/FontAwesome5";
import FontAwesome6 from "@expo/vector-icons/FontAwesome6";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import ServiceIcon from "@/src/components/ServiceIcon";
import SportsView from "@/src/components/SportsView";
import { Colors } from "@/src/constants/Colors";
import DateTimePicker from "@react-native-community/datetimepicker";
import Button from "@/src/components/Button";
import axios from "axios";
import { findFieldByID, Field } from "../fieldsStore";
import Constants from "expo-constants";
//import FontAwesome5 from '@expo/vector-icons/FontAwesome5';
import { MaterialIcons, FontAwesome5 } from "@expo/vector-icons";

const dateWithoutTimezone = (date: Date) => {
  const tzoffset = date.getTimezoneOffset() * 60000; //offset in milliseconds
  const withoutTimezone = new Date(date.valueOf() - tzoffset);
  // .toISOString()
  // .slice(0, -1);
  return withoutTimezone;
};

export default function FieldScreen() {
  const params = useLocalSearchParams();
  const id = parseInt(params.cardID as string, 10);
  const field = findFieldByID(id);
  console.log(field);

  const handleSportClick = (item: any) => {
    setSelectedSport(item);
    setSelectedPitch(undefined);
  };

  const openFacilityMap = () => {
    const url = "https://maps.app.goo.gl/5KFy1nzY9eRXmLpa7"; // Specific Google Maps link

    Linking.openURL(url).catch((err) =>
      console.error("Error opening Google Maps", err)
    );
  };

  const servicesData = [
    { name: "parking", iconName: "parking", iconClass: FontAwesome5 },
    { name: "washroom", iconName: "restroom", iconClass: FontAwesome5 },
    { name: "water-fountain", iconName: "faucet", iconClass: FontAwesome5 },
    { name: "football", iconName: "futbol", iconClass: FontAwesome5 },
    { name: "bibs", iconName: "tshirt", iconClass: FontAwesome5 },
  ];
  const carouselData = [
    { id: 0, image: require("../../assets/fields/field2.jpg") },
    { id: 1, image: require("../../assets/fields/field2.jpg") },
    { id: 2, image: require("../../assets/fields/field2.jpg") },
    // Add more images as needed
  ];

  const sports: any[] = [
    {
      id: 0,
      sport: "soccer",
      svg: "sports-soccer",
      component: MaterialIcons,
      iconSize: 35,
    },
    {
      id: 1,
      sport: "volleyball",
      svg: "sports-volleyball",
      component: MaterialIcons,
      iconSize: 35,
    },
    {
      id: 2,
      sport: "basketball",
      svg: "sports-basketball",
      component: MaterialIcons,
      iconSize: 35,
    },
    {
      id: 3,
      sport: "badminton",
      svg: "sports-tennis",
      component: MaterialIcons,
      iconSize: 35,
    },
    {
      id: 4,
      sport: "table tennis",
      svg: "table-tennis",
      component: MaterialCommunityIcons,
      iconSize: 35,
    },
  ];

  // const sports: any[] = [
  //   {
  //     id: 0,
  //     sport: "soccer",
  //     svg: "sports-soccer",
  //   },
  //   {
  //     id: 1,
  //     sport: "volleyball",
  //     svg: "sports-volleyball",
  //   },
  //   {
  //     id: 2,
  //     sport: "basketball",
  //     svg: "sports-basketball",
  //   },
  //   {
  //     id: 3,
  //     sport: "badminton",
  //     svg: "sports-tennis",
  //   },
  //   {
  //     id: 4,
  //     sport: "table tennis",
  //     svg: "sports-soccer",
  //   },
  // ];

  // const fieldInfo = {
  //   id: 1,
  //   name: "community center",
  //   address: "testing123",
  //   services: ["parking", "washroom", "water-fountain", "football", "bibs"],
  //   sportPitches: {
  //     soccer: ["field 1", "field 2", "field 3", "field 4"],
  //     volleyball: ["field 1", "field 3"], // assuming volleyball can only be played on certain fields
  //     tabletennis: ["field 2", "field 4"], //
  //   },
  // };

  // Filter the sports array
  const availableSports = sports.filter((sport) =>
    Object.keys(field?.sportPitches || []).includes(
      sport.sport.toLowerCase().replace(/\s+/g, "")
    )
  );

  //const timesAvail: string[] = ["04:00", "05:00", "06:00", "07:00"];

  const pagerRef = useRef<PagerView>(null);
  const [selectedPage, setSelectedPage] = useState(0);
  const [selectedSport, setSelectedSport] = useState(sports[0]);
  const [selectedPitch, setSelectedPitch] = useState();
  const [selectedTime, setSelectedTime] = useState<undefined | number>();
  const [showBookButton, setShowBookButton] = useState(false);
  const [bookDate, setBookDate] = useState<Date>(new Date());
  const [timesAvail, setTimesAvail] = useState<undefined | string[]>([]);
  const HOST = Constants.expoConfig?.extra?.HOST;

  const onChange = (event: any, selectedDate?: Date) => {
    const selectedDateWOzone = dateWithoutTimezone(selectedDate ?? bookDate);
    if (Platform.OS === "android") {
      if (event.type === "dismissed") {
        // Handle the cancel event
        //setShowPicker(false);
        return;
      }

      if (event.type === "set") {
        setBookDate(selectedDateWOzone);
        //setShowPicker(false); // Close the modal after date is picked
      }
    }

    //const currentDate = selectedDate || birthdate;
    //setShowPicker(Platform.OS === "ios");
    setBookDate(selectedDateWOzone);
    //setShowPicker(false);
  };

  useEffect(() => {
    if (selectedTime) {
      setShowBookButton(true);
    }
  }, [selectedTime]);
  const handlePageSelected = (event: any) => {
    setSelectedPage(event.nativeEvent.position);
    //pagerRef.current?.setPage(index);
  };

  const handleBookingPress = () => {
    router.push("screens/PaymentScreen");
    //pagerRef.current?.setPage(index);
  };

  useEffect(() => {
    const fetchAvailableTimes = async () => {
      console.log(bookDate.toISOString());
      if (selectedSport && selectedPitch !== undefined && bookDate) {
        try {
          const response = await axios.get(
            `http://${HOST}:4000/times/getAvailTimes`,
            {
              params: {
                facilityID: field?.id,
                //sport: selectedSport,
                pitch: selectedPitch,
                date: bookDate.toISOString().split("T")[0], // Send the date in ISO format
              },
            }
          );
          const availableTimes = response.data;
          console.log(response.data);
          setTimesAvail(availableTimes);
          // Update state with available times if necessary
          // For example, you could update selectedTime or show available times to the user
        } catch (error) {
          console.error("Error fetching available times:", error);
        }
      }
    };

    fetchAvailableTimes();
  }, [selectedSport, selectedPitch, bookDate]);

  //const sportName: string = selectedSport.sport;
  // type SportPitchesKeys = keyof typeof field?.sportPitches;
  // const selectedSportKey = selectedSport.sport
  //   .toLowerCase()
  //   .replace(/\s+/g, "") as SportPitchesKeys;

  //type SportPitchesKeys = keyof typeof field?.sportPitches;
  const selectedSportKey = selectedSport.sport
    .toLowerCase()
    .replace(/\s+/g, "");
  //const fields = fieldInfo.sportPitches[sportName] || [];
  return (
    // <ThemedView style={{ flex: 1 }}>
    <View style={{ flex: 1 }}>
      {/* <View
        style={[
          styles.header,
          { backgroundColor: Colors["light"].tabIconSelected },
        ]}
      >
        
      </View> */}
      <ScrollView
        style={{
          backgroundColor: Colors["light"].background,
        }}

        //contentContainerStyle={{ marginBottom: 20 }}
        // gestureHandlerProps={{
        //   // Make sure to allow the parent gesture to work when the scroll view is not handling it
        //   simultaneousHandlers: ["stack"],
        // }}
      >
        <View style={styles.adContainer}>
          <PagerView
            style={styles.pagerView}
            initialPage={0}
            ref={pagerRef}
            onPageSelected={handlePageSelected}
          >
            {carouselData.map((item, index) => (
              <View key={index} style={styles.page}>
                <Image source={item.image} style={styles.image} />
              </View>
            ))}
          </PagerView>
          <View style={styles.dotsContainer}>
            {[...Array(3)].map((_, index) => (
              <TouchableOpacity
                key={index}
                style={[
                  styles.dot,
                  selectedPage === index
                    ? styles.selectedDot
                    : styles.unselectedDot,
                ]}
                onPress={() => pagerRef.current?.setPage(index)}
              />
            ))}
          </View>
        </View>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
            paddingHorizontal: 15,
          }}
        >
          <View>
            <ThemedText>{field?.name}</ThemedText>
            <ThemedText>{field?.address}</ThemedText>
          </View>
          <Pressable
            style={[
              styles.directions,
              {
                borderColor: Colors["light"].tabIconSelected,
                borderRadius: 15,
                borderWidth: 2,
              },
            ]}
            onPress={openFacilityMap}
          >
            <FontAwesome5
              name="directions"
              size={24}
              color={Colors["light"].tabIconSelected}
            />

            <ThemedText
              type="default"
              style={{ color: Colors["light"].tabIconSelected }}
            >
              {" "}
              Get Directions
            </ThemedText>
          </Pressable>
        </View>
        <ThemedText style={styles.subtitle}>Services</ThemedText>
        <View
          style={{
            flexDirection: "row",
            flexWrap: "wrap",
            backgroundColor: "white",
            paddingHorizontal: 15,
            paddingVertical: 10,
          }}
        >
          {field?.services.map((item, index) => {
            const service = servicesData.find(
              (serviceData) => serviceData.name === item
            );
            return (
              <ServiceIcon
                text={service?.name || item}
                iconName={service?.iconName || item}
                key={index}
                iconComponent={service?.iconClass}
              ></ServiceIcon>
            );
          })}
        </View>
        <ThemedText style={styles.subtitle}>Available Activities</ThemedText>
        <SportsView
          sports={availableSports}
          onSportPress={handleSportClick}
          selectedSport={selectedSport.id}
          setSelectedSport={setSelectedSport}
        ></SportsView>

        <ThemedText style={styles.subtitle}>Select Pitch</ThemedText>
        <View>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            //style={styles.sportsView}
          >
            {field?.sportPitches[selectedSportKey]?.map(
              (item: any, index: any) => (
                <Pressable
                  onPress={() => setSelectedPitch(index)}
                  key={index}
                  style={[
                    styles.sportItemContainer,
                    {
                      backgroundColor:
                        selectedPitch === index
                          ? Colors["light"].tabIconSelected
                          : "white",
                    },
                  ]}
                >
                  <Text
                    style={{
                      color: selectedPitch === index ? "white" : "black",
                      fontSize: 12,
                    }}
                    numberOfLines={1}
                    adjustsFontSizeToFit={true}
                  >
                    {item}
                  </Text>
                </Pressable>
              )
            )}
          </ScrollView>
        </View>
        <ThemedText style={styles.subtitle}>Select Date</ThemedText>
        <DateTimePicker
          value={bookDate}
          mode="date"
          //is24Hour={true}
          display="default"
          minimumDate={bookDate}
          //onChange={() => setBookDate}
          onChange={onChange}
          style={{
            //position: "absolute",
            backgroundColor: "white",
            borderColor: "#F0F0F0",

            //borderBottomWidth: 2,

            alignSelf: "flex-start",
            //position: "absolute",
            //width: "auto",
            borderWidth: 3,
          }}
          //onTouchCancel={() => setShowPicker(false)}
        />

        <ThemedText style={styles.subtitle}>Available times</ThemedText>
        <View>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            style={{ borderWidth: 2 }}
            contentContainerStyle={{ marginBottom: 150 }}
          >
            {timesAvail?.map((item, index) => (
              <Pressable
                onPress={() => setSelectedTime(index)}
                key={index}
                style={[
                  styles.sportItemContainer,
                  {
                    backgroundColor:
                      selectedTime === index
                        ? Colors["light"].tabIconSelected
                        : "white",
                  },
                ]}
              >
                <Text
                  style={{
                    color: selectedTime === index ? "white" : "black",
                    fontSize: 12,
                  }}
                  numberOfLines={1}
                  adjustsFontSizeToFit={true}
                >
                  {item}
                </Text>
              </Pressable>
            ))}
          </ScrollView>
        </View>
        {/* {showBookButton && (
          <View
            style={{
              position: "absolute",
              bottom: 0,
              backgroundColor: "white",
              width: "100%",
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
              paddingBottom: 30,
              paddingHorizontal: 10,
            }}
          >
            <ThemedText style={{ fontSize: 25 }}>55$</ThemedText>
            <Button title={"Book Now"} onPress={handleBookingPress}></Button>
          </View>
        )} */}
        {/* </ThemedView> */}
      </ScrollView>
      {showBookButton && (
        <View
          style={{
            position: "absolute",
            bottom: 0,
            backgroundColor: "white",
            width: "100%",
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            paddingBottom: 30,
            paddingHorizontal: 10,
          }}
        >
          <ThemedText style={{ fontSize: 25 }}>55$</ThemedText>
          <Button title={"Book Now"} onPress={handleBookingPress}></Button>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  adContainer: {
    // width: "100%",
    height: 250,
    //borderWidth: 3,
    // justifyContent: "center",
    // alignItems: "center",

    justifyContent: "center",
    alignItems: "center",
  },
  header: {
    height: 75,

    width: "100%",
    alignItems: "center",
    justifyContent: "flex-end",
    //borderRadius: 15,
  },
  dotsContainer: {
    flexDirection: "row",
    justifyContent: "center",
    //marginVertical: -16,
    bottom: 20,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginHorizontal: 4,
  },
  selectedDot: {
    backgroundColor: Colors.light.tabIconSelected,
    borderWidth: 1,
    width: 18,
  },
  unselectedDot: {
    //backgroundColor: "gray",
    backgroundColor: Colors["light"].tabIconDefault,
  },

  subtitle: {
    marginLeft: 10,
    //marginVertical: 8,
    marginTop: 15,
  },
  adImage: {
    //width: 300,
    //height: 200, // Adjust height as needed
    resizeMode: "cover",
  },
  image: {
    width: "100%",
    height: "100%",
    //borderRadius: 20,
  },

  directions: {
    flexDirection: "row",
    borderWidth: 1,
    padding: 7,
  },

  sportItemContainer: {
    //height: 70,
    //width: 70,
    padding: 12,
    alignItems: "center",
    justifyContent: "center",

    marginHorizontal: 5,
    borderRadius: 10,
  },

  pagerView: {
    flex: 1,
    width: "100%",
  },
  page: {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f5f5f5",
    //borderRadius: 30,
    //margin: 10,
  },
});

//export default LoginScreen;
