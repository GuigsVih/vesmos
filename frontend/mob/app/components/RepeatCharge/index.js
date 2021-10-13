import React, { useState } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { styles } from './styles';

export default function RepeatCharge() {

  const [option, setOption] = useState();

  const handleOption = (opt) => {
    if (opt == option) {
      return setOption(null);
    }    
    return setOption(opt);
  }

  return (
    <View>
      <View style={{ marginTop: 5, flexDirection: 'row' }}>
        <TouchableOpacity 
          onPress={() => handleOption('fixed')} 
          style={
            [
              styles.border, 
              styles.fixedContainer,
              { backgroundColor: option == "fixed" ? "#731cef" : "#f6f6f6" }
            ]
          }
        >
          <Text style={{ color: option == "fixed" ? "#fff" : "#000" }}>Fixo</Text>
        </TouchableOpacity>      
        <TouchableOpacity 
          onPress={() => handleOption('parceled')} 
          style={
            [
              styles.border, 
              styles.parceledContainer,
              { backgroundColor: option == "parceled" ? "#731cef" : "#f6f6f6" }
            ]
          }
        >
          <Text style={{ color: option == "parceled" ? "#fff" : "#000" }}>Parcelado</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}