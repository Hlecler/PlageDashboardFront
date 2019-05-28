// Modules
import React from 'react';

// http
import client from '../../request/client';

// Styles
import '../../style/home.css';
import UserGraph from '../Users/UserGraph';

class Home extends React.Component{
  constructor(){
    super();    
    this.state = {
      warning: ''
    };
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
        <UserGraph/>
      </div>
      <p>{this.state.warning}</p>
    </div>
    );
  }

}



// Export connected Components
export default Home;