import React from 'react';
import {Text, View} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {SafeAreaProvider} from 'react-native-safe-area-context';

export default function App(props) {
  useEffect(() => {
    console.log('hello');
  }, [props]);
  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <Text>hello world</Text>
      </NavigationContainer>
    </SafeAreaProvider>
  );
}

const Header = props => {
  return (
    <View
      style={{
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'green',
      }}>
      <Text>{props.title}</Text>
    </View>
  );
};
