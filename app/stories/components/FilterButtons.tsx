import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

interface FilterButtonsProps {
  currentFilter: 'all' | 'favorites';
  onFilterChange: (filter: 'all' | 'favorites') => void;
  favoriteCount: number;
}

const FilterButtons: React.FC<FilterButtonsProps> = ({
  currentFilter,
  onFilterChange,
  favoriteCount,
}) => {
  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={[
          styles.filterButton,
          currentFilter === 'all' && styles.activeButton,
        ]}
        onPress={() => onFilterChange('all')}
      >
        <Text
          style={[
              styles.filterText,
              currentFilter === 'all' && styles.activeText,
            ]}
        >
          جميع القصص
        </Text>
        <Icon
            name="library-books"
            size={20}
            color={currentFilter === 'all' ? '#ffffff' : '#3b82f6'}
        />
      </TouchableOpacity>

      <TouchableOpacity
        style={[
          styles.filterButton,
          currentFilter === 'favorites' && styles.activeButton,
        ]}
        onPress={() => onFilterChange('favorites')}
      >
        <Text
          style={[
              styles.filterText,
              currentFilter === 'favorites' && styles.activeText,
            ]}
        >
          المفضلة
        </Text>
        <Icon
            name="favorite"
            size={20}
            color={currentFilter === 'favorites' ? '#ffffff' : '#3b82f6'}
        />
        
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row', 
    marginBottom: 20,
    backgroundColor: '#ffffff',
    borderRadius: 12,
    padding: 4,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  filterButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 8,
    position: 'relative',
  },
  activeButton: {
    backgroundColor: '#3b82f6',
  },
  filterText: {
    fontSize: 14,
    
    color: '#3b82f6',
    marginRight: 6,
    fontFamily: 'Tajawal-Medium', 
  },
  activeText: {
    color: '#ffffff',
  },
  badge: {
    position: 'absolute',
    top: 6,
    right: 8,
    backgroundColor: '#ef4444',
    borderRadius: 10,
    minWidth: 20,
    height: 20,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 6,
  },
  badgeText: {
    fontSize: 12,
    color: '#ffffff',
    fontWeight: 'bold',
  },
});

export default FilterButtons;