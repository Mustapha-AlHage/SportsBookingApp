import React from 'react';

import Stadium from '../components/Stadium';
import {createStackNavigator} from '@react-navigation/stack';
import StadiumDetails from '../components/StadiumDetails';
import Settings from '../components/Settings';
import AboutUs from '../components/AboutUs';
import Help from '../components/Help';
import ReservationsList from '../components/ReservationsList';
import Profile from '../components/NewProfile';
import Favorites from '../components/Favorites';

const Stack = createStackNavigator();
export function StadiumStack() {
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen name="Stadium" component={Stadium} />
      <Stack.Screen name="StadiumDetails" component={StadiumDetails} />
    </Stack.Navigator>
  );
}

export function ProfileStack() {
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen name="Profile" component={Profile} />
      <Stack.Screen name="Settings" component={Settings} />
      <Stack.Screen name="AboutUs" component={AboutUs} />
      <Stack.Screen name="Help" component={Help} />
      {/* <Stack.Screen name="Favorites" component={Favorites} /> */}
      <Stack.Screen name="ReservationsList" component={ReservationsList} />
    </Stack.Navigator>
  );
}
