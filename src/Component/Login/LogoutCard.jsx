import React from 'react';
import { logOut } from '../../request/login'
import { Redirect } from 'react-router-dom';

class LogoutCard extends React.Component {
  constructor(){
    super();
    this.state = { disconnected: false}
  }
  componentDidMount(){ 
      logOut()
      .catch(done => done)
      .then(done => this.setState({disconnected: true}))
   }
  

  render() {
    if( this.state.disconnected ) {
      return <Redirect to="/" />
    } else {
      return <div className="background" />
    }
  }
}

export default LogoutCard;