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
} from './constants';

const initialState = {
    repos: [],
    firstName: '',
    lastName: '',
    email: '',
    editedElement: null,
    modalWindow: false,
};

const APIDataReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_REPOS: {
            return {
                ...state, //  spread operator. перезаписать все поля в новый объект
                repos: action.payload.repos,
                modalWindow: false,
            };
        }

        case CHANGE_NAME: {
            return {
                ...state,
                firstName: action.payload.firstName,
            };
        }

        case CHANGE_LASTNAME: {
            return {
                ...state,
                lastName: action.payload.lastName,
            };
        }

        case CHANGE_EMAIL: {
            return {
                ...state,
                email: action.payload.email,
            };
        }

        case UPDATE_REPOS: {
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

        case EDIT_USER: {
            return {
                ...state,
                editedElement: action.payload.id,
                firstName: action.payload.firstName,
                lastName: action.payload.lastName,
                email: action.payload.email,
                modalWindow: true,
            };
        }

        case UNDO_EDIT: {
            return {
                ...state,
                firstName: '',
                lastName: '',
                email: '',
                editedElement: null,
                modalWindow: false,
            };
        }

        case DELETE_USER: {
            return {
                ...state,
                repos: action.payload.repos,
            };
        }

        case OPEN_MODAL_WINDOW: {
            return {
                ...state,
                modalWindow: true,
            };
        }

        default: {
            return state;
        }
    }
};

export default APIDataReducer;
