import React from 'react';
import { Button } from 'antd';
import { Input } from 'antd';
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
                                        <Button
                                            onClick={() => editTask(value.id)}
                                        >
                                            edit
                                        </Button>
                                    </td>
                                    <td>
                                        <Button
                                            type="text"
                                            danger
                                            onClick={() => deleteTask(value.id)}
                                        >
                                            x
                                        </Button>
                                    </td>
                                </tr>
                            );
                        })}
                        <tr>
                            <td>
                                <Button
                                    type="primary"
                                    shape="circle"
                                    onClick={openModalInput}
                                >
                                    +
                                </Button>
                            </td>
                            <td>
                                {modalTaskInput && (
                                    <React.Fragment>
                                        <Input
                                            placeholder="Add task"
                                            onChange={onChangeTask}
                                            value={task}
                                        />

                                        <Button
                                            onClick={
                                                editedTask
                                                    ? updateTask
                                                    : addTask
                                            }
                                        >
                                            send
                                        </Button>
                                        <Button danger onClick={cancelTask}>
                                            cancel
                                        </Button>
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
