'use strict';

import React, { PropTypes } from 'react-native'
import { connect, Provider } from 'react-redux/native'
import expect from 'expect'
import { createStore } from 'redux'

var {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  TouchableHighlight
} = React;

class Counter extends React.Component {
  render () {
    const { value, onIncreaseClick, onDecreaseClick } = this.props
    return (
      <View style={styles.container}>
        <Text style={styles.instructions}>
          Click on a button to increase or decrease the 
          value.
        </Text>
        <TouchableHighlight
          style={styles.button}
          onPress={onIncreaseClick}
          underlayColor="white">
          <Text style={styles.buttonText}>+</Text>
        </TouchableHighlight>
        <TouchableHighlight
          style={styles.button}
          onPress={onDecreaseClick}
          underlayColor="white">
          <Text style={styles.buttonText}>-</Text>
        </TouchableHighlight>
        <Text style={styles.clicks}>
          Clicks: { value }
        </Text>
      </View>
    )
  }
}

// Actions
const incrementAction = {type: 'INCREMENT'}
const decrementAction = {type: 'DECREMENT'}

// Reducer
function counter (state = {count: 0}, action) {
  let count = state.count
  switch (action.type) {
    case 'INCREMENT':
      return {count: count + 1}
    case 'DECREMENT':
      return {count: count - 1}
    default:
      return state
  }
}

// todo reducer (a pure function to implement update action)
function todos (state = [], action) {
  switch (action.type) {
    case 'ADD_TODO':
      return [
        ...state,
        {
          id: action.id,
          text: action.text,
          completed: false
        }
      ];
    default: 
      return state;
  }
}

// Tests
const testAddTodo = () => {
  const stateBefore = [];

  const action = {
    type: 'ADD_TODO',
    id: 0,
    text: 'Learn Redux'
  }

  const stateAfter = [
    {
      id: 0,
      text: 'Learn Redux',
      completed: false
    }
  ]

  expect(
    todos(stateBefore, action)
  ).toEqual(stateAfter);
}
testAddTodo();
console.log('All tests passed.');

// holds state, lets you dispatch actions
let store = createStore(counter);

// Map Redux state to component props
function mapStateToProps (state) {
  return {
    value: state.count
  }
}

// Map Redux actions to component props
function mapDispatchToProps (dispatch) {
  return {
    onIncreaseClick: () => dispatch(incrementAction),
    onDecreaseClick: () => dispatch(decrementAction)
  }
}

// Connected Component
let App = connect(
  mapStateToProps,
  mapDispatchToProps
)(Counter)

class eggheadRedux extends React.Component {
  render () {
    return (
      <Provider store={store}>
        {() => <App />}
      </Provider>
    )
  }
}

var styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 30,
    marginTop: 65,
    flexDirection: 'column',
    justifyContent: 'center',
    backgroundColor: '#888'
  },
  clicks: {
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
  buttonText: {
    fontSize: 18,
    color: '#111',
    alignSelf: 'center'
  },
  button: {
    height: 45,
    flexDirection: 'row',
    backgroundColor: 'white',
    borderColor: 'white',
    borderWidth: 1,
    borderRadius: 8,
    marginBottom: 10,
    marginTop: 10,
    alignSelf: 'stretch',
    justifyContent: 'center'
  },
});

AppRegistry.registerComponent('eggheadRedux', () => eggheadRedux);
