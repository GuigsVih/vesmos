
import 'react-native-gesture-handler';
import React from 'react';
import Routes from './app/core/routes';
import api from "./app/core/services/api";
import * as redux from "./app/core/redux";
import { NavigationContainer } from '@react-navigation/native';

export default function App() {
  
  redux.setupAxios(api);
  return (
    <NavigationContainer>
      <Routes />
    </NavigationContainer>
  );
}
