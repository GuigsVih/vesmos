
import 'react-native-gesture-handler';
import React from 'react';
import Routes from './app/core/routes';
import api from "./app/core/services/api";
import * as redux from "./app/core/redux";
import { NavigationContainer } from '@react-navigation/native';
import { useFonts } from 'expo-font';

export default function App() {

  const [loaded] = useFonts({
    "CircularStd-Book": require('./assets/fonts/CircularStd-Book.otf'),
    "CircularStd-Font": require('./assets/fonts/CircularStd-Font.otf'),
  });
  
  if (!loaded) {
    return null;
  }

  redux.setupAxios(api);
  return (
    <NavigationContainer>
      <Routes />
    </NavigationContainer>
  );
}
