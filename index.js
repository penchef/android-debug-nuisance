import {persistStore, persistReducer} from 'redux-persist';
import {Navigation} from 'react-native-navigation';
import {combineReducers, createStore, compose} from 'redux';

import AsyncStorage from '@react-native-community/async-storage';

import React from 'react';
import {SafeAreaView, StatusBar, Button, Alert} from 'react-native';

// DOES WORK HERE!
Navigation.registerComponent('foo.bar', () => App);

const store = configureStore();

persistStore(store, null, () => {
  // DOES NOT WORK HERE!
  // Navigation.registerComponent('foo.bar', () => App);

  Navigation.setRoot({
    root: {
      stack: {
        children: [
          {
            component: {
              name: 'foo.bar',
            },
          },
        ],
      },
    },
  });
});

const App = () => {
  return (
    <>
      <StatusBar barStyle="dark-content" />
      <SafeAreaView style={{paddingHorizontal: 25}}>
        <Button
          title="Click Me"
          onPress={() => Alert.alert('Button Pressed!')}
        />
      </SafeAreaView>
    </>
  );
};

function configureStore() {
  const persistConfig = {
    key: 'cove.buildings',
    storage: AsyncStorage,
  };

  const enhancer = compose();

  const persistedReducer = persistReducer(
    persistConfig,
    combineReducers({someReducer: () => ({})}),
  );
  return createStore(persistedReducer, {}, enhancer);
}
