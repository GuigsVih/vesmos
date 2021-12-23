import React, { useState } from 'react';
import { View, Text, TouchableOpacity, ToastAndroid } from 'react-native';
import { styles } from './styles';
import { repeatType, units } from './config';
import RepeatChargeModal from './RepeatChargeModal';
import { Caption } from 'react-native-paper';
import { currencyFormat } from '../../core/helpers/format';

export default function RepeatCharge({ value, chargeType, setRepeatData }) {

  const [time, setTime] = useState();
  const [unitOfMeasurement, setUnitOfMeasurement] = useState();
  const [option, setOption] = useState();
  const [visible, setVisible] = useState(false);

  const handleOption = (opt) => {
    if (opt == option) {
      cancel();
      return;
    }
    if (value == null || value == 0) {
      ToastAndroid.show("É necessário definir um valor para a transação", ToastAndroid.SHORT)
      return;
    }
    setVisible(!visible);
    setOption(opt);
  }

  const handleRepeatData = (time, unitOfMeasurement) => {
    setTime(time);
    setUnitOfMeasurement(unitOfMeasurement);
    
    if (option == 'fixed') {
      setRepeatData(option, unitOfMeasurement, null);
    } else {
      setRepeatData(option, unitOfMeasurement, time);
    }
  }

  const cancel = () => {
    setVisible(false);
    setOption(null);
    setTime(null);
    setRepeatData(null, null, null);
  }

  return (
    <View>
      <View style={{ marginTop: 5, flexDirection: 'row' }}>
        <TouchableOpacity
          onPress={() => handleOption('fixed')}
          style={
            [
              styles.fixedContainer,
              option == "fixed" ? styles.selectedContainer : styles.unselectedContainer
            ]
          }
        >
          <Text style={{ color: option == "fixed" ? "#fff" : "rgba(0, 0, 0, 0.54)" }}>Fixo</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => handleOption('parceled')}
          style={
            [
              styles.parceledContainer,
              option == "parceled" ? styles.selectedContainer : styles.unselectedContainer
            ]
          }
        >
          <Text style={{ color: option == "parceled" ? "#fff" : "rgba(0, 0, 0, 0.54)" }}>Parcelado</Text>
        </TouchableOpacity>
        {option == 'parceled' && time > 1 ?
          <Caption style={{ marginLeft: 20 }}>{time}x de {currencyFormat(value / time)}</Caption>
          : option == 'fixed' && time ? <Caption style={{ marginLeft: 20}}>{units[unitOfMeasurement]}</Caption>
          : <></>}
      </View>
      <RepeatChargeModal
        visible={visible}
        setVisible={() => setVisible(!visible)}
        repeatType={option}
        handleRepeatData={handleRepeatData}
        title={`${chargeType.charAt(0).toUpperCase() + chargeType.slice(1)} ${repeatType[option]}`}
        cancel={cancel}
      />
    </View>
  );
}