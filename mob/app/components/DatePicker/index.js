import React, { useState } from 'react';
import { TouchableOpacity, View, Text } from 'react-native';
import { Feather } from '@expo/vector-icons';
import RNDateTimePicker from '@react-native-community/datetimepicker';
import moment from 'moment';

import { styles } from './styles';
import { formatDate } from '../../core/helpers/format';

export default function DatePicker({
  datePickerValue,
  selectValue,
  onSelect,
  mode = "date",
  display = "default",
  placeholder = "Escolha uma data"
}) {

  const [show, setShow] = useState(false);  

  const setDate = (event, date) => {
    setShow(false);
    onSelect(moment(date).toDate());
  }

  return (
    <>
      <TouchableOpacity onPress={() => setShow(true)}>
        <View style={styles.container}>
          <View style={{ flexDirection: 'row' }}>
            {!!selectValue ?
              <Text style={styles.choosedDateText}>{formatDate(selectValue)}</Text>
              :
              <Text style={styles.text}>{placeholder}</Text>
            }
            <View style={styles.toEnd}>
              <Feather name="calendar" size={20} color="#737373" />
            </View>
          </View>
        </View>
      </TouchableOpacity>
      {show && <RNDateTimePicker
        value={datePickerValue}
        mode={mode}
        display={display}
        onChange={(event, date) => setDate(event, date)}
        is24Hour={true}
      />}
    </>
  )
}