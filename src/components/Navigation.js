import 'react-native-gesture-handler';
import React, {useState, useEffect} from 'react';
import auth from '@react-native-firebase/auth';

import {createStackNavigator} from '@react-navigation/stack';
import {NavigationContainer} from '@react-navigation/native';

import {View, Text, ActivityIndicator, ImageBackground} from 'react-native';
import Stadium from './Stadium';
import LogIn from './LogIn';
import TabNavigator from '../navigators/TabNavigator';
import SignUp from './SignUp';
import Settings from './Settings';
// import NewProfile from './NewProfile';
// import AboutUs from './AboutUs';
import {
  Menu,
  MenuOptions,
  MenuOption,
  MenuTrigger,
} from 'react-native-popup-menu';

const Stack = createStackNavigator();
function SignedInStack() {
  // Set an initializing state whilst Firebase connects
  const [initializing, setInitializing] = useState(true);
  const [user, setUser] = useState();
  const image = {
    uri: 'https://i.imgur.com/cZtcRWa.png',
  };
  // Handle user state changes
  function onAuthStateChanged(user) {
    setUser(user);
    if (initializing) setInitializing(false);
  }

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber; // unsubscribe on unmount
  }, []);

  if (initializing)
    return (
      <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
        {/* <ImageBackground source={image}></ImageBackground> */}
        <ActivityIndicator></ActivityIndicator>
      </View>
    );
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{headerShown: false}}>
        {user ? (
          <Stack.Screen name="Main" component={TabNavigator} />
        ) : (
          <>
            <Stack.Screen name="LogIn" component={LogIn} />
            <Stack.Screen name="SignUp" component={SignUp} />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default SignedInStack;
