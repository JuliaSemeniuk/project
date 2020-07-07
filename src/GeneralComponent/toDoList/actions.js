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

export const getTasks = (response) => ({
    type: GET_TASKS,
    payload: {
        list: response.map((value) => ({
            task: value.firstName,
            id: value.id,
            isFinished: false,
        })),
    },
});

export const openModalWindow = () => ({
    type: OPEN_MODAL_INPUT,
    payload: {
        modalTaskInput: true,
    },
});

export const getNewTask = (newTask) => ({
    type: GET_NEW_TASK,
    payload: {
        task: newTask,
    },
});

export const addNewTask = (response) => ({
    type: ADD_NEW_TASK,
    payload: {
        task: response.firstName,
        id: response.id,
        loader: false,
    },
});

export const load = () => ({
    type: LOAD,
    payload: {
        loader: true,
    },
});

export const cancelTask = () => ({
    type: CANCEL_TASK,
    payload: {
        modalTaskInput: false,
    },
});

export const makeTaskDone = (newList) => ({
    type: MAKE_TASK_DONE,
    payload: {
        list: newList,
    },
});

export const editTask = (currentTask, id) => ({
    type: EDIT_TASK,
    payload: {
        id,
        task: currentTask.task,
        modalTaskInput: true,
    },
});

export const updateTask = (newList) => ({
    type: UPDATE_TASK,
    payload: {
        list: newList,
    },
});

export const deleteTask = (newList) => ({
    type: DELETE_TASK,
    payload: {
        list: newList,
    },
});
