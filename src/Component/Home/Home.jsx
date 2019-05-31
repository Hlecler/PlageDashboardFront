// Modules
import React from 'react';
import { Button } from 'reactstrap';

// http
import client from '../../request/client';

// Styles
import '../../style/home.css';



class Home extends React.Component{
  constructor(){
    super();    
    this.state = {
      warning: ''
    };
  }

  async handleExercices() {
    window.location = '/graph/image/user/' + client.plageId
  }

  componentDidMount(){
    if(!client.me){
      this.props.history.push('/login')
    }
}

  render() {
    return (
    <div>  
      <div className="headerContent ">
        <div className="homepage-background"/>
        <h3>Bonjour {client.me}</h3>
      </div>
      <div>
      {client.plageId ? 
        <div>
          <h3>Identifiant Plage : {client.plageId} </h3>
          <Button onClick={this.handleExercices} color="primary">Vos résultats d'exercices</Button>{' '}
        </div>
      :
      <div>
        <h3>Pas d'identifiants Plage trouvés.</h3>
      </div>
      }  

      </div>
      <p>{this.state.warning}</p>
    </div>
    );
  }

}



// Export components
export default Home;