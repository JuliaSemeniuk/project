import React from 'react';

export default class ToDoList extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        const {
            list,
            task,
            modalTaskInput,
            isFinished,
            id,
            editedTask,
            loader,
            deleteTask,
            updateTask,
            editTask,
            makeTaskDone,
            cancelTask,
            addTask,
            onChangeTask,
            openModalInput,
        } = this.props;

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
                                            onChange={makeTaskDone}
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
                                            onClick={() => editTask(value.id)}
                                        >
                                            edit
                                        </button>
                                    </td>
                                    <td>
                                        <button
                                            onClick={() => deleteTask(value.id)}
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
                                    onClick={openModalInput}
                                    type="button"
                                    value="+"
                                />
                            </td>
                            <td>
                                {modalTaskInput && (
                                    <React.Fragment>
                                        <input
                                            onChange={onChangeTask}
                                            value={task}
                                            type="text"
                                            placeholder="Add task"
                                        ></input>
                                        <input
                                            onClick={
                                                editedTask
                                                    ? updateTask
                                                    : addTask
                                            }
                                            type="button"
                                            value="send"
                                        ></input>
                                        <input
                                            onClick={cancelTask}
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
