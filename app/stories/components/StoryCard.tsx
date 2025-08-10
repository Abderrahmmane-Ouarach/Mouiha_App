import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  Dimensions,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { Story } from '../types';

const { width } = Dimensions.get('window');
const cardWidth = (width - 48) / 2; // 16px padding on each side + 16px gap

interface StoryCardProps {
  story: Story;
  onPress: () => void;
  onToggleFavorite: () => void;
}

const StoryCard: React.FC<StoryCardProps> = ({
  story,
  onPress,
  onToggleFavorite,
}) => {
  return (
    <TouchableOpacity style={styles.card} onPress={onPress}>
      <View style={styles.imageContainer}>
        <Image 
          source={typeof story.coverImage === 'string' ? { uri: story.coverImage } : story.coverImage} 
          style={styles.coverImage} 
        />
        <TouchableOpacity
          style={styles.favoriteButton}
          onPress={onToggleFavorite}
          hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
        >
          <Icon
            name={story.isFavorite ? 'favorite' : 'favorite-border'}
            size={24}
            color={story.isFavorite ? '#3b82f6' : '#64748b'}
          />
        </TouchableOpacity>
      </View>
      
      <View style={styles.contentContainer}>
        <Text style={styles.title} numberOfLines={2}>
          {story.title}
        </Text>
        <Text style={styles.description} numberOfLines={3}>
          {story.description}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    width: cardWidth,
    backgroundColor: '#ffffff',
    borderRadius: 16,
    marginBottom: 16,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    overflow: 'hidden',
  },
  imageContainer: {
    position: 'relative',
  },
  coverImage: {
    width: '100%',
    height: 120,
    backgroundColor: '#f0f9ff',
  },
  favoriteButton: {
    position: 'absolute',
    top: 8,
    right: 8, // Keep consistent positioning
    backgroundColor: '#ffffff',
    borderRadius: 20,
    padding: 6,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  contentContainer: {
    padding: 10,
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#1e40af',
    marginBottom: 6,
    lineHeight: 20,
    textAlign: 'right', // Keep Arabic text aligned to right
    fontFamily: 'Tajawal-Medium',
  },
  description: {
    fontSize: 12,
    color: '#64748b',
    lineHeight: 16,
    textAlign: 'right', // Keep Arabic text aligned to right
    fontFamily: 'Tajawal-Regular',
  },
});

export default StoryCard;