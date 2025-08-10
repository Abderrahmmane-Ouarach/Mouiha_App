import AsyncStorage from '@react-native-async-storage/async-storage';

const FAVORITES_KEY = 'story_favorites';

/**
 * Save favorite story IDs to AsyncStorage
 * @param favoriteIds - Array of story IDs that are favorited
 */
export const saveFavorites = async (favoriteIds: string[]): Promise<void> => {
  try {
    await AsyncStorage.setItem(FAVORITES_KEY, JSON.stringify(favoriteIds));
  } catch (error) {
    console.error('Error saving favorites:', error);
  }
};

/**
 * Load favorite story IDs from AsyncStorage
 * @returns Array of favorited story IDs
 */
export const loadFavorites = async (): Promise<string[]> => {
  try {
    const favoritesJson = await AsyncStorage.getItem(FAVORITES_KEY);
    return favoritesJson ? JSON.parse(favoritesJson) : [];
  } catch (error) {
    console.error('Error loading favorites:', error);
    return [];
  }
};

/**
 * Add a story ID to favorites
 * @param storyId - Story ID to add to favorites
 */
export const addToFavorites = async (storyId: string): Promise<void> => {
  try {
    const currentFavorites = await loadFavorites();
    if (!currentFavorites.includes(storyId)) {
      const updatedFavorites = [...currentFavorites, storyId];
      await saveFavorites(updatedFavorites);
    }
  } catch (error) {
    console.error('Error adding to favorites:', error);
  }
};

/**
 * Remove a story ID from favorites
 * @param storyId - Story ID to remove from favorites
 */
export const removeFromFavorites = async (storyId: string): Promise<void> => {
  try {
    const currentFavorites = await loadFavorites();
    const updatedFavorites = currentFavorites.filter(id => id !== storyId);
    await saveFavorites(updatedFavorites);
  } catch (error) {
    console.error('Error removing from favorites:', error);
  }
};

/**
 * Toggle favorite status for a story
 * @param storyId - Story ID to toggle
 * @param currentlyFavorite - Current favorite status
 */
export const toggleFavorite = async (storyId: string, currentlyFavorite: boolean): Promise<void> => {
  if (currentlyFavorite) {
    await removeFromFavorites(storyId);
  } else {
    await addToFavorites(storyId);
  }
};