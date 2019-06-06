import React from 'react';
import Plot from 'react-plotly.js';
import { API_HOST} from '../../config.json';
import { connect } from 'react-redux';
import { setUser, setLayout, setError, setData, setRevision, setExercises} from '../../action/actionExerciseGraph'


class ExerciseGraph extends React.Component {
  constructor(props){
    super(props);
    

    this.state = {
      user: null,
      error: '',
      layout: {
        xaxis : {'title': 'Etudiants'},
        yaxis : {'title': 'Score (%)'},
        title : "Comparaison de votre score avec les autres étudiants",
        datarevision: 0,
      },
      revision: 0,
      exercises: null,
      data : [
        {type: 'bar', x: [], y: [],
       name : "Exercices",
       marker : {'color' : []}
       },
      ]
    };
  }

    componentWillMount() {
      this.getUser()
      this.refreshGraphic();
      setInterval(() => {
        this.refreshGraphic()
      }, 1000);
    } 


      async getUser() {
        const response = await fetch(API_HOST + '/user/' + this.props.match.params.idUser, 
        {
          method: 'GET'
      })
      if (response.ok){
      
        const body = await response.json()
        this.props.dispatchSetUser(body);
      }
      else {
        this.props.dispatchSetError(" Pas d'étudiant trouvé.");
      }
      }

    getBarColor(mark) {
      var red = 0;
      var green = 0;
      if (mark <10){
        red = 255;
        green = mark * 25.5;
      }
      else{
        green = 255;
        red = 255 - (mark-10)*25.5;
      }
      return 'rgba(' + red + ',' + green + ',0,1)'
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
        this.props.dispatchSetData([
          {type: 'bar', x: [], y: [],
         name : "Exercice ",
         marker : {'color' : []}
         },
        ]);
        var data = this.props.data;
        this.props.exercises.forEach(e => {
          if (e.user_id ===  this.props.user.user_id){
            var index = data[0].x.indexOf("Vous");
            if (index === -1){
              data[0].x.push("Vous");
              data[0].y.push(e.mark*5);
              data[0].marker['color'].push(this.getBarColor(e.mark))
            }
            else{
              data[0].y[index] = e.mark*5;
              data[0].marker['color'][index] = (this.getBarColor(e.mark))
            }
          }
          else{
            index = this.props.data[0].x.indexOf("Elève " + e.user_id);
          
            if (index === -1){
              if (e.user_id ===  this.props.user.user_id){
                data[0].x.push("Vous");
              }
              else {
                data[0].x.push("Elève " + e.user_id);
              }
              
              data[0].y.push(e.mark*5);
              data[0].marker['color'].push(this.getBarColor(e.mark))
            }
            else{
              data[0].y[index] = e.mark*5;
              data[0].marker['color'][index] = (this.getBarColor(e.mark))
            }
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
        user : state.ExerciseGraph.user,
        error : state.ExerciseGraph.error,
        data : state.ExerciseGraph.data,
        revision : state.ExerciseGraph.revision,
        exercises : state.ExerciseGraph.exercises,
        layout : state.ExerciseGraph.layout
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

export default connect(mapStateToProps, mapDispatchToProps)(ExerciseGraph);