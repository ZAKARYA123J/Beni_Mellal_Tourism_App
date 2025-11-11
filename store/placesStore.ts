// stores/placesStore.ts
import AsyncStorage from '@react-native-async-storage/async-storage';
import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

export interface PlaceDetail {
  name: string;
  description: string;
  thumbnail: any;
  lat: number;
  lng: number;
}

export interface PlacesState {
  places: Record<number, PlaceDetail>;
  favorites: number[];
  addFavorite: (id: number) => void;
  removeFavorite: (id: number) => void;
  isFavorite: (id: number) => boolean;
  getPlace: (id: number) => PlaceDetail | undefined;
  getAllPlaces: () => Record<number, PlaceDetail>;
}

const initialPlaces: Record<number, PlaceDetail> = {
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

export const usePlacesStore = create<PlacesState>()(
  persist(
    (set, get) => ({
      places: initialPlaces,
      favorites: [],
      
      addFavorite: (id) =>
        set((state) => ({
          favorites: state.favorites.includes(id)
            ? state.favorites
            : [...state.favorites, id],
        })),
      
      removeFavorite: (id) =>
        set((state) => ({
          favorites: state.favorites.filter((fav) => fav !== id),
        })),
      
      isFavorite: (id) => get().favorites.includes(id),
      
      getPlace: (id) => get().places[id],
      
      getAllPlaces: () => get().places,
    }),
    {
      name: 'places-storage',
      storage: createJSONStorage(() => AsyncStorage),
      // Only persist favorites, not the places themselves (since they're static)
      partialize: (state) => ({ favorites: state.favorites }),
    }
  )
);