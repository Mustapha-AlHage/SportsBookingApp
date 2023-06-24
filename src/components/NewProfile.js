import React, {useState, useEffect} from 'react';
import database from '@react-native-firebase/database';
import auth from '@react-native-firebase/auth';
import Icon from 'react-native-vector-icons/Ionicons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import ReservationsList from './ReservationsList';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import {
  StyleSheet,
  Text,
  FlatList,
  View,
  TouchableOpacity,
  TextInput,
  Image,
  Button,
  ImageBackground,
  SafeAreaView,
} from 'react-native';
//import {MenuProvider} from 'react-native-popup-menu';
import {
  Menu,
  MenuOptions,
  MenuOption,
  MenuTrigger,
} from 'react-native-popup-menu';
import {ScrollView} from 'react-native-gesture-handler';

export default function NewProfile({navigation}) {
  const [reservations, setReservations] = useState([]);
  const [user, setUser] = useState({});
  const [edit, setEdit] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [city, setCity] = useState('');
  const [phone, setPhone] = useState('');
  const [imageUri, setImageUri] = useState(
    'https://cdn-icons-png.flaticon.com/128/805/805404.png',
  );

  const handleResetImage = () => {
    setImageUri('https://cdn-icons-png.flaticon.com/128/805/805404.png');
  };
  const editable = () => {
    setEdit(!edit);
  };
  const updateData = () => {
    const currentUser = auth().currentUser;
    const uid = currentUser.uid;
    database()
      .ref(`/users/${uid}`)
      .update({
        fname: name,
        email: email,
        phone: phone,
        city: city,
      })
      .then(() => console.log('Data updated.'));
    console.log('success');
  };

  useEffect(() => {
    const currentUser = auth().currentUser;
    const uid = currentUser.uid;
    const fetchUserProfile = async () => {
      try {
        // const currentUser = auth().currentUser;
        // const uid = currentUser.uid;
        const snapshot = await database()
          .ref('/users/' + uid)
          .once('value');
        const data = snapshot.val();
        setUser(data);
        setName(data.fname);
        setEmail(data.email);
        setCity(data.city);
        setPhone(data.phone);
      } catch (error) {
        console.log('Error fetching user profile:', error);
      }

      const reference = database().ref('/reservations/');
      reference.on('value', snapshot => {
        const reserv = snapshot.val();
        let array = [];
        for (const key in reserv) {
          const data = reserv[key];
          if (data.userId == uid) {
            // console.log(data.date);
            array.push(data);
          }
        }
        // console.log(array);
        setReservations(array);
      });
    };
    console.log(reservations);
    fetchUserProfile();
  }, []);
  const image = {
    uri: 'https://img.freepik.com/premium-photo/abstract-smooth-orange_1258-15487.jpg?w=826',
  };

  const image2 = {
    uri: 'https://i.pinimg.com/736x/e9/38/8e/e9388e38f428fcd7ef424420f1322f89.jpg',
  };
  const image3 = {
    uri: 'https://media.istockphoto.com/id/1370967510/sv/vektor/blue-and-orange-defocused-blurred-motion-gradient-abstract-background-vector.jpg?s=612x612&w=0&k=20&c=7T78-dvL8swimpQ7qHg0NhM5amzDjkFnwSCu2FvVIWg=',
  };
  return (
    <View style={{flex: 1}}>
      <View
        style={{
          flexDirection: 'row',
          flex: 0.4,
          justifyContent: 'space-between',
        }}>
        <View
          style={{
            flex: 1,
            backgroundColor: '#FC7F00',
            alignItems: 'center',
            // backgroundColor: 'red',
          }}>
          <Image
            style={{
              width: 140,
              height: 140,
              borderRadius: 70,
              backgroundColor: 'white',
              marginTop: 11,
              top: 11,
              resizeMode: 'contain',
            }}
            source={{
              uri: 'https://img.freepik.com/premium-vector/young-man-avatar-character_24877-9475.jpg?w=826',
            }}
          />
        </View>
      </View>

      <ScrollView style={{flex: 0.3, backgroundColor: '#FC7F00'}}>
        <View
          style={{
            flex: 1,
            backgroundColor: 'white',
            alignSelf: 'center',
            width: '80%',
            borderRadius: 20,
          }}>
          <View style={{flexDirection: 'row', justifyContent: 'flex-end'}}>
            <TouchableOpacity
              onPress={editable}
              style={{
                alignSelf: 'flex-end',
                //  Top: -10,
                // backgroundColor: 'pink',
                bottom: 12,
              }}>
              <MaterialIcons name="edit" size={25} style={{color: 'black'}} />
            </TouchableOpacity>
            <View style={styles.menuContainer}>
              <Menu>
                <MenuTrigger style={styles.menuTrigger}>
                  <Icon name="settings" size={25} style={styles.menuIcon} />
                </MenuTrigger>
                <MenuOptions style={styles.menuOptions}>
                  <MenuOption
                    onSelect={() => alert('Favorites')}
                    text="Favorites"
                    style={styles.menuOption}
                  />
                  <MenuOption
                    onSelect={() => navigation.navigate('AboutUs')}
                    text="About Us"
                    style={styles.menuOption}
                  />
                  <MenuOption
                    onSelect={() => navigation.navigate('Help')}
                    text="Help"
                    style={styles.menuOption}
                  />
                  <MenuOption
                    onSelect={() =>
                      navigation.navigate('ReservationsList', {
                        reserve: reservations,
                      })
                    }
                    text="Reservations"
                    style={styles.menuOption}
                  />
                  <MenuOption
                    onSelect={() =>
                      auth()
                        .signOut()
                        .then(() => console.log('User signed out!'))
                    }
                    text="Log Out"
                    style={[styles.menuOption, styles.logoutOption]}
                  />
                </MenuOptions>
              </Menu>
            </View>
          </View>
          <View
            style={{
              // borderBottomWidth: 2,
              borderColor: '#333',
              width: '80%',
              marginLeft: 20,
              marginBottom: 10,
              paddingHorizontal: 10,
              // backgroundColor: 'green',
            }}>
            <View
              style={
                {
                  // width: '95%',
                  // // alignContent: 'flex-start',
                  // //borderBottomWidth: 2,
                  // borderColor: '#333',
                  // marginLeft: 20,
                  // marginBottom: 20,
                  // // paddingHorizontal: 10,
                  // margin: 10,
                  // backgroundColor: 'blue',
                }
              }>
              <View
                style={
                  {
                    // flexDirection: 'row',
                    // justifyContent: 'space-between',
                    // backgroundColor: 'red',
                  }
                }>
                <Text
                  style={{
                    fontSize: 14,
                    fontWeight: 'bold',
                    color: '#555',
                    marginBottom: 5,
                  }}>
                  Name
                </Text>
              </View>

              <View>
                <View
                  style={{
                    // padding: 10,
                    // flexDirection: 'row',
                    //  justifyContent: 'space-between',
                    placeholderTextColor: '#053857',
                    margin: 5,
                  }}>
                  <TextInput
                    style={{
                      height: 40,
                      margin: -5,
                      // fontSize: 17,
                      // backgroundColor: 'yellow',
                    }}
                    placeholder={name}
                    onChangeText={newName => setName(newName)}
                    defaultValue={name}
                    editable={edit}
                  />
                </View>
              </View>
            </View>
            <View style={{margin: 5}}>
              <Text
                style={{
                  fontSize: 14,
                  fontWeight: 'bold',
                  color: '#555',
                  marginBottom: 5,
                }}>
                Email
              </Text>
              <TextInput
                style={{height: 40, margin: -5}}
                placeholder={email}
                onChangeText={newEmail => setEmail(newEmail)}
                defaultValue={email}
                editable={edit}
              />
            </View>
            <Text
              style={{
                fontSize: 14,
                fontWeight: 'bold',
                color: '#555',
                marginBottom: 5,
              }}>
              Phone
            </Text>
            <View>
              <View
                style={{
                  //  padding: 10,
                  //  flexDirection: 'row',
                  //  justifyContent: 'space-between',
                  margin: 5,
                }}>
                <TextInput
                  style={{height: 40, margin: -5}}
                  placeholder={phone}
                  onChangeText={newPhone => setPhone(newPhone)}
                  defaultValue={phone}
                  editable={edit}
                />
              </View>
            </View>
            <Text
              style={{
                fontSize: 14,
                fontWeight: 'bold',
                color: '#555',
                marginBottom: 5,
              }}>
              City
            </Text>
            <View>
              <View
                style={{
                  // padding: 10,
                  // flexDirection: 'row',
                  // justifyContent: 'space-between',
                  margin: 5,
                }}>
                <TextInput
                  style={{height: 40, margin: -5}}
                  placeholder={city}
                  onChangeText={newCity => setCity(newCity)}
                  defaultValue={city}
                  editable={edit}
                />
              </View>
            </View>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <TouchableOpacity
                onPress={updateData}
                style={{
                  margin: 8,
                  paddingVertical: 10,
                  paddingHorizontal: 20,
                  backgroundColor: '#053857',
                  borderRadius: 10,
                  marginLeft: 15,
                }}>
                <Text
                  style={{color: '#FFFFFF', fontSize: 18, fontWeight: 'bold'}}>
                  Save
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>

        <View
          style={{
            flex: 0.2,
            //alignItems: 'center',
            // width: '100%',
            marginTop: 10,
            marginLeft: 30,
          }}>
          {/* <FlatList
            style={{flex: 0}}
            data={reservations}
            renderItem={({item}) => (
              <View style={{backgroundColor: '#ecf0f1', borderWidth: 1}}>
                <Text style={{fontSize: 18}}> Date: {item.date}</Text>
                <Text style={{fontSize: 18}}>
                  {' '}
                  Start Time : {item.startTime}
                </Text>
                <Text style={{fontSize: 18}}> Price: {item.price}</Text>
                <Text style={{fontSize: 18}}> Stadium: {item.stadiumId}</Text>
              </View>
            )}
            keyExtractor={(item, index) => '' + index}
          /> */}
          <View style={styles.container}>
            {/* <ReservationList reservations={reservations} /> */}
          </View>
        </View>
      </ScrollView>
    </View>
  );
}
const styles = {
  menuContainer: {
    // marginRight: 10,
    flex: 0.2,
    // top: -120,
    //backgroundColor: '#027DB8',
    //backgroundColor: 'green',
    // width: '15%',
    alignSelf: 'flex-end',
    // bottom: 20,
    // marginRight: 20,
  },
  menuTrigger: {
    padding: 10,
  },
  menuIcon: {color: 'black'},
  menuOptions: {
    backgroundColor: '#ecf0f1',
    borderRadius: 4,
    elevation: 3,
  },
  menuOption: {
    paddingVertical: 15,
    paddingHorizontal: 20,
  },
  logoutOption: {
    borderTopWidth: 1,
    borderTopColor: '#ccc',
  },
};
