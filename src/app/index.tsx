import { Text, View } from "react-native";
import { Redirect } from "expo-router";
// index.ts
import LogoSplashScreen from "./screens/LogoSplashScreen";

export default function Index() {
  return <Redirect href={"screens/LogoSplashScreen"}></Redirect>;
  //return <LogoSplashScreen></LogoSplashScreen>;
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
