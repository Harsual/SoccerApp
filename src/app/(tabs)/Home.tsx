import {
  StyleSheet,
  Platform,
  ScrollView,
  View,
  Animated,
  Text,
  Pressable,
  TextInput,
} from "react-native";
import { Image } from "expo-image";
import { HelloWave } from "@/src/components/HelloWave";
import ParallaxScrollView from "@/src/components/ParallaxScrollView";
import { ThemedText } from "@/src/components/ThemedText";
import { ThemedView } from "@/src/components/ThemedView";
import { useEffect, useRef, useState } from "react";
import { useNavigation } from "expo-router";
import { BottomTabNavigationProp } from "@react-navigation/bottom-tabs";
import { useScrollToTop } from "@react-navigation/native";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { SearchBar } from "react-native-screens";

//import Compete from "@/src/assets/fields/field.jpg";

function clamp(num: number, lower: number, upper: number) {
  return Math.min(Math.max(num, lower), upper);
}

const fields: any[] = [
  {
    name: "Community Center",
    address: "testing123",
    price: "30$/hr",
    sports: ["soccer, volleyball, basketball, badminton"],
    //image: require("src/assets/fields/field.jpeg"),
  },

  {
    name: "Community Center",
    address: "testing123",
    price: "30$/hr",
    sports: ["soccer, volleyball"],
    //image: require("src/assets/fields/field.jpeg"),
  },

  {
    name: "Community Center",
    address: "testing123",
    price: "30$/hr",
    sports: ["soccer, volleyball, basketball, badminton"],
    //image: require("src/assets/fields/field.jpeg"),
  },

  {
    name: "Community Center",
    address: "testing123",
    price: "30$/hr",
    sports: ["soccer"],
    //image: require("src/assets/fields/field.jpeg"),
  },

  {
    name: "Community Center",
    address: "testing123",
    price: "30$/hr",
    sports: ["volleyball"],
    //image: require("src/assets/fields/field.jpeg"),
  },
  {
    name: "Community Center",
    address: "testing123",
    price: "30$/hr",
    sports: [" basketball, badminton"],
    //image: require("src/assets/fields/field.jpeg"),
  },
  {
    name: "Community Center",
    address: "testing123",
    price: "30$/hr",
    sports: ["soccer", "badminton"],
    //image: require("src/assets/fields/field.jpeg"),
  },
  {
    name: "Community Center",
    address: "testing123",
    price: "30$/hr",
    sports: ["soccer, volleyball, basketball, badminton"],
    //image: require("src/assets/fields/field.jpeg"),
  },
  {
    name: "Community Center",
    address: "testing123",
    price: "30$/hr",
    sports: ["soccer, volleyball, basketball, badminton"],
    //image: require("src/assets/fields/field.jpeg"),
  },
  {
    name: "Community Center",
    address: "testing123",
    price: "30$/hr",
    sports: ["badminton"],
    //image: require("src/assets/fields/field.jpeg"),
  },
  {
    name: "Community Center",
    address: "testing123",
    price: "30$/hr",
    sports: ["soccer, volleyball, basketball, badminton"],
    //image: require("src/assets/fields/field.jpeg"),
  },
  {
    name: "Community Center",
    address: "testing123",
    price: "30$/hr",
    sports: ["table tennis"],
    //image: require("src/assets/fields/field.jpeg"),
  },
  {
    name: "Community Center",
    address: "testing123",
    price: "30$/hr",
    //image: require("src/assets/fields/field.jpeg"),
  },
  {
    name: "Community Center",
    address: "testing123",
    price: "30$/hr",
    //image: require("src/assets/fields/field.jpeg"),
  },
  {
    name: "Community Center",
    address: "testing123",
    price: "30$/hr",
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
  // const translateHeader = Animated.diffClamp(scrollY, 0, 80).interpolate({
  //   inputRange: [0, 1],
  //   outputRange: [0, -1],
  //   //extrapolateLeft: "clamp",
  //   //extrapolateRight: "clamp",
  // });
  type TabParamList = {
    Home: undefined;
    // Other tabs
  };
  const [isEndOfScroll, setIsEndOfScroll] = useState(false);
  const [overrideAnimation, setOverrideAnimation] = useState(false);
  const [selectedSport, setSelectedSport] = useState(0);
  const [searchQuery, setSearchQuery] = useState("");

  const animatedValue = useRef(new Animated.Value(0)).current;
  const scrollY = useRef(new Animated.Value(0)).current;
  const maxScrollY = useRef(0);
  const offset = useRef(0);
  const ScrollY = useRef(0);
  const transformValue = useRef(0);
  // Define the ref with the correct type
  // const scrollViewRef = useRef<ScrollView | null>(null);
  // const navigation = useNavigation<BottomTabNavigationProp<TabParamList>>();
  const TOOLBAR_HEIGHT = 100;

  const ref = useRef(null);

  useScrollToTop(ref);

  const opacity = animatedValue.interpolate({
    inputRange: [-100, 0],
    outputRange: [0, 1],
    extrapolate: "clamp", // Ensures values stay within range
  });

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
    setSelectedSport(item.id);
    console.log("test");
  };

  return (
    <View
      style={
        {
          //borderWidth: 3
          //backgroundColor: "white",
          //marginTop: 50,
        }
      }
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
        <Text style={styles.toolbarText}>Toolbar</Text>
        <TextInput
          style={styles.searchBar}
          placeholder="Search"
          value={searchQuery}
          onChangeText={(text) => setSearchQuery(text)}
        />
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
                    selectedSport === item.id ? "green" : "white",
                },
              ]}
            >
              <MaterialIcons
                name={item.svg}
                size={35}
                color={selectedSport === item.id ? "white" : "black"}
              />
              <Text
                style={{ color: selectedSport === item.id ? "white" : "black" }}
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
        {fields.map((item, index) => (
          <View style={styles.containerItem} key={index}>
            <View style={styles.imageContainer}>
              <Image
                source={require("../../assets/fields/field2.jpg")}
                style={styles.image}
              />
            </View>
            <ThemedText>{item.name}</ThemedText>
            <View style={styles.description}>
              <ThemedText type="description">{item.address}</ThemedText>
              <ThemedText type="subtitle">{item.price}</ThemedText>
            </View>
          </View>
        ))}
      </Animated.ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    //borderWidth: 5,
    backgroundColor: "#F3FFFA",

    paddingTop: 100,
  },

  contentContainer: {
    paddingBottom: 100,
  },
  toolbar: {
    position: "absolute",
    width: "100%",
    backgroundColor: "white",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 1,
    paddingTop: 50,
    //marginTop: 60,
    //height: 80,
  },
  toolbarText: {
    color: "black",
    fontSize: 18,
    fontWeight: "bold",
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
    borderRadius: 5,
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
