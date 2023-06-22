import moment from 'moment';
import React, {useState, useEffect} from 'react';
import {
  View,
  Button,
  Alert,
  Text,
  TouchableOpacity,
  SafeAreaView,
} from 'react-native';
import DateTimePicker, {
  DateTimePickerModal,
} from 'react-native-modal-datetime-picker';

export default function TimePicker(props) {
  // states for the date
  const {date, setDate} = props;
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);

  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const handleConfirm = date => {
    date.setMinutes(0, 0);
    setDate(date);
    hideDatePicker();
  };

  return (
    <View
      style={{
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 10,
        borderRadius: 10,
      }}>
      <TouchableOpacity onPress={showDatePicker}>
        <View
          style={{
            width: 300,
            height: 50,
            backgroundColor: '#027DB8',
            borderRadius: 10,
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <Text style={{color: 'white'}}>Select Date and Time</Text>
        </View>
      </TouchableOpacity>

      {/* <Button title="Show Date Picker"  /> */}
      <DateTimePickerModal
        isVisible={isDatePickerVisible}
        mode="datetime"
        date={date}
        onConfirm={handleConfirm}
        onCancel={hideDatePicker}
      />
      {/* <Text>date: {moment(date).format('DD MM YYYY')}</Text> */}
    </View>
  );
}
