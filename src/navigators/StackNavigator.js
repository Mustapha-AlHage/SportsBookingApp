import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {NavigationContainer} from '@react-navigation/native';
import {StadiumStack} from './TabNavigator';
import StadiumDetails from '../components/StadiumDetails';
//import Profile from '../components/Profile';
import NewProfile from '../components/NewProfile';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
const Tab = createBottomTabNavigator();

export default function StackNavigator() {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarStyle: {
          backgroundColor: '#053857',
          height: 55,
          // borderTopRightRadius: 20,
          // borderTopLeftRadius: 20,
        },
        headerShown: false,
      }}>
      <Tab.Screen
        name="Stadiums"
        component={StadiumStack}
        options={{
          tabBarLabel: '',
          tabBarIcon: ({color, size}) => (
            <MaterialCommunityIcons
              name="stadium-variant"
              color={'white'}
              size={35}
            />
          ),
        }}
      />

      {/* <Tab.Screen name="Reservations" component={StadiumStack} /> */}
      <Tab.Screen
        name="NewProfile"
        component={NewProfile}
        options={{
          tabBarLabel: '',
          tabBarIcon: ({color, size}) => (
            <FontAwesome name="user" color={'white'} size={35} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}
