import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import {BrowserRouter} from 'react-router-dom'
import { createStore } from 'redux';
import { Provider } from 'react-redux';

const initialState = {
  repos: [],
  firstName: '',
  lastName: '',
  email: '',
  editedElement: null,
  modalWindow: false,
  
  list: [],
  task: '',
  modalTaskInput: false,
};

const rootReducer = (state = initialState, action) => {
  console.log('state: ', state);
  console.log('action: ', action);

  if (action.type === 'API_DATA/GET_REPOS') {
    return {
      ...state, //  spread operator. перезаписать все поля в новый объект
      repos: action.payload.repos,
      modalWindow: false,
    };
  };

  if (action.type === 'API_DATA/CHANGE_NAME') {
    return {
      ...state,
      firstName: action.payload.firstName,
    };
  };

  if (action.type === 'API_DATA/CHANGE_LASTNAME') {
    return {
      ...state,
      lastName: action.payload.lastName,
    };
  };

  if (action.type === 'API_DATA/CHANG_EMAIL') {
    return {
      ...state,
      email: action.payload.email
    };
  };

  if (action.type === 'API_DATA/UPDATE_REPOS') {
    return {
      ...state,
      repos: action.payload.repos,
      firstName: '', lastName: '', email: '', editedElement: null, modalWindow: false,
    };
  };

  if (action.type === 'API_DATA/EDIT_USER') {
    return {
      ...state,
      editedElement: action.payload.id,
      firstName: action.payload.firstName,
      lastName: action.payload.lastName,
      email: action.payload.email,
      modalWindow: true,
    };
  };

  if (action.type === 'API_DATA/UNDO_EDIT') {
    return {
      ...state,
       
      firstName: '', lastName: '', email: '', editedElement: null, modalWindow: false,
    };
  };

  if (action.type === 'API_DATA/DELETE_REPO') {
    return {
      ...state,
      repos: action.payload.repos,
    };
  };

  if (action.type === 'API_DATA/OPEN_MODAL_WINDOW') {
    return {
      ...state,
      modalWindow: true,
    };
  };

  if (action.type === 'TO_DO_LIST/GET_TASKS') {
    return {
      ...state,
      list: action.payload.list,
    };
  };

  if (action.type === 'TO_DO_LIST/OPEN_MODAL_INPUT') {
    return {
      ...state,
      modalTaskInput: action.payload.modalTaskInput,
    };
  };

  return state;
};

const store = createStore(rootReducer, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());

const project = (
  <Provider store={store}>
  <BrowserRouter>
    <App/>
  </BrowserRouter>
  </Provider>
)


ReactDOM.render(
  
    project,
  
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
