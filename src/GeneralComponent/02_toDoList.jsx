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


    render () {

        const { list, task } = this.props;

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
                            <input type='button' value='+'/>
                        </td>
                        <td>
                            Add task 
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
    };
};

export default connect(mapStateToProps)(ToDoList);