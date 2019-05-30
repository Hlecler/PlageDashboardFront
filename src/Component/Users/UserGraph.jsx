import React from 'react';
import Plot from 'react-plotly.js';
import { Button } from 'reactstrap';
import { API_HOST} from '../../config.json';
import axios from 'axios';
class UserGraph extends React.Component {
  constructor(){
    super();
    
    const client = axios.create({
      baseURL : API_HOST
    })

    this.state = {
      user: null,
      error: '',
      mode: 1,
      line1: {
        x: [-3, -2, -1],
        y: [1, 2, 3],
        name: 'Line 1'
      },
      line2: {
        x: [1, 2, 3],
        y: [-3, -2, -1],
        name: 'Line 2'
      }, 
      layout: {
        xaxis : {'type': 'category'},
        title:'Exercices',
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
      this.getUser();
      this.getExercises();
      this.refreshGraphic();
      setInterval(this.getExercises(), 1000);
    } 


      async getUser() {
        const response = await fetch(API_HOST + '/user/' + this.props.match.params.id, 
        {
          method: 'GET'
      })
      if (response.ok){
      
        const body = await response.json()
        this.state.user = body;
      }
      else {
        this.state.error += " Pas d'utilisateur trouvé."
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
      const url = '/user/rendus/' + this.props.match.params.id;
      /*
      fetch(url, {
        method: 'GET',
        headers: {
          Accept: 'application/json',
        }
      }).then((response) => {
        if (response.ok) {
          response.json().then(json => {
            this.setState({exercises : json});
          });
        }
      }).catch(error => { this.setState({error : "TEST"})});
      
     this.setState({error : url})
    */
    
      const response = await fetch(url, 
        {
          method: 'GET',
      })
      if (response.ok){
        
        const body = await response.json();
        this.setState({exercises : body})
      }
      else {
        this.setState({error : " Pas d'exercices trouvés. "});
      }
    }
    
    async getExercisesValue(){
      this.state.data = [
        {type: 'bar', x: [], y: [],
       name : "Exercices",
       marker : {'color' : []}
       },
      ]
        await this.getExercises();
        var data = this.state.data;
        this.state.exercises.forEach(e => {
          var index = this.state.data[0].x.indexOf("Exercice " + e.ex_id);
          
          if (index === -1){
            
            data[0].x.push("Exercice " + e.ex_id);
            data[0].y.push(e.mark*5);
            data[0].marker['color'].push(this.getBarColor(e.mark))
          }
          else{
            data[0].y[index] = e.mark*5;
            data[0].marker['color'][index] = (this.getBarColor(e.mark))
          }
          
        })
        this.setState({data : data});
      }

      async getExercisesNumber() {
        this.state.data = [
          {type: 'bar', x: [], y: [],
         name : "Exercices",
         marker : {'color' : []}
         },
        ]
        await this.getExercises();
        var data = this.state.data;
        this.state.exercises.forEach(e => {
          var index = data[0].x.indexOf("Exercice " + e.ex_id);
          if (index === -1){
            data[0].x.push("Exercice " + e.ex_id);
            data[0].y.push(1);
            data[0].marker['color'].push(this.getBarColor(e.mark))
          }
          else{
            data[0].y[index] +=1
            data[0].marker['color'][index] = (this.getBarColor(e.mark))
          }
        })
        this.setState({data : data});
      }
      
      async refreshGraphic  () {
        if (this.state.mode === 0){
          await this.getExercisesValue();
          this.setState({ revision: this.state.revision + 1 });
          this.state.layout.datarevision += 1;
        }
        else {
          await this.getExercisesNumber();
          this.setState({ revision: this.state.revision + 1 });
          this.state.layout.datarevision += 1;
        }

        
      }

      
  handleIntrospection = async e => 
  {
    e.preventDefault();
    if (this.state.mode === 0){
      this.setState({ mode : 1}, function(){
        this.refreshGraphic();
      })
    }
    else {
      this.setState({ mode : 0}, function(){
        this.refreshGraphic();
      })
    }
    
  };

      render() {
        this.data = React.createRef()
         return (
           <div>
             <Button onClick={this.handleIntrospection} color="primary">Introspection</Button>{' '}
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
export default UserGraph;