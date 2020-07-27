import React from 'react';
import { connect } from 'react-redux';
import ToDoList from './ToDoList';
import {} from './actions';

import {
    requestTasks,
    modalWindow,
    setTaskName,
    addingTask,
    cancelingTask,
    makingTaskDone,
    editionTask,
    updatingTask,
    deletingTask,
} from './utils';

class ToDoListContainer extends React.Component {
    componentDidMount() {
        this.props.requestTasks();
    }

    openModalInput = () => {
        this.props.modalWindow();
    };

    onChangeTask = (event) => {
        this.props.setTaskName(event);
    };

    addTask = () => {
        this.props.addingTask(this.props.task);
    };

    cancelTask = () => {
        this.props.cancelingTask();
    };

    makeTaskDone = (event) => {
        this.props.makingTaskDone(event, this.props.list);
    };

    editTask = (id) => {
        this.props.editionTask(id, this.props.list);
    };

    updateTask = () => {
        this.props.updatingTask(
            this.props.editedTask,
            this.props.task,
            this.props.list
        );
    };

    deleteTask = (id) => {
        this.props.deletingTask(id, this.props.list);
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

        console.log('this.props: ', this.props);

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

const mapDispatchToProps = (dispatch) => {
    return {
        requestTasks: () => requestTasks(dispatch),
        modalWindow: () => modalWindow(dispatch),
        setTaskName: (event) => setTaskName(event, dispatch),
        addingTask: (task) => addingTask(dispatch, task),
        cancelingTask: () => cancelingTask(dispatch),
        makingTaskDone: (event, list) => makingTaskDone(event, dispatch, list),
        editionTask: (id, list) => editionTask(dispatch, id, list),
        updatingTask: (editedTask, task, list) =>
            updatingTask(dispatch, editedTask, task, list),
        deletingTask: (id, list) => deletingTask(dispatch, id, list),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ToDoListContainer);
