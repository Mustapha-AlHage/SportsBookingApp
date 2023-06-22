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
} from 'react-native';

import auth from '@react-native-firebase/auth';
import database from '@react-native-firebase/database';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import TimePicker from './ReservationForm';

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
  // const [DOB, setDOB] = React.useState(null);
  const image = {
    uri: 'https://media.istockphoto.com/id/964843416/photo/two-color-paper-with-dark-blue-and-orange-of-the-image-background.jpg?s=170667a&w=0&k=20&c=OC_c0I3uBh_tp8j6SbmUMaCbi_N8Kto9ctzbQjif_BQ=',
  };
  const DatePickerComponent = () => {
    const [DOB, setDOB] = useState(null);
    const [isDatePickerVisible, setDatePickerVisible] = useState(false);

    const showDatePicker = () => {
      setDatePickerVisible(true);
    };

    const hideDatePicker = () => {
      setDatePickerVisible(false);
    };

    const handleConfirm = date => {
      setDOB(date);
      hideDatePicker();
    };

    // console.log('Auto generated key:', newReference.key);

    const userData = {
      DOB: DOB,
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
      <>
        <SafeAreaView
          style={{
            flex: 1,

            justifyContent: 'center',
            alignItems: 'center',
            flexDirection: 'column',
            backgroundColor: '#ecf0f1',
          }}>
          {/* <View
          style={{
            flex: 1,

            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: 'black',
          }}> */}
          <View
            style={{
              flex: 0.4,
              display: 'flex',
              // flexDirection: 'column',
              // justifyContent: 'center',
              alignItems: 'center',
              textAlign: 'center',
              // backgroundColor: '#ecf0f1',
              width: 370,
            }}>
            <ImageBackground
              source={image}
              resizeMode="cover"
              style={{
                flex: 1,
                // height: 100,
                justifyContent: 'center',
                width: 370,
              }}>
              <Text
                style={{
                  fontSize: 45,
                  fontWeight: 'bold',
                  textAlign: 'center',
                  color: '#ffc300',
                }}>
                SignUp
              </Text>
            </ImageBackground>
          </View>
          {/* </View> */}

          <View
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
            }}>
            <ScrollView>
              <TextInput
                style={{
                  borderRadius: 10,
                  borderWidth: 1,
                  borderColor: '#C5BBAE',
                  paddingLeft: 10,
                  margin: 10,
                  backgroundColor: '#ecf0f1',
                }}
                onChangeText={setFname}
                value={fname}
                placeholder="John Doe"
              />
              {/* style=
            {{
              borderRadius: 10,
              borderWidth: 1,
              borderColor: '#C5BBAE',
              paddingLeft: 10,
              margin: 10,
              backgroundColor: '#ecf0f1',
            }} */}
              {/* <DateTimePickerModal
              date={DOB}
              format="YYYY-MM-DD"
              placeholder="Select your date of birth"
              onChange={date => setDateOfBirth(date)}
              style={{
                borderRadius: 10,
                borderWidth: 1,
                borderColor: '#C5BBAE',
                paddingLeft: 10,
                margin: 10,
                backgroundColor: '#ecf0f1',
              }}
            /> */}

              <Button title="Select Date" onPress={showDatePicker} />

              <DateTimePickerModal
                isVisible={isDatePickerVisible}
                mode="date"
                onConfirm={handleConfirm}
                onCancel={hideDatePicker}
              />

              {DOB && <Text>Selected Date of Birth: {DOB.toDateString()}</Text>}
              <TextInput
                style={{
                  borderRadius: 10,
                  borderWidth: 1,
                  borderColor: '#C5BBAE',
                  paddingLeft: 10,
                  margin: 10,
                  backgroundColor: '#ecf0f1',
                }}
                onChangeText={setEmail}
                value={email}
                placeholder="Email"
                keyboardType="email-address"
              />
              <TextInput
                style={{
                  borderRadius: 10,
                  borderWidth: 1,
                  borderColor: '#C5BBAE',
                  paddingLeft: 10,
                  margin: 10,
                  backgroundColor: '#ecf0f1',
                }}
                onChangeText={setNumber}
                value={number}
                placeholder="Phone Number"
                keyboardType="numeric"
              />
              <TextInput
                style={{
                  borderRadius: 10,
                  borderWidth: 1,
                  borderColor: '#C5BBAE',
                  paddingLeft: 10,
                  margin: 10,
                  backgroundColor: '#ecf0f1',
                }}
                onChangeText={setSport}
                value={prefSport}
                placeholder="Prefferd Sport"
                //  keyboardType="String"
              />
              <TextInput
                style={{
                  borderRadius: 10,
                  borderWidth: 1,
                  borderColor: '#C5BBAE',
                  paddingLeft: 10,
                  margin: 10,
                  backgroundColor: '#ecf0f1',
                }}
                onChangeText={setCity}
                value={city}
                placeholder="City"
                //  keyboardType="String"
              />
              <TextInput
                style={{
                  borderRadius: 10,
                  borderWidth: 1,
                  borderColor: '#C5BBAE',
                  paddingLeft: 10,
                  margin: 10,
                  backgroundColor: '#ecf0f1',
                }}
                onChangeText={setStreet}
                value={street}
                placeholder="Street Name"
                //  keyboardType="String"
              />
              <TextInput
                style={{
                  borderRadius: 10,
                  borderWidth: 1,
                  borderLeftWidth: 1,
                  borderColor: '#C5BBAE',
                  paddingLeft: 10,
                  margin: 10,
                  backgroundColor: '#ecf0f1',
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
                  // ssss
                  width: 360,
                  height: 100,
                  justifyContent: 'space-around',
                  alignItems: 'center',
                  flexDirection: 'row-reverse',

                  // alignContentss: 'center',
                }}>
                <Pressable
                  // disabled={!email || !userName || !password}
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
                    backgroundColor: '#FFB541',
                    padding: 10,
                    paddingHorizontal: 20,
                    borderRadius: 10,
                  }}>
                  <Text style={{color: '#ecf0f1s', fontSize: 20}}>Sign Up</Text>
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
          {/* </View> */}
        </SafeAreaView>
      </>
    );
  };

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      // padding: 20,
    },
  });
};
export default SignUp;
