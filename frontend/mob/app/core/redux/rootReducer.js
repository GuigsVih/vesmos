import { all } from "redux-saga/effects";
import { combineReducers } from "redux";

import * as auth from "./Auth";
import persistReducer from "redux-persist/es/persistReducer";
import AsyncStorage from "@react-native-community/async-storage";

const persistConfig = {
  key: 'root',
  storage: AsyncStorage
};

const combinedReducers = combineReducers({
  auth: auth.reducer,
});

export const rootReducer = persistReducer(persistConfig, combinedReducers);

export function* rootSaga() {
  yield all([auth.saga()]);
}