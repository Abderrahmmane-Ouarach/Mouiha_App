import React, { useState, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  Image,
  Dimensions,
  I18nManager,
  Modal,
  ScrollView,
} from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { useRoute, useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { Story } from './types';

// Remove forced RTL - let it work naturally

const { width } = Dimensions.get('window');

interface StoryViewerRouteParams {
  story: Story;
}

const StoryViewer: React.FC = () => {
  const route = useRoute();
  const navigation = useNavigation();
  const { story } = route.params as StoryViewerRouteParams;
  
  // Initialize currentPage to 0 for the first page
  const [currentPage, setCurrentPage] = useState(0);
  const [loading, setLoading] = useState(false);
  const [showDescription, setShowDescription] = useState(false);
  const flatListRef = useRef<FlatList>(null);

  const handlePageChange = (info: any) => {
    if (info.viewableItems && info.viewableItems.length > 0) {
      const newIndex = info.viewableItems[0].index || 0;
      setCurrentPage(newIndex);
    }
  };

  const toggleDescriptionModal = () => {
    setShowDescription(!showDescription);
  };

  const renderStoryPage = ({ item, index }: { item: any; index: number }) => (
    <View style={styles.pageContainer}>
      <Image
        source={typeof item === 'string' ? { uri: item } : item}
        style={styles.storyImage}
        resizeMode="contain"
        onLoadStart={() => setLoading(true)}
        onLoadEnd={() => setLoading(false)}
      />
      {loading && (
        <View style={styles.loadingOverlay}>
          <Icon name="hourglass-empty" size={32} color="#3b82f6" />
        </View>
      )}
    </View>
  );

  const renderHeader = () => (
    <View style={styles.header}>
      
      <TouchableOpacity
        style={styles.backButton}
        onPress={() => navigation.goBack()}
      >
        <Icon 
          name="arrow-back" 
          size={24} 
          color="#1e40af" 
        />
      </TouchableOpacity>
      <View style={styles.titleContainer}>
        <Text style={styles.headerTitle} numberOfLines={1}>
          {story.title}
        </Text>
        <Text style={styles.pageInfo}>
          صفحة {currentPage + 1} من {story.storyImages.length}
        </Text>
      </View>
      <TouchableOpacity 
        style={styles.infoButton}
        onPress={toggleDescriptionModal}
      >
        <Icon name="info-outline" size={24} color="#3b82f6" />
      </TouchableOpacity>
      
    </View>
  );

  const renderDescriptionModal = () => (
    <Modal
      visible={showDescription}
      transparent={true}
      animationType="fade"
      onRequestClose={toggleDescriptionModal}
    >
      <TouchableOpacity 
        style={styles.modalOverlay}
        activeOpacity={1}
        onPress={toggleDescriptionModal}
      >
        <View style={styles.descriptionBubble}>
          <View style={styles.bubbleHeader}>
            <Icon name="info" size={24} color="#3b82f6" />
            <Text style={styles.bubbleTitle}>وصف القصة</Text>
            <TouchableOpacity onPress={toggleDescriptionModal}>
              <Icon name="close" size={24} color="#64748b" />
            </TouchableOpacity>
          </View>
          
          <ScrollView style={styles.descriptionContent}>
            <Text style={styles.descriptionText}>
              {story.description}
            </Text>
          </ScrollView>
        </View>
      </TouchableOpacity>
    </Modal>
  );

  const goToNextPage = () => {
    if (currentPage < story.storyImages.length - 1) {
      flatListRef.current?.scrollToIndex({
        index: currentPage + 1,
        animated: true,
      });
    }
  };

  const goToPreviousPage = () => {
    if (currentPage > 0) {
      flatListRef.current?.scrollToIndex({
        index: currentPage - 1,
        animated: true,
      });
    }
  };

  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.container}>
        {renderHeader()}
        
        <View style={styles.storyContainer}>
          <FlatList
            ref={flatListRef}
            data={story.storyImages}
            renderItem={renderStoryPage}
            keyExtractor={(item, index) => `page-${index}`}
            horizontal
            pagingEnabled
            showsHorizontalScrollIndicator={false}
            onViewableItemsChanged={handlePageChange}
            viewabilityConfig={{ itemVisiblePercentThreshold: 50 }}
            initialScrollIndex={I18nManager.isRTL ? story.storyImages.length - 1 : 0} // Start from correct end for RTL
            getItemLayout={(data, index) => ({
              length: width,
              offset: width * index,
              index,
            })}
            // Fixed: Add inverted prop for RTL to handle scrolling direction correctly
            inverted={I18nManager.isRTL}
          />
          
          <TouchableOpacity
            style={[styles.navButton, styles.prevButton]}
            onPress={goToPreviousPage}
            disabled={currentPage === 0}
          >
            <Icon 
              name="chevron-left" 
              size={32} 
              color={currentPage === 0 ? "#94a3b8" : "#1e40af"} 
            />
          </TouchableOpacity>
          
          <TouchableOpacity
            style={[styles.navButton, styles.nextButton]}
            onPress={goToNextPage}
            disabled={currentPage === story.storyImages.length - 1}
          >
            <Icon 
              name="chevron-right" 
              size={32} 
              color={currentPage === story.storyImages.length - 1 ? "#94a3b8" : "#1e40af"} 
            />
          </TouchableOpacity>
        </View>
        
        <View style={styles.pageIndicators}>
          {story.storyImages.map((_, index) => (
            <TouchableOpacity
              key={index}
              style={[
                styles.indicator,
                index === currentPage && styles.activeIndicator,
              ]}
              onPress={() => {
                flatListRef.current?.scrollToIndex({
                  index: index,
                  animated: true,
                });
              }}
            />
          ))}
        </View>
        {renderDescriptionModal()}
      </SafeAreaView>
    </SafeAreaProvider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#e6f2ff',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: '#ffffff',
    borderBottomWidth: 1,
    borderBottomColor: '#e5e7eb',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  backButton: {
    padding: 8,
    marginRight: 8,
  },
  titleContainer: {
    flex: 1,
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 20,
    color: '#1e40af',
    fontFamily: 'Tajawal-Bold', // Replace with Arabic font
  },
  pageInfo: {
    fontSize: 14,
    color: '#64748b',
    marginTop: 2,
    fontFamily: 'Tajawal-Light', // Replace with Arabic font
  },
  infoButton: {
    padding: 8,
    marginLeft: 8,
  },
  storyContainer: {
    flex: 1,
    backgroundColor: '#f8fafc',
    position: 'relative',
  },
  pageContainer: {
    width: width,
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
  },
  storyImage: {
    width: width - 20,
    height: '100%',
    backgroundColor: '#ffffff',
    borderRadius: 8,
  },
  loadingOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
  },
  navButton: {
    position: 'absolute',
    top: '50%',
    marginTop: -25,
    width: 50,
    height: 50,
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  prevButton: {
    left: 10,
  },
  nextButton: {
    right: 10,
  },
  pageIndicators: {
    flexDirection: 'row', // Keep normal row direction
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 12,
    backgroundColor: '#ffffff',
    maxHeight: 60,
  },
  indicator: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#cbd5e1',
    marginHorizontal: 4,
    marginBottom: 10,
  },
  activeIndicator: {
    backgroundColor: '#3b82f6',
    width: 24,
    borderRadius: 6,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  descriptionBubble: {
    backgroundColor: '#ffffff',
    borderRadius: 16,
    padding: 20,
    maxWidth: '90%',
    maxHeight: '40%',
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
  },
  bubbleHeader: {
    flexDirection: 'row-reverse', // Fixed: Always use row-reverse for Arabic
    alignItems: 'center',
    marginBottom: 16,
    paddingBottom: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#e5e7eb',
  },
  bubbleTitle: {
    flex: 1,
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1e40af',
    textAlign: 'right', // Fixed: Always align Arabic text to right
    marginHorizontal: 12,
    fontFamily: 'Tajawal-Medium', // Replace with Arabic font
    writingDirection: 'rtl', // Ensure RTL text direction
  },
  descriptionContent: {
    maxHeight: 100,
  },
  descriptionText: {
    fontSize: 16,
    color: '#374151',
    lineHeight: 24,
    textAlign: 'right', // Fixed: Always align Arabic text to right
    fontFamily: 'Tajawal-Regular', // Replace with Arabic font
    writingDirection: 'rtl', // Ensure RTL text direction
  },
});

export default StoryViewer;