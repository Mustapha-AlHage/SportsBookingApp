import React from 'react';

import Stadium from '../components/Stadium';
import {createStackNavigator} from '@react-navigation/stack';
import StadiumDetails from '../components/StadiumDetails';
const Stack = createStackNavigator();
export function StadiumStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Stadium" component={Stadium} />
      <Stack.Screen name="StadiumDetails" component={StadiumDetails} />
    </Stack.Navigator>
  );
}
