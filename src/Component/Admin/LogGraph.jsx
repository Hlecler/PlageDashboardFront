import React from 'react';
import Plot from 'react-plotly.js';
import { API_HOST} from '../../config.json';
import { connect } from 'react-redux';
import { setUser, setLayout, setError, setData, setRevision, setLogs} from '../../action/actionLogGraph'


class LogGraph extends React.Component {
  constructor(){
    super();
    

    this.state = {
    };
  }

    componentWillMount() {
      this.refreshGraphic()
      setInterval(() => {
        this.refreshGraphic()
      }, 1000);
    } 


    async getLogs(){
      const response = await fetch(API_HOST + '/logs', 
        {
          method: 'GET'
      })
      if (response.ok){
        const body = await response.json();
        var arr1 = JSON.stringify(body);
        var arr2 = JSON.stringify(this.props.logs);
        if (arr1 === arr2) {
          return 0;
        }
        else {
          this.props.dispatchSetLogs(body);
          return 1;
        }
      }
      else {
        this.props.dispatchSetError("Pas de logs trouvés");
      }
    }
    
    async getLogsNumber(){
        var check = await this.getLogs();
        if (check === 0){
          return;
        }
        this.props.dispatchSetData([
          {type: 'bar', x: [], y: [],
         name : "Logs ",
         marker : {'color' : []}
         },
        ]);
        var data = this.props.data;
        this.props.logs.forEach(l => {
            var index = this.props.data[0].x.indexOf(l.consult_date);
            if (index === -1){
              data[0].x.push(l.consult_date);
              data[0].y.push(1);
              data[0].marker['color'].push('rgba(0,0,1,1)')
            }
            else{
              data[0].y[index] += 1;
            }
        })
        this.props.dispatchSetData(data);
      }

      
      async refreshGraphic  () {
        await this.getLogsNumber();
        this.props.dispatchSetRevision(this.props.revision +1);
        this.props.layout.datarevision += 1;
      }


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
             <span className="error">{this.props.error}</span>
           </div>
         );
      }
    }

    const mapStateToProps = (state, props) => {
      return {
        user : state.LogGraph.user,
        error : state.LogGraph.error,
        data : state.LogGraph.data,
        revision : state.LogGraph.revision,
        logs : state.LogGraph.logs,
        layout : state.LogGraph.layout
      }

    };


    const mapDispatchToProps = (dispatch, props) => ({
      dispatchSetUser: (user) => dispatch(setUser(user)),
      dispatchSetError: (error) => dispatch(setError(error)),
      dispatchSetData: (data) => dispatch(setData(data)),
      dispatchSetRevision: (revision) => dispatch(setRevision(revision)),
      dispatchSetLogs: (logs) => dispatch(setLogs(logs)),
      dispatchSetLayout: (layout) => dispatch(setLayout(layout))
    });

export default connect(mapStateToProps, mapDispatchToProps)(LogGraph);