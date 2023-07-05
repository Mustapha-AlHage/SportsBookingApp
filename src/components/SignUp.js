import React, {useState, useEffect} from 'react';

import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  TextInput,
  Button,
  Alert,
  TouchableOpacity,
  Pressable,
  ScrollView,
  ImageBackground,
  useWindowDimensions,
  Image,
} from 'react-native';

import auth from '@react-native-firebase/auth';
import database from '@react-native-firebase/database';
import DateTimePicker, {
  DateTimePickerModal,
} from 'react-native-modal-datetime-picker';
import Input from './Input';
import {RadioButton} from 'react-native-paper';
import moment from 'moment';
// import TimePicker from './ReservationForm';

const SignUp = props => {
  // return null;
  const {navigation} = props;
  const [fname, setFname] = useState('');
  const [lname, setLname] = useState('');
  const [email, setEmail] = useState('');
  const [number, setNumber] = useState('');
  const [prefSport, setSport] = useState('');
  const [city, setCity] = useState('');
  const [street, setStreet] = useState('');
  const [userName, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [avatar, setAvatar] = useState(
    'https://img.freepik.com/premium-vector/young-man-avatar-character_24877-9475.jpg?w=826',
  );
  const {width, height} = useWindowDimensions();
  const image = {
    uri: 'https://i.pinimg.com/736x/e9/38/8e/e9388e38f428fcd7ef424420f1322f89.jpg',
  };
  // console.log(avatar);
  const {DOB, setDOB} = useState('');
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const handleConfirm = DOB => {
    DOB.setMinutes(0, 0);
    setDOB(DOB);
    hideDatePicker();
  };
  // console.log('Auto generated key:', newReference.key);

  const userData = {
    DOB: moment(DOB).format('DD MM YYYY'),
    city: city,
    email: email,
    fname: fname,
    lname: lname,
    phone: number,
    preferred_Sports: prefSport,
    street: street,
    userName: userName,
    avatar: avatar,
  };
  let maxDate = new Date();
  // maxDate.setFullYear(maxDate.getFullYear() - 13, 0, 0, 0, 0, 0);

  const [initializing, setInitializing] = useState(true);
  const [user, setUser] = useState();

  function onAuthStateChanged(user) {
    setUser(user);
    if (initializing) setInitializing(false);
  }

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber; // unsubscribe on unmount
  }, []);
  if (initializing) return null;

  if (!user) {
    return (
      <SafeAreaView
        style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: '#111a09',
        }}>
        <View
          style={{
            flex: 1,
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <ImageBackground
            source={image}
            resizeMode="cover"
            style={{
              height: height,

              justifyContent: 'center',
              width,
              alignItems: 'center',
            }}>
            <View
              style={{
                flex: 0.8,
                width: width * 0.9,
                height: height,
                backgroundColor: 'white',
                alignItems: 'center',
                justifyContent: 'center',
                padding: 10,
                borderRadius: 20,
              }}>
              <ScrollView>
                <Text
                  style={{
                    // position: 'absolute',
                    fontSize: 30,
                    fontWeight: 'bold',
                    color: '#053857',
                    padding: 7,
                    zIndex: 1,
                    alignSelf: 'center',
                    // top: -20,
                    // backgroundColor: '#FC7F00',
                    borderRadius: 20,
                  }}>
                  SignUp
                </Text>
                <Input
                  onChangeText={setFname}
                  value={fname}
                  placeholder="John Doe"
                />

                <Input
                  onChangeText={setEmail}
                  value={email}
                  placeholder="Email"
                  keyboardType="email-address"
                />
                <Input
                  onChangeText={setNumber}
                  value={number}
                  placeholder="Phone Number"
                  keyboardType="numeric"
                />
                <Input
                  onChangeText={setSport}
                  value={prefSport}
                  placeholder="Prefferd Sport"
                  //  keyboardType="String"
                />
                <Input
                  onChangeText={setCity}
                  value={city}
                  placeholder="City"
                  //  keyboardType="String"
                />
                <Input
                  onChangeText={setStreet}
                  value={street}
                  placeholder="Street Name"
                  //  keyboardType="String"
                />
                <Input
                  onChangeText={setPassword}
                  value={password}
                  placeholder="Password"
                  autoCorrect
                  secureTextEntry={true}
                />

                <TouchableOpacity
                  onPress={showDatePicker}
                  style={{
                    width: width * 0.8,
                    margin: 10,
                    paddingLeft: 15,
                    padding: 15,
                    borderRadius: 10,
                    borderWidth: 1,
                    backgroundColor: '#FC7F00',
                  }}>
                  <Text style={{color: 'white'}}>
                    Select your date of birth
                  </Text>
                </TouchableOpacity>

                <DateTimePickerModal
                  isVisible={isDatePickerVisible}
                  mode="date"
                  date={DOB}
                  maximumDate={maxDate}
                  onConfirm={handleConfirm}
                  onCancel={hideDatePicker}
                />

                <View
                  style={{
                    flex: 0.75,
                    alignItems: 'center',
                    justifyContent: 'space-evenly',
                    margin: 10,
                  }}>
                  <Pressable
                    // disabled={!email || !userName || !password}
                    disabled={!email || !password}
                    onPress={() => {
                      auth()
                        .createUserWithEmailAndPassword(email, password)
                        .then(user => {
                          const newReference = database().ref(
                            '/users/' + user.user.uid,
                          );
                          newReference
                            .set({...userData, id: user.user.uid})
                            .then(() => console.log('Data updated.'));
                          console.log(
                            'User account created & signed in!',
                            user,
                          );
                        })
                        .catch(error => {
                          if (error.code === 'auth/email-already-in-use') {
                            console.log(
                              'That email address is already in use!',
                            );
                            Alert.alert(
                              'That email address is already in use!',
                            );
                          }

                          if (error.code === 'auth/invalid-email') {
                            console.log('That email address is invalid!');
                            Alert.alert('That email address is invalid!');
                          }
                          if (error.code === 'checkNotEmpty') {
                            console.error('you need to type something');
                            Alert.alert('you need to type something');
                          }
                        });
                    }}
                    style={{
                      backgroundColor: '#2c3e50',
                      padding: 10,
                      paddingHorizontal: 20,
                      borderRadius: 10,
                    }}>
                    <Text style={{color: 'white'}}>Sign Up</Text>
                  </Pressable>
                  <Pressable
                    onPress={() => {
                      navigation.navigate('LogIn');
                    }}
                    style={{
                      backgroundColor: 'white',
                      padding: 10,

                      paddingHorizontal: 20,
                      borderRadius: 10,
                    }}>
                    <Text
                      style={{
                        color: '#FC7F00',

                        textDecorationStyle: 'solid',
                        textDecorationLine: 'underline',
                      }}>
                      back
                    </Text>
                  </Pressable>
                </View>
              </ScrollView>
            </View>
          </ImageBackground>
        </View>
        {/* </View> */}
      </SafeAreaView>
    );
  }
  return null;
};

export default SignUp;
