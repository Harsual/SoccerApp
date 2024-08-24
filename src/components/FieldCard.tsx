import { View, StyleSheet, Image, Pressable } from "react-native";
import { ThemedText } from "./ThemedText";

interface FieldCardProps {
  item: any;
  index: number;
}

const handleCardPress = (cardID: any) => {
  console.log(cardID);
};

export default function FieldCard({ item, index }: FieldCardProps) {
  return (
    // <View style={styles.containerItem}>
    <Pressable
      onPress={() => handleCardPress(item.id)}
      style={styles.containerItem}
    >
      <View style={styles.imageContainer}>
        <Image
          source={require("@/src/assets/fields/field2.jpg")}
          style={styles.image}
        />
      </View>
      <ThemedText style={{ marginTop: 10 }}>{item.name}</ThemedText>
      <View style={styles.description}>
        <ThemedText type="description">{item.address}</ThemedText>
        <ThemedText type="subtitle">{item.price}</ThemedText>
      </View>
    </Pressable>
    // </View>
  );
}

const styles = StyleSheet.create({
  imageContainer: {
    //borderWidth: 2,
    //margin: 10,
    height: 145,
  },
  image: {
    width: "100%",
    height: "100%",
    borderRadius: 15,
  },
  description: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  containerItem: {
    //borderWidth: 3,
    //height: 200,
    marginHorizontal: 20,
    marginVertical: 7,
    backgroundColor: "white",
    borderRadius: 15,
    borderColor: "#F0F0F0",

    borderWidth: 1,
    padding: 8,
  },
});
