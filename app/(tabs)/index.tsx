import { Button, StyleSheet } from "react-native";
import { Image } from "expo-image";
import EditScreenInfo from "@/components/EditScreenInfo";
import { Text, View } from "@/components/Themed";
import { useRouter } from "expo-router";
const blurhash =
  "|rF?hV%2WCj[ayj[a|j[az_NaeWBj@ayfRayfQfQM{M|azj[azf6fQfQfQIpWXofj[ayj[j[fQayWCoeoeaya}j[ayfQa{oLj?j[WVj[ayayj[fQoff7azayj[ayj[j[ayofayayayj[fQj[ayayj[ayfjj[j[ayjuayj[";
export default function TabOneScreen() {
  const router = useRouter();
  return (
    <View>
      <Image
        style={styles.image}
        source={require("@/assets/images/camel-49482991.png")}
        placeholder={{ blurhash }}
        contentFit="cover"
        transition={1000}
      />
      <Button title="Click Me" onPress={() => router.push("/(auth)/login")} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  image: {
    width: "100%",
    height: 200,
    backgroundColor: "#0553",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: "80%",
  },
});
