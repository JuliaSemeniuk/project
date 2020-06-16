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
                }))
            }})
        })
    };
    
    openModalInput = () => {
        this.props.dispatch({type: 'TO_DO_LIST/OPEN_MODAL_INPUT', payload: {
            modalTaskInput: true,
        }})
    }


    render () {

        const { list, task, modalTaskInput } = this.props;

        return (
            <div>
                <table>
                    {list.map(value => {
                        return (
                            <React.Fragment>
                                <tr>
                                    <td>
                                        <input type='checkbox'/>
                                    </td>
                                    <td>
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
                                <input type='text' placeholder='Add task'></input>
                                <input type='button' value='add'></input>
                                <input type='button' value='cancel'></input>
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
    };
};

export default connect(mapStateToProps)(ToDoList);