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
import TeacherExoGraph from './Component/Teacher/TeacherExoGraph';

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
            
            <Route path='/graph/user/:id' component={UserGraph}/>
            <Route path='/graph/image/user/:id' component={UserGraphImg}/>
            
            <Route path="/graph/exercice/:idUser/:idExercise" component={ExerciseGraph} />
            <Route path='/graph/image/exercice/:idUser/:idExercise' component={ExercisesGraphImg}/>

            <Route path="/graph/teacher/:idExercise" component={TeacherExoGraph} />
          </Switch>
        </div>
      </Router>
      </div>
    );
  }
}

export default App;