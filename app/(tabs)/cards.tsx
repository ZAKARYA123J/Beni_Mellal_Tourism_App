import Ionicons from "@expo/vector-icons/Ionicons";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { Image } from "expo-image";
import { useRouter } from "expo-router";
import React from "react";
import {
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View
} from "react-native";
const places = [
  {
    id: "1",
    name: "Cascades d’Ouzoud",
    description: "Magnifique chute d’eau de 110 m près de Marrakech.",
    thumbnail:
      "https://lh3.googleusercontent.com/gps-cs-s/AG0ilSznc-mzi8VjHE-0cUaARNjKaJXSQF9tE_CHGYOXv5fTiZEGOD8yEkUAedCrfiHNZeQXtTkIYo6-vb420__D6Oh-XbrsdaxsiZkqteKX8IlpJeDYc44tuocZFgFIqE-BwAW-YrG2=s1360-w1360-h1020-rw",
    coordination: { latitude: 32.0167, longitude: -6.7167 },
  },
  {
    id: "2",
    name: "Kasbah Ras El Ain",
    description: "Ancienne forteresse avec vue panoramique sur Beni Mellal.",
    thumbnail:
      "https://www.discoverimages.com/p/251/view-garden-ain-asserdoun-kasbah-ras-el-ain-19489379.jpg.webp",
    coordination: { latitude: 32.3416, longitude: -6.3633 },
  },
  {
    id: "3",
    name: "Lac de Bin el Ouidane",
    description: "Lac turquoise entouré de montagnes de l’Atlas.",
    thumbnail:
      "https://upload.wikimedia.org/wikipedia/commons/a/ac/Barrage_Bin_el_Ouidane_1.JPG",
    coordination: { latitude: 32.12, longitude: -6.505 },
  },
];

export default function CardsTab() {
  const router = useRouter();
  return (
    <ScrollView style={styles.container}>
      {places.map((p) => (
        <View key={p.id} style={styles.card}>
          <Image source={{ uri: p.thumbnail }} style={styles.image} />
          <View style={styles.textBox}>
            <Text style={styles.title}>{p.name}</Text>
            <Text style={styles.desc}>{p.description}</Text>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                gap: 10,
                margin: 10,
              }}
            >
              <Pressable
                style={styles.btn}
                // onPress={() =>
                //   router.push({
                //     pathname: "/detail",
                //     params: {
                //       id: p.id,
                //       name: p.name,
                //       description: p.description,
                //       thumbnail: p.thumbnail,
                //       lat: String(p.coordination.latitude), // must be strings
                //       lng: String(p.coordination.longitude),
                //     },
                //   })
                // }
              >
                <View style={{ flexDirection: "row", alignItems: "center" }}>
                  <Text style={styles.btnTxt}>
                    Details{" "}
                    <Ionicons name="arrow-forward" size={16} color="#fff" />
                  </Text>
                </View>
              </Pressable>
              <Pressable
                style={styles.btnTxtFavorite}
                onPress={() =>
                  router.push({
                    pathname: "/favorit",
                    params: {
                      id: p.id,
                      name: p.name,
                      description: p.description,
                      thumbnail: p.thumbnail,
                      lat: String(p.coordination.latitude), // must be strings
                      lng: String(p.coordination.longitude),
                    },
                  })
                }
              >
                <View style={{ flexDirection: "row", alignItems: "center" }}>
                  <Text style={styles.btnTxt}>Favorite </Text>
                  <MaterialIcons
                    name="favorite-border"
                    size={16}
                    color="white"
                  />
                </View>
              </Pressable>
            </View>
          </View>
        </View>
      ))}

      {/* little space at bottom so last card is not stuck */}
      <View style={{ height: 40 }} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  card: {
    backgroundColor: "#fff",
    borderRadius: 20,
    marginHorizontal: 20,
    marginTop: 30,
    overflow: "hidden",
    elevation: 8,
    borderColor: "#ccc",
    borderWidth: 1,
    borderStyle: "solid",
    shadowColor: "#000",
    shadowOpacity: 0.3,
    shadowRadius: 10,
  },
  image: { width: "100%", height: 200 },
  textBox: { padding: 18 },
  title: { fontSize: 22, fontWeight: "bold", marginBottom: 5 },
  desc: { fontSize: 14, color: "#444", marginBottom: 15 },
  btn: {
    backgroundColor: "#007aff",
    paddingVertical: 10,
    alignItems: "center",
    justifyContent: "center",
    flex: 1,
    paddingHorizontal: 25,
    borderRadius: 8,
    alignSelf: "flex-start",
  },
  btnTxt: {
    color: "#fff",
    fontWeight: "600",
  },
  btnTxtFavorite: {
    backgroundColor: "red",
    paddingVertical: 10,
    alignItems: "center",
    justifyContent: "center",
    flex: 1,
    paddingHorizontal: 25,
    borderRadius: 8,
    alignSelf: "flex-start",
  },
});
