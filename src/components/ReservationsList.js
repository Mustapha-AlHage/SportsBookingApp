import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Button,
  Alert,
  ImageBackground,
} from 'react-native';
import database from '@react-native-firebase/database';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

const ReservationsList = ({route}) => {
  const {reserve} = route.params;
  console.log(reserve);

  const deleteReservation = id => {
    Alert.alert(
      'Confirmation',
      'Are you sure you want to delete this reservation?',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'OK',
          onPress: () => {
            // Remove the reservation from the database
            database().ref(`/reservations/${id}`).remove();
          },
        },
      ],
      {cancelable: false},
    );
  };

  const renderReservationItem = ({item}) => (
    <View style={styles.itemContainer}>
      <View style={styles.itemInfoContainer}>
        <View style={styles.itemText}>
          <Text
            style={{
              fontSize: 18,
              marginBottom: 8,
              color: '#053857',
              fontWeight: 'bold',
            }}>
            Stadium: {item.stadiumName}
          </Text>
        </View>

        <Text style={styles.itemText}>Date: {item.date}</Text>
        <Text style={styles.itemText}>Start Time: {item.startTime}</Text>
        <Text style={styles.itemText}>Price: {item.price} $</Text>
      </View>
      <TouchableOpacity
        style={styles.deleteButton}
        onPress={() => deleteReservation(item.id)}>
        <MaterialCommunityIcons name="delete-empty" size={25} color="#FFF" />
      </TouchableOpacity>
    </View>
  );

  return (
    <ImageBackground
      source={{
        uri: 'https://i.pinimg.com/736x/e9/38/8e/e9388e38f428fcd7ef424420f1322f89.jpg',
      }}
      style={styles.backgroundImage}>
      <View style={styles.container}>
        <Text style={styles.title}> Reservation History</Text>
        <FlatList
          style={styles.listContainer}
          data={reserve}
          renderItem={renderReservationItem}
          keyExtractor={(item, index) => String(index)}
          contentContainerStyle={styles.listContentContainer}
        />
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
    resizeMode: 'cover',
  },
  container: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    paddingHorizontal: 16,
    paddingTop: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#FFFFFF',
  },
  listContainer: {
    flex: 1,
  },
  listContentContainer: {
    paddingBottom: 16,
  },
  itemContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    marginBottom: 16,
    padding: 16,
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  itemInfoContainer: {
    flex: 1,
  },
  itemText: {
    fontSize: 16,
    marginBottom: 8,
    color: '#053857',
  },
  deleteButton: {
    backgroundColor: '#FC7F00',
    padding: 6,
    borderRadius: 4,
    bottom: 40,
  },
});

export default ReservationsList;
