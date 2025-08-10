/**
 * Fisher-Yates shuffle algorithm to randomize array order
 * @param array - Array to shuffle
 * @returns New shuffled array
 */
export function shuffleArray<T>(array: T[]): T[] {
    const shuffled = [...array];
    
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    
    return shuffled;
  }
  
  /**
   * Sort stories by various criteria
   * @param stories - Array of stories to sort
   * @param criteria - Sorting criteria
   * @returns Sorted array of stories
   */
  export function sortStories<T extends { createdAt: Date; title: string }>(
    stories: T[],
    criteria: 'newest' | 'oldest' | 'alphabetical' | 'random'
  ): T[] {
    switch (criteria) {
      case 'newest':
        return [...stories].sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());
      case 'oldest':
        return [...stories].sort((a, b) => a.createdAt.getTime() - b.createdAt.getTime());
      case 'alphabetical':
        return [...stories].sort((a, b) => a.title.localeCompare(b.title));
      case 'random':
        return shuffleArray(stories);
      default:
        return stories;
    }
  }
  
  /**
   * Filter stories by age group
   * @param stories - Array of stories to filter
   * @param ageGroup - Target age group
   * @returns Filtered array of stories
   */
  export function filterByAgeGroup<T extends { ageGroup: string }>(
    stories: T[],
    ageGroup: string
  ): T[] {
    if (ageGroup === 'All Ages') {
      return stories;
    }
    
    return stories.filter(story => 
      story.ageGroup === ageGroup || story.ageGroup === 'All Ages'
    );
  }
  
  /**
   * Search stories by title, description, or tags
   * @param stories - Array of stories to search
   * @param searchTerm - Search term
   * @returns Filtered array of stories matching the search term
   */
  export function searchStories<T extends { 
    title: string; 
    description: string; 
    tags: string[] 
  }>(
    stories: T[],
    searchTerm: string
  ): T[] {
    if (!searchTerm.trim()) {
      return stories;
    }
    
    const term = searchTerm.toLowerCase();
    
    return stories.filter(story =>
      story.title.toLowerCase().includes(term) ||
      story.description.toLowerCase().includes(term) ||
      story.tags.some(tag => tag.toLowerCase().includes(term))
    );
  }