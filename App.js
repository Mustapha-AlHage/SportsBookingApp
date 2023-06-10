import React from 'react';

import {NavigationContainer} from '@react-navigation/native';

import {SafeAreaProvider} from 'react-native-safe-area-context';

export default function App() {
  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <></>
      </NavigationContainer>
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

// screenOptions={({route}) => ({
//   tabBarIcon: ({focused, color, size}) => {
//     let iconName;

//     if (route.name === 'Stadiums') {
//       iconName = focused ? 'stadium' : '';
//     } else if (route.name === 'Log') {
//       iconName = focused ? 'ios-list' : 'ios-list-outline';
//     }

//     // You can return any component that you like here!
//     return <Icon name={iconName} size={size} color={color} />;
//   },
//   tabBarActiveTintColor: 'tomato',
//   tabBarInactiveTintColor: 'gray',
// })}
