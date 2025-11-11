// app/detail/[id].tsx
import { Image } from "expo-image";
import { useLocalSearchParams, useNavigation } from "expo-router";
import React, { useLayoutEffect } from "react";
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
import Animated, { FadeInRight } from 'react-native-reanimated';
import { SharedElement } from 'react-navigation-shared-element';
const { width } = Dimensions.get("window");
// Import all images
const images: { [key: string]: any } = {
  "Ain Asserdoun": require("@/assets/images/ain_Asserdoun.jpg"),
  "Ouzoud Waterfalls": require("@/assets/images/Ouzoud_Waterfalls.jpg"),
  "Kasbah Ras El Ain": require("@/assets/images/Kasbah.jpg"),
  "Tizi n'Isly Pass": require("@/assets/images/tizinIslypass.png"),
  "Bin el Ouidane Dam": require("@/assets/images/binouidanedam.png"),
  "Old Medina": require("@/assets/images/oldmedina.jpg"),
  "Tagzirth Park": require("@/assets/images/Tagzirth.jpg"),
};

export default function DetailScreen() {
  const {name, description, lat, lng,thumbnail } = useLocalSearchParams();
  const navigation = useNavigation();

  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: name as string,
    });
  }, [navigation, name]);
  // Create a place object for easy access
  const place = {
    name: name as string,
    description: description as string,
    thumbnail: images[name as string],
    coordinates: {
      latitude: Number(lat),
      longitude: Number(lng),
    },
  };

  // Open native maps for navigation
  const openMaps = () => {
    const { latitude, longitude } = place.coordinates;
    const label = encodeURIComponent(place.name);
    const url = `https://www.google.com/maps/search/?api=1&query=${latitude},${longitude}(${label})`;
    Linking.openURL(url);
  };

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      
     <SharedElement id={`place.${name}.image`} style={styles.hero}>
        <Image source={place.thumbnail} style={styles.hero} contentFit="cover" />
      </SharedElement>

        <Animated.View
        entering={FadeInRight.delay(300).springify()}
        style={styles.textBox}
      >
        <Text style={styles.title}>{name}</Text>
        <Text style={styles.desc}>{description}</Text>
      </Animated.View>

    <View style={styles.mapFrame}>
        <MapView
          style={styles.map}
          initialRegion={{
            latitude: Number(lat),
            longitude: Number(lng),
            latitudeDelta: 0.03,
            longitudeDelta: 0.03,
          }}
        >
          <Marker
            coordinate={{ latitude: Number(lat), longitude: Number(lng) }}
            title={name as string}
          />
        </MapView>
        <Pressable style={styles.mapBtn} onPress={openMaps}>
          <Text style={styles.mapBtnTxt}>Open in Google Maps</Text>
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