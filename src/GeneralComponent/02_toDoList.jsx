import React from 'react'
import { connect } from 'react-redux'

class ToDoList extends React.Component {

    componentDidMount () {

    }


    render () {

        const { list, task } = this.props;

        return (
            <div>               
                   {list.map(value => {
                       return (
                            <React.Fragment><input type='checkbox'/>{value.task}<br/></React.Fragment>
                       )                       
                   })}
                            
                        
                        
                    
                    <input type='button' value='+'/>Add task                           
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