import React from 'react';
import Plot from 'react-plotly.js';
import { Button } from 'reactstrap';
import { API_HOST} from '../../config.json';

class UserGraph extends React.Component {
  constructor(){
    super();
    

    this.state = {
      user: null,
      error: '',
      mode: 0,
      layout: {
        xaxis : {'type': 'category'},
        title:"Vos résultats d'exercices",
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
      this.refreshGraphic();
      setInterval(this.refreshGraphic(), 1000);
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
      const url = API_HOST + '/user/rendus/' + this.props.match.params.id;    
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
      this.setState({data :[
        {type: 'bar', x: [], y: [],
       name : "Exercices",
       marker : {'color' : []}
       },
      ] })
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
        var layout = this.state.layout;
        layout.title = "Vos résultats d'exercices"
        this.setState({layout : layout});
        this.setState({data : data});
      }

      async getExercisesNumber() {
        
        this.setState({data :[
          {type: 'bar', x: [], y: [],
         name : "Exercices",
         marker : {'color' : []}
         },
        ] })
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
        var layout = this.state.layout;
        layout.title = "Vos nombres de tentatives à chaque exercice"
        this.setState({layout : layout});
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
             <div id="PlotGraph">
              <Plot
               data={this.state.data}
               layout={this.state.layout}
               revision={this.state.revision}
               graphDiv="graph"
             />
             </div>
             <Button onClick={this.handleIntrospection} variant="primary">Introspection</Button>{' '}
             <span className="error">{this.state.error}</span>
           </div>
         );
      }
    }
export default UserGraph; 