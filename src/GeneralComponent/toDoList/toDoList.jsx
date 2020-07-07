import React from 'react';
import { connect } from 'react-redux';
import { getTasks } from './actions;';

class ToDoList extends React.Component {
    componentDidMount() {
        fetch('https://budget-eb326.web.app/api/v1/contacts')
            .then((response) => response.json())
            .then((response) => {
                this.props.dispatch(getTasks(response));
            });
    }

    openModalInput = () => {
        this.props.dispatch({
            type: OPEN_MODAL_INPUT,
            payload: {
                modalTaskInput: true,
            },
        });
    };

    onChangeTask = (event) => {
        let newTask = event.target.value;
        this.props.dispatch({
            type: GET_NEW_TASK,
            payload: {
                task: newTask,
            },
        });
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

        console.log('addtask1');

        const promise = fetch(
            'https://budget-eb326.web.app/api/v1/contacts',
            params
        )
            .then((response) => response.json())
            .then((response) => {
                console.log(response);
                this.props.dispatch({
                    type: ADD_NEW_TASK,
                    payload: {
                        task: response.firstName,
                        id: response.id,
                        loader: false,
                    },
                });
                console.log('addtask2');
            });
        console.log(promise);
        this.props.dispatch({
            type: LOAD,
            payload: {
                loader: true,
            },
        });
    };

    cancelTask = () => {
        this.props.dispatch({
            type: CANCEL_TASK,
            payload: {
                modalTaskInput: false,
            },
        });
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

        this.props.dispatch({
            type: MAKE_TASK_DONE,
            payload: {
                list: newList,
            },
        });
    };

    editTask = (id) => {
        const { list } = this.props;

        const currentTask = list.find((task) => task.id === id);
        console.log(currentTask);

        this.props.dispatch({
            type: EDIT_TASK,
            payload: {
                id,
                task: currentTask.task,
                modalTaskInput: true,
            },
        });
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

                this.props.dispatch({
                    type: UPDATE_TASK,
                    payload: {
                        list: newList,
                    },
                });
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

                this.props.dispatch({
                    type: DELETE_TASK,
                    payload: {
                        list: newList,
                    },
                });
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

        console.log(editedTask);

        return (
            <div>
                {loader && (
                    <div class="loadIcon">
                        <img src="https://icon-library.com/images/load-icon-gif/load-icon-gif-5.jpg" />
                    </div>
                )}
                <table>
                    <tbody>
                        {list.map((value) => {
                            return (
                                <tr key={value.id}>
                                    <td>
                                        <input
                                            onChange={this.makeTaskDone}
                                            type="checkbox"
                                            checked={value.isFinished}
                                            id={value.id}
                                        />
                                    </td>
                                    <td
                                        style={{
                                            textDecoration: value.isFinished
                                                ? 'line-through'
                                                : 'none',
                                        }}
                                    >
                                        {value.task}
                                    </td>
                                    <td>
                                        <button
                                            onClick={() =>
                                                this.editTask(value.id)
                                            }
                                        >
                                            edit
                                        </button>
                                    </td>
                                    <td>
                                        <button
                                            onClick={() =>
                                                this.deleteTask(value.id)
                                            }
                                        >
                                            X
                                        </button>
                                    </td>
                                </tr>
                            );
                        })}
                        <tr>
                            <td>
                                <input
                                    onClick={this.openModalInput}
                                    type="button"
                                    value="+"
                                />
                            </td>
                            <td>
                                {modalTaskInput && (
                                    <React.Fragment>
                                        <input
                                            onChange={this.onChangeTask}
                                            value={task}
                                            type="text"
                                            placeholder="Add task"
                                        ></input>
                                        <input
                                            onClick={
                                                editedTask
                                                    ? this.updateTask
                                                    : this.addTask
                                            }
                                            type="button"
                                            value="send"
                                        ></input>
                                        <input
                                            onClick={this.cancelTask}
                                            type="button"
                                            value="cancel"
                                        ></input>
                                    </React.Fragment>
                                )}
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        );
    }
}

const mapStateToProps = (store) => {
    return {
        list: store.list,
        task: store.task,
        modalTaskInput: store.modalTaskInput,
        isFinished: store.isFinished,
        editedTask: store.editedTask,
        loader: store.loader,
    };
};

export default connect(mapStateToProps)(ToDoList);
