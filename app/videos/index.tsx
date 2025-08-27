import { AntDesign, FontAwesome, MaterialIcons } from "@expo/vector-icons";
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
  youtubeId?: string;
  localUri?: number; // require retourne un number
  title: string;
};


const screenWidth = Dimensions.get("window").width;

const videoData: VideoItem[] = [
  { id: "1", localUri: require("../../assets/images/capsule_onee_arabe_.mp4"), title: "طرق لترشيد استعمال " },
  { id: "2", youtubeId: "1iDQpgSggws", title: "عاداتنا مع الماء " },
  { id: "3", youtubeId: "-Fe6WU-cJ1g", title: "دورة الماء وأهمية الحفاظ عليه" },
  { id: "4", youtubeId: "zHXpnPQbhfc", title: " شرح موضوع الصرف الصحي" },
  { id: "5", youtubeId: "E0emEQq-otk", title: "معلومات أساسية حول ضمان جودة مياه الشرب" },
  { id: "6", youtubeId: "EvhWVhcsjuk", title: "مراحل تصفية المياه العادمة" },
  { id: "7", youtubeId: "kz0Zo0_PB9o", title: "مزايا التطهير السائل" },
  { id: "8", youtubeId: "bRmBRjLfc9k", title: "بعض مشاريع المكتب الوطني للكهرباء والماء الصالح للشرب" },
  
  


];

type RootStackParamList = {
  VideoPlayer: {
    video: VideoItem;
  };
};

export default function Videos(): React.JSX.Element {
  const navigation = useNavigation<import('@react-navigation/native').NavigationProp<RootStackParamList>>();
  const [favorites, setFavorites] = useState<Record<string, boolean>>({});
  const [watched, setWatched] = useState<Record<string, boolean>>({});
  const [search, setSearch] = useState("");
  const [activeTab, setActiveTab] = useState<'all' | 'saved' | 'watched'>('all');

  const favoriteVideos = videoData.filter((video) => favorites[video.id]);
  const watchedVideos = videoData.filter((video) => watched[video.id]);

  useEffect(() => {
    loadStoredData();
  }, []);

  const loadStoredData = async () => {
    try {
      const [watchedData, favoritesData] = await Promise.all([
        AsyncStorage.getItem("watchedVideos"),
        AsyncStorage.getItem("favoriteVideos")
      ]);
      
      if (watchedData) setWatched(JSON.parse(watchedData));
      if (favoritesData) setFavorites(JSON.parse(favoritesData));
    } catch (error) {
      console.error('Error loading stored data:', error);
    }
  };

  const markAsWatched = async (id: string) => {
    const updated = { ...watched, [id]: true };
    setWatched(updated);
    await AsyncStorage.setItem("watchedVideos", JSON.stringify(updated));
  };

  const goToPlayer = (video: VideoItem) => {
  markAsWatched(video.id);
  navigation.navigate("VideoPlayer", {
    video,
  });
};


  const toggleFavorite = async (id: string) => {
    const updated = { ...favorites, [id]: !favorites[id] };
    setFavorites(updated);
    await AsyncStorage.setItem("favoriteVideos", JSON.stringify(updated));
  };

  const getFilteredVideos = () => {
    let videosToShow = videoData;
    
    switch (activeTab) {
      case 'saved':
        videosToShow = favoriteVideos;
        break;
      case 'watched':
        videosToShow = watchedVideos;
        break;
      default:
        videosToShow = videoData;
    }

    return videosToShow
      .filter((video) => video.title.toLowerCase().includes(search.toLowerCase()))
      .sort((a, b) => {
        if (activeTab === 'all') {
          const aWatched = watched[a.id] ?? false;
          const bWatched = watched[b.id] ?? false;
          return Number(aWatched) - Number(bWatched);
        }
        return 0;
      });
  };

  const TabButton = ({ 
    tab, 
    title, 
    icon, 
    count 
  }: { 
    tab: 'all' | 'saved' | 'watched'; 
    title: string; 
    icon: string; 
    count?: number;
  }) => (
    <TouchableOpacity
      style={[styles.tabButton, activeTab === tab && styles.activeTab]}
      onPress={() => setActiveTab(tab)}
    >
      <View style={styles.tabContent}>
        {icon === 'video-library' ? (
          <MaterialIcons 
            name="video-library" 
            size={20} 
            color={activeTab === tab ? '#007acc' : '#666'} 
          />
        ) : (
          <FontAwesome 
            name={icon as any} 
            size={18} 
            color={activeTab === tab ? '#007acc' : '#666'} 
          />
        )}
        <Text style={[
          styles.tabText, 
          activeTab === tab && styles.activeTabText
        ]}>
          {title}
        </Text>
        {count !== undefined && count > 0 && (
          <View style={[styles.badge, activeTab === tab && styles.activeBadge]}>
            <Text style={[styles.badgeText, activeTab === tab && styles.activeBadgeText]}>
              {count}
            </Text>
          </View>
        )}
      </View>
    </TouchableOpacity>
  );

  

// Correction: thumbnail pour vidéo locale
const VideoCard = ({ video }: { video: VideoItem }) => (
  <TouchableOpacity
    style={styles.card}
    onPress={() => goToPlayer(video)}
    activeOpacity={0.8}
  >
    <View style={styles.thumbnailContainer}>
      {video.youtubeId ? (
        <Image
          source={{
            uri: `https://img.youtube.com/vi/${video.youtubeId}/maxresdefault.jpg`,
          }}
          style={styles.thumbnail}
        />
      ) : (
        <Image
          source={require("../../assets/images/video_placeholder.png")}
          style={styles.thumbnail}
        />
      )}
      <AntDesign
        name="playcircleo"
        size={48}
        color="rgba(255, 255, 255, 0.9)"
        style={styles.playIcon}
      />
      {watched[video.id] && (
        <View style={styles.watchedBadge}>
          <AntDesign name="check" size={16} color="white" />
        </View>
      )}
    </View>
    <View style={styles.info}>
      <Text numberOfLines={2} style={styles.title}>
        {video.title}
      </Text>
      <Text style={styles.subtitle}>ONEE - المكتب الوطني للكهرباء والماء الصالح للشرب</Text>
      <View style={styles.videoStats}>
        {/* Retirer l'affichage direct du booléen */}
      </View>
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
);

  const EmptyState = ({ type }: { type: string }) => (
    <View style={styles.emptyState}>
      <FontAwesome 
        name={type === 'saved' ? 'bookmark-o' : 'play-circle-o'} 
        size={64} 
        color="#ccc" 
      />
      <Text style={styles.emptyTitle}>
        {type === 'saved' ? 'لا توجد فيديوهات محفوظة' : 'لا توجد فيديوهات مشاهدة'}
      </Text>
      <Text style={styles.emptySubtitle}>
        {type === 'saved' 
          ? 'احفظ الفيديوهات المفضلة لديك للوصول إليها بسهولة'
          : 'ابدأ بمشاهدة الفيديوهات لتظهر هنا'
        }
      </Text>
    </View>
  );

  const filteredVideos = getFilteredVideos();

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>مكتبة الفيديوهات التعليمية</Text>
        <Text style={styles.headerSubtitle}>اكتشف أهمية كل قطرة ماء</Text>
      </View>

      <View style={styles.searchContainer}>
        <AntDesign
          name="search1"
          size={20}
          color="#999"
          style={styles.searchIcon}
        />
        <TextInput
          placeholder="بحث في الفيديوهات..."
          style={styles.searchInput}
          value={search}
          onChangeText={setSearch}
          placeholderTextColor="#999"
        />
        {search.length > 0 && (
          <TouchableOpacity onPress={() => setSearch('')}>
            <AntDesign name="close" size={20} color="#999" />
          </TouchableOpacity>
        )}
      </View>

      <View style={styles.tabContainer}>
        
        <TabButton 
          tab="saved" 
          title="المحفوظة" 
          icon="bookmark" 
          count={favoriteVideos.length}
        />
        
        <TabButton 
          tab="all" 
          title="الكل" 
          icon="video-library" 
          count={videoData.length}
        />
      </View>

      <ScrollView 
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}
      >
        {filteredVideos.length > 0 ? (
          <View style={styles.videosList}>
            {activeTab !== 'all'}
            
            {filteredVideos.map((video) => (
              <VideoCard key={video.id} video={video} />
            ))}
          </View>
        ) : (
          <>
            {search.length > 0 ? (
              <View style={styles.emptyState}>
                <AntDesign name="search1" size={64} color="#ccc" />
                <Text style={styles.emptyTitle}>لا توجد نتائج</Text>
                <Text style={styles.emptySubtitle}>
                  جرب البحث بكلمات مختلفة
                </Text>
              </View>
            ) : (
              <EmptyState type={activeTab} />
            )}
          </>
        )}
        
        <View style={styles.bottomPadding} />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f7f9fc",
  },
  header: {
    backgroundColor: "#007acc",
    paddingTop: 50,
    paddingBottom: 20,
    paddingHorizontal: 20,
    borderBottomLeftRadius: 25,
    borderBottomRightRadius: 25,
  },
  headerTitle: {
    fontSize: 20,
    color: "white",
    textAlign: "center",
    fontFamily: "Tajawal-Bold",
    marginBottom: 5,
  },
  headerSubtitle: {
    fontSize: 16,
    color: "rgba(255, 255, 255, 0.9)",
    textAlign: "center",
    fontFamily: "Tajawal-Regular",
    marginBottom: 20,
  },
  statsContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginTop: 10,
  },
  statCard: {
    alignItems: "center",
    backgroundColor: "rgba(255, 255, 255, 0.1)",
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 15,
    minWidth: 80,
  },
  statNumber: {
    fontSize: 22,
    fontWeight: "bold",
    color: "white",
    fontFamily: "Tajawal-Bold",
  },
  statLabel: {
    fontSize: 12,
    color: "rgba(255, 255, 255, 0.8)",
    fontFamily: "Tajawal-Regular",
    marginTop: 2,
  },
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginHorizontal: 20,
    marginTop: -25,
    marginBottom: 20,
    height: 50,
    backgroundColor: "#fff",
    borderRadius: 25,
    paddingHorizontal: 15,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 8,
    elevation: 4,
  },
  searchIcon: {
    marginRight: 10,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    color: "#222",
    fontFamily: "Tajawal-Regular",
    paddingVertical: 0,
  },
  tabContainer: {
    flexDirection: "row",
    marginHorizontal: 20,
    marginBottom: 20,
    backgroundColor: "#fff",
    borderRadius: 15,
    padding: 5,
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    elevation: 2,
  },
  tabButton: {
    flex: 1,
    paddingVertical: 12,
    paddingHorizontal: 8,
    borderRadius: 10,
    alignItems: "center",
  },
  activeTab: {
    backgroundColor: "#007acc",

  },
  tabContent: {
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "center",
  },
  tabText: {
    fontSize: 14,
    color: "#666",
    fontFamily: "Tajawal-Medium",
    marginLeft: 6,
  },
  activeTabText: {
    color: "white",
    fontFamily: "Tajawal-Medium",
  },
  badge: {
    backgroundColor: "#e0e0e0",
    borderRadius: 10,
    paddingHorizontal: 6,
    paddingVertical: 2,
    marginLeft: 6,
    minWidth: 20,
  },
  activeBadge: {
    backgroundColor: "rgba(255, 255, 255, 0.2)",
  },
  badgeText: {
    fontSize: 11,
    color: "#666",
    fontFamily: "Tajawal-Bold",
    textAlign: "center",
  },
  activeBadgeText: {
    color: "white",
  },
  scrollView: {
    flex: 1,
  },
  videosList: {
    paddingHorizontal: 20,
  },
  sectionHeader: {
    marginBottom: 15,
    paddingBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#e0e0e0",
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#222",
    fontFamily: "Tajawal-Bold",
  },
  sectionSubtitle: {
    fontSize: 14,
    color: "#666",
    fontFamily: "Tajawal-Regular",
    marginTop: 2,
  },
  card: {
    backgroundColor: "#fff",
    borderRadius: 15,
    marginBottom: 20,
    overflow: "hidden",
    shadowColor: "#000",
    shadowOpacity: 0.08,
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 8,
    elevation: 4,
  },
  thumbnailContainer: {
    position: "relative",
    width: "100%",
    height: screenWidth * 0.52,
    backgroundColor: "#f0f0f0",
  },
  thumbnail: {
    width: "100%",
    height: "100%",
  },
  playIcon: {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: [{ translateX: -24 }, { translateY: -24 }],
  },
  watchedBadge: {
    position: "absolute",
    top: 12,
    left: 12,
    backgroundColor: "#4CAF50",
    borderRadius: 15,
    width: 30,
    height: 30,
    justifyContent: "center",
    alignItems: "center",
  },
  info: {
    padding: 15,
  },
  title: {
    fontSize: 16,
    fontWeight: "600",
    color: "#222",
    marginBottom: 8,
    fontFamily: "Tajawal-Bold",
    lineHeight: 24,
  },
  subtitle: {
    fontSize: 13,
    color: "#666",
    fontFamily: "Tajawal-Regular",
    marginBottom: 10,
  },
  videoStats: {
    flexDirection: "row",
    alignItems: "center",
    gap: 15,
  },
  statItem: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },
  statText: {
    fontSize: 12,
    color: "#666",
    fontFamily: "Tajawal-Regular",
  },
  favorite: {
    position: "absolute",
    top: 12,
    right: 12,
    backgroundColor: "rgba(255, 255, 255, 0.9)",
    padding: 8,
    borderRadius: 25,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    elevation: 2,
  },
  emptyState: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 60,
    paddingHorizontal: 40,
  },
  emptyTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#666",
    fontFamily: "Tajawal-Bold",
    marginTop: 20,
    marginBottom: 10,
    textAlign: "center",
  },
  emptySubtitle: {
    fontSize: 14,
    color: "#999",
    fontFamily: "Tajawal-Regular",
    textAlign: "center",
    lineHeight: 22,
  },
  bottomPadding: {
    height: 40,
  },
});