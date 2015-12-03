'use strict';

import React, { PropTypes } from 'react-native'
import { connect, Provider } from 'react-redux/native'
import expect from 'expect'
import { createStore, combineReducers } from 'redux'

var {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  TouchableHighlight,
  TextInput
} = React;

class Counter extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      todo: "",
      isLoading: false,
      error: false
    }
  }
  handleChange(event){
    //console.log("handling change")
    this.setState({
      todo: event.nativeEvent.text
    })
  }
  handleSubmit(){
    let nextToDoId = 0;
    console.log("handling submit", this.state.todo)

    //this.setState({
      //isLoading: true
    //});
    //store.dispatch({
      //type: 'ADD_TODO',
      //text: this.state.todo,
      //id: nextToDoId++
    //})

    console.log("this: ", this)
  }
  render () {
    const { value, todos, onIncreaseClick, onDecreaseClick, onAddTodoClick } = this.props
    console.log(store.getState());
    return (
      <View style={styles.container}>

        <Text style={styles.todoInstructions}>Input here</Text>
        <TextInput
          style={styles.todoInput}
          value={this.state.todo}
          onChange={this.handleChange.bind(this)} />
          <TouchableHighlight
            style={styles.button}
            onPress={onAddTodoClick}
            underlayColor="white">
            <Text style={styles.buttonText}>ADD TODO</Text>
          </TouchableHighlight>

        <Text style={styles.clicks}>
          Clicks: { todos }
        </Text>
        
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
const addTodoAction   = {
  type: 'ADD_TODO',
  text: "testing"
}

//store.dispatch({
  //type: 'ADD_TODO',
  //text: this.state.todo,
  //id: nextToDoId++
//})

// todo reducer
function todo (state = [], action) {
  switch (action.type) {
    case 'ADD_TODO':
      return {
        id: action.id,
        text: action.text,
        completed: false
      };
    case 'TOGGLE_TODO':
      if (state.id !== action.id) {
        return state;
      }
      return {
        ...state,
        completed: !state.completed
      };
    default: 
      return state;
  }
}

// todos reducer (a pure function to implement update action)
function todos (state = [], action) {
  switch (action.type) {
    case 'ADD_TODO':
      return [
        ...state,
        todo(undefined, action) 
      ];
    case 'TOGGLE_TODO':
      return state.map(t => todo(t, action));
    default:
      return state;
  }
};

function visibilityFilter (state = 'SHOW_ALL', action) {
  switch (action.type) {
    case 'SET_VISIBILITY_FILTER':
      return action.filter;
    default:
      return state;
  }
};

// Reducer
function counter (state = {}, action) {
  let count = state.count
  switch (action.type) {
    case 'INCREMENT':
      return {
        ...state,
        count: count + 1
      };
    case 'DECREMENT':
      return {
        ...state,
        count: count - 1
      };
    default:
      return state
  }
}

function fooCounter (state = {count: 0}, action) {
  let count = state.count
  switch (action.type) {
    case 'INCREMENT':
      return counter(state = {count: state.count}, action);
    case 'DECREMENT':
      return counter(state = {count: state.count}, action);
    default:
      return state
  }
}

//function barApp (state = {}, action) {
  //return {
    //fooCounter: fooCounter(state.fooCounter, action),
    //todos: todos(state.todos, action),
    //visibilityFilter: visibilityFilter(state.visibilityFilter, action)
  //}
//}

const barApp = combineReducers({
  todos,
  visibilityFilter,
  fooCounter
})

// holds state, lets you dispatch actions
let store = createStore(barApp);

// Map Redux state to component props
function mapStateToProps (state) {
  return {
    value: state.fooCounter.count,
    todos: state.fooCounter.todos
  }
}

// Map Redux actions to component props
function mapDispatchToProps (dispatch) {
  return {
    onIncreaseClick: () => dispatch(incrementAction),
    onDecreaseClick: () => dispatch(decrementAction),
    onAddTodoClick: () => dispatch(addTodoAction),
  }
}

//store.dispatch({
  //type: 'ADD_TODO',
  //text: this.state.todo,
  //id: nextToDoId++
//})

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
    //flexDirection: 'column',
    //justifyContent: 'center',
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
  todoInstructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
  todoInput: {
    height: 50,
    padding: 4,
    marginRight: 5,
    fontSize: 23,
    borderWidth: 1,
    borderColor: 'white',
    borderRadius: 8,
    color: 'white'
  },
});



// Test add todos
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

// test toggle todos
const testToggleTodo = () => {
  const stateBefore = [
    {
      id: 0,
      text: 'Learn Redux',
      completed: false
    },
    {
      id: 1,
      text: 'Go shopping',
      completed: false
    }
  ];
  const action = {
    type: 'TOGGLE_TODO',
    id: 1
  };
  const stateAfter = [
    {
      id: 0,
      text: 'Learn Redux',
      completed: false
    },
    {
      id: 1,
      text: 'Go shopping',
      completed: true
    }
  ];
  
  expect(
    todos(stateBefore, action)
  ).toEqual(stateAfter);
};


// run tests
//testAddTodo();
//testToggleTodo();

//console.log('Initial state:');
//console.log(store.getState());
//console.log('--------------');

//console.log('Dispatching ADD_TODO.');
//store.dispatch({
  //type: 'ADD_TODO',
  //id: 0,
  //text: 'Learn Redux'
//});
//console.log('Current state:');
//console.log(store.getState());
//console.log('--------------');

//console.log('Dispatching ADD_TODO.');
//store.dispatch({
  //type: 'ADD_TODO',
  //id: 1,
  //text: 'Go shopping'
//});
//console.log('Current state:');
//console.log(store.getState());
//console.log('--------------');

//console.log('Dispatching TOGGLE_TODO.');
//store.dispatch({
  //type: 'TOGGLE_TODO',
  //id: 0
//});
//console.log('Current state:');
//console.log(store.getState());
//console.log('--------------');

//console.log('Dispatching SET_VISIBILITY_FILTER');
//store.dispatch({
  //type: 'SET_VISIBILITY_FILTER',
  //filter: 'SHOW_COMPLETED'
//});
//console.log('Current state:');
//console.log(store.getState());
//console.log('--------------');

//console.log('All tests passed.');


AppRegistry.registerComponent('eggheadRedux', () => eggheadRedux);
