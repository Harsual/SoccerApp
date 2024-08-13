import { StyleSheet, Platform, ScrollView, View } from "react-native";
import { Image } from "expo-image";
import { HelloWave } from "@/src/components/HelloWave";
import ParallaxScrollView from "@/src/components/ParallaxScrollView";
import { ThemedText } from "@/src/components/ThemedText";
import { ThemedView } from "@/src/components/ThemedView";

//import Compete from "@/src/assets/fields/field.jpg";

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
];

export default function Home() {
  return (
    // {settingsList.map((item, index) => (
    //   <Pressable
    //     onPress={() => handleSettingsPress(item)}
    //     key={index}
    //     style={styles.listItemContainer}
    //   >
    //     <FontAwesome
    //       name={item.icon}
    //       size={40}
    //       //color={"#345351"}
    //       style={{ opacity: 1, padding: 15 }}
    //     ></FontAwesome>
    //     <ThemedText style={styles.settingsText}>{item.name}</ThemedText>
    //   </Pressable>
    // ))}

    <ScrollView style={styles.container}>
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
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    //borderWidth: 5,
    backgroundColor: "#F3FFFA",
    paddingTop: 40,
  },
  containerItem: {
    //borderWidth: 3,
    //height: 200,
    marginHorizontal: 15,
    marginVertical: 7,
    backgroundColor: "white",
    borderRadius: 20,
  },

  imageContainer: {
    //borderWidth: 2,
    margin: 10,
    height: 200,
  },

  image: {
    width: "100%",
    height: "100%",
    borderRadius: 20,
  },

  description: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    //borderWidth: 3,
  },
});
