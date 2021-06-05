import React from 'react';
import { MaterialIcons } from '@expo/vector-icons';
import { TouchableWithoutFeedback } from 'react-native';

import { Button } from './styles';

export default function MoneyButton({ onPress, focused }) {
  return (
    <TouchableWithoutFeedback onPress={onPress}>
      <Button
        colors={['#623AA7', '#623AA7']}
        style={{border: 2, borderColor: focused ? "#fff" : "#000"}}
      >
        <MaterialIcons
          name="attach-money"
          size={30}
          color={focused ? '#fff' : '#000'}
        />
      </Button>
    </TouchableWithoutFeedback>
  );
}