import React from 'react';
import { MaterialIcons, MaterialCommunityIcons } from '@expo/vector-icons';
import { styles } from './styles';
import { Animated, View } from 'react-native';
import { TouchableHighlight, TouchableOpacity } from 'react-native-gesture-handler';

export default function MoneyButton({ navigation }) {

  const mode = React.useRef(new Animated.Value(0)).current;
  const buttonSize = React.useRef(new Animated.Value(1)).current;

  const handleAddRelease = (type) => {
    handlePress();
    setTimeout(() => {
      navigation.navigate("AddRelease", {
        type: type
      });
    }, 100)
  }

  const handlePress = () => {
    Animated.sequence([
      Animated.timing(buttonSize, {
        toValue: 0.95,
        duration: 0.1,
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

  const sizeStyle = {
    transform: [{ scale: buttonSize }]
  };
  return (
    <>
      <View style={{ position: "absolute", alignItems: "center" }}>
        <Animated.View style={{ position: "absolute", left: thermometerX, top: thermometerY }}>
          <View style={styles.secondaryButton}>
            <TouchableOpacity onPress={() => handleAddRelease('expense')}>
              <MaterialIcons
                name="trending-down"
                size={24}
                color={'tomato'}
              />
            </TouchableOpacity>
          </View>
        </Animated.View>
        <Animated.View style={{ position: "absolute", left: timeX, top: timeY }}>
          <View style={styles.secondaryButton}>
            <TouchableOpacity onPress={() => handleAddRelease('transfer')}>
              <MaterialCommunityIcons name="bank-transfer" size={24} color="#89cff0" />
            </TouchableOpacity>
          </View>
        </Animated.View>
        <Animated.View style={{ position: "absolute", left: pulseX, top: pulseY }}>
          <View style={styles.secondaryButton}>
            <TouchableOpacity onPress={() => handleAddRelease('revenue')}>
              <MaterialIcons
                name="trending-up"
                size={24}
                color={'green'}
              />
            </TouchableOpacity>
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