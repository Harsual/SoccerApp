import {
  StyleSheet,
  Platform,
  ScrollView,
  View,
  Animated,
  Text,
} from "react-native";
import { Image } from "expo-image";
import { HelloWave } from "@/src/components/HelloWave";
import ParallaxScrollView from "@/src/components/ParallaxScrollView";
import { ThemedText } from "@/src/components/ThemedText";
import { ThemedView } from "@/src/components/ThemedView";
import { useEffect, useRef, useState } from "react";

//import Compete from "@/src/assets/fields/field.jpg";

function clamp(num: number, lower: number, upper: number) {
  return Math.min(Math.max(num, lower), upper);
}

const fields: any[] = [
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

export default function Home() {
  // const translateHeader = Animated.diffClamp(scrollY, 0, 80).interpolate({
  //   inputRange: [0, 1],
  //   outputRange: [0, -1],
  //   //extrapolateLeft: "clamp",
  //   //extrapolateRight: "clamp",
  // });

  const [isEndOfScroll, setIsEndOfScroll] = useState(false);
  const [overrideAnimation, setOverrideAnimation] = useState(false);

  const animatedValue = useRef(new Animated.Value(0)).current;
  const scrollY = useRef(new Animated.Value(0)).current;
  const maxScrollY = useRef(0);
  const offset = useRef(0);
  const ScrollY = useRef(0);
  const transformValue = useRef(0);
  const TOOLBAR_HEIGHT = 100;

  const opacity = animatedValue.interpolate({
    inputRange: [-100, 0],
    outputRange: [0, 1],
    extrapolate: "clamp", // Ensures values stay within range
  });

  // const translateHeader = Animated.diffClamp(scrollY, 0, 80).interpolate({
  //   inputRange: [0, 1],
  //   outputRange: [0, -1],
  //   //extrapolateLeft: "clamp",
  //   //extrapolateRight: "clamp",
  // });
  // Function to handle the scroll event
  const handleScroll = (event: any) => {
    ScrollY.current = event.nativeEvent.contentOffset.y;
    //let scrollDiff = ScrollY - initialScrollY.current;

    //animatedValue.setValue()
    //animatedValue.setOffset(ScrollY.current - offset.current);

    // animatedValue.setValue(
    //   clamp(
    //     transformValue.current - (ScrollY.current - offset.current),
    //     -TOOLBAR_HEIGHT,
    //     0
    //   )
    // );
    // let calculatedValue =
    //   offset.current - ScrollY.current + transformValue.current;

    // animatedValue.setValue(clamp(calculatedValue, -TOOLBAR_HEIGHT, 0));

    let calculatedValue = ScrollY.current - offset.current;

    animatedValue.setValue(clamp(-calculatedValue, -TOOLBAR_HEIGHT, 0));

    // if (ScrollY.current > maxScrollY.current) {
    //   maxScrollY.current = ScrollY.current;
    // }

    // if (maxScrollY.current > ScrollY.current) {
    //   animatedValue.setValue(
    //     clamp(
    //       maxScrollY.current - ScrollY.current - TOOLBAR_HEIGHT,
    //       -TOOLBAR_HEIGHT,
    //       0
    //     )
    //   );
    // } else {
    //   animatedValue.setValue(clamp(-ScrollY.current, -TOOLBAR_HEIGHT, 0));
    // }
    //console.log("maxScrollY", maxScrollY);
    //console.log("ScrollY", ScrollY);
    //console.log("offset:", offset);
    //console.log("transform:", transformValue);

    //scrolling.setValue(contentOffset.y)
    //scrollY.setValue(ScrollY);

    //animatedValue.setValue(-maxScrollY.current);

    //let clampedAnimTarget = clamp(scrollDiff, 0, 80);
    //clampedAnimTarget = -clampedAnimTarget;

    //console.log(clampedAnimTarget);

    // Animated.timing(animatedValue, {
    //   toValue: -80 - -1 * scrollDiff, // Custom animation when scrolling up
    //   duration: 0,
    //   useNativeDriver: true,
    // }).start();
    //=> {
    //   if (clampedAnimTarget > -80 && clampedAnimTarget < 0 && endOfScroll) {
    //     console.log("ANIMTING");
    //     Animated.timing(animatedValue, {
    //       toValue: 0, // Custom animation when scrolling up
    //       duration: 300,
    //       useNativeDriver: true,
    //     }).start(() => {
    //       setEndOfScroll(false);
    //     });
    //   }
    // });
  };

  useEffect(() => {
    // Add listener to scrollY
    const listenerId = animatedValue.addListener(({ value }) => {
      // Apply custom logic
      //const customValue = value * 0.3 + 50;
      //console.log("transform:", value);
      transformValue.current = value;
      //console.log("Translate toolbar:", value);
      //console.log(endOfScroll);
      // if (endOfScroll && value < 0 && value > -80) {
      //   let temp = value * 0.5;
      //   console.log("ANIMATING");
      //   Animated.timing(scrollY, {
      //     toValue: 0, // Custom animation when scrolling up
      //     duration: 300,
      //     useNativeDriver: true,
      //   }).start();
      //   setEndOfScroll(false);
      // }
    });
  }, []);

  //   const listenerId2 = scrollY.addListener(({ value }) => {
  //     // Apply custom logic
  //     //const customValue = value * 0.3 + 50;
  //     //console.log("ScrollY Animated toolbar:", value);
  //   });

  //   // Cleanup the listener when the component unmounts
  //   return () => {
  //     scrollY.removeListener(listenerId);
  //   };
  // }, [translateHeader, scrollY]);

  const handleScrollEndDrag = (event: any) => {
    console.log("ScrollEndDrag");
    //console.log("TranslateHeader", translateHeader);
    // Animated.timing(animatedValue, {
    //   toValue: 0, // Custom animation when scrolling up
    //   duration: 300,
    //   useNativeDriver: true,
    // }).start();
    //setEndOfScroll(true);
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

    //animatedValue.setOffset(ScrollY.current);

    /*if (maxScrollY.current > ScrollY.current) {
      maxScrollY.current = ScrollY.current;
    }*/

    //setOverrideAnimation(true);
    // Animated.timing(animatedValue, {
    //   toValue: 0, // Custom animation when scrolling up
    //   duration: 300,
    //   useNativeDriver: true,
    // }).start(() => {
    //   setOverrideAnimation(false);
    //   //
    // });
  };

  const handleMomentumScrollEnd = (event: any) => {
    console.log("MOMENTUM END");
    offset.current = ScrollY.current + transformValue.current;
  };

  return (
    <View
      style={
        {
          //borderWidth: 3
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
      </Animated.View>
      <Animated.ScrollView
        style={styles.container}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { y: scrollY } } }],
          {
            useNativeDriver: true,
            listener: handleScroll,
          }
        )}
        //onScroll={handleScroll}
        onScrollEndDrag={handleScrollEndDrag}
        onMomentumScrollEnd={handleMomentumScrollEnd}
        bounces={false}
        scrollEventThrottle={16}
        //onScroll={handleScroll()}
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

    paddingTop: 90,
  },
  toolbar: {
    position: "absolute",
    width: "100%",
    backgroundColor: "green",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 1,
    height: 80,
  },
  toolbarText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
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

  image: {
    width: "100%",
    height: "100%",
    borderRadius: 20,
  },

  description: {
    flexDirection: "row",
    justifyContent: "space-between",
    //paddingHorizontal: 20,
    //borderWidth: 3,
  },
});

//const scrollY = useRef(new Animated.Value(0)).current;
//const [endOfScroll, setEndOfScroll] = useState(false);
//const [interpolationEnded, setInterpolationEnded] = useState(false);
//let animateY = useRef(new Animated.Value(0)).current;
//const staticPosition = useRef(new Animated.Value(0)).current;
//const lastScrollY = useRef(0);
//const [translateHeader, setTranslateHeader] = useState(0);

//const [toolbarIsVisible, setToolbarIsVisible] = useState(true);
//const [prevScrollY, setPrevScrollY] = useState(0);
//const [scrollDirection, setScrollDirection] = useState("down");

//const [headerHeight, setHeaderHeight] = useState<any>();

//const animatedValue = useRef(new Animated.Value(0)).current;

// Toolbar height and animation range
// const translateHeader = scrollY.interpolate({
//   inputRange: [0, 80], // Adjust these values to control the collapse speed and range
//   outputRange: [0, -80], // The toolbar starts at 100 and collapses to 0
//   extrapolate: "clamp",
// });

// const interpolateAnimation = () => {
//   Animated.timing(animatedValue, {
//     toValue: 1,
//     duration: 500, // Duration for interpolation
//     useNativeDriver: true,
//   }).start();
// };

// Trigger this animation based on your condition
// const animateToStaticPosition = () => {
//   console.log("animating ");
//   Animated.timing(animatedValue, {
//     toValue: 0, // Your desired static value
//     duration: 300, // Duration of the animation
//     useNativeDriver: true,
//   }).start();
// };

// const combinedTranslateY = Animated.add(translateHeader, staticPosition);
// useEffect(() => {
//   //console.log(headerHeight);
// }, [headerHeight]);

// const translateHeader = Animated.diffClamp(scrollY, 0, 80).interpolate({
//   inputRange: [0, 1],
//   outputRange: [0, -1],
//   //extrapolateLeft: "clamp",
//   //extrapolateRight: "clamp",
// });

// const clampedScrollY = Animated.diffClamp(scrollY, 0, 80);

// const translateHeader = clampedScrollY.interpolate({
//   inputRange: [-1, 0, 80],
//   outputRange: [-80, 0, -80],
//   extrapolate: "clamp",
// });

//console.log("scrolly:", ScrollY);

// Clamp the scrollY value directly between 0 and 80
// const animatedValue = Animated.diffClamp(scrollY, 0, 80);
//console.log(animatedValue.__getValue());

//console.log(currentScrollY - lastScrollY.current);
//console.log(translateHeader);
//setHeaderHeight(translateHeader);

// if (currentScrollY < lastScrollY.current) {
//   //setTranslateHeader(lastScrollY.current - currentScrollY);
//   Animated.timing(scrollY, {
//     toValue: 0,
//     duration: 150,
//     useNativeDriver: true,
//   }).start();
// } else {
// }
// if (currentScrollY < lastScrollY.current) {
//   console.log("scrollup");
//   animateToStaticPosition();
// }

// if (currentScrollY > lastScrollY.current) {
//   // Scrolling down - use interpolation
//   Animated.timing(staticPosition, {
//     toValue: 0,
//     duration: 0,
//     useNativeDriver: true,
//   }).start();
// } else {
//   console.log("Animating");
//   // Scrolling up - apply custom animation (e.g., snap to position)
//   Animated.timing(staticPosition, {
//     toValue: -80, // Custom animation when scrolling up
//     duration: 300,
//     useNativeDriver: true,
//   }).start();
// }

// lastScrollY.current = currentScrollY;

// // Determine the scroll direction
// if (currentScrollY < lastScrollY.current) {
//   // Scrolling up
//   Animated.timing(scrollY, {
//     toValue: 0,
//     duration: 150,
//     useNativeDriver: true,
//   }).start();
// } else {
//   // Scrolling down
//   Animated.timing(scrollY, {
//     toValue: 100,
//     duration: 150,
//     useNativeDriver: true,
//   }).start();
// }

// lastScrollY.current = currentScrollY;
