import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { BrowserRouter } from 'react-router-dom';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import {
    UPDATE_REPOS,
    CHANGE_NAME,
    CHANGE_LASTNAME,
    CHANGE_EMAIL,
    GET_REPOS,
    EDIT_USER,
    UNDO_EDIT,
    DELETE_USER,
    OPEN_MODAL_WINDOW,
} from './GeneralComponent/APIData/constants';

import {
    GET_TASKS,
    OPEN_MODAL_INPUT,
    GET_NEW_TASK,
    ADD_NEW_TASK,
    LOAD,
    CANCEL_TASK,
    MAKE_TASK_DONE,
    EDIT_TASK,
    UPDATE_TASK,
    DELETE_TASK,
} from './GeneralComponent/toDoList/constants';
import { render } from '@testing-library/react';
import { act } from 'react-dom/test-utils';

const initialState = {
    repos: [],
    firstName: '',
    lastName: '',
    email: '',
    editedElement: null,
    modalWindow: false,

    list: [],
    task: '',
    editedTask: null,
    modalTaskInput: false,
    loader: false,
};

const rootReducer = (state = initialState, action) => {
    // console.log('state: ', state);
    // console.log('action: ', action);

    if (action.type === GET_REPOS) {
        return {
            ...state, //  spread operator. перезаписать все поля в новый объект
            repos: action.payload.repos,
            modalWindow: false,
        };
    }

    if (action.type === CHANGE_NAME) {
        return {
            ...state,
            firstName: action.payload.firstName,
        };
    }

    if (action.type === CHANGE_LASTNAME) {
        return {
            ...state,
            lastName: action.payload.lastName,
        };
    }

    if (action.type === CHANGE_EMAIL) {
        return {
            ...state,
            email: action.payload.email,
        };
    }

    if (action.type === UPDATE_REPOS) {
        return {
            ...state,
            repos: action.payload.repos,
            firstName: '',
            lastName: '',
            email: '',
            editedElement: null,
            modalWindow: false,
        };
    }

    if (action.type === EDIT_USER) {
        return {
            ...state,
            editedElement: action.payload.id,
            firstName: action.payload.firstName,
            lastName: action.payload.lastName,
            email: action.payload.email,
            modalWindow: true,
        };
    }

    if (action.type === UNDO_EDIT) {
        return {
            ...state,
            firstName: '',
            lastName: '',
            email: '',
            editedElement: null,
            modalWindow: false,
        };
    }

    if (action.type === DELETE_USER) {
        return {
            ...state,
            repos: action.payload.repos,
        };
    }

    if (action.type === OPEN_MODAL_WINDOW) {
        return {
            ...state,
            modalWindow: true,
        };
    }

    if (action.type === GET_TASKS) {
        return {
            ...state,
            list: action.payload.list,
        };
    }

    if (action.type === OPEN_MODAL_INPUT) {
        return {
            ...state,
            modalTaskInput: action.payload.modalTaskInput,
        };
    }

    if (action.type === GET_NEW_TASK) {
        return {
            ...state,
            task: action.payload.task,
        };
    }

    if (action.type === ADD_NEW_TASK) {
        const newList = state.list.slice();
        newList.push({
            id: action.payload.id,
            task: action.payload.task,
            isFinished: false,
        });
        return {
            ...state,
            list: newList,
            loader: false,
            task: '',
        };
    }

    if (action.type === CANCEL_TASK) {
        return {
            ...state,
            modalTaskInput: action.payload.modalTaskInput,
            task: '',
        };
    }

    if (action.type === MAKE_TASK_DONE) {
        return {
            ...state,
            list: action.payload.list,
        };
    }

    if (action.type === DELETE_TASK) {
        return {
            ...state,
            list: action.payload.list,
        };
    }

    if (action.type === EDIT_TASK) {
        return {
            ...state,
            editedTask: action.payload.id,
            task: action.payload.task,
            modalTaskInput: action.payload.modalTaskInput,
        };
    }

    if (action.type === UPDATE_TASK) {
        return {
            ...state,
            list: action.payload.list,
            task: '',
            editedTask: null,
        };
    }
    if (action.type == LOAD) {
        return {
            ...state,
            loader: action.payload.loader,
        };
    }
    return state;
};

const store = createStore(
    rootReducer,
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

const project = (
    <Provider store={store}>
        <BrowserRouter>
            <App />
        </BrowserRouter>
    </Provider>
);

ReactDOM.render(
    project,

    document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
