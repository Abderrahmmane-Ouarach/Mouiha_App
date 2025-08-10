export interface Story {
    id: string;
    title: string;
    description: string;
    coverImage: string | any; // Can be URL string or require() result
    storyImages: (string | any)[]; // Array of URLs or require() results for story pages
    isFavorite: boolean;
    createdAt: Date;
  }
  
  export interface StoryScreenNavigationProp {
    navigate: (screen: string, params?: any) => void;
    goBack: () => void;
  }
  
  export type FilterType = 'all' | 'favorites';
  
  export interface StoryCardProps {
    story: Story;
    onPress: () => void;
    onToggleFavorite: () => void;
  }
  
  export interface FilterButtonsProps {
    currentFilter: FilterType;
    onFilterChange: (filter: FilterType) => void;
    favoriteCount: number;
  }