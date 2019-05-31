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
        xaxis : {'title': 'Jour'},
        title : "Nombre de log par jour",
        datarevision: 0,
      },
      revision: 0,
      logs: null,
      data : [
        {type: 'bar', x: [], y: [],
       name : "Logs",
       marker : {'color' : []}
       },
      ]
    };
  }

    componentWillMount() {
      this.refreshGraphic()
      setInterval(this.refreshGraphic(), 1000);
    } 


    async getLogs(){
      const response = await fetch(API_HOST + '/logs', 
        {
          method: 'GET'
      })
      if (response.ok){
        const body = await response.json();
        this.setState({logs : body});
      }
      else {
        this.setState({error : "Pas de logs trouvés"});
      }
    }
    
    async getLogsNumber(){
      this.setState({data : [
        {type: 'bar', x: [], y: [],
       name : "Logs ",
       marker : {'color' : []}
       },
      ]});
        await this.getLogs();
        var data = this.state.data;
        this.state.logs.forEach(l => {
            var index = this.state.data[0].x.indexOf(l.consult_date);
            if (index === -1){
              data[0].x.push(l.consult_date);
              data[0].y.push(1);
              data[0].marker['color'].push('rgba(0,0,1,1)')
            }
            else{
              data[0].y[index] += 1;
            }
        })
        this.setState({data : data});
      }

      
      async refreshGraphic  () {
        await this.getLogsNumber();
        this.setState({ revision: this.state.revision + 1 });
        this.state.layout.datarevision += 1;
      }


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
             <span className="error">{this.state.error}</span>
           </div>
         );
      }
    }
export default LogGraph;