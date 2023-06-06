import React, {useState, useEffect} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import database from '@react-native-firebase/database';

export default function Stadium() {
  const [data, setData] = useState([]);

  useEffect(() => {
    console.log('stadium: ');
    database()
      .ref('/stadiums/')
      .on('value', snapshot => {
        console.log('stadium: ', snapshot.val());
        setData(snapshot.val());
      });
  }, []);
  // console.log(data);
  // data.map(stadium => {
  //   console.log(stadium && stadium.name);
  // });
  return (
    <View
      style={[
        styles.container,
        {
          // flexDirection: 'column',
        },
      ]}></View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
});
