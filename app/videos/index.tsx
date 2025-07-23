import { AntDesign, FontAwesome } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";

import React, { useEffect, useState } from "react";
import {
  Dimensions,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

type VideoItem = {
  id: string;
  youtubeId: string;
  title: string;
};

const screenWidth = Dimensions.get("window").width;

const videoData: VideoItem[] = [
  { id: "1", youtubeId: "gDqLYqdPEp4", title: "عاداتنا مع الماء" },
  { id: "2", youtubeId: "-Fe6WU-cJ1g", title: "دورة الماء وأهمية الحفاظ عليه" },
  { id: "3", youtubeId: "1iDQpgSggws", title: "الحفاظ على الماء" },
  { id: "4", youtubeId: "2sX9Y1F7Qj0", title: "..." },
];

type RootStackParamList = {
  VideoPlayer: {
    video: {
      id: string;
      title: string;
      url: string;
    };
  };
  // Add other routes if needed
};

export default function Videos(): React.JSX.Element {
  const navigation = useNavigation<import('@react-navigation/native').NavigationProp<RootStackParamList>>();
  const [favorites, setFavorites] = useState<Record<string, boolean>>({});
  const [watched, setWatched] = useState<Record<string, boolean>>({});
  const [search, setSearch] = useState("");

  useEffect(() => {
    (async () => {
      const data = await AsyncStorage.getItem("watchedVideos");
      if (data) setWatched(JSON.parse(data));
    })();
  }, []);

  const markAsWatched = async (id: string) => {
    const updated = { ...watched, [id]: true };
    setWatched(updated);
    await AsyncStorage.setItem("watchedVideos", JSON.stringify(updated));
  };

  const goToPlayer = (video: VideoItem) => {
    markAsWatched(video.id);
    navigation.navigate("VideoPlayer", {
      video: {
        id: video.id,
        title: video.title,
        url: `https://www.youtube.com/embed/${video.youtubeId}`,
      },
    });
  };

  const toggleFavorite = (id: string) => {
    setFavorites((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const filteredVideos = videoData
    .filter((video) => video.title.toLowerCase().includes(search.toLowerCase()))
    .sort((a, b) => {
      const aWatched = watched[a.id] ?? false;
      const bWatched = watched[b.id] ?? false;
      return Number(aWatched) - Number(bWatched); // false (0) comes before true (1)
    });

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.searchContainer}>
        <AntDesign
          name="search1"
          size={20}
          color="#999"
          style={styles.searchIcon}
        />
        <TextInput
          placeholder="بحث"
          style={styles.searchInput}
          value={search}
          onChangeText={setSearch}
          placeholderTextColor="#999"
        />
      </View>

      {filteredVideos.map((video) => (
        <TouchableOpacity
          key={video.id}
          style={styles.card}
          onPress={() => goToPlayer(video)}
          activeOpacity={0.8}
        >
          <View style={styles.thumbnailContainer}>
            <Image
              source={{
                uri: `https://img.youtube.com/vi/${video.youtubeId}/maxresdefault.jpg`,
              }}
              style={styles.thumbnail}
            />
            <AntDesign
              name="playcircleo"
              size={48}
              color="rgba(255, 255, 255, 0.8)"
              style={styles.playIcon}
            />
          </View>

          <View style={styles.info}>
            <Text numberOfLines={2} style={styles.title}>
              {video.title}
              {watched[video.id] && (
                <AntDesign
                  name="checkcircle"
                  size={16}
                  color="green"
                  style={{ marginRight: 7, marginLeft: 7 }}
                />
              )}
            </Text>
            <Text style={styles.subtitle}>ONEE</Text>
          </View>

          <TouchableOpacity
            onPress={() => toggleFavorite(video.id)}
            style={styles.favorite}
          >
            <FontAwesome
              name={favorites[video.id] ? "bookmark" : "bookmark-o"}
              size={24}
              color={favorites[video.id] ? "#007acc" : "#555"}
            />
          </TouchableOpacity>
        </TouchableOpacity>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 30,
    paddingBottom: 40,
    backgroundColor: "#f7f9fc",
    alignItems: "center",
  },
  
  card: {
    width: screenWidth * 0.92,
    backgroundColor: "#fff",
    borderRadius: 14,
    marginBottom: 22,
    overflow: "hidden",
    shadowColor: "#000",
    shadowOpacity: 0.06,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 6,
    elevation: 3,
  },
  thumbnail: {
    width: "100%",
    height: screenWidth * 0.52, // 16:9 ratio
    backgroundColor: "#ccc",
  },
  info: {
    paddingHorizontal: 12,
    paddingVertical: 10,
  },
  title: {
    fontSize: 16,
    fontWeight: "600",
    color: "#222",
    marginBottom: 4,
    fontFamily: "Tajawal-Bold",
  },

  subtitle: {
    fontSize: 13,
    color: "#777",
  },
  favorite: {
    position: "absolute",
    top: 12,
    right: 12,
    backgroundColor: "#ffffffcc",
    padding: 6,
    borderRadius: 50,
  },
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    width: screenWidth * 0.92,
    height: 45,
    backgroundColor: "#fff",
    borderRadius: 12,
    marginTop: 10,
    marginBottom: 25,
    paddingHorizontal: 10,
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    elevation: 2,
  },
  searchIcon: {
    marginRight: 8,
  },
  searchInput: {
    flex: 1,
    fontSize: 15,
    color: "#222",
    fontFamily: "Tajawal-Regular",
    paddingVertical: 0, // to align text vertically center on Android/iOS
  },
  thumbnailContainer: {
    position: "relative",
    width: "100%",
    height: screenWidth * 0.52,
    backgroundColor: "#ccc",
  },
  playIcon: {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: [{ translateX: -24 }, { translateY: -24 }],
  },
});
