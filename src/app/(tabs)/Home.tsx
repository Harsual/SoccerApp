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
import { router, useNavigation } from "expo-router";
import { BottomTabNavigationProp } from "@react-navigation/bottom-tabs";
import { useScrollToTop } from "@react-navigation/native";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { SearchBar } from "react-native-screens";
import { Colors } from "@/src/constants/Colors";
import PagerView from "react-native-pager-view";
import FieldCard from "@/src/components/FieldCard";
import axios from "axios";
import { createShimmerPlaceHolder } from "expo-shimmer-placeholder";
import { LinearGradient } from "expo-linear-gradient";
import { ROUTES } from "../navigationConstants";
import { setFields, Field, getFields } from "@/src/app/fieldsStore";
import Constants from "expo-constants";

const HOST = Constants.expoConfig?.extra?.HOST;
//const Host = "localhost";
const ShimmerPlaceHolder = createShimmerPlaceHolder(LinearGradient);

//import Compete from "@/src/assets/fields/field.jpg";

function clamp(num: number, lower: number, upper: number) {
  return Math.min(Math.max(num, lower), upper);
}

interface CarouselItem {
  id: number;
  image: string; // The image is a string (URL or path to the image)
}

// interface Field {
//   id: number;
//   name: string;
//   //sports: string[];
//   sportPitches: any;
// }

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
  //const [fields, setFields] = useState([]);
  const [filteredFields, setFilteredFields] = useState<Field[]>([]);
  //const fields = useRef<Field[]>([]);
  //const fields = getFields();

  const flatListRef = useRef<FlatList>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedPage, setSelectedPage] = useState(0);
  const [isLoaded, setIsLoaded] = useState(false);
  const [carouselData, setCarouselData] = useState<CarouselItem[]>([]);
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

    // console.log("ScrollY", ScrollY);
    // console.log("offset:", offset);
    // console.log("transform:", transformValue);
  };

  useEffect(() => {
    // Add listener to scrollY
    const listenerId = animatedValue.addListener(({ value }) => {
      transformValue.current = value;
    });
  }, []);

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

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`http://${HOST}:4000/data/getData`);
        //console.log(response.data);

        setCarouselData(response.data.ads);
        //fields.current = response.data.fields;

        setFields(response.data.fields);
        //setFields(response.data.fields);
        const selectedSportName = sports.find((sport) => sport.id === 0)?.sport;

        // const filtered_Fields = (fields.current as Field[]).filter((field) => {
        //   const sportFields =
        //     field.sportPitches[
        //       selectedSportName.toLowerCase().replace(/\s+/g, "")
        //     ];
        //   return sportFields && sportFields.length > 0;
        // });

        const filtered_Fields = (getFields() as Field[]).filter((field) => {
          const sportFields =
            field.sportPitches[
              selectedSportName.toLowerCase().replace(/\s+/g, "")
            ];
          return sportFields && sportFields.length > 0;
        });

        //console.log(filteredFields);

        setFilteredFields(filtered_Fields);
        setIsLoaded(true);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  const handleScrollEndDrag = (event: any) => {
    //console.log("ScrollEndDrag");

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
    //console.log("MOMENTUM END");

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

  const handleCardPress = (cardID: number) => {
    //console.log(typeof cardID);
    router.push({
      pathname: ROUTES.FIELD,
      params: { cardID: cardID },
    });
  };

  const handleSportClick = (item: any) => {
    if (item.id === selectedSport) {
      scrollToTopManually();
    }

    setSelectedSport(item.id);
    const selectedSportName = sports.find(
      (sport) => sport.id === item.id
    )?.sport;

    //console.log(selectedSportName);
    // const filtered_Fields = (fields.current as Field[]).filter((field) =>
    //   field.sports.some(
    //     (sport: string) =>
    //       sport.trim().toLowerCase() === selectedSportName.toLowerCase()
    //   )
    // );

    // const filtered_Fields = (fields.current as Field[]).filter((field) => {
    //   const sportFields =
    //     field.sportPitches[selectedSportName.toLowerCase().replace(/\s+/g, "")];
    //   return sportFields && sportFields.length > 0;
    // });

    const filtered_Fields = (getFields() as Field[]).filter((field) => {
      const sportFields =
        field.sportPitches[selectedSportName.toLowerCase().replace(/\s+/g, "")];
      return sportFields && sportFields.length > 0;
    });

    setFilteredFields(filtered_Fields);
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

        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.sportsView}
        >
          {sports.map((item, index) =>
            !isLoaded ? (
              <ShimmerPlaceHolder
                visible={false}
                style={styles.sportItemContainer}
                key={index}
              ></ShimmerPlaceHolder>
            ) : (
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
            )
          )}
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
            {carouselData.map((item, index) => (
              <View key={index} style={styles.page}>
                <Image
                  source={require("@/src/assets/fields/Frame_1.jpg")}
                  style={styles.image}
                />
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
        <Text>{filteredFields.length}</Text>
        {filteredFields.length > 0 ? (
          filteredFields.map((item, index) => (
            <FieldCard
              item={item}
              index={index}
              key={index}
              handleCardPress={handleCardPress}
            ></FieldCard>
          ))
        ) : (
          <Text>No fields available</Text> // Fallback UI when the array is empty
        )}
      </Animated.ScrollView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 160,
  },

  header: {
    height: 75,

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
    paddingBottom: 160,
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
