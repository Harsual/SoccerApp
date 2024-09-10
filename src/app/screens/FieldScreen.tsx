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
} from "react-native";

import { router } from "expo-router";

import PagerView from "react-native-pager-view";
import FontAwesome5 from "@expo/vector-icons/FontAwesome5";
import FontAwesome6 from "@expo/vector-icons/FontAwesome6";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import ServiceIcon from "@/src/components/ServiceIcon";
import SportsView from "@/src/components/SportsView";
import { Colors } from "@/src/constants/Colors";
import DateTimePicker from "@react-native-community/datetimepicker";
import Button from "@/src/components/Button";
import axios from "axios";

export default function FieldScreen() {
  const handleSportClick = (item: any) => {
    setSelectedSport(item);
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
    },
    {
      id: 1,
      sport: "volleyball",
      svg: "sports-volleyball",
    },
    {
      id: 2,
      sport: "basketball",
      svg: "sports-basketball",
    },
    {
      id: 3,
      sport: "badminton",
      svg: "sports-tennis",
    },
    {
      id: 4,
      sport: "table tennis",
      svg: "sports-soccer",
    },
  ];

  //   const sports: any[] = [
  //     {
  //       id: 0,
  //       sport: "soccer",
  //       svg: "sports-soccer",
  //     },
  //     {
  //       id: 1,
  //       sport: "volleyball",
  //       svg: "sports-volleyball",
  //     },
  //     {
  //       id: 2,
  //       sport: "basketball",
  //       svg: "sports-basketball",
  //     },
  //     {
  //       id: 3,
  //       sport: "badminton",
  //       svg: "sports-tennis",
  //     },
  //     {
  //       id: 4,
  //       sport: "table tennis",
  //       svg: "sports-soccer",
  //     },
  //   ];

  //const pitches: string[] = [" 5 v 5", "7 v 7", "9 v 9", "10 v 10"];

  const fieldInfo = {
    id: 1,
    name: "community center",
    address: "testing123",
    services: ["parking", "washroom", "water-fountain", "football", "bibs"],
    // sports: ["soccer", "volleyball", "table tennis"],
    // pitches: [" field 4", "field 3", "field 2", "field 1", ""],
    sportPitches: {
      soccer: ["field 1", "field 2", "field 3", "field 4"],
      volleyball: ["field 1", "field 3"], // assuming volleyball can only be played on certain fields
      tabletennis: ["field 2", "field 4"], //
    },

    //   sportPitches:[
    //     {sport: "soccer", fields: ["field 1", "field 2", "field 3", "field 4"]},
    //     {sport: "soccer", fields: ["field 1", "field 2", "field 3", "field 4"]},
    // ]
  };

  // Function to normalize the sport name for comparison
  // function normalizeSportName(sportName: string) {
  //   return sportName.replace(/\s+/g, "").toLowerCase();
  // }

  // Filter the sports array
  const availableSports = sports.filter((sport) =>
    Object.keys(fieldInfo.sportPitches).includes(
      sport.sport.toLowerCase().replace(/\s+/g, "")
    )
  );

  //const timesAvail: string[] = ["04:00", "05:00", "06:00", "07:00"];

  const pagerRef = useRef<PagerView>(null);
  const [selectedPage, setSelectedPage] = useState(0);
  const [selectedSport, setSelectedSport] = useState(sports[0]);
  const [selectedPitch, setSelectedPitch] = useState(0);
  const [selectedTime, setSelectedTime] = useState<undefined | number>();
  const [showBookButton, setShowBookButton] = useState(false);
  const [bookDate, setBookDate] = useState<Date>(new Date());
  const [timesAvail, setTimesAvail] = useState<undefined | string[]>([]);

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
      if (selectedSport && selectedPitch !== undefined && bookDate) {
        try {
          const response = await axios.get(
            "http://localhost:4000/times/getAvailTimes",
            {
              params: {
                facilityID: fieldInfo.id,
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
  type SportPitchesKeys = keyof typeof fieldInfo.sportPitches;
  const selectedSportKey = selectedSport.sport
    .toLowerCase()
    .replace(/\s+/g, "") as SportPitchesKeys;
  //const fields = fieldInfo.sportPitches[sportName] || [];
  return (
    <ThemedView style={{ flex: 1 }}>
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
          <ThemedText>Field Name</ThemedText>
          <ThemedText>Address</ThemedText>
        </View>
        <View>
          <ThemedText>Get Directions</ThemedText>
        </View>
      </View>
      <ThemedText>Services</ThemedText>
      <View
        style={{
          flexDirection: "row",
          flexWrap: "wrap",
          backgroundColor: "white",
          paddingHorizontal: 15,
          paddingVertical: 10,
        }}
      >
        {/* {carouselData.map((item, index) => (
          <View key={index} style={styles.page}>
            <Image source={item.image} style={styles.image} />
          </View>
        ))} */}
        {fieldInfo.services.map((item, index) => {
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
      <ThemedText>Available Activities</ThemedText>
      <SportsView
        sports={availableSports}
        onSportPress={handleSportClick}
        selectedSport={selectedSport.id}
        setSelectedSport={setSelectedSport}
      ></SportsView>

      <ThemedText>Select Pitch</ThemedText>
      <View>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          //style={styles.sportsView}
        >
          {/* {pitches.map((item, index) => (
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
          ))} */}

          {fieldInfo.sportPitches[selectedSportKey]?.map((item, index) => (
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
          ))}
        </ScrollView>
      </View>
      <ThemedText>Select Date</ThemedText>
      <DateTimePicker
        value={bookDate}
        mode="date"
        //is24Hour={true}
        display="default"
        onChange={() => setBookDate}
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

      <ThemedText>Available times</ThemedText>
      <View>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          //style={styles.sportsView}
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
    </ThemedView>
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
    backgroundColor: "blue",
    width: 18,
  },
  unselectedDot: {
    backgroundColor: "gray",
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
