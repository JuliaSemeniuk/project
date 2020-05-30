import React from 'react';
import './App.css';
import {Route} from 'react-router-dom'
import APIData from './GeneralComponent/01_apiData'
import Second from './GeneralComponent/02_second'

function App() {
  return (
    <div className="App">
      <div>
        <nav>
            <a href='/'>home</a> |&nbsp;
            <a href='/APIData'>API Data</a> |&nbsp;
            <a href='/second'>second</a>
        </nav>
      </div>
      <hr/>
    
      <Route path="/" exact render={() => <div>Hello, I'm home page</div>}/>
      <Route path="/APIData" exact render={() => <APIData/>}/> {/*localhost:3000/, параметр exact вказує на те, компонет необхідно рендерити в тому випадку, ящо він повістю співпадає з вузлом*/}
      <Route path="/second" exact render={() => <Second/>}/>
         
    </div>
  );
}

export default App;
