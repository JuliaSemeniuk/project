import React from 'react';
import './App.css';
import {Route} from 'react-router-dom'
import First from './GeneralComponent/01_first'
import Second from './GeneralComponent/02_second'

function App() {
  return (
    <div className="App">
      <div>
        <nav>
            <a href='/'>home</a> |&nbsp;
            <a href='/first'>first</a> |&nbsp;
            <a href='/second'>second</a>
        </nav>
      </div>
      <hr/>
    
      <Route path="/" exact render={() => <div>Hello, I'm home page. Please, choose first or second page</div>}/>
      <Route path="/first" exact render={() => <First/>}/> {/*localhost:3000/, параметр exact вказує на те, компонет необхідно рендерити в тому випадку, ящо він повістю співпадає з вузлом*/}
      <Route path="/second" exact render={() => <Second/>}/>
         
    </div>
  );
}

export default App;
