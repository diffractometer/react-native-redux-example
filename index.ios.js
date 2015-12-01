/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 */
'use strict';

import React, { PropTypes } from 'react-native'
import { createStore } from 'redux'
var {
  AppRegistry,
  StyleSheet,
  Text,
  View,
} = React;

const counter = (state = 0, action) => {
  switch (action.type) {
    case 'increase':
    default:
      return state;
  }
}

var eggheadRedux = React.createClass({
  render: function() {
    console.log("main component");
    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>
          Redux Egghead Tutorial 
        </Text>
      </View>
    );
  }
});

var styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 30,
    marginTop: 65,
    flexDirection: 'column',
    justifyContent: 'center',
    backgroundColor: '#888'
  },
  welcome: {
    marginBottom: 20,
    fontSize: 25,
    textAlign: 'center',
    color: '#fff'
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});

AppRegistry.registerComponent('eggheadRedux', () => eggheadRedux);
