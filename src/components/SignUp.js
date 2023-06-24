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
// import TimePicker from './ReservationForm';
import TimePickerDialog from 'react-time-picker';

const SignUp = props => {
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
      <View style={{flex: 2, borderWidth: 1}}>
        <TextInputlogin {...props} />
      </View>
    );
  }
};

const TextInputlogin = ({navigation}) => {
  // const newReference = database().ref('/users').push();
  const [fname, setFname] = useState('');
  const [lname, setLname] = useState('');
  const [email, setEmail] = useState('');
  const [number, setNumber] = useState('');
  const [prefSport, setSport] = useState('');
  const [city, setCity] = useState('');
  const [street, setStreet] = useState('');
  const [userName, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const {width, height} = useWindowDimensions();
  const image = {
    uri: 'https://i.pinimg.com/736x/e9/38/8e/e9388e38f428fcd7ef424420f1322f89.jpg',
  };
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
    // DOB: DOB,
    city: city,
    email: email,
    fname: fname,
    lname: lname,
    phone: number,
    preferred_Sports: prefSport,
    street: street,
    userName: userName,
  };

  return (
    <SafeAreaView
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#111a09',
        // height,
        // width,
      }}>
      <Text
        style={{
          position: 'absolute',
          fontSize: 35,
          fontWeight: 'bold',
          color: '#053857',
          padding: 20,
          zIndex: 1,
          alignSelf: 'center',
          top: 4,
        }}>
        SignUp
      </Text>
      <View
        style={{
          flex: 1,
          alignItems: 'center',
          justifyContent: 'center',

          // borderBottomRightRadius: 120,
          // borderBottomLeftRadius: 120,
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
            {/* <View
              style={{
                flex: 2,
                //borderRadius: 800,
                backgroundColor: 'white',
                borderWidth: 1,
                width: 100,
                //height: 140,
                //top: -60,
              }}>
              <Image
                style={{
                  flex: 1,
                  // width: '100%',
                  borderRadius: 80,
                }}
                resizeMode="contain"
                source={{
                  uri: 'https://cdn-icons-png.flaticon.com/128/805/805404.png',
                }}
              />
            </View> */}

            {/* </View> */}

            {/* <View
          style={{
            flex: 1,
            width: 360,
            height: 350,
            justifyContent: 'center',
            backgroundColor: '#2c3e50',
            // alignContentss: 'center',
            borderTopRightRadius: 20,
            borderTopLeftRadius: 20,
            // borderWidth: 1,
          }}> */}
            <ScrollView>
              <TextInput
                style={{
                  width: width * 0.8,
                  margin: 10,
                  paddingLeft: 15,
                  borderRadius: 10,
                  borderWidth: 1,
                  backgroundColor: 'white',
                }}
                onChangeText={setFname}
                value={fname}
                placeholder="John Doe"
              />

              <TouchableOpacity onPress={showDatePicker}>
                <TextInput
                  style={{
                    width: width * 0.8,
                    margin: 10,
                    paddingLeft: 15,
                    borderRadius: 10,
                    borderWidth: 1,
                    backgroundColor: 'white',
                  }}
                  onChangeText={setEmail}
                  value={email}
                  placeholder="Email"
                  keyboardType="email-address"
                />
                <TextInput
                  style={{
                    width: width * 0.8,
                    margin: 10,
                    paddingLeft: 15,
                    borderRadius: 10,
                    borderWidth: 1,
                    backgroundColor: 'white',
                  }}
                  onChangeText={setNumber}
                  value={number}
                  placeholder="Phone Number"
                  keyboardType="numeric"
                />
                <TextInput
                  style={{
                    width: width * 0.8,
                    margin: 10,
                    paddingLeft: 15,
                    borderRadius: 10,
                    borderWidth: 1,
                    backgroundColor: 'white',
                  }}
                  onChangeText={setSport}
                  value={prefSport}
                  placeholder="Prefferd Sport"
                  //  keyboardType="String"
                />
                <TextInput
                  style={{
                    width: width * 0.8,
                    margin: 10,
                    paddingLeft: 15,
                    borderRadius: 10,
                    borderWidth: 1,
                    backgroundColor: 'white',
                  }}
                  onChangeText={setCity}
                  value={city}
                  placeholder="City"
                  //  keyboardType="String"
                />
                <TextInput
                  style={{
                    width: width * 0.8,
                    margin: 10,
                    paddingLeft: 15,
                    borderRadius: 10,
                    borderWidth: 1,
                    backgroundColor: 'white',
                  }}
                  onChangeText={setStreet}
                  value={street}
                  placeholder="Street Name"
                  //  keyboardType="String"
                />
                <TextInput
                  style={{
                    width: width * 0.8,
                    margin: 10,
                    paddingLeft: 15,
                    borderRadius: 10,
                    borderWidth: 1,
                    backgroundColor: 'white',
                  }}
                  onChangeText={setPassword}
                  value={password}
                  placeholder="Password"
                  TextInput
                  autoCorrect
                  secureTextEntry={true}
                />
                <View
                  style={{
                    width: width * 0.8,
                    margin: 10,
                    paddingLeft: 15,
                    padding: 20,
                    borderRadius: 10,
                    borderWidth: 1,
                    backgroundColor: 'orange',
                  }}>
                  <Text style={{color: 'white'}}>
                    Select your date of birth
                  </Text>
                </View>
              </TouchableOpacity>

              {/* <Button title="Show Date Picker"  /> */}
              <DateTimePickerModal
                isVisible={isDatePickerVisible}
                mode="datetime"
                date={DOB}
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
                        console.log('User account created & signed in!', user);
                      })
                      .catch(error => {
                        if (error.code === 'auth/email-already-in-use') {
                          console.log('That email address is already in use!');
                        }

                        if (error.code === 'auth/invalid-email') {
                          console.log('That email address is invalid!');
                        }
                        if (error.code === 'checkNotEmpty') {
                          console.error('you need to type smth');
                        }
                      });
                  }}
                  style={{
                    backgroundColor: '#2c3e50',
                    padding: 10,
                    paddingHorizontal: 20,
                    borderRadius: 10,
                  }}>
                  <Text style={{color: 'white', fontSize: 20}}>Sign Up</Text>
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
                  <Text style={{color: '#2c3e50', fontSize: 20}}>back</Text>
                </Pressable>
              </View>
            </ScrollView>
          </View>
        </ImageBackground>
      </View>
      {/* </View> */}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // padding: 20,
  },
});

export default SignUp;
