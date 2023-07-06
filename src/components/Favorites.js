import React, {useEffect, useState} from 'react';
import {StyleSheet, Text, FlatList, View} from 'react-native';

export default function Favorites({route}) {
  //   const {favorites} = route.params;

  return (
    <View style={styles.container}>
      <Text>hi</Text>
      {/* <FlatList
        data={favorites}
        renderItem={({item}) => (
          <View style={styles.favoriteItem}>
            <Text>{item.name} stadium</Text>
          </View>
        )}
        keyExtractor={item => item.id}
        ListEmptyComponent={<Text>No favorites yet</Text>}
      /> */}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  favoriteItem: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
});
