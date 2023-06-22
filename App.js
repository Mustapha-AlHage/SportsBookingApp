import React from 'react';

import {SafeAreaProvider} from 'react-native-safe-area-context';
import Navigation from './src/components/Navigation';
//import Profile from './src/components/Profile';
import {MenuProvider} from 'react-native-popup-menu';
import NewProfile from './src/components/NewProfile';
export default function App() {
  return (
    <SafeAreaProvider>
      <>
        <MenuProvider>
          <Navigation />
          {/* <Profile /> */}
        </MenuProvider>
      </>
    </SafeAreaProvider>
  );
}
