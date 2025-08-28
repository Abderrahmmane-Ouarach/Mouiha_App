import { supabase } from '../../../lib/supabase';
import { Story } from '../types';

export const fetchStories = async (): Promise<Story[]> => {
  const { data: storiesData, error } = await supabase
    .from('stories')
    .select('*');

  if (error) throw error;

  // Transforme les données pour matcher le type Story
  const stories: Story[] = storiesData.map(story => ({
    id: story.id,
    title: story.title,
    description: story.description,
    coverImage: story.cover_image,   // de la colonne cover_image
    storyImages: story.images,       // de la colonne images[]
    isFavorite: false,
    createdAt: story.created_at ? new Date(story.created_at) : undefined,
  }));

  return stories;
};
