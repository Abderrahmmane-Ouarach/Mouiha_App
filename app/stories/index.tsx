import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Image,
} from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import StoryCard from './components/StoryCard';
import FilterButtons from './components/FilterButtons';
import { Story } from './types';
import { shuffleArray } from './utils/arrayUtils';
import { loadFavorites, toggleFavorite as toggleFavoriteStorage } from './utils/storageUtils';
import { Asset } from 'expo-asset';
import { fetchStories } from './api/fetchStories';
import { fetchStoriesWithCache } from './api/fetchStoriesWithCache';
import NetInfo from '@react-native-community/netinfo';


const StoriesIndex: React.FC = () => {
  const navigation = useNavigation();
  const [stories, setStories] = useState<Story[]>([]);
  const [filteredStories, setFilteredStories] = useState<Story[]>([]);
  const [currentFilter, setCurrentFilter] = useState<'all' | 'favorites'>('all');

  

  useEffect(() => {
    loadStoriesWithFavorites();
  }, []);

  useFocusEffect(
    React.useCallback(() => {
      updateFavoritesOnly();
    }, [])
  );

  const loadStoriesWithFavorites = async () => {
  try {
    const storiesFromCacheOrSupabase = await fetchStoriesWithCache();
    setStories(storiesFromCacheOrSupabase);
    setFilteredStories(storiesFromCacheOrSupabase);
  } catch (error) {
    console.error('Error loading stories', error);
  }
};




  const updateFavoritesOnly = async () => {
    // Only update if stories are already loaded
    if (stories.length === 0) return;
    
    try {
      const favoriteIds = await loadFavorites();
      
      const updatedStories = stories.map(story => ({
        ...story,
        isFavorite: favoriteIds.includes(story.id),
      }));
      
      setStories(updatedStories);

      if (currentFilter === 'favorites') {
        setFilteredStories(updatedStories.filter(story => story.isFavorite));
      } else {
        setFilteredStories(updatedStories);
      }
    } catch (error) {
      console.error('Error updating favorites:', error);
    }
  };


  useEffect(() => {
    if (currentFilter === 'favorites') {
      setFilteredStories(stories.filter(story => story.isFavorite));
    } else {
      setFilteredStories(stories);
    }
  }, [stories, currentFilter]);

  const toggleFavorite = async (storyId: string) => {
    const story = stories.find(s => s.id === storyId);
    if (story) {
      try {
        
        await toggleFavoriteStorage(storyId, story.isFavorite);
        
        
        setStories(prevStories =>
          prevStories.map(s =>
            s.id === storyId
              ? { ...s, isFavorite: !s.isFavorite }
              : s
          )
        );
      } catch (error) {
        console.error('Error toggling favorite:', error);
      }
    }
  };

  const handleStoryPress = (story: Story) => {
    (navigation as any).navigate('StoryViewer', { story });
  };

  const renderStoryItem = ({ item }: { item: Story }) => (
    <StoryCard
      story={item}
      onPress={() => handleStoryPress(item)}
      onToggleFavorite={() => toggleFavorite(item.id)}
    />
  );

  useEffect(() => {
  const checkConnectionAndRefresh = async () => {
    const state = await NetInfo.fetch();
    if (state.isConnected) {
      await refreshStoriesOnline();
    } else {
      await loadStoriesWithFavorites(); // load cache if offline
    }
  };

  checkConnectionAndRefresh();

  const unsubscribe = NetInfo.addEventListener(state => {
    if (state.isConnected) {
      refreshStoriesOnline();
    }
  });

  return () => unsubscribe();
}, []);


const refreshStoriesOnline = async () => {
  try {
    const freshStories = await fetchStoriesWithCache(); // fetch from Supabase if online
    setStories(freshStories);
    setFilteredStories(freshStories);
  } catch (error) {
    console.error('Failed to refresh stories online', error);
  }
};

  return (
    <SafeAreaProvider>
        <SafeAreaView style={styles.container}>
        
        <View style={styles.content}>
            <View style={styles.imageContainer}>
          <Image
            source={require("../../assets/images/logoo.png")}
            style={styles.headerImage}
            resizeMode="contain"
          />
        </View>
            <Text style={styles.subtitle}>
            اكتشف قصصاً عن المياه !
            </Text>

            <FilterButtons
            currentFilter={currentFilter}
            onFilterChange={setCurrentFilter}
            favoriteCount={stories.filter(s => s.isFavorite).length}
            />

            <FlatList
            data={filteredStories}
            renderItem={renderStoryItem}
            keyExtractor={(item) => item.id}
            numColumns={2}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={styles.storiesGrid}
            columnWrapperStyle={styles.row}
            />
        </View>
        </SafeAreaView>
    </SafeAreaProvider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#e6f2ff',
  },
  content: {
    flex: 1,
    paddingHorizontal: 16,
  },
  title: {
    marginTop:22,
    fontSize: 28,
    
    color: '#1e40af',
    textAlign: 'center',
    marginBottom: 8,
    fontFamily: 'Tajawal-Bold', 
  },
  subtitle: {
    fontSize: 16,
    color: '#007acc',
    textAlign: 'center',
    marginBottom: 20,
    fontFamily: 'Tajawal-Medium', 
  },
  storiesGrid: {
    paddingBottom: 20,
  },
  row: {
    justifyContent: 'space-between',
    flexDirection: 'row', 
  },
   imageContainer: {
    marginBottom: -20,
    marginTop: -20,
    alignContent: 'center',
    alignItems: 'center',
  },
  headerImage: {
    width: 150,
    height: 200,
  },
});

export default StoriesIndex;