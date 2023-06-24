import React, {useState} from 'react';

import {
  Text,
  View,
  TouchableOpacity,
  TextInput,
  StyleSheet,
  Image,
  Pressable,
} from 'react-native';
import database from '@react-native-firebase/database';
import Ionicons from 'react-native-vector-icons/Ionicons';

export default function AboutUs({navigation}) {
  const image2 = {
    uri: 'https://i.pinimg.com/736x/e9/38/8e/e9388e38f428fcd7ef424420f1322f89.jpg',
  };
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Image source={image2} style={styles.headerImage} />
      </View>
      <View style={styles.contentContainer}>
        <Text style={styles.appName}>GameOn</Text>
        <Text style={styles.text}>
          Welcome to our sport booking application, where convenience meets
          passion! With our user-friendly platform, you can easily reserve your
          favorite sports facilities and enjoy a seamless experience. Whether
          you're a fitness enthusiast, a team player, or simply looking for a
          fun activity, our app provides a comprehensive range of options to
          suit your preferences. Create your personalized profile page and
          showcase your sporting achievements and stay updated with the latest
          news and events. We strive to make your journey with us as enjoyable
          as possible, empowering you to pursue your sporting ambitions
          effortlessly.Let us help you take your game to the next level.
        </Text>
        <Pressable
          onPress={() => {
            navigation.navigate('NewProfile');
          }}
          style={{
            backgroundColor: '#FC7F00',
            padding: 5,
            paddingHorizontal: 10,
            borderRadius: 10,
            alignSelf: 'flex-end',
            bottom: 54,
          }}>
          <Ionicons name="return-down-back" size={25} />
          {/* <Text style={{color: '#2c3e50', fontSize: 20}}>back</Text> */}
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#053857',
  },
  header: {
    position: 'relative',
    flex: 0.25,
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
    opacity: 0.8,
  },
  appName: {
    fontSize: 35,
    fontWeight: 'bold',
    color: 'black',
    bottom: 48,
    alignSelf: 'center',
    color: '#053857',
  },
  contentContainer: {
    padding: 20,
    borderRadius: 10,
    backgroundColor: '#FFFFFF',
    marginHorizontal: 20,
    marginTop: -100,

    flex: 0.75,
  },
  text: {
    fontSize: 16,
    lineHeight: 24,
    color: '#053857',
    bottom: 40,
  },
});
