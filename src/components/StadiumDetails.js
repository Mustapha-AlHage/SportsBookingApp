import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  Text,
  FlatList,
  View,
  Image,
  Button,
  TouchableOpacity,
  TextInput,
} from 'react-native';
import database from '@react-native-firebase/database';
import Icon from 'react-native-vector-icons/Ionicons';

export default function StadiumDetails({route, navigation}) {
  const {name, location, city, capacity, sportType, price, rating, amenities} =
    route.params;
  return (
    <View style={styles.container}>
      <View style={styles.image}>
        <Image
          style={{
            flex: 1,
            width: '100%',
          }}
          source={{
            uri: 'https://i.imgur.com/5cpkhU4.jpg',
          }}
        />
      </View>
      <View style={styles.details}>
        <View>
          <Text
            style={{
              textAlign: 'center',
              fontSize: 20,
              marginTop: 10,
              color: '#111821',
            }}>
            {name} Stadium
          </Text>
          <View style={styles.stadiumInfo}>
            <View style={styles.location}>
              <Icon name="location" size={20} />
              <Text style={{}}>
                {city}, {location}
              </Text>
            </View>

            {/* <Text>Number of players: {capacity}</Text> */}
            <View style={{marginTop: 20}}>
              <Text>{price} /hour</Text>
            </View>
          </View>
        </View>

        <View style={styles.map}>
          <Image
            style={{
              flex: 1,
              width: '100%',
              borderRadius: 40,
            }}
            source={{
              uri: 'https://i.imgur.com/s8WJr2p.png',
            }}
          />
        </View>
        <View style={{flex: 2}}>
          <Text style={{fontSize: 17, margin: 10}}>Features</Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
  },
  image: {
    flex: 1,
    backgroundColor: 'black',
  },
  details: {
    flex: 3,
    backgroundColor: 'white',
    borderTopRightRadius: 20,
    borderTopLeftRadius: 20,
  },
  stadiumInfo: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  location: {
    flexDirection: 'row',
    marginTop: 20,
  },
  map: {
    flex: 1,
    margin: 10,
  },
});
