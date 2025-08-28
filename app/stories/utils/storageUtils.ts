import AsyncStorage from '@react-native-async-storage/async-storage';
import { Story } from '../types';

const FAVORITES_KEY = 'story_favorites';
const STORIES_CACHE_KEY = 'cached_stories';

/* -------------------- Favorites -------------------- */
export const saveFavorites = async (favoriteIds: string[]): Promise<void> => {
  try {
    await AsyncStorage.setItem(FAVORITES_KEY, JSON.stringify(favoriteIds));
  } catch (error) {
    console.error('Error saving favorites:', error);
  }
};

export const loadFavorites = async (): Promise<string[]> => {
  try {
    const favoritesJson = await AsyncStorage.getItem(FAVORITES_KEY);
    return favoritesJson ? JSON.parse(favoritesJson) : [];
  } catch (error) {
    console.error('Error loading favorites:', error);
    return [];
  }
};

export const addToFavorites = async (storyId: string): Promise<void> => {
  const currentFavorites = await loadFavorites();
  if (!currentFavorites.includes(storyId)) {
    await saveFavorites([...currentFavorites, storyId]);
  }
};

export const removeFromFavorites = async (storyId: string): Promise<void> => {
  const currentFavorites = await loadFavorites();
  await saveFavorites(currentFavorites.filter(id => id !== storyId));
};

export const toggleFavorite = async (storyId: string, currentlyFavorite: boolean): Promise<void> => {
  if (currentlyFavorite) {
    await removeFromFavorites(storyId);
  } else {
    await addToFavorites(storyId);
  }
};

/* -------------------- Offline Stories Cache -------------------- */
export const saveStoriesToCache = async (stories: Story[]): Promise<void> => {
  try {
    await AsyncStorage.setItem(STORIES_CACHE_KEY, JSON.stringify(stories));
  } catch (error) {
    console.error('Error saving stories cache:', error);
  }
};

export const loadStoriesFromCache = async (): Promise<Story[]> => {
  try {
    const data = await AsyncStorage.getItem(STORIES_CACHE_KEY);
    return data ? JSON.parse(data) : [];
  } catch (error) {
    console.error('Error loading stories cache:', error);
    return [];
  }
};
