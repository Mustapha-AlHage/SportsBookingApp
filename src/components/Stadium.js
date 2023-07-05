import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  Text,
  FlatList,
  View,
  TouchableOpacity,
  TextInput,
  Image,
} from 'react-native';
import database from '@react-native-firebase/database';

// import Icon from 'react-native-vector-icons/FontAwesome5';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

export default function Stadium({navigation}) {
  const [data, setData] = useState([]);
  const [stad, setStad] = useState('');
  const [sportType, setSportType] = useState('');
  // const toggleFavorite = (stadium) => {
  //   const isFavorite = favorites.some((fav) => fav.id === stadium.id);
  //   if (isFavorite) {

  //     const updatedFavorites = favorites.filter((fav) => fav.id !== stadium.id);
  //     setFavorites(updatedFavorites);
  //   } else {

  //     const updatedFavorites = [...favorites, stadium];
  //     setFavorites(updatedFavorites);
  //   }
  // };

  // const isFavorite = (stadium) => {
  //   return favorites.some((fav) => fav.id === stadium.id);
  // };
  useEffect(() => {
    const reference = database().ref('/stadiums/');
    reference.on('value', snapshot => {
      const data = Object.entries(snapshot.val()).map(([key, value]) => ({
        ...value,
        id: key,
      }));
      console.log(snapshot.val());
      setData(data);
    });
  }, []);
  // console.log(data);
  let _data = sportType
    ? data.filter(i => i.sportType == sportType || !i.sportType)
    : data;
  if (stad) {
    _data = _data.filter(
      i =>
        i.name.toLowerCase().includes(stad.toLowerCase()) ||
        i.City.toLowerCase().includes(stad.toLowerCase()) ||
        i.location.toLowerCase().includes(stad.toLowerCase()),
    );
  }
  // return null;
  return (
    <View style={styles.container}>
      <View style={styles.new}>
        <View
          style={{
            height: 40,
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: '#053857',
            borderRadius: 20,
            borderWidth: 1,
            borderLeftWidth: 1,
            borderColor: '#C5BBAE',
          }}>
          <TextInput
            style={[styles.input, {width: '80%'}]}
            placeholder="search"
            placeholderTextColor="#C5BBAE"
            value={stad}
            onChangeText={setStad}
          />

          <Ionicons
            name="search-sharp"
            size={30}
            style={{
              color: '#C5BBAE',
            }}
          />
        </View>
      </View>
      <View style={styles.stadiums}>
        <View style={[styles.search]}>
          <View style={[styles.search_view1, {borderWidth: 1}]}>
            <TouchableOpacity
              style={{
                flex: 1,
                alignItems: 'center',
                justifyContent: 'center',
              }}
              onPress={() => {
                sportType == 'Football'
                  ? setSportType('')
                  : setSportType('Football');
              }}>
              <Ionicons
                name="football"
                size={30}
                color={sportType == 'Football' ? '#FC7F00' : '#2c3e50'}
              />
            </TouchableOpacity>
            <TouchableOpacity
              style={{
                flex: 1,
                alignItems: 'center',
                justifyContent: 'center',
              }}
              onPress={() => {
                sportType == 'Basketball'
                  ? setSportType('')
                  : setSportType('Basketball');
              }}>
              <Ionicons
                name="md-basketball-outline"
                size={30}
                color={sportType == 'Basketball' ? '#FC7F00' : '#2c3e50'}
              />
            </TouchableOpacity>
          </View>
        </View>
        <FlatList
          data={_data}
          renderItem={({item}) => (
            <TouchableOpacity
              onPress={() =>
                navigation.navigate(
                  'StadiumDetails',
                  {
                    id: item.id,
                  },
                  console.log(item.id),
                )
              }>
              <View style={styles.FlatList_views}>
                <Image
                  style={{
                    height: 100,
                    flex: 1,
                    margin: 5,
                    width: '100%',
                    borderRadius: 70,
                  }}
                  source={{
                    uri: item.image,
                  }}
                />

                <View style={{flex: 2}}>
                  <Text
                    style={{
                      fontSize: 20,
                      marginBottom: 10,
                      textAlign: 'left',
                      color: '#053857',
                      fontWeight: 'bold',
                    }}>
                    {item.name}
                  </Text>
                  <Text style={{marginLeft: 10}}>
                    {item.City}, {item.location}
                  </Text>
                  <Text style={{marginBottom: 15, marginLeft: 10}}>
                    {item.sportType}
                  </Text>
                  <Text style={{textAlign: 'right', marginRight: 30}}>
                    Rating:{item.rating}
                  </Text>
                  {/* <Button
                    title="Click Me"
                    color="red"
                    onPress={() => console.log('Button clicked!')}
                    width
                  /> */}
                </View>
              </View>
              {/* <TouchableOpacity
    onPress={() => toggleFavorite(item)}
    style={styles.favoriteButton}
  >
    <Ionicons
      name={isFavorite(item) ? 'heart' : 'heart-outline'}
      size={30}
      color={isFavorite(item) ? 'red' : 'black'}
    />
  </TouchableOpacity> */}
            </TouchableOpacity>
          )}
          keyExtractor={(item, index) => '' + index}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  new: {
    flex: 1,
    backgroundColor: '#053857',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  input: {
    color: 'white',

    height: 35,
    width: '60%',
    borderTopRightRadius: 20,
    borderTopLeftRadius: 20,
    borderBottomRightRadius: 20,
    borderBottomLeftRadius: 20,
    marginRight: 10,
  },
  container: {
    flex: 1,
    backgroundColor: '#053857',
    // backgroundColor: 'red',
  },
  search: {
    marginTop: 7,

    height: 60,
    backgroundColor: 'white',
    alignItems: 'flex-start',
    borderTopRightRadius: 40,
    borderTopLeftRadius: 40,
  },
  stadiums: {
    flex: 9,
    backgroundColor: 'white',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    borderTopRightRadius: 40,
    borderTopLeftRadius: 40,
  },
  search_view1: {
    width: '50%',
    height: 50,
    // marginTop: 20,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    borderTopRightRadius: 20,
    borderTopLeftRadius: 20,
    borderBottomRightRadius: 20,
    borderBottomLeftRadius: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    backgroundColor: 'white',
  },
  FlatList_views: {
    marginTop: 10,
    height: 120,
    width: 340,
    backgroundColor: 'white',
    flexDirection: 'row',
    borderTopLeftRadius: 10,
    borderBottomRightRadius: 10,
    borderTopRightRadius: 10,
    borderBottomLeftRadius: 10,

    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,

    elevation: 2,
    // backgroundColor: 'yellow',
  },
  button: {
    backgroundColor: 'red',
    padding: 10,
    borderRadius: 5,
  },
});

{
  /* 
      <FlatList
        data={data}
        renderItem={({item}) => (
          <View
            style={{
              height: 100,
              width: '100%',
              flexDirection: 'row',
              justifyContent: 'space-around',
              marginTop: 20,
            }}>
            <View>
              <Text>{item.description}</Text>
              <Text>{item.name}</Text>
            </View>
          </View>
        )}
        keyExtractor={(item, index) => '' + index}
      /> */
}
// const sport = type => {
//   const reference = database().ref('/stadiums/');
//   reference.on('value', snapshot => {
//     let i = 1;
//     let value = true;
//     let data = [];
//     while (value) {
//       if (typeof snapshot.val()[i] === 'undefined') {
//         break;
//       } else {
//         let includes = snapshot.val()[i].sportType.includes(type);
//         if (includes) {
//           data.push(snapshot.val()[i]);
//         }
//         i = i + 1;
//       }
//     }
//     setData(data);
//   });
// };

// const search = stadName => {
//   const reference = database().ref('/stadiums/');
//   reference.on('value', snapshot => {
//     let i = 1;
//     let value = true;
//     let data = [];
//     while (value) {
//       if (typeof snapshot.val()[i] === 'undefined') {
//         break;
//       } else {
//         let includes = snapshot.val()[i].name.includes(stadName);
//         if (includes) {
//           data.push(snapshot.val()[i]);
//           break;
//         }

//         i = i + 1;
//       }
//     }
//     setData(data);
//   });
// };
