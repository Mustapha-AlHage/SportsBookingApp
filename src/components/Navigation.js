import 'react-native-gesture-handler';
import React, {useState, useEffect} from 'react';
import auth from '@react-native-firebase/auth';

import {createStackNavigator} from '@react-navigation/stack';
import {NavigationContainer} from '@react-navigation/native';

import {View, Text} from 'react-native';
import Stadium from './Stadium';
import LogIn from './LogIn';
//import Settings from './Settings';

const Stack = createStackNavigator();
function SignedInStack() {
  // Set an initializing state whilst Firebase connects
  const [initializing, setInitializing] = useState(true);
  const [user, setUser] = useState();

  // Handle user state changes
  function onAuthStateChanged(user) {
    setUser(user);
    if (initializing) setInitializing(false);
  }

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber; // unsubscribe on unmount
  }, []);

  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="LogIn" component={LogIn} />
        <Stack.Screen name="SignUp" component={LogIn} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default SignedInStack;
