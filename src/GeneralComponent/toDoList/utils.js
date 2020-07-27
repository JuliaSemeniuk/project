import {
    getTasks,
    openModalWindow,
    getNewTask,
    addNewTask,
    load,
    cancelTask,
    makeTaskDone,
    editTask,
    updateTask,
    deleteTask,
} from './actions';

export const requestTasks = (dispatch) => {
    fetch('https://budget-eb326.web.app/api/v1/contacts')
        .then((response) => response.json())
        .then((response) => {
            dispatch(getTasks(response));
        });
};

export const modalWindow = (dispatch) => {
    dispatch(openModalWindow());
};

export const setTaskName = (event, dispatch) => {
    let newTask = event.target.value;
    dispatch(getNewTask(newTask));
};

export const addingTask = (dispatch, task) => {
    const params = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        mode: 'cors',
        body: JSON.stringify({
            firstName: task,
            lastName: task,
            email: task,
        }),
    };

    const promise = fetch(
        'https://budget-eb326.web.app/api/v1/contacts',
        params
    )
        .then((response) => response.json())
        .then((response) => {
            console.log(response);
            dispatch(addNewTask(response));
            console.log('addtask2');
        });
    console.log(promise);
    dispatch(load());
};

export const cancelingTask = (dispatch) => {
    dispatch(cancelTask());
};

export const makingTaskDone = (event, dispatch, list) => {
    const taskIndex = list.findIndex((task) => task.id === event.target.id);

    const newList = list.slice();

    newList[taskIndex] = {
        id: newList[taskIndex].id,
        task: newList[taskIndex].task,
        isFinished: !newList[taskIndex].isFinished,
    };

    dispatch(makeTaskDone(newList));
};

export const editionTask = (dispatch, id, list) => {
    const currentTask = list.find((task) => task.id === id);
    dispatch(editTask(currentTask, id));
};

export const updatingTask = (dispatch, editedTask, task, list) => {
    fetch('https://budget-eb326.web.app/api/v1/contacts/' + editedTask, {
        method: 'PATCH',
        headers: { 'Content-type': 'application/json' },
        mode: 'cors',
        body: JSON.stringify({
            firstName: task, //исклчиттельный слючай под текущую API
            lastName: '',
            email: '',
        }),
    })
        .then((response) => response.json())
        .then((response) => {
            console.log(response);
            const index = list.findIndex((task) => task.id === editedTask);
            const newList = list.slice();

            newList[index] = {
                id: editedTask,
                task: task,
                modalTaskInput: false,
            };

            dispatch(updateTask(newList));
        });
};

export const deletingTask = (dispatch, id, list) => {
    fetch('https://budget-eb326.web.app/api/v1/contacts/' + id, {
        method: 'DELETE',
        mode: 'cors',
    })
        .then((response) => response.json())
        .then(() => {
            //здесь респонс не используется

            const index = list.findIndex((task) => task.id === id);

            const newList = list.slice();
            newList.splice(index, 1);

            dispatch(deleteTask(newList));
        });
};
