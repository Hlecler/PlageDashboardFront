
import React from 'react';
import ExerciseGraph from './ExerciseGraph' ;
import domtoimage from 'dom-to-image';
import { saveAs } from 'file-saver';
import {Button} from 'reactstrap';
class ExercicesGraphImg extends React.Component {


    async saveImage() {
        domtoimage.toBlob(document.getElementById("PlotGraph"))
        .then(function (blob) {
            saveAs(blob, 'ExerciceGraph.png');
        });
    }

    render() 
    {
        return (
           <div>
              <ExerciseGraph {...this.props} />
              <Button onClick={this.saveImage} color="primary">Sauvegarder</Button>{' '}
           </div>
        );
    }
}
export default ExercicesGraphImg;