import React from 'react';
import { connect } from 'react-redux';
import ToDoList from './ToDoList';
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

class ToDoListContainer extends React.Component {
    componentDidMount() {
        fetch('https://budget-eb326.web.app/api/v1/contacts')
            .then((response) => response.json())
            .then((response) => {
                this.props.dispatch(getTasks(response));
            });
    }

    openModalInput = () => {
        this.props.dispatch(openModalWindow());
    };

    onChangeTask = (event) => {
        let newTask = event.target.value;
        this.props.dispatch(getNewTask(newTask));
    };

    addTask = () => {
        const params = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            mode: 'cors',
            body: JSON.stringify({
                firstName: this.props.task,
                lastName: this.props.task,
                email: this.props.task,
            }),
        };

        const promise = fetch(
            'https://budget-eb326.web.app/api/v1/contacts',
            params
        )
            .then((response) => response.json())
            .then((response) => {
                console.log(response);
                this.props.dispatch(addNewTask(response));
                console.log('addtask2');
            });
        console.log(promise);
        this.props.dispatch(load());
    };

    cancelTask = () => {
        this.props.dispatch(cancelTask());
    };

    makeTaskDone = (event) => {
        const { list } = this.props;
        const taskIndex = this.props.list.findIndex(
            (task) => task.id === event.target.id
        );

        const newList = list.slice();

        newList[taskIndex] = {
            id: newList[taskIndex].id,
            task: newList[taskIndex].task,
            isFinished: !newList[taskIndex].isFinished,
        };

        this.props.dispatch(makeTaskDone(newList));
    };

    editTask = (id) => {
        const { list } = this.props;

        const currentTask = list.find((task) => task.id === id);
        console.log(currentTask);

        this.props.dispatch(editTask(currentTask, id));
    };

    updateTask = () => {
        fetch(
            'https://budget-eb326.web.app/api/v1/contacts/' +
                this.props.editedTask,
            {
                method: 'PATCH',
                headers: { 'Content-type': 'application/json' },
                mode: 'cors',
                body: JSON.stringify({
                    firstName: this.props.task, //исклчиттельный слючай под текущую API
                    lastName: '',
                    email: '',
                }),
            }
        )
            .then((response) => response.json())
            .then((response) => {
                console.log(response);
                const index = this.props.list.findIndex(
                    (task) => task.id === this.props.editedTask
                );
                const newList = this.props.list.slice();
                console.log('current task ' + index);
                newList[index] = {
                    id: this.props.editedTask,
                    task: this.props.task,
                    modalTaskInput: false,
                };

                this.props.dispatch(updateTask(newList));
            });
    };

    deleteTask = (id) => {
        fetch('https://budget-eb326.web.app/api/v1/contacts/' + id, {
            method: 'DELETE',
            mode: 'cors',
        })
            .then((response) => response.json())
            .then(() => {
                //здесь респонс не используется

                const { list } = this.props;
                const index = list.findIndex((task) => task.id === id);

                const newList = list.slice();
                newList.splice(index, 1);

                this.props.dispatch(deleteTask(newList));
            });
    };

    render() {
        const {
            list,
            task,
            modalTaskInput,
            isFinished,
            id,
            editedTask,
            loader,
        } = this.props;

        return (
            <ToDoList
                list={list}
                task={task}
                modalTaskInput={modalTaskInput}
                isFinished={isFinished}
                id={id}
                editedTask={editedTask}
                loader={loader}
                deleteTask={this.deleteTask}
                updateTask={this.updateTask}
                editTask={this.editTask}
                makeTaskDone={this.makeTaskDone}
                cancelTask={this.cancelTask}
                addTask={this.addTask}
                onChangeTask={this.onChangeTask}
                openModalInput={this.openModalInput}
            />
        );
    }
}

const mapStateToProps = (store) => {
    return {
        list: store.ToDoList.list,
        task: store.ToDoList.task,
        modalTaskInput: store.ToDoList.modalTaskInput,
        isFinished: store.ToDoList.isFinished,
        editedTask: store.ToDoList.editedTask,
        loader: store.ToDoList.loader,
    };
};

export default connect(mapStateToProps)(ToDoListContainer);
