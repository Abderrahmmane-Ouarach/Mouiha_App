import NetInfo from '@react-native-community/netinfo';
import { fetchStories } from './fetchStories';
import { loadStoriesFromCache, saveStoriesToCache } from '../utils/storageUtils';
import { Story } from '../types';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const fetchStoriesWithCache = async (): Promise<Story[]> => {
  const isConnected = (await NetInfo.fetch()).isConnected;

  if (isConnected) {
    const freshStories = await fetchStories(); // fetch from Supabase
    await AsyncStorage.setItem('stories_cache', JSON.stringify(freshStories));
    return freshStories;
  }

  // fallback to cache
  const cached = await AsyncStorage.getItem('stories_cache');
  return cached ? JSON.parse(cached) : [];
};
