// app/screens/LoginScreen.tsx
import React, { useEffect, useState, useRef } from "react";
import { View, Text, TextInput, Pressable, StyleSheet } from "react-native";
import Button from "@/src/components/Button";
import { Link, router } from "expo-router";
import { Colors } from "@/src/constants/Colors";
import { ThemedView } from "@/src/components/ThemedView";
import { ThemedText } from "@/src/components/ThemedText";
//import SplashIcon1 from "@/src/assets/icons/GamePlaying.svg";
import SplashIcon1 from "@/src/assets/icons/undraw_mobile_app_re_catg-2.svg";
//import SplashIcon1 from "@/src/assets/icons/Find_venue.svg";
import SplashIcon2 from "@/src/assets/icons/undraw_booking_re_gw4j.svg";
//import SplashIcon2 from "@/src/assets/icons/Compete.svg";
import SplashIcon3 from "@/src/assets/icons/undraw_goal_-0-v5v.svg";
//import SplashIcon3 from "@/src/assets/icons/Win.svg";
import { ROUTES } from "../navigationConstants";
import AppIntroSlider from "react-native-app-intro-slider";
import AppIntroSliderProps from "react-native-app-intro-slider";
import { useColorScheme } from "@/src/hooks/useColorScheme";
//import * as icons from "@/src/assets/icons";
const renderSkip = () => {};
const renderButton = (label: string) => {
  //const label = "Next";
  switch (label) {
    case "Next":
      return <Button title="Next" style={{ marginBottom: 30 }} />;

    case "Done":
      return <Button title="Get Started" style={{ marginBottom: 30 }} />;

    case "Skip":
      return (
        <View style={{ position: "relative" }}>
          <Text
            style={{
              position: "absolute",

              //top: 140, // Adjust the top value to reposition
              //right: 120, // Adjust the right value to reposition
              top: 0,
              right: 0,
              //backgroundColor: "black",
              color: "red",
            }}
          >
            Skip
          </Text>
        </View>
      );

    default:
      return <Button title={label} /*bottomMargin={30}*/ />;
  }
};
//onst IconComponent = icons[componentName ?? "Dog"];
const splashIcons = [SplashIcon1, SplashIcon2, SplashIcon3];
//<IconComponent/>;
// interface AppIntroSliderInstance {
//   goToSlide: (index: number, animated?: boolean) => void;
// }

export default function OnboardingScreen() {
  const [showHomePage, setShowHomePage] = useState(false);
  const colorScheme = useColorScheme();
  const sliderRef = useRef(null);
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);

  const slides = [
    {
      id: 1,
      title: "Discover the Perfect Court",
      description:
        "Explore a curated selection of fields and courts for various sports to easily find your ideal venue",
      //image: "Compete",
      image_index: 0,
    },
    {
      id: 2,
      title: "Effortless Booking",
      description:
        "Seamlessly book your preferred field through the app with efficiency and convenience",
      //image: "GamePlaying",
      image_index: 1,
    },
    {
      id: 3,
      title: "Enjoy the Match!",
      description:
        "Attend your scheduled match and experience the thrill of your favorite sports",
      //image: "Win",
      image_index: 2,
    },
  ];

  const handleSkip = () => {
    sliderRef.current?.goToSlide(slides.length - 1); // Navigate to the last slide
    setCurrentSlideIndex(slides.length - 1);
    // if (sliderRef.current && sliderRef.current.goToSlide) {
    //   sliderRef.current.goToSlide(slides.length - 1); // Navigate to the last slide
    // }
  };

  const onSlideChange = (index: number) => {
    console.log(index);
    setCurrentSlideIndex(index);
  };

  // const renderIcon = (iconName) => {
  //   let myNumber: number = 42;
  //   switch (iconName) {
  //     case 'home':
  //       return <HomeIcon />;
  //     case 'profile':
  //       return <ProfileIcon />;
  //     case 'settings':
  //       return <SettingsIcon />;
  //     default:
  //       return <NotFoundIcon />;
  //   }

  if (!showHomePage) {
    return (
      <ThemedView style={{ flex: 1 }}>
        <AppIntroSlider
          data={slides}
          ref={sliderRef}
          renderNextButton={() => renderButton("Next")}
          renderDoneButton={() => renderButton("Done")}
          //renderSkipButton={() => renderButton("Skip")}
          //showSkipButton={true}
          onSlideChange={onSlideChange}
          onDone={() => router.replace(ROUTES.LOGIN)}
          bottomButton
          activeDotStyle={{
            backgroundColor: Colors[colorScheme ?? "light"].tint,
            marginBottom: 140,
          }}
          dotStyle={{
            backgroundColor: Colors[colorScheme ?? "light"].tabIconDefault,
            marginBottom: 140,
          }}
          renderItem={({ item }) => {
            const IconComponent = splashIcons[item.image_index];
            return (
              <ThemedView style={styles.container}>
                <ThemedView style={styles.vectorIllustration}>
                  <IconComponent width={350} height={300} />
                </ThemedView>

                {/* <SplashIcon1
                style={styles.logoIcon}
                height={280}
                width={280}
              ></SplashIcon1> */}
                <ThemedText type="title" style={styles.logoName}>
                  {item.title}
                </ThemedText>
                <ThemedText type="subtitle" style={styles.description}>
                  {item.description}
                </ThemedText>
              </ThemedView>
            );
          }}
        />

        {currentSlideIndex < slides.length - 1 && (
          <ThemedView style={styles.skipContainer}>
            <Pressable style={styles.skipButton} onPress={handleSkip}>
              <Text style={styles.skipText}>Skip</Text>
            </Pressable>
          </ThemedView>
        )}
      </ThemedView>
    );
  }

  //return <View></View>;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    //justifyContent: "center",
    alignItems: "center",
    //padding: 16,
  },

  vectorIllustration: {
    //marginBottom: 50,
    //borderWidth: 2,
    marginTop: 140,
  },

  logoWrapper: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },

  logoIcon: {
    marginBottom: 50,
  },

  logoName: {
    //color: "#0EAD69",
    textAlign: "center",
    //fontFamily: "Poppins",
    //lineHeight: 'normal',
    marginTop: 50,
    //fontSize: 25,
    //fontStyle: 'normal',
    //fontWeight: 600,
    //lineHeight: 'normal',
  },

  description: {
    //marginBottom: 100,
    marginTop: 15,
    //width: "80%",
    width: 293,
    //fontSize: 18,
    //alignItems: "center",
    // textAlign: "center",
  },

  skipContainer: {
    position: "absolute",
    top: 70, // Positioning for the Skip button
    right: 20,
    zIndex: 10,
  },
  skipButton: {
    padding: 10,
  },
  skipText: {
    color: "black",
    //width: "80%",
    fontSize: 16,
  },
});
