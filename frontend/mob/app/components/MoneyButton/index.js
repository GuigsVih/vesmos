import React, { useState } from 'react';
import { MaterialIcons, MaterialCommunityIcons } from '@expo/vector-icons';
import { styles } from './styles';
import { Animated, View } from 'react-native';
import { TouchableHighlight } from 'react-native-gesture-handler';

export default function MoneyButton({ focused }) {

  const [open, setOpen] = useState(false);

  const toggleMoneyButton = () => {
    setOpen(!open);
  }
  const mode = React.useRef(new Animated.Value(0)).current;
  const buttonSize = React.useRef(new Animated.Value(1)).current;

  const handlePress = () => {
    Animated.sequence([
      Animated.timing(buttonSize, {
        toValue: 0.95,
        duration: 200,
        useNativeDriver: false
      }),
      Animated.timing(buttonSize, {
        toValue: 1,
        useNativeDriver: false
      }),
      Animated.timing(mode, {
        toValue: mode._value === 0 ? 1 : 0,
        useNativeDriver: false
      })
    ]).start();
  };

  const thermometerX = mode.interpolate({
    inputRange: [0, 1],
    outputRange: [-24, -100]
  });

  const thermometerY = mode.interpolate({
    inputRange: [0, 1],
    outputRange: [-50, -100]
  });

  const timeX = mode.interpolate({
    inputRange: [0, 1],
    outputRange: [-24, -24]
  });

  const timeY = mode.interpolate({
    inputRange: [0, 1],
    outputRange: [-50, -150]
  });

  const pulseX = mode.interpolate({
    inputRange: [0, 1],
    outputRange: [-24, 50]
  });

  const pulseY = mode.interpolate({
    inputRange: [0, 1],
    outputRange: [-50, -100]
  });

  const rotation = mode.interpolate({
    inputRange: [0, 1],
    outputRange: ["0deg", "90deg"]
  });

  const sizeStyle = {
    transform: [{ scale: buttonSize }]
  };
  return (
    <>
      <View style={{ position: "absolute", alignItems: "center" }}>
        <Animated.View style={{ position: "absolute", left: thermometerX, top: thermometerY }}>
          <View style={styles.secondaryButton}>
            <MaterialIcons
              name="trending-down"
              size={24}
              color={'tomato'}
            />
          </View>
        </Animated.View>
        <Animated.View style={{ position: "absolute", left: timeX, top: timeY }}>
          <View style={styles.secondaryButton}>
            <MaterialCommunityIcons name="bank-transfer" size={24} color="#89cff0" />
          </View>
        </Animated.View>
        <Animated.View style={{ position: "absolute", left: pulseX, top: pulseY }}>
          <View style={styles.secondaryButton}>
            <MaterialIcons
              name="trending-up"
              size={24}
              color={'green'}
            />
          </View>
        </Animated.View>
        <Animated.View style={[styles.button, sizeStyle]}>
          <TouchableHighlight onPress={handlePress} underlayColor="#7F58FF">
            <Animated.View>
              <MaterialIcons
                name="attach-money"
                size={35}
                color={'#fff'}
              />
            </Animated.View>
          </TouchableHighlight>
        </Animated.View>
      </View>
    </>
  );
}