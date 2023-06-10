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
import Icon from 'react-native-vector-icons/Ionicons';

export default function Stadium({navigation}) {
  const [data, setData] = useState([]);
  const [stad, setStad] = useState('');
  const [sportType, setSportType] = useState('');
  useEffect(() => {
    const reference = database().ref('/stadiums/');
    reference.on('value', snapshot => {
      const data = Object.entries(snapshot.val()).map(([key, value]) => ({
        ...value,
        id: key,
      }));
      setData(data);
      console.log(data);
    });
  }, []);
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

  return (
    <View style={styles.container}>
      <View style={styles.new}>
        <View
          style={{
            height: 40,
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: 'black',
            borderTopRightRadius: 20,
            borderTopLeftRadius: 20,
            borderBottomRightRadius: 20,
            borderBottomLeftRadius: 20,
            borderWidth: 1,
            borderLeftWidth: 1,
            borderColor: '#C5BBAE',
          }}>
          <TextInput
            style={styles.input}
            placeholder="search"
            placeholderTextColor="#C5BBAE"
            value={stad}
            onChangeText={setStad}
          />
          <TouchableOpacity onPress={() => search(stad)}>
            <Icon name="search-sharp" size={30} style={{color: '#C5BBAE'}} />
          </TouchableOpacity>
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
              <Icon
                name="football"
                size={30}
                color={sportType == 'Football' ? '#e67e22' : '#2c3e50'}
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
              <Icon
                name="md-basketball-outline"
                size={30}
                color={sportType == 'Basketball' ? '#e67e22' : '#2c3e50'}
              />
            </TouchableOpacity>

            {/* <Icon name="location" size={30} /> */}
            {/* <TouchableOpacity>
              <Text>Show All</Text>
            </TouchableOpacity> */}
          </View>
        </View>
        <FlatList
          data={_data}
          renderItem={({item}) => (
            <TouchableOpacity
              onPress={() =>
                navigation.navigate('StadiumDetails', {
                  name: item.name,
                  location: item.location,
                  city: item.City,
                  capacity: item.capacity,
                  sportType: item.sportType,
                  price: item.price,
                  rating: item.rating,
                  amenities: item.amenities,
                })
              }>
              <View style={styles.FlatList_views}>
                <Image
                  style={{
                    height: 100,
                    flex: 1,
                    margin: 5,
                    width: '100%',
                    borderRadius: 40,
                  }}
                  source={{
                    uri: 'https://i.imgur.com/5cpkhU4.jpg',
                  }}
                />

                <View style={{flex: 2}}>
                  <Text
                    style={{
                      fontSize: 20,

                      textAlign: 'center',
                      color: '#F98C00',
                    }}>
                    {item.name} stadium
                  </Text>
                  <Text style={{marginLeft: 10}}>
                    {item.City}, {item.location}
                  </Text>
                  <Text style={{marginBottom: 15, marginLeft: 10}}>
                    {item.sportType}
                  </Text>
                  {/* <Button
                    title="Click Me"
                    color="red"
                    onPress={() => console.log('Button clicked!')}
                    width
                  /> */}
                </View>
              </View>
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
    backgroundColor: 'black',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  input: {
    color: 'white',
    underlineColorAndroid: 'transparent',
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
    backgroundColor: 'black',
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
    marginTop: 20,
    height: 150,
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
