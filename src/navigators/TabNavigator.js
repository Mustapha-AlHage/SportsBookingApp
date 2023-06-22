import React from 'react';

import Stadium from '../components/Stadium';
import {createStackNavigator} from '@react-navigation/stack';
import StadiumDetails from '../components/StadiumDetails';
import Settings from '../components/Settings';
import AboutUs from '../components/AboutUs';
import Help from '../components/Help';

const Stack = createStackNavigator();
export function StadiumStack() {
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen name="Stadium" component={Stadium} />
      <Stack.Screen name="StadiumDetails" component={StadiumDetails} />
      <Stack.Screen name="Settings" component={Settings} />
      <Stack.Screen name="AboutUs" component={AboutUs} />
      <Stack.Screen name="Help" component={Help} />
    </Stack.Navigator>
  );
}
