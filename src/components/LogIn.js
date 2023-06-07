import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  TextInput,
  Button,
  Alert,
} from 'react-native';

import auth from '@react-native-firebase/auth';

export default function LogIn() {
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
        <TextInputlogin />
      </View>
    );
  }
}

const TextInputlogin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  return (
    <>
      <SafeAreaView
        style={{
          flex: 1,
          width: 358,
          height: 500,
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <View
          style={{
            flex: 1,
            width: 100,
            height: 100,
          }}
        />
        <View
          style={{
            flex: 1,
            width: 350,
            height: 150,
            justifyContent: 'center',
            marginVertical: 10,
          }}>
          <TextInput
            style={{
              width: '80%',
              height: 40,
            }}
            onChangeText={setEmail}
            value={email}
            placeholder="Email"
          />
          <TextInput
            style={styles.input}
            onChangeText={setPassword}
            value={password}
            placeholder="Password"
            keyboardType="numeric"
            TextInput
            autoCorrect
            secureTextEntry={true}
          />
          <Button
            onPress={() => {
              //sign in or sign up
            }}
            title="sign in"
          />

          {/* // test to remove later */}
          <Button
            onPress={() => {
              //sign in or sign up
            }}
            title="sign up"
          />
        </View>
        <View
          style={{
            flex: 1,
            width: 150,
            height: 200,
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            marginBottom: 30,
          }}>
          <Text>Don't have an account?</Text>
          <Text
            style={{
              color: 'blue',
            }}>
            Sign up
          </Text>
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
