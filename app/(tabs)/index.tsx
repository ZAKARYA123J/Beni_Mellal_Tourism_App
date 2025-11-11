// app/(tabs)/index.tsx
import { View } from "@/components/Themed";
import { usePlacesStore } from "@/store/placesStore";
import { Ionicons } from "@expo/vector-icons";
import { Image } from "expo-image";
import { useRouter } from "expo-router";
import { StatusBar } from 'expo-status-bar';
import React from "react";
import {
  Dimensions,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
} from "react-native";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSequence,
  withSpring,
} from "react-native-reanimated";
const blurhash =
  "|rF?hV%2WCj[ayj[a|j[az_NaeWBj@ayfRayfQfQM{M|azj[azf6fQfQfQIpWXofj[ayj[j[fQayWCoeoeaya}j[ayfQa{oLj?j[WVj[ayayj[fQoff7azayj[ayj[j[ayofayayj[ayayj[fQj[ayayj[ayfjj[j[ayjuayj[";

const { width } = Dimensions.get("window");

function AnimatedHeart({ active }: { active: boolean }) {
  const scale = useSharedValue(1);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }));

  const onPress = () => {
    scale.value = withSequence(
      withSpring(0.85, { stiffness: 1000, damping: 15 }),
      withSpring(1.15, { stiffness: 1000, damping: 15 }),
      withSpring(1, { stiffness: 1000, damping: 15 })
    );
  };

  return (
    <Animated.View style={animatedStyle}>
      <Pressable onPress={onPress} hitSlop={12}>
        {/* <Ionicons
          name={active ? "heart" : "heart-outline"}
          size={22}
          color={active ? "#fff" : "#ba3232ff"}
        /> */}
      </Pressable>
    </Animated.View>
  );
}

/* ----------  screen component  ----------------------------------------- */
export default function TabOneScreen() {
  const router = useRouter();
  const { places, favorites, addFavorite, removeFavorite, isFavorite } =
    usePlacesStore();

  const toggleFav = (id: number) =>
    isFavorite(id) ? removeFavorite(id) : addFavorite(id);

  const categories = ["Nature", "Waterfalls", "Historic Sites", "Parks", "Culture"];
const navigateToDetail = (id: number) => {
  const p = places[id]!;
  router.push({
    pathname: `/detail/${id}`,
    params: {
      name: p.name,
      description: p.description,
      thumbnail: p.thumbnail,        // still passed for fallback
      lat: p.lat.toString(),
      lng: p.lng.toString(),
    },
  } as any);
};
  return (
    <View style={styles.container}>
      <StatusBar style={Platform.OS === 'ios' ? 'light' : 'auto'} />

      {/* ---- search bar -------------------------------------------------- */}
      <View style={styles.header}>
        <TextInput
          placeholder="Explore Beni Mellal..."
          style={styles.search}
          placeholderTextColor="#666"
        />
        <Ionicons name="search" size={20} color="#666" style={styles.searchIcon} />
      </View>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scroll}>
       
        <View style={styles.heroWrap}>
          <Image
            style={styles.hero}
            source={require("@/assets/images/benimellal.jpg")}
            placeholder={{ blurhash }}
            contentFit="cover"
            transition={1000}
          />
          <View style={styles.heroTextWrap}>
            <Text style={styles.heroTitle}>Discover Beni Mellal</Text>
            <Text style={styles.heroSub}>The city of springs and natural beauty</Text>
          </View>
        </View>

        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.catRow}>
          {categories.map((c) => (
            <Pressable key={c} style={styles.pill}>
              <Text style={styles.pillText}>{c}</Text>
            </Pressable>
          ))}
        </ScrollView>

        {/* ---- “Must-visit” horizontal cards ----------------------------- */}
        <Text style={styles.sectionTitle}>Must-visit places in Beni Mellal</Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.cardRow}>
          {[1, 2, 3].map((id) => {
            const p = places[id]!;
            return (
              <Pressable
                key={id}
                style={styles.card}
                onPress={() =>
                  router.push({
                    pathname: `/detail/${id}`,
                    params: {
                      name: p.name,
                      description: p.description,
                      thumbnail: p.thumbnail,
                      lat: p.lat.toString(),
                      lng: p.lng.toString(),
                    },
                  }  as any)
                }
              >
                <Image source={p.thumbnail} style={styles.cardImg} contentFit="cover" />
                <Text style={styles.cardTitle}>{p.name}</Text>
                <Text style={styles.cardLoc}>Beni Mellal, Morocco</Text>

                {/* animated heart */}
                <View style={{ position: "absolute", top: 8, right: 8 }}>
                  <AnimatedHeart active={isFavorite(id)} />
                </View>
              </Pressable>
            );
          })}
        </ScrollView>

        {/* ---- “More to explore” grid ----------------------------------- */}
        <Text style={styles.sectionTitle}>More to explore in Beni Mellal</Text>
        <View style={styles.grid}>
          {[4, 5, 6, 7].map((id, idx) => {
            const p = places[id]!;
            const isLarge = idx % 3 === 0;
            return (
              <Pressable
                key={id}
                style={[styles.gridItem, isLarge && styles.gridLarge]}
                onPress={() =>
                  router.push({
                    pathname: `/detail/${id}`,
                    params: {
                      name: p.name,
                      description: p.description,
                      thumbnail: p.thumbnail,
                      lat: p.lat.toString(),
                      lng: p.lng.toString(),
                    },
                  } as any)
                }
              >
                <Image source={p.thumbnail} style={styles.gridImg} contentFit="cover" />
                <Text style={styles.gridText}>{p.name}</Text>

                {/* animated heart */}
                <View style={{ position: "absolute", top: 6, right: 6 }}>
                  <Pressable onPress={() => toggleFav(id)}>
                    <AnimatedHeart active={isFavorite(id)} />
                  </Pressable>
                </View>
              </Pressable>
            );
          })}
        </View>

        <View style={{ height: 40 }} />
      </ScrollView>
    </View>
  );
}

/* ------------------  styles unchanged  ------------------ */
const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff" },
  header: {
    position: "absolute",
    top: 60,
    left: 16,
    right: 16,
    zIndex: 10,
    flexDirection: "row",
    alignItems: "center",
  },
  search: {
    flex: 1,
    backgroundColor: "#fff",
    borderRadius: 24,
    paddingVertical: 10,
    paddingHorizontal: 40,
    elevation: 3,
    shadowColor: "#000",
    shadowOpacity: 0.08,
    shadowRadius: 6,
  },
  searchIcon: { position: "absolute", left: 14 },
  scroll: { paddingBottom: 20 },
  heroWrap: { position: "relative", height: 280 },
  hero: { width: "100%", height: "100%" },
  heroTextWrap: {
    position: "absolute",
    bottom: 24,
    left: 24,
    backgroundColor: "rgba(0,0,0,0.35)",
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 8,
  },
  heroTitle: { color: "#fff", fontSize: 28, fontWeight: "700" },
  heroSub: { color: "#fff", fontSize: 14, marginTop: 2 },
  catRow: { paddingHorizontal: 16, marginTop: 16, marginBottom: 8 },
  pill: {
    backgroundColor: "#f1f1f1",
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    marginRight: 8,
  },
  pillText: { color: "#333", fontWeight: "500" },
  sectionTitle: {
    marginHorizontal: 16,
    marginTop: 20,
    marginBottom: 12,
    fontSize: 20,
    fontWeight: "600",
  },
  cardRow: { paddingLeft: 16 },
  card: { width: 140, marginRight: 12 },
  cardImg: { width: 140, height: 180, borderRadius: 12 },
  cardTitle: { marginTop: 6, fontWeight: "600" },
  cardLoc: { color: "#555", fontSize: 12 },
  grid: {
    flexDirection: "row",
    flexWrap: "wrap",
    paddingHorizontal: 16,
    justifyContent: "space-between",
  },
  gridItem: { width: "31%", height: 120, marginBottom: 8, borderRadius: 12, overflow: "hidden" },
  gridLarge: { width: "65.5%", height: 180 },
  gridImg: { width: "100%", height: "100%" },
  gridText: {
    position: "absolute",
    bottom: 6,
    left: 8,
    color: "#fff",
    fontWeight: "600",
    backgroundColor: "rgba(0,0,0,0.4)",
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 4,
  },
});