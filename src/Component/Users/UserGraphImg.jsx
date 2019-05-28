
import React from 'react';
import UserGraph from './UserGraph' ;
import domtoimage from 'dom-to-image';
import { saveAs } from 'file-saver';
import {Button} from 'reactstrap';
class UserGraphImg extends React.Component {


    async saveImage() {
        domtoimage.toBlob(document.getElementById("PlotGraph"))
        .then(function (blob) {
            saveAs(blob, 'graph.png');
        });
    }

    render() 
    {
        return (
           <div>
              <UserGraph {...this.props} />
              <Button onClick={this.saveImage} color="primary">Sauvegarder</Button>{' '}
           </div>
        );
    }
}
export default UserGraphImg;