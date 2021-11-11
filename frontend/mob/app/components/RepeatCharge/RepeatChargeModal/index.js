import React, { useState } from 'react';
import { Text, View } from 'react-native';
import Modal from "react-native-modal";

import { styles } from './styles';
import Input from '../../../components/Input';
import Picker from '../../Picker';
import Button from '../../Button';
import { units, installmentUnits } from '../config';

export default function RepeatChargeModal({ title, visible, setVisible, repeatType, handleRepeatData, cancel }) {

  const [time, setTime] = useState("2");
  const [unitOfMeasurement, setUnitOfMeasurement] = useState("monthly");

  const formatTime = (value) => {
    if (value == "1") {
      setTime("");
      return;
    }
    setTime(value.replace(/[^0-9]/g, ''));
  }

  const handle = () => {
    setVisible(false);
    handleRepeatData(time, unitOfMeasurement);
  }

  return (
    <>
      <Modal
        isVisible={visible}
        style={{ justifyContent: 'flex-end', margin: 0 }}
        onSwipeComplete={cancel}
        swipeDirection={['down']}
      >
        <View style={styles.content}>
          <Text style={styles.title}>{title}</Text>
          <View style={[styles.alignCenter, { marginTop: 25 }]}>
            <View style={{ flexDirection: 'row' }}>
              {repeatType != 'fixed' ?
                <View style={{ flex: 0.18 }}>
                  <Input
                    value={time}
                    onChange={(value) => formatTime(value)}
                    maxLength={3}
                    minLength={1}
                    label={""}
                    mode={'outlined'}
                    keyboardType={"number-pad"}
                  />
                </View>
                : <></>
              }
              <View style={[repeatType != 'fixed' ? { flex: 0.6, marginTop: 5.7, marginLeft: 15 } : { flex: 0.8 }]}>
                <Picker
                  label={"Unidade"}
                  value={unitOfMeasurement}
                  setValue={setUnitOfMeasurement}
                  items={repeatType != 'fixed' ? installmentUnits : units}
                />
              </View>
            </View>
            <Button
              title={`Salvar`}
              loading={false}
              buttonStyle={styles.buttonStyle}
              titleStyle={{ marginRight: 10 }}
              onPress={handle}
            />
          </View>
        </View>
      </Modal>
    </>
  )
}