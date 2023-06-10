//////////////////////////////

import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {useEffect} from 'react';

import LogIn from './src/components/LogIn';
import Stadium from './src/components/Stadium';
//import Navigation from './src/components/Navigation';
import SignedInStack from './src/components/Navigation';
import Settings from './src/components/Settings';

export default function App() {
  useEffect(() => {
    console.log('hello');
  }, []);
  return (
    <SafeAreaProvider>
      <>
        {/* <Stadium /> */}
        {/* <LogIn /> */}
        <SignedInStack />
        {/* <Settings /> */}
      </>
    </SafeAreaProvider>
  );
}

// const style =  StyleSheet.create({

// })

// const Header = props => {
//   return (
//     <View
//       style={{
//         justifyContent: 'center',
//         alignItems: 'center',
//         backgroundColor: 'green',
//       }}>
//       <Text>{props.title}</Text>
//     </View>
//   );
// };
