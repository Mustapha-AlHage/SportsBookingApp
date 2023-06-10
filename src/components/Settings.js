import React from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
function Settings(props) {
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
export default Settings;
