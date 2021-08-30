
import 'intl';
import 'intl/locale-data/jsonp/en';
import 'react-native-gesture-handler';

import { useFonts } from 'expo-font';
import { Provider } from 'react-redux';
import { IntlProvider } from 'react-intl';
import { NavigationContainer } from '@react-navigation/native';

import React from 'react';
import Routes from './app/core/routes';
import api from "./app/core/services/api";
import * as redux from "./app/core/redux";
import store from './app/core/redux/store';

export default function App() {

  
  const [loaded] = useFonts({
    "CircularStd-Book": require('./assets/fonts/CircularStd-Book.otf'),
    "FuturaPT-Book": require('./assets/fonts/FuturaPT-Book.otf'),
  });

  if (!loaded) {
    return null;
  }

  redux.setupAxios(api, store);
  return (
    <Provider store={store}>
      <IntlProvider locale="en">
        <NavigationContainer>
          <Routes />
        </NavigationContainer>
      </IntlProvider>
    </Provider>
  );
}
