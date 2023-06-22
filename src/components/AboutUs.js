import React, {useState} from 'react';

import {Text, View, TouchableOpacity, TextInput} from 'react-native';
import database from '@react-native-firebase/database';

export default function AboutUs() {
  const [edit, setEdit] = useState(false);
  const [name, setName] = useState('Manal lhlwe');

  database()
    .ref('/users/123')
    .update({
      age: 32,
    })
    .then(() => console.log('Data updated.'));

  const editable = () => {
    setEdit(!edit);
  };
  return (
    <View>
      <View style={{padding: 10}}>
        <TextInput
          style={{height: 40}}
          placeholder={name}
          onChangeText={newName => setName(newName)}
          defaultValue={name}
          editable={edit}
        />
        <TouchableOpacity onPress={editable}>
          <Text>edit</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
