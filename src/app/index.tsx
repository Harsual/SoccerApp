import { Text, View } from "react-native";
import { Redirect } from "expo-router";
// index.ts

export default function Index() {
  return <Redirect href={"screens/FieldScreen"}></Redirect>;
}
{
  /* <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Text>Edit appwwq/index.tsx to edit this screen.</Text>
    </View> */
}
