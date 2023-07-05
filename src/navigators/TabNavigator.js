import React, {useState} from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {NavigationContainer} from '@react-navigation/native';
import {ProfileStack, StadiumStack} from './StackNavigator';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import {Pressable, View} from 'react-native';

const Tab = createBottomTabNavigator();

export default function TabNavigator({navigation}) {
  const [activeTab, setActiveTab] = useState('Stadiums');

  const handleTabPress = tabName => {
    setActiveTab(tabName);
    navigation.navigate(tabName);
  };

  return (
    <Tab.Navigator
      screenOptions={{
        tabBarStyle: {
          backgroundColor: '#053857',
          height: 55,
        },
        headerShown: false,
      }}>
      <Tab.Screen
        name="Stadiums"
        component={StadiumStack}
        options={{
          tabBarLabel: '',
          tabBarIcon: ({color}) => (
            <Pressable onPress={() => handleTabPress('Stadiums')}>
              <View style={{alignItems: 'center'}}>
                <MaterialCommunityIcons
                  name="stadium-variant"
                  color={activeTab === 'Stadiums' ? 'white' : 'gray'}
                  size={30}
                />
              </View>
            </Pressable>
          ),
        }}
      />
      <Tab.Screen
        name="NewProfile"
        component={ProfileStack}
        options={{
          tabBarLabel: '',
          tabBarIcon: ({color}) => (
            <Pressable onPress={() => handleTabPress('NewProfile')}>
              <View style={{alignItems: 'center'}}>
                <FontAwesome
                  name="user"
                  color={activeTab === 'NewProfile' ? 'white' : 'gray'}
                  size={30}
                />
              </View>
            </Pressable>
          ),
        }}
      />
    </Tab.Navigator>
  );
}
