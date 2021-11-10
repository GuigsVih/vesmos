import React, { useState } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import RepeatChargeModal from './RepeatChargeModal';
import { styles } from './styles';

const REPEAT_TYPE = {
  "fixed": "fixa",
  "parceled": "parcelada"
};

export default function RepeatCharge({ chargeType }) {

  const [option, setOption] = useState();
  const [visible, setVisible] = useState(false);

  const handleOption = (opt) => {
    if (opt == option) {
      setOption(null);
      return;
    }
    handleRepeatChargeModal();
    setOption(opt);
  }

  const handleRepeatChargeModal = () => {
    setVisible(!visible);
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
      </View>
      <RepeatChargeModal
        visible={visible}
        setVisible={handleRepeatChargeModal}
        repeatType={option}
        title={`${chargeType.charAt(0).toUpperCase() + chargeType.slice(1)} ${REPEAT_TYPE[option]}`} 
      />
    </View>
  );
}