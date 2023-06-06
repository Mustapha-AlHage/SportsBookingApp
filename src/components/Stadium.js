import React, {useState, useEffect} from 'react';
import {StyleSheet, Text, FlatList, View} from 'react-native';
import database from '@react-native-firebase/database';

export default function Stadium() {
  const [data, setData] = useState([]);

  useEffect(() => {
    const reference = database().ref('/stadiums/');
    console.log('stadium: ');
    reference.on('value', snapshot => {
      // console.log('stadium: ', snapshot.val());

      const data = Object.entries(snapshot.val()).map(([key, value]) => value);
      console.log(data);
      setData(data);
    });
  }, []);

  return (
    <View style={styles.container}>
      <FlatList
        data={data}
        style={{flex: 1}}
        renderItem={({item}) => (
          <View style={{height: 50, width: '100%', backgroundColor: 'red'}}>
            <Text>{item.name}</Text>
          </View>
        )}
        keyExtractor={(item, index) => '' + index}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
});
