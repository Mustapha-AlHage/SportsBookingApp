import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  Text,
  FlatList,
  View,
  ScrollView,
  Image,
  Button,
  TouchableOpacity,
  TextInput,
  Linking,
  Pressable,
  Alert,
} from 'react-native';
import database from '@react-native-firebase/database';
import Icon from 'react-native-vector-icons/Ionicons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import {SafeAreaView} from 'react-native-safe-area-context';
// import MapView from 'react-native-maps';
import TimePicker from './ReservationForm';
import moment from 'moment';

export default function StadiumDetails({route}) {
  const {id} = route.params;
  const [stadiumDetails, setStadiumDetails] = useState('');
  const [longitude, setLongitude] = useState(0);
  const [latitude, setLatitude] = useState(0);
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [hours, setHours] = useState(0);
  const [features, setFeatures] = useState([]);
  const [price, setPrice] = useState();

  useEffect(() => {
    const {id} = route.params;
    const reference = database().ref(`/stadiums/${id}`);

    reference.on('value', snapshot => {
      setStadiumDetails(snapshot.val());
      setLongitude(snapshot.val().longitude);
      setLatitude(snapshot.val().latitude);
      setPrice(snapshot.val().price);

      setFeatures(Object.values(snapshot.val().features));
    });
  }, []);
  console.log(features.length / 2);

  const showAlert = () => {
    Alert.alert(
      'Reservation',
      `Are you sure you want to make a reservation on ${moment(
        startDate,
      ).format('DD MM YYYY')} at ${moment(startDate).format('hh:mm a')}?`,
      [
        {
          text: 'Cancel',
          style: 'cancel',
          onPress: () => {
            console.log('Cancel Pressed');
            console.log('hi');
          },
        },
        {
          text: 'OK',
          onPress: () => {
            const reference = database().ref('/reservations/');
            reference.once('value', snapshot => {
              const reservations = snapshot.val();
              let isAvailable = true;

              for (const key in reservations) {
                const reserv = reservations[key];
                console.log(reserv.date, reserv.startTime, reserv.stadiumId);
                if (
                  reserv.date === moment(startDate).format('DD MM YYYY') &&
                  reserv.startTime === moment(startDate).format('hh:mm a') &&
                  reserv.stadiumId === id
                ) {
                  isAvailable = false;
                  break;
                }
              }

              if (isAvailable) {
                const newReference = database().ref('/reservations').push();

                console.log('Auto generated key: ', newReference.key);

                newReference
                  .set({
                    id: newReference.key,
                    date: moment(startDate).format('DD MM YYYY'),
                    startTime: moment(startDate).format('hh:mm a'),
                    endTime: moment(endDate).format('hh:mm a'),
                    hours: hours,
                    price: price * hours,
                    stadiumId: id,
                  })
                  .then(() => console.log('Data updated.'));
                setHours(0);
                console.log('You can book the stadium');
              } else {
                console.log('Already taken');
              }
            });
          },
        },
      ],
      {cancelable: false},
    );
  };

  const [showFeatures, setShowFeatures] = useState(false);
  const [showAbout, setShowAbout] = useState(true);
  const [showBooking, setShowBooking] = useState(false);

  const toggleFeatures = () => {
    setShowFeatures(true);
    setShowAbout(false);
    setShowBooking(false);
  };
  const toggleAbout = () => {
    setShowAbout(true);
    setShowFeatures(false);
    setShowBooking(false);
  };

  const toggleBooking = () => {
    setShowAbout(false);
    setShowFeatures(false);
    setShowBooking(true);
  };
  const renderFeatures = () => {
    if (showFeatures) {
      return (
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-around',
            alignItems: 'center',
          }}>
          <View style={{}}>
            {features.slice(0, features.length / 2).map((item, index) => (
              <View key={index} style={{flexDirection: 'row'}}>
                <FontAwesome
                  name="circle"
                  size={10}
                  style={{marginTop: 5, marginRight: 5}}
                />
                <Text
                  style={{
                    marginBottom: 5,
                    fontSize: 15,
                    fontWeight: 'bold',
                  }}>
                  {item}
                </Text>
              </View>
            ))}
          </View>
          <View>
            {features.slice(features.length / 2).map((item, index) => (
              <View key={index} style={{flexDirection: 'row'}}>
                <FontAwesome
                  name="circle"
                  size={10}
                  style={{marginTop: 5, marginRight: 5}}
                />
                <Text
                  style={{marginBottom: 5, fontSize: 15, fontWeight: 'bold'}}>
                  {item}
                </Text>
              </View>
            ))}
          </View>
        </View>
      );
    } else if (showAbout) {
      return (
        <View style={{alignItems: 'center'}}>
          <Text style={{textAlign: 'justify', width: 300}}>
            {stadiumDetails.description}
          </Text>
        </View>
      );
    } else {
      return (
        <View>
          <Text>test</Text>
        </View>
      );
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.image}>
        <Image
          style={{flex: 1}}
          source={{
            uri: 'https://i.imgur.com/5cpkhU4.jpg',
          }}
        />
      </View>
      <ScrollView style={styles.details}>
        <View style={{flex: 1}}>
          <View
            style={{
              backgroundColor: '#FC7F00',
              borderTopRightRadius: 20,
              borderTopLeftRadius: 20,
            }}>
            <Text style={styles.name}>{stadiumDetails.name} Stadium</Text>
          </View>

          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-around',
              marginTop: 5,
            }}>
            <View style={{flexDirection: 'row', marginRight: 10}}>
              <Icon
                name="location"
                size={20}
                style={{
                  color: '#C5BBAE',
                }}
              />
              <Text>
                {stadiumDetails.City}, {stadiumDetails.location}
              </Text>
            </View>
          </View>
          <View
            style={{
              marginVertical: 10,
              height: 150,
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            {/* <MapView
              onPress={() => {
                const url = `https://www.google.com/maps/?q=${latitude},${longitude}`;
                Linking.openURL(url);
              }}
              zoomEnabled={false}
              scrollEnabled={false}
              maxZoomLevel={18}
              style={{height: '100%', width: '100%', borderRadius: 20}}
              region={{
                latitudeDelta: 0.00001,
                longitudeDelta: 0.0001,
                latitude: latitude,
                longitude: longitude,
              }}
            /> */}
          </View>
          <View>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-around',
                alignItems: 'center',
                backgroundColor: '#053857',
                height: 50,
                marginTop: 15,
                marginBottom: 15,
                // borderTopWidth: 0.3,
                // borderBottomWidth: 0.3,
                // borderWidth: 0.3,
                // borderRadius: 20,
                borderColor: '#053857',
              }}>
              <TouchableOpacity onPress={toggleAbout}>
                <Text
                  style={[showAbout ? styles.activeButton : styles.notActive]}>
                  About
                </Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={toggleFeatures}>
                <Text
                  style={[
                    showFeatures ? styles.activeButton : styles.notActive,
                  ]}>
                  Features
                </Text>
              </TouchableOpacity>
              {/* <TouchableOpacity onPress={toggleBooking}>
                <Text style={[showBooking ? styles.activeButton : null]}>
                  Book
                </Text>
              </TouchableOpacity> */}
            </View>
            <View
              style={{
                height: 150,
                width: '100%',
              }}>
              {renderFeatures()}
            </View>
          </View>
          <View style={{alignItems: 'center'}}>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-around',
                alignItems: 'center',
                backgroundColor: '#053857',
                height: 50,
                width: '100%',
                marginBottom: 15,

                // borderWidth: 0.3,
                // borderRadius: 20,
                borderColor: '#053857',
              }}>
              <Text style={{color: 'white'}}>Book now!</Text>
            </View>
          </View>

          <View style={{}}>
            <TimePicker date={startDate} setDate={setStartDate} />
            <View style={styles.reservation}>
              <Text>Date</Text>
              <Text>{moment(startDate).format('DD MM YYYY')}</Text>
            </View>
            <View style={styles.reservation}>
              <Text>Starting Time</Text>
              <Text>{moment(startDate).format('hh:mm a')}</Text>
            </View>
            <View style={styles.reservation}>
              <Text>Hours</Text>
              <View
                style={{
                  flexDirection: 'row',
                  width: 70,
                  justifyContent: 'space-around',
                }}>
                <Pressable
                  style={
                    {
                      // borderRadius: 5,
                      // borderWidth: 0.5,
                      // backgroundColor: '#fff5',
                      // padding: 5,
                    }
                  }
                  title={'-1'}
                  onPress={() => {
                    let _hour = hours > 0 ? hours - 1 : 0;
                    setHours(_hour);
                    let date = new Date(startDate);
                    date.setHours(date.getHours() + _hour);
                    setEndDate(date);
                  }}>
                  <MaterialIcons name="arrow-drop-down" size={25} />
                </Pressable>
                <Text style={{margin: 4}}>{hours}</Text>
                <Pressable
                  style={
                    {
                      // borderRadius: 5,
                      // borderWidth: 0.5,
                      // backgroundColor: '#fff5',
                      // padding: 5,
                    }
                  }
                  title={'+1'}
                  onPress={() => {
                    let _hour = hours + 1;
                    setHours(_hour);
                    let date = new Date(startDate);
                    date.setHours(date.getHours() + _hour);
                    setEndDate(date);
                  }}>
                  <MaterialIcons name="arrow-drop-up" size={25} />
                </Pressable>
              </View>
            </View>

            <View
              style={{
                alignItems: 'center',
                justifyContent: 'center',
                flexDirection: 'row',
                marginTop: 10,
              }}></View>
          </View>
          <View style={styles.reservation}>
            <Text>End Time</Text>
            <Text>{moment(endDate).format('hh:mm a')}</Text>
          </View>
          <View style={styles.reservation}>
            <Text>Price</Text>
            <Text>{price * hours}$</Text>
          </View>

          <TouchableOpacity
            onPress={() => {
              console.log(moment(startDate).format('DD MM YYYY'));
              console.log(
                moment(startDate).format('hh:mm a'),
                moment(endDate).format('hh:mm a'),
              );
              showAlert();
            }}>
            <View
              style={{
                backgroundColor: '#027DB8',
                width: '80%',
                margin: 20,
                marginLeft: 30,
                height: 50,
                alignItems: 'center',
                justifyContent: 'center',
                borderRadius: 30,
              }}>
              <Text style={{color: 'white'}}>Submit</Text>
            </View>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  image: {
    backgroundColor: 'black',
    flex: 0.5,
  },
  details: {
    flex: 3,
    top: -15,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,

    backgroundColor: 'white',
  },
  name: {
    fontSize: 23,
    color: '#053857',
    textAlign: 'center',
    margin: 10,
    fontWeight: 'bold',
  },
  activeButton: {
    color: '#FC7F00',
    fontSize: 17,

    // fontSize: 18,
  },
  notActive: {
    color: 'white',
  },
  reservation: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-evenly',
    height: 40,
    borderBottomWidth: 0.3,
    borderColor: '#053857',
    marginBottom: 5,

    // shadowColor: '#000',
    // shadowOffset: {
    //   width: 0,
    //   height: 1,
    // },
    // shadowOpacity: 0.18,
    // shadowRadius: 1.0,

    // elevation: 1,
    // borderRadius: 10,
  },
});

{
  /* <View>
              <Text style={{fontSize: 17, marginBottom: 10, marginLeft: 10}}>
                About the stadium
              </Text>
              <Text
                style={{
                  width: 300,
                  textAlign: 'justify',
                  marginLeft: 10,
                  marginBottom: 15,
                }}>
                {stadiumDetails.description}
              </Text>
            </View> */
}
{
  /* <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-around',
                height: 50,

                borderTopWidth: 1,
                borderBottomWidth: 1,
                borderColor: 'gray',
                alignItems: 'center',
                marginBottom: 10,
              }}>
              <TouchableOpacity>
                <Text style={{fontSize: 17}}>Features</Text>
              </TouchableOpacity>
              <TouchableOpacity>
                <Text style={{fontSize: 17}}>Facilities</Text>
              </TouchableOpacity>
              <TouchableOpacity>
                <Text style={{fontSize: 17}}>Reviews</Text>
              </TouchableOpacity>
            </View> */
}
{
  /* <View>
              <View
                style={{flexDirection: 'row', justifyContent: 'space-around'}}>
                <View>
                  <Text>{features.ac}</Text>
                  <Text>{features.gason}</Text>
                  <Text>{features.type}</Text>
                </View>
                <View>
                  <Text>{amenities.changingRoom}</Text>
                  <Text>{amenities.parking}</Text>
                  <Text>{amenities.seats}</Text>
                </View>
                <View>
                  <Text>{amenities.changingRoom}</Text>
                  <Text>{amenities.parking}</Text>
                  <Text>{amenities.seats}</Text>
                </View>
              </View>
            </View> */
}
