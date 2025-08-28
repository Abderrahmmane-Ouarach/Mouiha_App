import NetInfo from '@react-native-community/netinfo';
import { fetchStories } from './fetchStories';
import { loadStoriesFromCache, saveStoriesToCache } from '../utils/storageUtils';
import { Story } from '../types';

export const fetchStoriesWithCache = async (): Promise<Story[]> => {
  // Load cached stories first
  let cachedStories: Story[] = await loadStoriesFromCache();

  // Check internet connectivity
  const netState = await NetInfo.fetch();
  if (netState.isConnected) {
    try {
      const storiesFromSupabase = await fetchStories();
      // Save fresh stories to cache
      await saveStoriesToCache(storiesFromSupabase);
      return storiesFromSupabase;
    } catch (e) {
      console.warn('Failed to fetch from Supabase, using cache', e);
      return cachedStories;
    }
  } else {
    // No internet, use cache
    return cachedStories;
  }
};
