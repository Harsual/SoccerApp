import {
  StyleSheet,
  Platform,
  ScrollView,
  View,
  Animated,
  Text,
  Pressable,
  TextInput,
  FlatList,
  TouchableOpacity,
} from "react-native";
import { Image } from "expo-image";
import { HelloWave } from "@/src/components/HelloWave";
import ParallaxScrollView from "@/src/components/ParallaxScrollView";
import { ThemedText } from "@/src/components/ThemedText";
import { ThemedView } from "@/src/components/ThemedView";
import { SetStateAction, useEffect, useRef, useState } from "react";
import { useNavigation } from "expo-router";
import { BottomTabNavigationProp } from "@react-navigation/bottom-tabs";
import { useScrollToTop } from "@react-navigation/native";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { SearchBar } from "react-native-screens";
import { Colors } from "@/src/constants/Colors";
import PagerView from "react-native-pager-view";
import FieldCard from "@/src/components/FieldCard";

//import Compete from "@/src/assets/fields/field.jpg";

function clamp(num: number, lower: number, upper: number) {
  return Math.min(Math.max(num, lower), upper);
}

const carouselData = [
  { id: 0, image: require("../../assets/fields/field2.jpg") },
  { id: 1, image: require("../../assets/fields/field2.jpg") },
  { id: 2, image: require("../../assets/fields/field2.jpg") },
  // Add more images as needed
];

const fieldsList: any[] = [
  {
    id: 0,
    name: "Community Center",
    address: "testing123",
    price: "30$/hr",
    sports: ["soccer", "volleyball", "basketball", "badminton"],
    //image: require("src/assets/fields/field.jpeg"),
  },

  {
    id: 1,
    name: "Community Center",
    address: "testing123",
    price: "30$/hr",
    sports: ["soccer", "volleyball"],
    //image: require("src/assets/fields/field.jpeg"),
  },

  {
    id: 2,
    name: "Community Center",
    address: "testing123",
    price: "30$/hr",
    sports: ["soccer", "volleyball", "basketball", "badminton"],
    //image: require("src/assets/fields/field.jpeg"),
  },

  {
    id: 3,
    name: "Community Center",
    address: "testing123",
    price: "30$/hr",
    sports: ["soccer"],
    //image: require("src/assets/fields/field.jpeg"),
  },

  {
    id: 4,
    name: "Community Center",
    address: "testing123",
    price: "30$/hr",
    sports: ["volleyball"],
    //image: require("src/assets/fields/field.jpeg"),
  },
  {
    id: 5,
    name: "Community Center",
    address: "testing123",
    price: "30$/hr",
    sports: [" basketball", "badminton"],
    //image: require("src/assets/fields/field.jpeg"),
  },
  {
    id: 6,
    name: "Community Center",
    address: "testing123",
    price: "30$/hr",
    sports: ["soccer", "badminton"],
    //image: require("src/assets/fields/field.jpeg"),
  },
  {
    id: 7,
    name: "Community Center",
    address: "testing123",
    price: "30$/hr",
    sports: ["soccer", "volleyball", "basketball", "badminton"],
    //image: require("src/assets/fields/field.jpeg"),
  },
  {
    id: 8,
    name: "Community Center",
    address: "testing123",
    price: "30$/hr",
    sports: ["soccer", "volleyball", "basketball", "badminton"],
    //image: require("src/assets/fields/field.jpeg"),
  },
  {
    id: 9,
    name: "Community Center",
    address: "testing123",
    price: "30$/hr",
    sports: ["badminton"],
    //image: require("src/assets/fields/field.jpeg"),
  },
  {
    id: 10,
    name: "Community Center",
    address: "testing123",
    price: "30$/hr",
    sports: ["soccer", "volleyball", "basketball", "badminton"],
    //image: require("src/assets/fields/field.jpeg"),
  },
  {
    id: 11,
    name: "Community Center",
    address: "testing123",
    price: "30$/hr",
    sports: ["table tennis"],
    //image: require("src/assets/fields/field.jpeg"),
  },
  {
    id: 12,
    name: "Community Center",
    address: "testing123",
    price: "30$/hr",
    sports: ["soccer", "volleyball", "basketball", "badminton"],
    //image: require("src/assets/fields/field.jpeg"),
  },
  {
    id: 13,
    name: "Community Center",
    address: "testing123",
    price: "30$/hr",
    sports: ["soccer", "volleyball", "basketball", "badminton"],
    //image: require("src/assets/fields/field.jpeg"),
  },
  {
    id: 14,
    name: "Community Center",
    address: "testing123",
    price: "30$/hr",
    sports: ["soccer", "volleyball", "basketball", "badminton"],
    //image: require("src/assets/fields/field.jpeg"),
  },
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

export default function Home() {
  type TabParamList = {
    Home: undefined;
    // Other tabs
  };

  const [isEndOfScroll, setIsEndOfScroll] = useState(false);
  const [overrideAnimation, setOverrideAnimation] = useState(false);
  const [selectedSport, setSelectedSport] = useState(0);
  const [searchQuery, setSearchQuery] = useState("");
  const [fields, setFields] = useState(fieldsList);
  const flatListRef = useRef<FlatList>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedPage, setSelectedPage] = useState(0);
  const pagerRef = useRef<PagerView>(null);

  const animatedValue = useRef(new Animated.Value(0)).current;
  const scrollY = useRef(new Animated.Value(0)).current;
  const maxScrollY = useRef(0);
  const offset = useRef(0);
  const ScrollY = useRef(0);
  const transformValue = useRef(0);

  const TOOLBAR_HEIGHT = 100;

  const ref = useRef(null);

  useScrollToTop(ref);

  const opacity = animatedValue.interpolate({
    inputRange: [-100, 0],
    outputRange: [0, 1],
    extrapolate: "clamp", // Ensures values stay within range
  });

  const scrollToTopManually = () => {
    if (ref.current) {
      ref.current?.scrollTo({ y: 0, animated: true });
    }
  };

  // Function to handle the scroll event
  const handleScroll = (event: any) => {
    ScrollY.current = event.nativeEvent.contentOffset.y;

    let calculatedValue = ScrollY.current - offset.current;

    animatedValue.setValue(clamp(-calculatedValue, -TOOLBAR_HEIGHT, 0));

    console.log("ScrollY", ScrollY);
    console.log("offset:", offset);
    console.log("transform:", transformValue);
  };

  useEffect(() => {
    // Add listener to scrollY
    const listenerId = animatedValue.addListener(({ value }) => {
      transformValue.current = value;
    });
  }, []);

  // useEffect(() => {
  //   const interval = setInterval(() => {
  //     if (flatListRef.current) {
  //       setCurrentIndex((prevIndex) =>
  //         prevIndex === carouselData.length - 1 ? 0 : prevIndex + 1
  //       );
  //     }
  //   }, 3000); // Change slide every 3 seconds

  //   return () => clearInterval(interval);
  // }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      const nextPage = (selectedPage + 1) % 3; // Loop through pages (3 pages in this example)
      pagerRef.current?.setPage(nextPage);
      setSelectedPage(nextPage);
    }, 4500); // Change page every 6 seconds

    return () => clearInterval(interval); // Clear interval on unmount
  }, [selectedPage]);

  useEffect(() => {
    if (flatListRef.current) {
      flatListRef.current.scrollToIndex({
        index: currentIndex,
        animated: true,
      });
    }
  }, [currentIndex]);

  const handleScrollEndDrag = (event: any) => {
    console.log("ScrollEndDrag");

    if (ScrollY.current > 0) {
      if (
        transformValue.current > -TOOLBAR_HEIGHT &&
        transformValue.current < 0
      ) {
        Animated.timing(animatedValue, {
          toValue: 0, // Custom animation when scrolling up
          duration: 300,
          useNativeDriver: true,
        }).start(() => {
          offset.current = ScrollY.current;
        });
      } else {
        offset.current = ScrollY.current + transformValue.current;
      }
    }
  };

  const handleMomentumScrollEnd = (event: any) => {
    console.log("MOMENTUM END");

    if (
      transformValue.current > -TOOLBAR_HEIGHT &&
      transformValue.current < 0
    ) {
      Animated.timing(animatedValue, {
        toValue: 0, // Custom animation when scrolling up
        duration: 300,
        useNativeDriver: true,
      }).start(() => {
        offset.current = ScrollY.current;
      });
    } else {
      offset.current = ScrollY.current + transformValue.current;
    }
  };

  const handleSportClick = (item: any) => {
    //console.log()
    //const filteredFields = fields.filter(field => field.sports.includes(selectedSport))

    if (item.id === selectedSport) {
      scrollToTopManually();
    }

    setSelectedSport(item.id);
    const selectedSportName = sports.find(
      (sport) => sport.id === item.id
    )?.sport;

    console.log(selectedSportName);
    const filteredFields = fieldsList.filter((field) =>
      field.sports.some(
        (sport: string) =>
          sport.trim().toLowerCase() === selectedSportName.toLowerCase()
      )
    );

    setFields(filteredFields);
  };

  const handlePageSelected = (event: any) => {
    setSelectedPage(event.nativeEvent.position);
    //pagerRef.current?.setPage(index);
  };

  return (
    <ThemedView
      style={{
        flex: 1,
      }}
    >
      <Animated.View
        style={[
          styles.toolbar,

          {
            transform: [
              {
                //translateY: overrideAnimation ? animatedValue : translateHeader,
                translateY: animatedValue,
              },
            ],
            opacity: opacity,
          },
        ]}
      >
        <View
          style={[
            styles.header,
            { backgroundColor: Colors["light"].tabIconSelected },
          ]}
        >
          <Text style={styles.toolbarText}>SoccerApp</Text>
        </View>

        {/* <TextInput
          style={styles.searchBar}
          placeholder="Search"
          value={searchQuery}
          onChangeText={(text) => setSearchQuery(text)}
        /> */}

        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          //style={styles.sportsView}
          contentContainerStyle={styles.sportsView}
        >
          {sports.map((item, index) => (
            <Pressable
              onPress={() => handleSportClick(item)}
              key={index}
              style={[
                styles.sportItemContainer,
                {
                  backgroundColor:
                    selectedSport === item.id
                      ? Colors["light"].tabIconSelected
                      : "white",
                },
              ]}
            >
              <MaterialIcons
                name={item.svg}
                size={35}
                color={selectedSport === item.id ? "white" : "black"}
              />
              <Text
                style={{
                  color: selectedSport === item.id ? "white" : "black",
                  fontSize: 12,
                }}
                numberOfLines={1}
                adjustsFontSizeToFit={true}
              >
                {item.sport}
              </Text>
            </Pressable>
          ))}
        </ScrollView>
      </Animated.View>
      <Animated.ScrollView
        style={styles.container}
        contentContainerStyle={styles.contentContainer}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { y: scrollY } } }],
          {
            useNativeDriver: true,
            listener: handleScroll,
          }
        )}
        ref={ref}
        //onScroll={handleScroll}
        onScrollEndDrag={handleScrollEndDrag}
        onMomentumScrollEnd={handleMomentumScrollEnd}
        bounces={true}
        scrollEventThrottle={8}
      >
        <View style={styles.adContainer}>
          <PagerView
            style={styles.pagerView}
            initialPage={0}
            ref={pagerRef}
            onPageSelected={handlePageSelected}
          >
            {/* <View key="1" style={styles.page}>
              <Text>Page 1</Text>
            </View>
            <View key="2" style={styles.page}>
              <Text>Page 2</Text>
            </View>
            <View key="3" style={styles.page}>
              <Text>Page 3</Text>
            </View> */}
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

        {fields.map((item, index) => (
          // <View style={styles.containerItem} key={index}>
          //   <View style={styles.imageContainer}>
          //     <Image
          //       source={require("../../assets/fields/field2.jpg")}
          //       style={styles.image}
          //     />
          //   </View>
          //   <ThemedText>{item.name}</ThemedText>
          //   <View style={styles.description}>
          //     <ThemedText type="description">{item.address}</ThemedText>
          //     <ThemedText type="subtitle">{item.price}</ThemedText>
          //   </View>
          // </View>
          <FieldCard item={item} index={index} key={index}></FieldCard>
        ))}
      </Animated.ScrollView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    //borderWidth: 5,
    //backgroundColor: "#F3FFFA",

    paddingTop: 160,
  },

  header: {
    height: 75,
    //backgroundColor: "green",
    width: "100%",
    alignItems: "center",
    justifyContent: "flex-end",
    borderRadius: 15,
  },

  pagerView: {
    flex: 1,
    width: "100%",
  },
  page: {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f5f5f5",
    borderRadius: 30,
    margin: 10,
  },

  contentContainer: {
    //paddingBottom: 150,
  },
  toolbar: {
    position: "absolute",
    width: "100%",
    backgroundColor: "white",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 1,
    //paddingTop: 50,
    //marginTop: 60,
    //height: 80,
  },
  toolbarText: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
    paddingVertical: 5,
  },

  searchBar: {
    borderWidth: 2,
    borderColor: "black",
    width: "80%",
  },

  containerItem: {
    //borderWidth: 3,
    //height: 200,
    marginHorizontal: 15,
    marginVertical: 7,
    backgroundColor: "white",
    borderRadius: 20,
    borderColor: "#F0F0F0",

    borderWidth: 2,
    padding: 12,
  },
  adContainer: {
    // width: "100%",
    height: 200,
    //borderWidth: 3,
    // justifyContent: "center",
    // alignItems: "center",
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  dotsContainer: {
    flexDirection: "row",
    justifyContent: "center",
    marginVertical: 16,
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

  imageContainer: {
    //borderWidth: 2,
    //margin: 10,
    height: 150,
  },

  sportsView: {
    width: "100%",

    marginVertical: 10,
  },

  sportItemContainer: {
    height: 70,
    width: 70,

    alignItems: "center",
    justifyContent: "center",

    marginHorizontal: 5,
    borderRadius: 10,
  },

  image: {
    width: "100%",
    height: "100%",
    borderRadius: 20,
  },

  description: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
});
