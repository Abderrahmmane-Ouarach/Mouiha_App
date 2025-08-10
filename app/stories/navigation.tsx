import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import StoriesIndex from './index';
import StoryViewer from './StoryViewer';
import { Story } from './types';

export type StoriesStackParamList = {
  StoriesIndex: undefined;
  StoryViewer: {
    story: Story;
  };
};

const Stack = createNativeStackNavigator<StoriesStackParamList>();

const StoriesNavigator: React.FC = () => {
  return (
    <Stack.Navigator
      initialRouteName="StoriesIndex"
      screenOptions={{
        headerShown: false,
        gestureEnabled: true,
        gestureDirection: 'horizontal',
      }}
    >
      <Stack.Screen 
        name="StoriesIndex" 
        component={StoriesIndex}
        options={{
          title: 'Water Stories',
        }}
      />
      <Stack.Screen 
        name="StoryViewer" 
        component={StoryViewer}
        options={{
          title: 'Story',
          gestureEnabled: true,
        }}
      />
    </Stack.Navigator>
  );
};

export default StoriesNavigator;