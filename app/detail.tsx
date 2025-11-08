import { Image } from "expo-image";
import { useLocalSearchParams } from "expo-router";
import React from "react";
import {
  Dimensions,
  Linking,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import MapView, { Marker } from "react-native-maps";

const { width } = Dimensions.get("window");

export default function DetailScreen() {
  const { name, description, thumbnail, lat, lng } = useLocalSearchParams();
  const place = {
    name,
    description,
    thumbnail,
    coordination: { latitude: Number(lat), longitude: Number(lng) },
  };
  /* open native maps for directions */
  const openMaps = () => {
    const { latitude, longitude } = place.coordination;
    Linking.openURL(`geo:${latitude},${longitude}?q=${latitude},${longitude}`);
  };

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <Image source={{ uri: place.thumbnail as string }} style={styles.hero} />
      <View style={styles.textBox}>
        <Text style={styles.title}>{place.name}</Text>
        <Text style={styles.desc}>{place.description}</Text>
      </View>
      <View style={styles.mapFrame}>
        <MapView
          style={styles.map}
          initialRegion={{
            latitude: place.coordination.latitude,
            longitude: place.coordination.longitude,
            latitudeDelta: 0.03,
            longitudeDelta: 0.03,
          }}
          scrollEnabled={true} // keeps it static inside ScrollView
        >
          <Marker
            coordinate={place.coordination}
            title={place.name as string}
          />
        </MapView>

        <Pressable style={styles.mapBtn} onPress={openMaps}>
          <Text style={styles.mapBtnTxt}>Ouvrir dans Maps</Text>
        </Pressable>
      </View>

      <View style={{ height: 40 }} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff" },
  hero: { width, height: width * 0.7 },
  textBox: { padding: 24 },
  title: { fontSize: 28, fontWeight: "bold", marginBottom: 12 },
  desc: { fontSize: 16, lineHeight: 24, color: "#333" },
  mapFrame: { marginTop: 20, paddingHorizontal: 24 },
  map: { width: "100%", height: 200, borderRadius: 16, overflow: "hidden" },
  mapBtn: {
    marginTop: 12,
    backgroundColor: "#007aff",
    paddingVertical: 12,
    borderRadius: 10,
    alignItems: "center",
  },
  mapBtnTxt: { color: "#fff", fontWeight: "600", fontSize: 16 },
});
