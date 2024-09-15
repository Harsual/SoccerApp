import React from "react";
import { ThemedText } from "./ThemedText";
import { Pressable, ScrollView, View, Text, StyleSheet } from "react-native";
// import MaterialIcons from "@expo/vector-icons/MaterialIcons";
// import FontAwesome5 from "@expo/vector-icons/FontAwesome5";
// import { MaterialIcons, FontAwesome5 } from '@expo/vector-icons';
import { Colors } from "@/src/constants/Colors";

interface SportsViewInputProps {
  sports: any[];
  onSportPress: (item: any) => void;
  selectedSport: number;
  setSelectedSport: React.Dispatch<React.SetStateAction<number>>;
  // iconComponent: React.ComponentType<{
  //   name: string;
  //   size?: number;
  //   color?: string;
  // }>;
}

export default function SportsView({
  sports,
  onSportPress,
  selectedSport,
  setSelectedSport,
}: //iconComponent: IconComponent,
SportsViewInputProps) {
  return (
    <View>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        //style={styles.sportsView}
        contentContainerStyle={styles.sportsView}
      >
        {sports.map((item, index) => {
          const IconComponent = item.component;
          return (
            <Pressable
              onPress={() => onSportPress(item)}
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
              {/* <MaterialIcons
              name={item.svg}
              size={35}
              color={selectedSport === item.id ? "white" : "black"}
            /> */}
              <IconComponent
                name={item.svg}
                size={item.iconSize}
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
          );
        })}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  sportsView: {
    width: "100%",
    height: "auto",
    //borderWidth: 10,
    marginVertical: 3,
  },

  sportItemContainer: {
    height: 70,
    width: 70,

    alignItems: "center",
    justifyContent: "center",

    marginHorizontal: 5,
    borderRadius: 10,
  },
});
