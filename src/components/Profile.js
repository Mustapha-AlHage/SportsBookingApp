// import React, {useState, useEffect} from 'react';
// import database from '@react-native-firebase/database';
// import auth from '@react-native-firebase/auth';
// import Icon from 'react-native-vector-icons/Ionicons';
// import {
//   StyleSheet,
//   Text,
//   FlatList,
//   View,
//   TouchableOpacity,
//   TextInput,
//   Image,
//   Button,
//   ImageBackground,
// } from 'react-native';
// //import {MenuProvider} from 'react-native-popup-menu';
// import {
//   Menu,
//   MenuOptions,
//   MenuOption,
//   MenuTrigger,
// } from 'react-native-popup-menu';
// import {ScrollView} from 'react-native-gesture-handler';

// export default function Profile({navigation}) {
//   const [reservations, setReservations] = useState([]);
//   const [user, setUser] = useState({});
//   const [imageUri, setImageUri] = useState(
//     'https://cdn-icons-png.flaticon.com/128/805/805404.png',
//   );
//   const handleResetImage = () => {
//     setImageUri('https://cdn-icons-png.flaticon.com/128/805/805404.png');
//   };
//   // useEffect(() => {
//   //   const user = auth().currentUser;
//   //   const uid = user.uid;
//   //   //const username = 'Layal68';
//   //   const reference = database().ref('/users/' + uid);
//   //   reference.once('value').then(snapshot => {
//   //     let data = snapshot.val();
//   //     console.log(data);
//   //     setUser(data);
//   //   });

//   // }, []);
//   useEffect(() => {
//     const fetchUserProfile = async () => {
//       try {
//         const currentUser = auth().currentUser;
//         const uid = currentUser.uid;
//         const snapshot = await database()
//           .ref('/users/' + uid)
//           .once('value');
//         const data = snapshot.val();
//         setUser(data);
//       } catch (error) {
//         console.log('Error fetching user profile:', error);
//       }

//       const reference = database().ref('/reservations/');
//       reference.on('value', snapshot => {
//         const reserv = snapshot.val();
//         let array = [];
//         for (const key in reserv) {
//           const data = reserv[key];
//           if (data.stadiumId == 2) {
//             // console.log(data.date);
//             array.push(data);
//           }
//         }
//         // console.log(array);
//         setReservations(array);
//       });
//     };
//     console.log(reservations);
//     fetchUserProfile();
//   }, []);
//   const image = {
//     uri: 'https://img.freepik.com/premium-photo/abstract-smooth-orange_1258-15487.jpg?w=826',
//   };

//   database()
//     .ref('/users/123')
//     .update({
//       age: 32,
//     })
//     .then(() => console.log('Data updated.'));
//   const image2 = {
//     uri: 'https://i.pinimg.com/736x/e9/38/8e/e9388e38f428fcd7ef424420f1322f89.jpg',
//   };

//   return (
//     // <View style={{flex: 1, backgroundColor: 'orange'}}>
//     //   <View
//     //     style={{
//     //       flex: 3,
//     //       alignItems: 'center',
//     //     }}>
//     //     <View
//     //       source={image}
//     //       resizeMode="cover"
//     //       style={{
//     //         flex: 1,
//     //         paddingBottom: 20,
//     //         // height: 100,
//     //         justifyContent: 'space-between',
//     //         width: 370,
//     //         alignItems: 'center',
//     //       }}>
//     //       <View
//     //         style={{
//     //           flex: 0.9,
//     //           backgroundColor: 'white',
//     //           borderRadius: 200,
//     //           width: 140,
//     //           height: 110,
//     //           alignItems: 'center',
//     //           marginTop: 70,
//     //         }}>
//     //         <Image
//     //           style={{
//     //             flex: 1,
//     //             width: '100%',
//     //             borderRadius: 80,
//     //           }}
//     //           resizeMode="contain"
//     //           source={{
//     //             uri: 'https://cdn-icons-png.flaticon.com/128/805/805404.png',
//     //           }}
//     //         />
//     //       </View>

//     <View style={{flex: 1, backgroundColor: 'white'}}>
//       <ImageBackground
//         source={image2}
//         resizeMode="cover"
//         style={{
//           flex: 1,
//           // height: height,
//           // height: 100,
//           justifyContent: 'center',
//           // width: 200,
//           alignItems: 'center',
//         }}></ImageBackground>
//       {/* <View
//         style={{flex: 2.5, alignItems: 'center', backgroundColor: 'orange'}}>
//         {/* <View
//           style={{
//             flex: 0.5,
//             paddingBottom: 20,
//             justifyContent: 'space-between',
//             width: 370,
//             alignItems: 'center',
//             backgroundColor: 'blue',
//           }}> */}
//       {/* <View
//             style={{
//               flex: 0.8,
//               backgroundColor: 'white',
//               borderRadius: 200,
//               width: 140,
//               height: 110,
//               alignItems: 'center',
//               marginTop: 80,
//             }}>
//             <Image
//               style={{
//                 height: 200,
//                 flex: 1,
//                 margin: 5,
//                 width: 140,
//                 borderRadius: 80,
//               }}
//               source={{
//                 uri: 'https://cdn-icons-png.flaticon.com/128/2348/2348811.png',
//               }}
//             />
//           </View> */}
//       {/* <Button
//             style={{
//               flex: 3,
//               //borderRadius: 50,
//               // color: 'black',
//             }}
//             title="edit profile"></Button> */}

//       {/* <TouchableOpacity
//             style={{
//               backgroundColor: 'white',
//               paddingVertical: 10,
//               paddingHorizontal: 10,
//               borderRadius: 5,
//               borderColor: 'black',
//               border: 10,
//               alignItems: 'center',
//               justifyContent: 'center',
//               marginBottom: 10,
//             }}>
//             <Text
//               style={{
//                 color: 'orange',
//                 fontSize: 16,
//                 fontWeight: 'bold',
//               }}>
//               Edit Profile
//             </Text>
//           </TouchableOpacity> */}
//       {/* <TouchableOpacity
//             style={{
//               backgroundColor: 'white',
//               paddingVertical: 10,
//               paddingHorizontal: 10,
//               borderRadius: 5,
//               borderColor: 'black',
//               border: 10,
//               alignItems: 'center',
//               justifyContent: 'center',
//               marginBottom: 10,
//             }}
//             onPress={handleResetImage}>
//             <Text
//               style={{
//                 color: 'orange',
//                 fontSize: 16,
//                 fontWeight: 'bold',
//               }}>
//               Edit Profile
//             </Text>
//           </TouchableOpacity> */}
//       {/* </View> */}
//       {/* </View> */}
//       <View
//         style={{
//           flex: 5,
//           backgroundColor: 'white',
//           borderTopLeftRadius: 20,
//           borderTopRightRadius: 20,
//           alignItems: 'center',
//           alignContent: 'space-around',
//           top: -10,
//         }}>
//         <View
//           style={{
//             flex: 1,
//             backgroundColor: 'green',
//             borderRadius: 650,
//             borderColor: 'black',
//             width: '50%',
//             height: 110,
//             alignItems: 'center',
//             // marginTop: 70,
//             top: -65,
//             display: 'flex',
//           }}>
//           <Image
//             style={{
//               flex: 1,
//               width: 150,
//               height: 210,
//               borderRadius: 750,
//               backgroundColor: 'white',
//               borderColor: 'black',
//             }}
//             resizeMode="contain"
//             source={{
//               uri: 'https://cdn-icons-png.flaticon.com/128/805/805404.png',
//             }}
//           />
//         </View>

//         <View style={styles.menuContainer}>
//           <Menu>
//             <MenuTrigger style={styles.menuTrigger}>
//               <Icon name="settings" size={40} style={styles.menuIcon} />
//             </MenuTrigger>
//             <MenuOptions style={styles.menuOptions}>
//               <MenuOption
//                 onSelect={() => alert('Favorites')}
//                 text="Favorites"
//                 style={styles.menuOption}
//               />
//               <MenuOption
//                 onSelect={() => navigation.navigate('AboutUs')}
//                 text="About Us"
//                 style={styles.menuOption}
//               />
//               <MenuOption
//                 onSelect={() => navigation.navigate('Help')}
//                 text="Help"
//                 style={styles.menuOption}
//               />
//               <MenuOption
//                 onSelect={() =>
//                   auth()
//                     .signOut()
//                     .then(() => console.log('User signed out!'))
//                 }
//                 text="Log Out"
//                 style={[styles.menuOption, styles.logoutOption]}
//               />
//             </MenuOptions>
//           </Menu>
//         </View>
//         <ScrollView style={{backgroundColor: 'green', width: '100%'}}>
//           <View
//             style={{
//               width: '100%',
//               alignContent: 'flex-start',
//               borderBottomWidth: 2,
//               borderColor: '#333',
//               marginLeft: 20,
//               marginBottom: 20,
//               paddingHorizontal: 10,
//             }}>
//             <Text
//               style={{
//                 fontSize: 18,
//                 fontWeight: 'bold',
//                 color: '#555',
//                 marginBottom: 5,
//               }}>
//               Name
//             </Text>
//             <Text
//               style={{
//                 fontSize: 20,
//                 color: '#000',
//               }}>
//               {user.fname}
//             </Text>
//           </View>
//           <View
//             style={{
//               borderBottomWidth: 2,
//               borderColor: '#333',
//               width: '100%',
//               marginLeft: 20,
//               marginBottom: 20,
//               paddingHorizontal: 10,
//             }}>
//             <Text
//               style={{
//                 fontSize: 18,
//                 fontWeight: 'bold',
//                 color: '#555',
//                 marginBottom: 5,
//               }}>
//               Email
//             </Text>
//             <Text
//               style={{
//                 fontSize: 20,
//                 color: '#000',
//               }}>
//               {user.email}
//             </Text>
//           </View>
//         </ScrollView>
//         <FlatList
//           data={reservations}
//           renderItem={({item}) => (
//             <View>
//               <Text>{item.date}</Text>
//               <Text>{item.startTime}</Text>
//               <Text>{item.price}</Text>
//               <Text>{item.stadiumId}</Text>
//             </View>
//           )}
//           keyExtractor={(item, index) => '' + index}
//         />
//         {/* <TouchableOpacity
//           style={{
//             backgroundColor: 'white',
//             paddingVertical: 10,
//             paddingHorizontal: 10,
//             borderRadius: 5,
//             borderColor: 'black',
//             border: 10,
//             alignItems: 'center',
//             justifyContent: 'center',
//           }}>
//           <Text
//             style={{
//               color: 'orange',
//               fontSize: 16,
//               fontWeight: 'bold',
//             }}>
//             Settings
//           </Text>
//         </TouchableOpacity> */}
//         {/* <TouchableOpacity
//           style={{
//             justifyContent: 'center',
//             alignItems: 'center',
//           }}
//           onPress={() => navigation.navigate('Settings')}>
//           <Text
//             style={{
//               color: '#2c3e50',
//             }}>
//             settings
//           </Text>
//         </TouchableOpacity> */}

//         {/* <TouchableOpacity
//           style={{
//             backgroundColor: 'white',
//             paddingVertical: 10,
//             //  paddingHorizontal: 10,
//             borderRadius: 10,
//             borderColor: 'green',
//             border: 10,
//             alignItems: 'center',
//             justifyContent: 'center',
//           }}>
//           <Text
//             style={{
//               color: 'orange',
//               fontSize: 16,
//               fontWeight: 'bold',
//             }}>
//             Create Your Team
//           </Text>
//         </TouchableOpacity> */}
//         {/* <TouchableOpacity
//           style={{
//             color: 'red',
//             alignSelf: 'center',
//             //justifyContent: 'flex-end',
//           }}
//           onPress={() =>
//             auth()
//               .signOut()
//               .then(() => console.log('User signed out!'))
//           }>
//           <Text style={{color: 'red', fontSize: 16, fontWeight: 'bold'}}>
//             SignOut
//           </Text>
//         </TouchableOpacity> */}
//       </View>
//     </View>
//   );
// }
// // const styles = StyleSheet.create({
// //   container: {
// //     flex: 1,
// //     justifyContent: 'flex-start',
// //     alignItems: 'flex-start',
// //     backgroundColor: 'white',
// //     borderWidth: 1,
// //   },

// //   text: {
// //     fontSize: 18,
// //     marginBottom: 10,
// //   },
// // });
// const styles = {
//   menuContainer: {
//     alignSelf: 'flex-end',
//     marginRight: 10,
//     flex: 1,
//     // top: -120,
//     backgroundColor: 'red',
//   },
//   menuTrigger: {
//     padding: 10,
//   },
//   menuIcon: {
//     color: 'black',
//   },
//   menuOptions: {
//     backgroundColor: 'white',
//     borderRadius: 4,
//     elevation: 4,
//   },
//   menuOption: {
//     paddingVertical: 15,
//     paddingHorizontal: 20,
//   },
//   logoutOption: {
//     borderTopWidth: 1,
//     borderTopColor: '#ccc',
//   },
// };
