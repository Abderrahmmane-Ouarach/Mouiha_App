import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
} from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import StoryCard from './components/StoryCard';
import FilterButtons from './components/FilterButtons';
import { Story } from './types';
import { storiesData } from './data/storiesData';
import { shuffleArray } from './utils/arrayUtils';
import { loadFavorites, toggleFavorite as toggleFavoriteStorage } from './utils/storageUtils';
import { Asset } from 'expo-asset';

const StoriesIndex: React.FC = () => {
  const navigation = useNavigation();
  const [stories, setStories] = useState<Story[]>([]);
  const [filteredStories, setFilteredStories] = useState<Story[]>([]);
  const [currentFilter, setCurrentFilter] = useState<'all' | 'favorites'>('all');

  useEffect(() => {
    const loadAssets = async () => {
      await Asset.loadAsync([
        require('../../assets/stories/BrossageDesDents/1.jpg'),
        require('../../assets/stories/BrossageDesDents/2.jpg'),
        require('../../assets/stories/BrossageDesDents/3.jpg'),
        require('../../assets/stories/BrossageDesDents/4.jpg'),
        require('../../assets/stories/BrossageDesDents/5.jpg'),
        require('../../assets/stories/BrossageDesDents/6.jpg'),
        require('../../assets/stories/FuiteEau/1.jpg'),
        require('../../assets/stories/FuiteEau/2.jpg'),
        require('../../assets/stories/FuiteEau/3.jpg'),
        require('../../assets/stories/FuiteEau/4.jpg'),
        require('../../assets/stories/FuiteEau/5.jpg'),
        require('../../assets/stories/FuiteEau/6.jpg'),
        require('../../assets/stories/LavageVoiture/1.jpg'),
        require('../../assets/stories/LavageVoiture/2.jpg'),
        require('../../assets/stories/LavageVoiture/3.jpg'),
        require('../../assets/stories/LavageVoiture/4.jpg'),
        require('../../assets/stories/LavageVoiture/5.jpg'),
        require('../../assets/stories/LavageVoiture/6.jpg'),
        require('../../assets/stories/Pollution/1.jpg'),
        require('../../assets/stories/Pollution/2.jpg'),
        require('../../assets/stories/Pollution/3.jpg'),
        require('../../assets/stories/Pollution/4.jpg'),
        require('../../assets/stories/Pollution/5.jpg'),
        require('../../assets/stories/Pollution/6.jpg'),
        require('../../assets/stories/PollutionSourceEau/1.jpg'),
        require('../../assets/stories/PollutionSourceEau/2.jpg'),
        require('../../assets/stories/PollutionSourceEau/3.jpg'),
        require('../../assets/stories/PollutionSourceEau/4.jpg'),
        require('../../assets/stories/PollutionSourceEau/5.jpg'),
        require('../../assets/stories/PollutionSourceEau/6.jpg'),
      ]);
    };
    loadAssets();
  }, []);

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
      const favoriteIds = await loadFavorites();
      const shuffledStories = shuffleArray([...storiesData]);
      
      const storiesWithFavorites = shuffledStories.map(story => ({
        ...story,
        isFavorite: favoriteIds.includes(story.id),
      }));
      
      setStories(storiesWithFavorites);
      setFilteredStories(storiesWithFavorites);
    } catch (error) {
      console.error('Error loading stories with favorites:', error);

      const shuffledStories = shuffleArray([...storiesData]);
      setStories(shuffledStories);
      setFilteredStories(shuffledStories);
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

  return (
    <SafeAreaProvider>
        <SafeAreaView style={styles.container}>
        
        <View style={styles.content}>
            <Text style={styles.title}>قصص المياه</Text>
            <Text style={styles.subtitle}>
            اكتشف قصصاً مذهلة عن المياه !
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
    color: '#3b82f6',
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
});

export default StoriesIndex;