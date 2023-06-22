import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {NavigationContainer} from '@react-navigation/native';
import {StadiumStack} from './TabNavigator';
import StadiumDetails from '../components/StadiumDetails';
//import Profile from '../components/Profile';
import NewProfile from '../components/NewProfile';

const Tab = createBottomTabNavigator();

export default function StackNavigator() {
  return (
    <Tab.Navigator screenOptions={{headerShown: false}}>
      <Tab.Screen name="Stadiums" component={StadiumStack} />
      <Tab.Screen name="Reservations" component={StadiumStack} />
      <Tab.Screen name="NewProfile" component={NewProfile} />
    </Tab.Navigator>
  );
}
