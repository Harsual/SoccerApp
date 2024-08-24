// app/screens/LoginScreen.tsx
import { ThemedText } from "@/src/components/ThemedText";
import { ThemedView } from "@/src/components/ThemedView";
import React, { useRef, useState } from "react";
import { View, StyleSheet, Image, TouchableOpacity } from "react-native";

import PagerView from "react-native-pager-view";

export default function FieldScreen() {
  const carouselData = [
    { id: 0, image: require("../../assets/fields/field2.jpg") },
    { id: 1, image: require("../../assets/fields/field2.jpg") },
    { id: 2, image: require("../../assets/fields/field2.jpg") },
    // Add more images as needed
  ];

  const pagerRef = useRef<PagerView>(null);
  const [selectedPage, setSelectedPage] = useState(0);

  const handlePageSelected = (event: any) => {
    setSelectedPage(event.nativeEvent.position);
    //pagerRef.current?.setPage(index);
  };
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
