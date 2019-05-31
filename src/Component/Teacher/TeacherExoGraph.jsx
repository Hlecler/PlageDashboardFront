import React from 'react';
import Plot from 'react-plotly.js';
import { API_HOST} from '../../config.json';

class TeacherExoGraph extends React.Component {
  constructor(){
    super();
    

    this.state = {
      user: null,
      error: '',
      mode: 1,
      layout: {
        title : "Scores des étudiants à l'exercice",
        datarevision: 0,
      },
      revision: 0,
      exercises: null,
      data : [{
        values: [0, 0, 0, 0],
        labels: ['0-25%', '>25-50%', '>50-75%', '>75-100%'],
        type: 'pie'
      }]
    };
  }

    componentDidMount() {
      this.refreshGraphic();
      setInterval(this.getExercises(), 1000);
    } 

    async getExercises(){
      const response = await fetch(API_HOST + '/exercises/rendus/' + this.props.match.params.idExercise, 
        {
          method: 'GET'
      })
      if (response.ok){
        const body = await response.json();
        this.setState({exercises : body});
      }
      else {
        this.setState({error : " Pas d'exercices trouvés"});
      }
    }
    
    async getExercisesValue(){
      this.setState({data:[{
        values: [0, 0, 0, 0],
        labels: ['0-25%', '>25-50%', '>50-75%', '>75-100%'],
        type: 'pie'
      }] });
        await this.getExercises();
        var data = this.state.data;
        var users = [];
        var usersScores = [];
        this.state.exercises.forEach(e => {
            var index = users.indexOf(e.user_id);
          
            if (index === -1){
                users.push(e.user_id);
              
                usersScores.push(e.mark);
            }
            else{
              usersScores[index] = e.mark;
            }
        })
        users.forEach(user => {
            var userScore = usersScores.shift();
            switch (true) {
                case (userScore*5 <= 25):
                    data[0].values[0] += 1;
                    break;
                case (userScore*5 <= 50):
                    data[0].values[1] +=1;
                    break;
                case (userScore*5 <= 75):
                    data[0].values[2] +=1;
                    break;
                default :
                    data[0].values[3] +=1;
                    break;
            }
        })
        this.setState({data : data});
      }

      
      async refreshGraphic  () {
        await this.getExercisesValue();
        this.setState({ revision: this.state.revision + 1 });
        this.state.layout.datarevision += 1;

        
      }


      render() {
        this.data = React.createRef()
         return (
           <div>
             <h3>{"Comparaison sur l'exercice n°" + this.props.match.params.idExercise}</h3>
             <div id="PlotGraph">
              <Plot
               data={this.state.data}
               layout={this.state.layout}
               revision={this.state.revision}
               graphDiv="graph"
             />
             </div>
             <span className="error">{this.state.error}</span>
           </div>
         );
      }
    }
export default TeacherExoGraph;