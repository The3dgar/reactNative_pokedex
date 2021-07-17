import 'react-native-gesture-handler';
import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import StackNavigator from './src/navigation/StackNavigator';
import { TabNavigator } from './src/navigation/TabNavigator';

export default function App() {
  return (
    <>
      <NavigationContainer>
        {/* <StackNavigator /> */}
        <TabNavigator/>
      </NavigationContainer>
    </>
  );
}
