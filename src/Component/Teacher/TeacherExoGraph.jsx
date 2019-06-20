import React from 'react';
import Plot from 'react-plotly.js';
import { API_HOST} from '../../config.json';
import { connect } from 'react-redux';
import { setUser, setLayout, setError, setData, setRevision, setExercises} from '../../action/actionTeacherExoGraph';

class TeacherExoGraph extends React.Component {
  constructor(){
    super();
    

    this.state = {};
  }

    componentWillMount() {
      this.refreshGraphic();
      setInterval(() => {
        this.refreshGraphic()
      }, 1000);
    } 

    async getExercises(){
      const response = await fetch(API_HOST + '/exercises/rendus/' + this.props.match.params.idExercise, 
        {
          method: 'GET'
      })
      if (response.ok){
        const body = await response.json();
        var arr1 = JSON.stringify(body);
        var arr2 = JSON.stringify(this.props.exercises);
        if (arr1 === arr2) {
          return 0;
        }
        else {
          this.props.dispatchSetExercises(body);
          return 1;
        }
      }
      else {
        this.props.dispatchSetError("Pas d'exercices trouvés");
      }
    }
    
    async getExercisesValue(){
        var check = await this.getExercises();
        if (check === 0){
          return;
        }
        this.props.dispatchSetData([{
          values: [0, 0, 0, 0],
          labels: ['0-25%', '>25-50%', '>50-75%', '>75-100%'],
          type: 'pie',
          marker: {
            colors: ['rgb(230, 0, 0)', 'rgb(255, 120, 0)', 'rgb(230, 255, 0)', 'rgb(0, 220, 0)']
          }
        }])
        var data = this.props.data;
        var users = [];
        var usersScores = [];
        this.props.exercises.forEach(e => {
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
        this.props.dispatchSetData(data);
      }

      
      async refreshGraphic  () {
        await this.getExercisesValue();
        this.props.dispatchSetRevision(this.props.revision +1);
        this.props.layout.datarevision += 1;

        
      }


      render() {
        this.data = React.createRef()
         return (
           <div>
             <h3>{"Comparaison sur l'exercice n°" + this.props.match.params.idExercise}</h3>
             <div id="PlotGraph">
              <Plot
               data={this.props.data}
               layout={this.props.layout}
               revision={this.props.revision}
               graphDiv="graph"
             />
             </div>
             <span className="error">{this.props.error}</span>
           </div>
         );
      }
    }
    const mapStateToProps = (state, props) => {
      return {
        user : state.TeacherExoGraph.user,
        error : state.TeacherExoGraph.error,
        data : state.TeacherExoGraph.data,
        revision : state.TeacherExoGraph.revision,
        exercises : state.TeacherExoGraph.exercises,
        layout : state.TeacherExoGraph.layout
      }

    };


    const mapDispatchToProps = (dispatch, props) => ({
      dispatchSetUser: (user) => dispatch(setUser(user)),
      dispatchSetError: (error) => dispatch(setError(error)),
      dispatchSetData: (data) => dispatch(setData(data)),
      dispatchSetRevision: (revision) => dispatch(setRevision(revision)),
      dispatchSetExercises: (exercises) => dispatch(setExercises(exercises)),
      dispatchSetLayout: (layout) => dispatch(setLayout(layout))
    });

export default connect(mapStateToProps, mapDispatchToProps)(TeacherExoGraph);