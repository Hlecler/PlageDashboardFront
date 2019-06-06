import React from 'react';
import Plot from 'react-plotly.js';
import { Button } from 'reactstrap';
import { API_HOST} from '../../config.json';
import { connect } from 'react-redux';
import { setUser, setMode, setLayout, setError, setData, setRevision, setExercises} from '../../action/actionUserGraph'

class UserGraph extends React.Component {
  constructor(props){
    super(props);
    

    this.state = {};
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
        this.props.dispatchSetUser(body);
      }
      else {
        this.props.dispatchSetError(this.props.error + " Pas d'utilisateur trouvé.")
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
        this.props.dispatchSetExercises(body);
      }
      else {
        this.props.dispatchSetError(this.props.error + " Pas d'exercices trouvés. ");
      }
    }
    
    async getExercisesValue(){
      this.props.dispatchSetData([
        {type: 'bar', x: [], y: [],
       name : "Exercices",
       marker : {'color' : []}
       },
      ])
        await this.getExercises();
        var data = this.props.data;
        this.props.exercises.forEach(e => {
          var index = this.props.data[0].x.indexOf("Exercice " + e.ex_id);
          
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

        var layout = this.props.layout;
        layout.title = "Vos résultats d'exercices"
        layout.yaxis = { 'title' : "Score (%)"}
        this.props.dispatchSetLayout(layout);
        this.props.dispatchSetData(data);
      }

      async getExercisesNumber() {
        this.props.dispatchSetData([
          {type: 'bar', x: [], y: [],
         name : "Exercices",
         marker : {'color' : []}
         },
        ])
        await this.getExercises();
        var data = this.props.data;
        this.props.exercises.forEach(e => {
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
        this.props.dispatchSetData(data);
        var layout = this.props.layout;
        layout.title = "Vos nombres de tentatives à chaque exercice"
        layout.yaxis = { 'title' : "Nombre de tentatives"}
        this.props.dispatchSetLayout(layout);
      }
      
      async refreshGraphic  () {
        if (this.props.mode === 0){
          await this.getExercisesValue();
          this.props.dispatchSetRevision(this.props.revision+1);
          this.props.layout.datarevision += 1;
        }
        else {
          await this.getExercisesNumber();
          this.props.dispatchSetRevision(this.props.revision+1);
          this.props.layout.datarevision += 1;
        }  
      }

      
  handleIntrospection = async e => 
  {
    e.preventDefault();
    if (this.props.mode === 0){
        
      this.props.dispatchSetMode(1);
      this.setState({ mode : 1}, function(){
        this.refreshGraphic();
      })
    }
    else {
      this.props.dispatchSetMode(0)
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
               data={this.props.data}
               layout={this.props.layout}
               revision={this.props.revision}
               graphDiv="graph"
             />
             </div>
             <Button onClick={this.handleIntrospection} variant="primary">Introspection</Button>{' '}
             <span className="error">{this.props.error}</span>
           </div>
         );
      }


      
    }

    const mapStateToProps = (state, props) => {
      return {
        user : state.UserGraph.user,
        mode : state.UserGraph.mode,
        error : state.UserGraph.error,
        data : state.UserGraph.data,
        revision : state.UserGraph.revision,
        exercises : state.UserGraph.exercises,
        layout : state.UserGraph.layout
      }

    };


    const mapDispatchToProps = (dispatch, props) => ({
      dispatchSetUser: (user) => dispatch(setUser(user)),
      dispatchSetMode: (mode) => dispatch(setMode(mode)),
      dispatchSetError: (error) => dispatch(setError(error)),
      dispatchSetData: (data) => dispatch(setData(data)),
      dispatchSetRevision: (revision) => dispatch(setRevision(revision)),
      dispatchSetExercises: (exercises) => dispatch(setExercises(exercises)),
      dispatchSetLayout: (layout) => dispatch(setLayout(layout))
    });
export default connect(mapStateToProps, mapDispatchToProps)(UserGraph); 