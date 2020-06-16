import React from 'react'
import { connect } from 'react-redux'

class ToDoList extends React.Component {

    componentDidMount () {
        fetch('https://budget-eb326.web.app/api/v1/contacts').
        then(response => response.json()).
        then(response => {
            this.props.dispatch({type: 'TO_DO_LIST/GET_TASKS', payload: {
                list: response.map(value => ({
                    task: value.firstName,
                    id: value.id,
                    isFinished: false,
                }))
            }})
        })
    };
    
    openModalInput = () => {
        this.props.dispatch({type: 'TO_DO_LIST/OPEN_MODAL_INPUT', payload: {
            modalTaskInput: true,
        }})
    };

    onChangeTask = (event) => {
        let newTask = event.target.value;
        this.props.dispatch({type: 'TO_DO_LIST/GET_NEW_TASK', payload: {
            task: newTask,
        }})
    };

    addTask = () => {
        fetch('https://budget-eb326.web.app/api/v1/contacts', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            mode: 'cors',
            body: JSON.stringify({
                firstName: this.props.task,
                lastName: this.props.task,
                email: this.props.task,
            })
        }).then(response => response.json()).then(response => {
            console.log(response);
            const newList = this.props.list.slice();
            newList.push({ task: response.firstName });
            this.props.dispatch({type: 'TO_DO_LIST/ADD_NEW_TASK', payload: {
                list: newList,
                modalTaskInput: false,
            }})
        })
    };

    cancelTask = () => {
        this.props.dispatch({type: 'TO_DO_LIST/CANCEL_TASK', payload: {
            modalTaskInput: false,
        }})
    };

    makeTaskDone = (event) => {
        const { list } = this.props;
        const taskIndex = this.props.list.findIndex(task => task.id === event.target.id);

        const newList = list.slice();

        newList[taskIndex] = {
            id: newList[taskIndex].id,
            task: newList[taskIndex].task,
            isFinished: !newList[taskIndex].isFinished,
        }

        this.props.dispatch({type: 'TO_DO_LIST/MAKE_TASK_DONE', payload: {
           list: newList,
        }})
    }


    render () {

        const { list, task, modalTaskInput, isFinished, id } = this.props;

        return (
            <div>
                <table>
                    {list.map(value => {
                        console.log('value', value)
                        return (
                            <React.Fragment>
                                <tr>
                                    <td>
                                        <input onChange={this.makeTaskDone} type='checkbox' checked={value.isFinished} id={value.id}/>
                                    </td>
                                    <td style={{textDecoration: value.isFinished ? 'line-through' : 'none'}}>
                                        {value.task}
                                    </td>
                                </tr>
                            </React.Fragment>
                        )                       
                    })}
                    <tr>
                        <td>
                            <input onClick={this.openModalInput} type='button' value='+'/>
                        </td>
                        <td>
                            {modalTaskInput && <React.Fragment>
                                <input onChange={this.onChangeTask} value={task} type='text' placeholder='Add task'></input>
                                <input onClick={this.addTask} type='button' value='add'></input>
                                <input onClick={this.cancelTask} type='button' value='cancel'></input>
                                </React.Fragment>
                            } 
                        </td> 
                    </tr>
                </table>                         
            </div>
        )
    };
};

const mapStateToProps = (store) => {
    return {
        list: store.list,
        task: store.task,
        modalTaskInput: store.modalTaskInput,
        isFinished: store.isFinished,
    };
};

export default connect(mapStateToProps)(ToDoList);