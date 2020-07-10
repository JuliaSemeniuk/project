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
} from './constants';

const initialState = {
    list: [],
    task: '',
    editedTask: null,
    modalTaskInput: false,
    loader: false,
};

const ToDoList = (state = initialState, action) => {
    // console.log('state: ', state);
    // console.log('action: ', action);

    switch (action.type) {
        case GET_TASKS: {
            return {
                ...state,
                list: action.payload.list,
            };
        }

        case OPEN_MODAL_INPUT: {
            return {
                ...state,
                modalTaskInput: action.payload.modalTaskInput,
            };
        }

        case GET_NEW_TASK: {
            return {
                ...state,
                task: action.payload.task,
            };
        }

        case ADD_NEW_TASK: {
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

        case CANCEL_TASK: {
            return {
                ...state,
                modalTaskInput: action.payload.modalTaskInput,
                task: '',
            };
        }

        case MAKE_TASK_DONE: {
            return {
                ...state,
                list: action.payload.list,
            };
        }

        case DELETE_TASK: {
            return {
                ...state,
                list: action.payload.list,
            };
        }

        case EDIT_TASK: {
            return {
                ...state,
                editedTask: action.payload.id,
                task: action.payload.task,
                modalTaskInput: action.payload.modalTaskInput,
            };
        }

        case UPDATE_TASK: {
            return {
                ...state,
                list: action.payload.list,
                task: '',
                editedTask: null,
            };
        }

        case LOAD: {
            return {
                ...state,
                loader: action.payload.loader,
            };
        }

        default: {
            return state;
        } //якщо жоден з кейсів не відпрацює, працюватиме дефолтний кейс, який поверне стейт
    }
};

export default ToDoList;
