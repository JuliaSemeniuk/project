import React from 'react';
import './App.css';
import { Route } from 'react-router-dom';
import APIDataContainer from './GeneralComponent/APIData/APIDataContainer';
import ToDoListContainer from './GeneralComponent/ToDoList/ToDoListContainer';
import 'antd/dist/antd.css';

function App() {
    console.log('app js render: ');
    return (
        <div className="App">
            <div>
                <nav>
                    <a href="/">home</a> |&nbsp;
                    <a href="/APIData">API Data</a> |&nbsp;
                    <a href="/toDoList">To Do List</a>
                </nav>
            </div>
            <hr />
            <Route
                path="/"
                exact
                render={() => <div>Hello, I'm home page</div>}
            />
            <Route path="/APIData" exact render={() => <APIDataContainer />} />{' '}
            {/*localhost:3000/, параметр exact вказує на те, компонет необхідно рендерити в тому випадку, ящо він повістю співпадає з вузлом*/}
            <Route
                path="/toDoList"
                exact
                render={() => <ToDoListContainer />}
            />
        </div>
    );
}

export default App;
