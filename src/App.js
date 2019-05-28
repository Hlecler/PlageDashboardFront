import React, { Component } from 'react';

// Style
import './style/App.css';
// Modules

import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import NavBar from './Component/NavBar/NavBar';
import Homepage from './Component/Homepage/Homepage';
import LoginCard from './Component/Login/LoginCard';
import LogoutCard from './Component/Login/LogoutCard';
import Home from './Component/Home/Home';
import UserGraph from './Component/Users/UserGraph';
import UserGraphImg from './Component/Users/UserGraphImg';
import ExerciseGraph from './Component/Exercises/ExerciseGraph'
import ExercisesGraphImg from './Component/Exercises/ExercisesGraphImg'

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {}
  }

  render() {
    return (
      <div>
        
      <Router>
        <div>
          
          <Route component={NavBar}/>
          <Switch>
            <Route path='/' exact component={Homepage}/>
            <Route path='/login' component={LoginCard} />
            <Route path='/logout' component={LogoutCard} />
            <Route path='/home' component={Home}/>
            
            <Route path='/user/:id' component={UserGraph}/>
            <Route path='/image/user/:id' component={UserGraphImg}/>
            
            <Route path="/exercice/:idUser/:idExercise" component={ExerciseGraph} />
            <Route path='/image/exercice/:idUser/:idExercise' component={ExercisesGraphImg}/>
            <Route path='/user/:id/exercices' component={() => { 
              window.location.href = 'https://example.com/1234';}}/>
          </Switch>
        </div>
      </Router>
      </div>
    );
  }
}

export default App;