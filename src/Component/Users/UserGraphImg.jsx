
import React from 'react';
import UserGraph from './UserGraph' ;
import domtoimage from 'dom-to-image';
import { saveAs } from 'file-saver';
import {Button} from 'reactstrap';
import { API_HOST} from '../../config.json';
import { Link } from 'react-router-dom';
class UserGraphImg extends React.Component {
    constructor(){
        super();
        
        this.state = {
            exercises: []
        }
    }

    async saveImage() {
        domtoimage.toBlob(document.getElementById("PlotGraph"))
        .then(function (blob) {
            saveAs(blob, 'Exercices.png');
        });
    }

    componentDidMount() {
        this.getExercises()
      } 

      async getExercises(){
        const url = API_HOST + '/user/rendus/' + this.props.match.params.id;    
        const response = await fetch(url, 
          {
            method: 'GET',
        })
        if (response.ok){
          
          const body = await response.json();
          var exercises = []
          body.forEach(ex => {
            exercises.push(ex.ex_id)
          })

          var exercicesCleaned = [];
          exercises.forEach(exercice => {
            var index = exercicesCleaned.indexOf(exercice);
            if (index === -1) {
                exercicesCleaned.push(exercice)
            }
          })
          this.setState({exercises : exercicesCleaned})
        }
        else {
          this.setState({error : " Pas d'exercices trouvés. "});
        }
      }
    
    render() 
    {
        return (
           <div>
              <UserGraph {...this.props} />
              <Button onClick={this.saveImage} color="primary">Sauvegarder</Button>{' '}
              
              <h3>Comparatif par rapport aux autres étudiants : </h3>
              <ul>

              {this.state.exercises.map((exercice => (
                  <Link to={'/graph/image/exercice/' + this.props.match.params.id + '/' + exercice}> <li>Exercice {exercice}</li></Link>
              )))}
              </ul>
           </div>
        );
    }
}
export default UserGraphImg;