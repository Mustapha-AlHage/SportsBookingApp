import React from 'react';
import {Text, View, TouchableOpacity} from 'react-native';

export default function Settings() {
  return (
    <View>
      <View>
        <TouchableOpacity onPress>
          <Text>Notifications</Text>
        </TouchableOpacity>
      </View>
      <View>
        <TouchableOpacity>
          <Text>favorites</Text>
        </TouchableOpacity>
      </View>
      <View>
        <TouchableOpacity>
          <Text>LogOut</Text>
        </TouchableOpacity>
      </View>
      <View>
        <TouchableOpacity>
          <Text>Help</Text>
        </TouchableOpacity>
      </View>
      <View>
        <TouchableOpacity>
          <Text>About</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
