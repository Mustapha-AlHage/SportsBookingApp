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
  Platform,
  Touchable,
} from 'react-native';
import auth from '@react-native-firebase/auth';
import database from '@react-native-firebase/database';
import Icon from 'react-native-vector-icons/Ionicons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import {SafeAreaView} from 'react-native-safe-area-context';
import MapView from 'react-native-maps';
import TimePicker from './ReservationForm';
import moment from 'moment';
import notifee from '@notifee/react-native';
import Fontisto from 'react-native-vector-icons/Fontisto';

export default function StadiumDetails({route}) {
  async function onDisplayNotification() {
    // Request permissions (required for iOS)
    await notifee.requestPermission();

    // Create a channel (required for Android)
    const channelId = await notifee.createChannel({
      id: 'default',
      name: 'Default Channel',
    });

    // Display a notification
    await notifee.displayNotification({
      title: 'Reservation',
      body: `You have booked ${stadiumDetails.name} on ${moment(
        startDate,
      ).format('DD MM YYYY')} ${selectedTimeSlot}`,
      android: {
        channelId,
        // optional, defaults to 'ic_launcher'.
        // pressAction is needed if you want the notification to open the app when pressed
        pressAction: {
          id: 'default',
        },
      },
    });
  }

  const {id} = route.params;
  const [stadiumDetails, setStadiumDetails] = useState('');
  const [longitude, setLongitude] = useState(0);
  const [latitude, setLatitude] = useState(0);
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [hours, setHours] = useState(0);
  const [features, setFeatures] = useState([]);
  const [price, setPrice] = useState();
  const [open, setOpen] = useState(0);
  const [close, setClose] = useState(0);

  const [email, setEmail] = useState('');
  const [userId, setUserId] = useState('');

  const [selectedTimeSlot, setSelectedTimeSlot] = useState('');

  useEffect(() => {
    const {id} = route.params;
    const reference = database().ref(`/stadiums/${id}`);

    reference.on('value', snapshot => {
      setStadiumDetails(snapshot.val());
      setLongitude(snapshot.val().longitude);
      setLatitude(snapshot.val().latitude);
      setPrice(snapshot.val().price);
      setOpen(snapshot.val().open);
      setClose(snapshot.val().close);

      setFeatures(Object.values(snapshot.val().features));
    });
    const currentUser = auth().currentUser;
    const uid = currentUser.uid;
    setUserId(uid);
    const reference2 = database().ref(`/users/${uid}`);

    reference2.on('value', snapshot => {
      // setStadiumDetails(snapshot.val());
      // setLongitude(snapshot.val().longitude);
      // setLatitude(snapshot.val().latitude);
      // setPrice(snapshot.val().price);
      console.log(snapshot.val());
      setEmail(snapshot.val().email);

      // setFeatures(Object.values(snapshot.val().features));
    });
  }, []);

  console.log(email, userId);

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
              // let isAvailable = true;

              // for (const key in reservations) {
              //   const reserv = reservations[key];
              //   console.log(reserv.date, reserv.startTime, reserv.stadiumId);
              //   if (
              //     reserv.date === moment(startDate).format('DD MM YYYY') &&
              //     reserv.startTime === moment(startDate).format('hh:mm a') &&
              //     reserv.stadiumId === id
              //   ) {
              //     isAvailable = false;
              //     break;
              //   }
              // }

              // if (isAvailable) {
              const newReference = database().ref('/reservations').push();

              console.log('Auto generated key: ', newReference.key);

              newReference
                .set({
                  id: newReference.key,
                  date: moment(startDate).format('DD MM YYYY'),
                  startTime: moment(startDate).format('hh:mm a'),
                  endTime: moment(endDate).format('hh:mm a'),
                  hours: hours,
                  price: price,
                  stadiumId: id,
                  userId: userId,
                  email: email,
                  stadiumName: stadiumDetails.name,
                  timeSlot: selectedTimeSlot,
                })
                .then(() => console.log('Data updated.'));
              // setHours(0);
              console.log('You can book the stadium');
              onDisplayNotification();
              setEnableDisplay(true);
              handleButtonPress();
              removeTimeSlot(selectedTimeSlot);
              notification();
              //   } else {
              //     Alert('time already reserved, choose another one! ');
              //   }
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

  const [timeSlots, setTimeSlots] = useState([]);
  const [availableHours, setAvailableHours] = useState([]);
  const [displayedHours, setDisplayedHours] = useState([]);
  const [enableDisplay, setEnableDisplay] = useState(true);

  const checkAvailability = UsedDate => {
    const hoursArray = Array.from({length: 10 - 2}, (_, index) => index + 2);
    const formattedHours = hoursArray.map(
      hour => `from ${hour} to ${hour + 1}`,
    );
    setTimeSlots(formattedHours);

    const reference = database().ref('/reservations/');

    reference.on('value', snapshot => {
      const reservations = snapshot.val();
      const updatedAvailableHours = [];

      for (const timeSlot of formattedHours) {
        let isTaken = false;

        for (const key in reservations) {
          const reserv = reservations[key];

          if (
            reserv.timeSlot === timeSlot &&
            reserv.date === UsedDate &&
            reserv.stadiumId === id
          ) {
            isTaken = true;
            break;
          }
        }

        if (!isTaken) {
          updatedAvailableHours.push(timeSlot);
        }
      }

      setAvailableHours(updatedAvailableHours);
    });
    setEnableDisplay(false);
    return () => {
      reference.off(); // Cleanup by removing the event listener when the component unmounts
    };
  };

  const removeTimeSlot = timeToRemove => {
    const index = availableHours.indexOf(timeToRemove);
    if (index > -1) {
      setAvailableHours(availableHours.splice(index, 1));
    }
  };

  const handleButtonPress = () => {
    if (availableHours.length > 0) {
      setDisplayedHours(availableHours);
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
            <MapView
              onPress={() => {
                const scheme = Platform.select({
                  ios: 'maps://0,0?q=',
                  android: 'geo:0,0?q=',
                });
                const latLng = `${latitude},${longitude}`;
                const label = 'Custom Label';
                const url = Platform.select({
                  ios: `${scheme}${label}@${latLng}`,
                  android: `${scheme}${latLng}(${label})`,
                });
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
            />
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

            <View>
              <View style={styles.reservation}>
                <Text>Date</Text>
                <Text>{moment(startDate).format('DD MM YYYY')}</Text>
              </View>
              <TouchableOpacity
                onPress={() =>
                  checkAvailability(moment(startDate).format('DD MM YYYY'))
                }
                style={{
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <View
                  style={{
                    backgroundColor: '#FC7F00',
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginBottom: 10,
                    height: 30,
                    width: 100,
                    flexDirection: 'column',
                    borderRadius: 10,
                  }}>
                  <Text style={{color: 'white', textAlign: 'center'}}>
                    Submit Date
                  </Text>
                </View>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={handleButtonPress}
                disabled={enableDisplay}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}>
                <View
                  style={{
                    backgroundColor: '#053857',
                    alignItems: 'center',
                    justifyContent: 'center',
                    alignItems: 'center',
                    marginBottom: 10,
                    height: 30,
                    width: 300,
                    borderRadius: 10,
                  }}>
                  <Text style={{color: 'white'}}>Display Available Hours</Text>
                </View>
              </TouchableOpacity>
              {displayedHours.map((item, index) => (
                <TouchableOpacity
                  key={index.toString()}
                  onPress={() => {
                    setSelectedTimeSlot(item);
                  }}
                  style={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}>
                  <View
                    style={{
                      backgroundColor:
                        selectedTimeSlot === item ? 'orange' : '#027DB8',
                      alignItems: 'center',
                      justifyContent: 'center',
                      marginBottom: 10,
                      height: 30,
                      width: 200,
                    }}>
                    <Text style={{color: 'white'}}>{item}</Text>
                  </View>
                </TouchableOpacity>
              ))}
            </View>

            {/* <View style={styles.reservation}>
              <Text>haha</Text>
              <Text>{handleButtonPress}</Text>
            </View> */}

            {/* <View style={styles.reservation}>
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
          </View> */}

            <View style={styles.reservation}>
              <Text>Price</Text>
              <Text>{price}$</Text>
              {/* <Text>{price}$</Text> */}
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
            {/* <Button
            title="press"
            onPress={() => handleButtonPress(open, close)}
          />
          <Button title="press" onPress={() => tryd()} /> */}
          </View>
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
    // borderBottomWidth: 0.3,
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
