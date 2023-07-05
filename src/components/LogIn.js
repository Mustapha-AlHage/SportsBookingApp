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
  ImageBackground,
  Pressable,
  useWindowDimensions,
  Image,
} from 'react-native';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';

import database from '@react-native-firebase/database';
import auth from '@react-native-firebase/auth';
import {useNavigation} from '@react-navigation/native';
import Input from './Input';

const LogIn = props => {
  const [initializing, setInitializing] = useState(true);
  const navigation = useNavigation();
  const [user, setUser] = useState();
  function onAuthStateChanged(user) {
    setUser(user);
    if (initializing) setInitializing(false);
  }

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber; // unsubscribe on unmount
  }, []);

  const [email, setEmail] = useState('');
  const {width, height} = useWindowDimensions();
  const [password, setPassword] = useState('');
  const [data, setData] = useState([]);
  const image = {
    uri: 'https://i.pinimg.com/736x/e9/38/8e/e9388e38f428fcd7ef424420f1322f89.jpg',
  };
  // const image2 = {
  //   uri: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRuZN5KWIbyQY1JDMqsKzSmMGv69jDlDUyjvg&usqp=CAU',
  // };
  if (initializing) return null;
  if (!user) {
    return (
      <>
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
                  flex: 0.5,
                  width: width * 0.85,
                  height: height,
                  backgroundColor: 'white',
                  alignItems: 'center',
                  justifyContent: 'center',
                  padding: 10,
                  borderRadius: 20,
                }}>
                <View
                  style={{
                    flex: 0.8,
                    borderRadius: 800,
                    borderWidth: 1,
                    width: 100,
                    height: 40,
                    top: -60,
                  }}>
                  <Image
                    style={{
                      flex: 1,
                      width: '100%',
                      borderRadius: 80,
                    }}
                    resizeMode="cover"
                    source={{
                      uri: 'https://i.imgur.com/ab8uoIY.png',
                    }}
                  />
                </View>

                <View
                  style={{
                    flex: 1,
                    alignItems: 'center',
                    justifyContent: 'space-evenly',
                    top: -30,
                  }}>
                  <Input
                    onChangeText={setEmail}
                    value={email}
                    placeholder="Email"
                  />
                  <Input
                    onChangeText={setPassword}
                    value={password}
                    placeholder="Password"
                    secureTextEntry={true}
                  />
                </View>
                <View
                  style={{
                    flex: 0.75,
                    alignItems: 'center',
                    justifyContent: 'space-evenly',
                  }}>
                  <Pressable
                    disabled={!email || !password}
                    onPress={() => {
                      console.log(email);
                      auth()
                        .signInWithEmailAndPassword(email.trim(), password)
                        .then(() => {
                          console.log('User account created & signed in!');
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
                          if (error.code === 'auth/wrong-password') {
                            console.log('wrong password');
                            Alert.alert('Wrong password');
                          }

                          if (error.code === 'auth/invalid-email') {
                            console.log('That email address is invalid!');
                            Alert.alert('That email address is invalid!');
                          }
                          if (error.code === 'checkNotEmpty') {
                            console.error('you need to type something');
                            Alert.alert('you need to type something');
                          }
                          console.error(error);
                        });
                    }}
                    style={{
                      backgroundColor: '#2c3e50',
                      padding: 10,
                      paddingHorizontal: 20,
                      borderRadius: 10,
                    }}>
                    <Text style={{color: 'white'}}>Sign In</Text>
                  </Pressable>

                  <TouchableOpacity
                    style={{
                      justifyContent: 'center',
                      alignItems: 'center',
                    }}
                    onPress={() => {
                      console.log(navigation);
                      navigation.navigate('SignUp');
                    }}>
                    <Text
                      style={{
                        color: 'black',
                      }}>
                      Don't have an account?
                    </Text>
                    <Text
                      style={{
                        color: '#2c3e50',
                      }}>
                      Sign up
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
            </ImageBackground>
          </View>
        </SafeAreaView>
      </>
    );
  }

  return null;
};

export default LogIn;
