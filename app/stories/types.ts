export interface Story {
  id: string;
  title: string;
  description: string;
  coverImage: string;       // URL publique
  storyImages: string[];    // tableau d'URLs publiques
  isFavorite: boolean;
  createdAt?: Date;
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