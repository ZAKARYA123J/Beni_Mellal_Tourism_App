// app/(tabs)/index.tsx
import { View } from "@/components/Themed";
import { Ionicons } from "@expo/vector-icons";
import { Image } from "expo-image";
import { useRouter } from "expo-router";
import { StatusBar } from 'expo-status-bar';

import {
  Dimensions,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
} from "react-native";

const blurhash =
  "|rF?hV%2WCj[ayj[a|j[az_NaeWBj@ayfRayfQfQM{M|azj[azf6fQfQfQIpWXofj[ayj[j[fQayWCoeoeaya}j[ayfQa{oLj?j[WVj[ayayj[fQoff7azayj[ayj[j[ayofayayj[ayayj[fQj[ayayj[ayfjj[j[ayjuayj[";

const { width } = Dimensions.get("window");

// Place details with all information
const placeDetails = {
  1: {
    name: "Ain Asserdoun",
    description: "Ain Asserdoun is one of Beni Mellal's most iconic natural springs, cascading down the slopes of the Middle Atlas mountains. This stunning spring has been the lifeblood of the city for centuries, providing fresh water and creating a lush oasis in the semi-arid landscape. Visitors can enjoy scenic walks along the water channels, relax in the shade of ancient olive trees, and witness the powerful flow of crystal-clear mountain water. The site offers beautiful picnic areas, traditional cafes serving mint tea, and breathtaking views of Beni Mellal city below. The spring is particularly magical during sunrise and sunset when the light dances on the flowing water.",
    thumbnail: require("@/assets/images/ain_Asserdoun.jpg"),
    lat: 32.3394,
    lng: -6.3498,
  },
  2: {
    name: "Ouzoud Waterfalls",
    description: "The magnificent Ouzoud Waterfalls are among Morocco's most spectacular natural wonders, plunging 110 meters down red-hued cliffs into emerald pools below. Located about 150km northeast of Marrakech and accessible from Beni Mellal, these falls create a mesmerizing display of mist and rainbows, especially in the afternoon sun. The area is home to wild Barbary macaque monkeys that playfully interact with visitors along the trails. Multiple viewing platforms offer different perspectives of the three-tiered cascade, while traditional Berber boats ferry visitors across the lower pools. The surrounding area features olive groves, traditional mills still grinding grain using water power, and numerous cafes where you can enjoy fresh-caught trout while listening to the thundering falls.",
    thumbnail: require("@/assets/images/Ouzoud_Waterfalls.jpg"),
    lat: 32.0157,
    lng: -6.7194,
  },
  3: {
    name: "Kasbah Ras El Ain",
    description: "Perched on a hill overlooking Beni Mellal, Kasbah Ras El Ain is a historic fortification dating back to the 17th century, built by Sultan Moulay Ismail. This impressive kasbah served as a strategic military outpost and administrative center during the Alaouite dynasty. The fortress features traditional Moroccan architecture with thick walls, ornate doorways, and watchtowers that once guarded the fertile Tadla plain below. Today, visitors can explore the ancient ramparts, walk through restored sections of the kasbah, and enjoy panoramic views stretching from the Atlas mountains to the plains. The site is particularly popular for sunset photography, and nearby you'll find the beautiful Ain Asserdoun spring. The kasbah represents an important piece of Morocco's imperial history and offers insight into traditional defensive architecture.",
    thumbnail: require("@/assets/images/Kasbah.jpg"),
    lat: 32.3378,
    lng: -6.3512,
  },
  4: {
    name: "Tizi n'Isly Pass",
    description: "Tizi n'Isly is a dramatic mountain pass in the Middle Atlas range, offering one of the most scenic drives near Beni Mellal. The winding road climbs through diverse landscapes, from green valleys dotted with Berber villages to rocky mountain terrain with sweeping vistas. At over 2,000 meters elevation, the pass provides breathtaking panoramic views of the surrounding peaks and valleys. During spring, wildflowers carpet the mountainsides, while winter often brings snow to the higher elevations. The pass is a favorite among photographers, hikers, and adventure seekers. Along the route, you'll encounter traditional Berber shepherds with their flocks, roadside vendors selling local honey and nuts, and numerous spots perfect for picnicking. The journey through Tizi n'Isly showcases the raw natural beauty of the Atlas mountains.",
    thumbnail: require("@/assets/images/tizinIslypass.png"),
    lat: 32.2845,
    lng: -6.2134,
  },
  5: {
    name: "Bin el Ouidane Dam",
    description: "Bin el Ouidane is a stunning turquoise reservoir nestled in the Atlas mountains, created by one of Africa's largest dams built in the 1950s. The artificial lake stretches for kilometers, surrounded by dramatic red cliffs and green valleys, creating a striking contrast of colors. This serene destination is perfect for water activities including swimming, kayaking, and boat tours. The dam's emerald waters are fed by mountain streams, keeping them remarkably clear and cool. Several lakeside resorts and campsites offer accommodations with spectacular views. Fishing enthusiasts come for the abundant bass and carp, while hikers explore the surrounding mountains and hidden canyons. The area is also known for its Berber villages where you can experience traditional hospitality and local cuisine. Sunset over the lake, with mountains reflected in the still water, creates an unforgettable scene.",
    thumbnail: require("@/assets/images/binouidanedam.png"),
    lat: 32.1167,
    lng: -6.5167,
  },
  6: {
    name: "Old Medina",
    description: "The Old Medina of Beni Mellal is the historic heart of the city, a labyrinth of narrow winding streets filled with traditional shops, artisan workshops, and authentic Moroccan life. This ancient quarter preserves centuries of history with its distinctive architecture, including ornate doorways, wrought-iron balconies, and colorful tiled fountains. The medina's souks are a sensory feast where vendors sell everything from fresh spices and traditional textiles to handcrafted leather goods and pottery. You'll find skilled craftsmen hammering copper, weaving carpets, and creating intricate zellige tilework using techniques passed down through generations. The medina also hosts several small mosques with beautiful minarets, traditional hammams (bathhouses), and family-run restaurants serving authentic Moroccan cuisine. Getting lost in these atmospheric streets offers an authentic glimpse into daily life and local culture.",
    thumbnail: require("@/assets/images/oldmedina.jpg"),
    lat: 32.3372,
    lng: -6.3598,
  },
  7: {
    name: "Tagzirth Park",
    description: "Tagzirth Park is Beni Mellal's premier green space, offering a peaceful urban oasis perfect for families, couples, and nature lovers. This well-maintained park features manicured gardens with seasonal flowers, towering palm trees providing shade, and expansive lawns ideal for picnics and relaxation. Children enjoy the playgrounds and open spaces for games, while walking paths wind through the greenery, popular with joggers and evening strollers. The park includes several traditional fountains and water features that create a cooling effect during hot summer months. Vendors sell fresh juice, nuts, and snacks near the entrances. The park comes alive in the evenings when locals gather to socialize, families enjoy the cooler temperatures, and the city lights begin to twinkle. It's an excellent spot to observe local life and culture in a relaxed setting, and the park often hosts cultural events and festivals.",
    thumbnail: require("@/assets/images/Tagzirth.jpg"),
    lat: 32.3421,
    lng: -6.3645,
  },
};

export default function TabOneScreen() {
  const router = useRouter();

  const categories = ["Nature", "Waterfalls", "Historic Sites", "Parks", "Culture"];
  
  const experiences = [
    { id: 1, title: "Ain Asserdoun", location: "Beni Mellal, Morocco" },
    { id: 2, title: "Ouzoud Waterfalls", location: "Near Beni Mellal, Morocco" },
    { id: 3, title: "Kasbah Ras El Ain", location: "Beni Mellal, Morocco" },
  ];
  
  const inspirations = [
    { id: 4, title: "Tizi n'Isly Pass" },
    { id: 5, title: "Bin el Ouidane Dam" },
    { id: 6, title: "Old Medina" },
    { id: 7, title: "Tagzirth Park" },
  ];

  const navigateToDetail = (id: any) => {
    const details = placeDetails[id as keyof typeof placeDetails];
    router.push({
      pathname: `/detail/${id}` as any,
      params: {
        name: details.name,
        description: details.description,
        thumbnail: details.thumbnail,
        lat: details.lat.toString(),
        lng: details.lng.toString(),
      },
    });
  };

  return (
    <View style={styles.container}>
            <StatusBar style={Platform.OS === 'ios' ? 'light' : 'auto'} />
      
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
            <Text style={styles.heroSub}>
              The city of springs and natural beauty
            </Text>
          </View>
        </View>

        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.catRow}>
          {categories.map((c) => (
            <Pressable key={c} style={styles.pill}>
              <Text style={styles.pillText}>{c}</Text>
            </Pressable>
          ))}
        </ScrollView>

        <Text style={styles.sectionTitle}>Must-visit places in Beni Mellal</Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.cardRow}>
          {experiences.map((e) => (
            <Pressable
              key={e.id}
              style={styles.card}
              onPress={() => navigateToDetail(e.id)}
            >
              <Image 
                source={placeDetails[e.id as keyof typeof placeDetails].thumbnail} 
                style={styles.cardImg} 
                contentFit="cover" 
              />
              <Text style={styles.cardTitle}>{e.title}</Text>
              <Text style={styles.cardLoc}>{e.location}</Text>
            </Pressable>
          ))}
        </ScrollView>

        <Text style={styles.sectionTitle}>More to explore in Beni Mellal</Text>
        <View style={styles.grid}>
          {inspirations.map((i, idx) => (
            <Pressable
              key={i.id}
              style={[styles.gridItem, idx % 3 === 0 ? styles.gridLarge : null]}
              onPress={() => navigateToDetail(i.id)}
            >
              <Image 
                source={placeDetails[i.id as keyof typeof placeDetails].thumbnail} 
                style={styles.gridImg} 
                contentFit="cover" 
              />
              <Text style={styles.gridText}>{i.title}</Text>
            </Pressable>
          ))}
        </View>

        <View style={{ height: 40 }} />
      </ScrollView>
    </View>
  );
}

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