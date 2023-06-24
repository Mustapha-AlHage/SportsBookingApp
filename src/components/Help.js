import React from 'react';
import {View, Text, StyleSheet, Image, Pressable} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

const image = {
  uri: 'https://i.pinimg.com/736x/e9/38/8e/e9388e38f428fcd7ef424420f1322f89.jpg',
};

const HelpPage = ({navigation}) => {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Image source={image} style={styles.headerImage} />
      </View>
      <Text style={styles.title}>Help</Text>
      <View style={styles.contentContainer}>
        <View style={{flexDirection: 'row'}}>
          <Text style={styles.subtitle}>Contact Information:</Text>
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
              left: 55,
              bottom: 15,
            }}>
            <Ionicons name="return-up-back" size={25} />
            {/* <Text style={{color: '#2c3e50', fontSize: 20}}>back</Text> */}
          </Pressable>
        </View>
        <Text style={styles.contactInfo}>Email: gameon@gmail.com</Text>
        <Text style={styles.contactInfo}>Phone: +961 81367607</Text>
        <Text style={styles.subtitle}>Frequently Asked Questions:</Text>
        <Text style={styles.question}>
          Q: How can I book a sports facility?
        </Text>
        <Text style={styles.answer}>
          A: To book a sports facility, go to the booking section, select your
          desired stadium, date, and time, and proceed with the reservation
          process.
        </Text>
        <Text style={styles.question}>Q: Can I cancel my reservation?</Text>
        <Text style={styles.answer}>
          A: Yes, you can cancel your reservation. Go to the 'My Reservations'
          section, find your reservation, and follow the provided cancellation
          instructions.
        </Text>
        <Text style={styles.question}>
          Q: How can I update my profile information?
        </Text>
        <Text style={styles.answer}>
          A: To update your profile information, go to the 'Profile' section.
          From there, you can edit your personal details, including your profile
          picture and other relevant information.
        </Text>
      </View>
    </View>
  );
};

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
  title: {
    position: 'absolute',
    fontSize: 35,
    fontWeight: 'bold',
    color: '#053857',
    padding: 20,
    zIndex: 1,
    alignSelf: 'center',
    top: 5,
  },
  contentContainer: {
    flex: 0.75,
    padding: 20,
    borderRadius: 10,
    backgroundColor: '#FFFFFF',
    marginHorizontal: 20,
    marginTop: -100,
  },
  subtitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#053857',
  },
  contactInfo: {
    fontSize: 16,
    lineHeight: 24,
    marginBottom: 10,
    color: '#053857',
  },
  question: {
    fontSize: 14,
    fontWeight: 'bold',
    marginBottom: 5,
    color: '#053857',
  },
  answer: {
    fontSize: 14,
    lineHeight: 20,
    marginBottom: 10,
    color: '#053857',
  },
});

export default HelpPage;

// import React, {useState} from 'react';
// import {
//   Button,
//   Image,
//   PermissionsAndroid,
//   StatusBar,
//   StyleSheet,
//   Text,
//   View,
// } from 'react-native';
// import {TouchableOpacity} from 'react-native-gesture-handler';
// import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
// // import * as ImagePicker from 'react-native-image-picker';

// export default Help = () => {
//   const [selectedImage, setSelectedImage] = useState(null);
//   const options = {
//     mediaType: 'photo',
//     quality: 1,
//     includeBase64: false,
//     maxWidth: 500,
//     maxHeight: 500,
//   };

//   const pickImage = () => {
//     launchImageLibrary(options, response => {
//       if (response.didCancel) {
//         console.log('User cancelled image picker');
//       } else if (response.error) {
//         console.log('ImagePicker Error: ', response.error);
//       } else if (response) {
//         setSelectedImage(response.assets[0].uri);
//       }
//     });
//   };

//   return (
//     <View>
//       <TouchableOpacity onPress={pickImage}>
//         <Text>select an image</Text>
//       </TouchableOpacity>
//     </View>
//   );
// };

//sec
//   const [cameraPhoto, setCameraPhoto] = useState();
//   let options = {
//     saveToPhotos: true,
//     mediaType: 'photo',
//   };
//   const openCamera = async () => {
//     const granted = await PermissionsAndroid.request(
//       PermissionsAndroid.PERMISSIONS.CAMERA,

//     );
//     console.log('hi')
//     if (granted === PermissionsAndroid.RESULTS.GRANTED) {
//       console.log('hi');
//       const result = await launchCamera(options);
//       setCameraPhoto(result.assets[0].uri);
//     }
//   };
//   return (
//     <View>
//       <TouchableOpacity onPress={openCamera}>
//         <Text>open camera </Text>
//       </TouchableOpacity>
//       <Image source={{uri: cameraPhoto}} />
//     </View>
//   );
// };
// const requestCameraPermission = async () => {
//   try {
//     const granted = await PermissionsAndroid.request(
//       PermissionsAndroid.PERMISSIONS.CAMERA,
//       {
//         title: 'Cool Photo App Camera Permission',
//         message:
//           'Cool Photo App needs access to your camera ' +
//           'so you can take awesome pictures.',
//         buttonNeutral: 'Ask Me Later',
//         buttonNegative: 'Cancel',
//         buttonPositive: 'OK',
//       },
//     );
//     if (granted === PermissionsAndroid.RESULTS.GRANTED) {
//       console.log('You can use the camera');
//     } else {
//       console.log('Camera permission denied');
//     }
//   } catch (err) {
//     console.warn(err);
//   }
// };

// const App = () => (
//   <View style={styles.container}>
//     <Text style={styles.item}>Try permissions</Text>
//     <Button title="request permissions" onPress={requestCameraPermission} />
//   </View>
// );

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     justifyContent: 'center',
//     paddingTop: StatusBar.currentHeight,
//     backgroundColor: '#ecf0f1',
//     padding: 8,
//   },
//   item: {
//     margin: 24,
//     fontSize: 18,
//     fontWeight: 'bold',
//     textAlign: 'center',
//   },
// });
