// app/(tabs)/index.tsx
import { View } from "@/components/Themed";
import { Ionicons } from "@expo/vector-icons";
import { Image } from "expo-image";
import { useRouter } from "expo-router";
import {
  Dimensions,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
} from "react-native";

const blurhash =
  "|rF?hV%2WCj[ayj[a|j[az_NaeWBj@ayfRayfQfQM{M|azj[azf6fQfQfQIpWXofj[ayj[j[fQayWCoeoeaya}j[ayfQa{oLj?j[WVj[ayayj[fQoff7azayj[ayj[j[ayofayayj[ayayj[fQj[ayayj[ayfjj[j[ayjuayj[";

const { width } = Dimensions.get("window");

export default function TabOneScreen() {
  const router = useRouter();
  const imgBeniMellal = require("@/assets/images/benimellal.jpg");

  /* ---- Beni Mellal focused data ---- */
  const categories = ["Nature", "Waterfalls", "Historic Sites", "Parks", "Culture"];
  
  const experiences = [
    { id: 1, title: "Ain Asserdoun", location: "Beni Mellal, Morocco", img: imgBeniMellal },
    { id: 2, title: "Ouzoud Waterfalls", location: "Near Beni Mellal, Morocco", img: imgBeniMellal },
    { id: 3, title: "Kasbah Ras El Ain", location: "Beni Mellal, Morocco", img: imgBeniMellal },
  ];
  
  const inspirations = [
    { id: 4, title: "Tizi n'Isly Pass", img: imgBeniMellal },
    { id: 5, title: "Bin el Ouidane Dam", img: imgBeniMellal },
    { id: 6, title: "Old Medina", img: imgBeniMellal },
    { id: 7, title: "Tagzirth Park", img: imgBeniMellal },
  ];

  return (
    <View style={styles.container}>
      {/* -------------- sticky header -------------- */}
      <View style={styles.header}>
        <TextInput
          placeholder="Explore Beni Mellal..."
          style={styles.search}
          placeholderTextColor="#666"
        />
        <Ionicons name="search" size={20} color="#666" style={styles.searchIcon} />
      </View>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scroll}>
        {/* -------------- hero image -------------- */}
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
            <Text style={styles.heroSub}>
              The city of springs and natural beauty
            </Text>
          </View>
        </View>

        {/* -------------- category pills -------------- */}
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.catRow}>
          {categories.map((c) => (
            <Pressable key={c} style={styles.pill}>
              <Text style={styles.pillText}>{c}</Text>
            </Pressable>
          ))}
        </ScrollView>

        {/* -------------- top experiences -------------- */}
        <Text style={styles.sectionTitle}>Must-visit places in Beni Mellal</Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.cardRow}>
          {experiences.map((e) => (
            <Pressable
              key={e.id}
              style={styles.card}
              // onPress={() => router.push(`/detail/${e.id}`)}
            >
              <Image source={e.img} style={styles.cardImg} contentFit="cover" />
              <Text style={styles.cardTitle}>{e.title}</Text>
              <Text style={styles.cardLoc}>{e.location}</Text>
            </Pressable>
          ))}
        </ScrollView>

        {/* -------------- inspiration grid -------------- */}
        <Text style={styles.sectionTitle}>More to explore in Beni Mellal</Text>
        <View style={styles.grid}>
          {inspirations.map((i, idx) => (
            <Pressable
              key={i.id}
              style={[styles.gridItem, idx % 3 === 0 ? styles.gridLarge : null]}
              // onPress={() => router.push(`/detail/${i.id}`)}
            >
              <Image source={i.img} style={styles.gridImg} contentFit="cover" />
              <Text style={styles.gridText}>{i.title}</Text>
            </Pressable>
          ))}
        </View>

        {/* safe bottom spacer */}
        <View style={{ height: 40 }} />
      </ScrollView>
    </View>
  );
}

/* ---------------- styles ---------------- */
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