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

const LogIn = props => {
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

  // const usersRef = database.ref('users');

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

            // borderBottomRightRadius: 120,
            // borderBottomLeftRadius: 120,
          }}>
          <ImageBackground
            source={image}
            resizeMode="cover"
            style={{
              // flex: 1,
              height: height,
              // height: 100,
              justifyContent: 'center',
              width,
              alignItems: 'center',
            }}>
            {/* <View
          style={{
            // flex: 0.5,
            alignItems: 'center',
            justifyContent: 'center',

            // borderBottomRightRadius: 120,
            // borderBottomLeftRadius: 120,
          }}>
         
            <Text
              style={{
                fontSize: 45,
                fontWeight: 'bold',
                textAlign: 'center',

                color: '#ffc300',
              }}>
              Sign In
            </Text> */}

            {/* </View> */}
            {/* <KeyboardAwareScrollView
              contentContainerStyle={{
                alignItems: 'center',
                justifyContent: 'center',
              }}
              style={{
                flex: 1,
                backgroundColor: '#f39c12',
                width,

                borderTopRightRadius: 20,
                borderTopLeftRadius: 20,
              }}> */}
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
                  // backgroundColor: 'white',
                  borderWidth: 1,
                  width: 100,
                  height: 40,
                  top: -60,
                }}>
                {/* <ImageBackground
                  source={image2}
                  resizeMode="cover"
                  style={{
                    flex: 1,
                    borderRadius: 800,
                  }}></ImageBackground> */}
                <Image
                  style={{
                    flex: 1,
                    width: '100%',
                    borderRadius: 80,
                  }}
                  resizeMode="contain"
                  source={{
                    uri: 'https://cdn-icons-png.flaticon.com/128/805/805404.png',
                  }}
                />
              </View>

              <View
                style={{
                  flex: 1,
                  alignItems: 'center',
                  justifyContent: 'space-evenly',
                }}>
                <TextInput
                  style={{
                    width: width * 0.8,

                    paddingLeft: 15,
                    borderRadius: 10,
                    borderWidth: 1,
                    backgroundColor: 'white',
                  }}
                  onChangeText={setEmail}
                  value={email}
                  placeholder="Email"
                />
                <TextInput
                  style={{
                    paddingLeft: 15,
                    width: width * 0.8,

                    margin: 10,
                    borderRadius: 10,
                    borderWidth: 1,
                    backgroundColor: 'white',
                  }}
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
                          console.log('That email address is already in use!');
                        }
                        if (error.code === 'auth/wrong-password') {
                          console.log('wrong password');
                        }

                        if (error.code === 'auth/invalid-email') {
                          console.log('That email address is invalid!');
                        }
                        if (error.code === 'checkNotEmpty') {
                          console.error('you need to type something');
                        }
                        console.error(error);
                      });
                  }}
                  style={{
                    backgroundColor: '#2c3e50',
                    padding: 10,
                    paddingHorizontal: 20,
                    borderRadius: 10,
                  }}
                  // color={'#ffc300'}
                >
                  <Text style={{color: '#95a5a6'}}>Sign In</Text>
                </Pressable>

                <TouchableOpacity
                  style={{
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}
                  onPress={() => navigation.navigate('SignUp')}>
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
            {/* </KeyboardAwareScrollView> */}
          </ImageBackground>
        </View>
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

export default LogIn;
