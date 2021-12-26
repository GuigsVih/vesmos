
import 'intl';
import 'intl/locale-data/jsonp/pt-BR';
import 'react-native-gesture-handler';

import { useFonts } from 'expo-font';
import { Provider } from 'react-redux';
import { IntlProvider } from 'react-intl';
import { NavigationContainer } from '@react-navigation/native';
import moment from 'moment';

import React from 'react';
import Routes from './app/core/routes';
import api from "./app/core/services/api";
import * as redux from "./app/core/redux";
import store, { persistor } from './app/core/redux/store';
import { PersistGate } from "redux-persist/integration/react";

export default function App() {


  const [loaded] = useFonts({
    "FuturaPT-Book": require('./assets/fonts/FuturaPT-Book.otf'),
    "FuturaPT-Medium": require('./assets/fonts/FuturaPT-Medium.otf'),
    "MavenPro-Bold": require('./assets/fonts/MavenPro-Bold.ttf'),
    "MavenPro-Regular": require('./assets/fonts/MavenPro-Regular.ttf'),
    "MavenPro-Medium": require('./assets/fonts/MavenPro-Medium.ttf'),
  });

  if (!loaded) {
    return null;
  }

  redux.setupAxios(api, store);
  return (
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <IntlProvider locale="pt-BR">
          <NavigationContainer>
            <Routes />
          </NavigationContainer>
        </IntlProvider>
      </PersistGate>
    </Provider>
  );
}
