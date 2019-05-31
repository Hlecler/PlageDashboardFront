import React from 'react';
import Plot from 'react-plotly.js';
import { API_HOST} from '../../config.json';


class LogGraph extends React.Component {
  constructor(){
    super();
    

    this.state = {
      user: null,
      error: '',
      layout: {
        xaxis : {'type': 'category'},
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

    componentDidMount() {
      this.getUser().then(
      this.refreshGraphic());
      setInterval(this.refreshGraphic(), 100);
    } 


      async getUser() {
        const response = await fetch(API_HOST + '/user/' + this.props.match.params.idUser, 
        {
          method: 'GET'
      })
      if (response.ok){
      
        const body = await response.json()
        this.setState({user : body});
      }
      else {
        this.setState({error : " Pas d'étudiant trouvé."});
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
        this.setState({exercises : body});
      }
      else {
        this.setState({error : " Pas d'exercices trouvés"});
      }
    }
    
    async getExercisesValue(){
      this.setState({data : [
        {type: 'bar', x: [], y: [],
       name : "Exercice ",
       marker : {'color' : []}
       },
      ]});
        await this.getExercises();
        var data = this.state.data;
        this.state.exercises.forEach(e => {
          if (e.user_id ===  this.state.user.user_id){
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
            index = this.state.data[0].x.indexOf("Elève " + e.user_id);
          
            if (index === -1){
              if (e.user_id ===  this.state.user.user_id){
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
export default LogGraph;