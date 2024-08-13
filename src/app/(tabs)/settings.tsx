import Ionicons from "@expo/vector-icons/Ionicons";
import {
  StyleSheet,
  Image,
  Platform,
  ScrollView,
  FlatList,
  Pressable,
  Text,
  View,
} from "react-native";

import { Collapsible } from "@/src/components/Collapsible";
import { ExternalLink } from "@/src/components/ExternalLink";
import ParallaxScrollView from "@/src/components/ParallaxScrollView";
import { ThemedText } from "@/src/components/ThemedText";
import { ThemedView } from "@/src/components/ThemedView";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { router } from "expo-router";
import CreateProfileScreen from "../screens/CreateProfileScreen";

const settingsList: any[] = [
  {
    name: "profile",
    icon: "user-circle",
    href: "../screens/CreateProfileScreen",
  },
];

export default function SettingsScreen() {
  const handleSettingsPress = (item: any) => {
    //console.log("hello");
    router.push(item.href);
  };

  return (
    <ScrollView style={styles.listContainer}>
      {settingsList.map((item, index) => (
        <Pressable
          onPress={() => handleSettingsPress(item)}
          key={index}
          style={styles.listItemContainer}
        >
          <FontAwesome
            name={item.icon}
            size={40}
            //color={"#345351"}
            style={{ opacity: 1, padding: 15 }}
          ></FontAwesome>
          <ThemedText style={styles.settingsText}>{item.name}</ThemedText>
        </Pressable>
      ))}

      {/* <FlatList
        data={settingsList}
        keyExtractor={(item, index) => index.toString()}
        style={styles.listContainer}
        renderItem={({ item, index }) => (
          <Pressable
            onPress={() => handleSettingsPress()}
            style={styles.listItemContainer}
          >
            <FontAwesome
              name={item.icon}
              size={12}
              //color={"#345351"}
              style={{ opacity: 1 }}
            ></FontAwesome>

            <Text>{item}</Text>
          </Pressable>
        )}
      ></FlatList> */}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  headerImage: {
    color: "#808080",
    bottom: -90,
    left: -35,
    position: "absolute",
  },
  titleContainer: {
    flexDirection: "row",
    gap: 8,
  },

  listContainer: {
    marginTop: 70,
    flex: 1,
    //borderWidth: 3,
  },

  listItemContainer: {
    flexDirection: "row",
    //borderWidth: 3,
    paddingVertical: 15,
    //justifyContent: "center",
    alignItems: "center",
    borderBottomWidth: 2,
  },

  settingsText: {
    //borderBottomWidth: 3,
    //borderWidth: 3,
  },
});
