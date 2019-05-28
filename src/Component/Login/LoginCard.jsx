// Modules
import React from 'react';
import{Card , CardHeader, CardBody } from 'reactstrap';
//import { API_HOST} from '../../config.json';
// css
import "../../style/login.css";

// http
import client from '../../request/client';

const TEXT_INPUT_MAX_LENGTH = 150;

class LoginCard extends React.Component {
  constructor(){
    super();
    
    this.state = {
      id: '',
      pwd:'',
      error: ''
  };
  }

  componentDidMount(){
    if(client.me){
      this.props.history.push('/home')
    }
  }

  render(){
    this.passwordInput = React.createRef();
    this.idInput = React.createRef();
    return (
      <div>
      <div className="login-background"/>
      <Card  className="login">
          <CardHeader className="loginTitle">
            Authentification
         </CardHeader>
         <CardBody>
        <form className="login-form" onSubmit={this.handleSubmit}>
          <input
            ref={this.idInput}
            className="login-form-id"
            type="text"
            name="id"
            placeholder="Identifiant"
            maxLength={TEXT_INPUT_MAX_LENGTH}
            value={this.state.id}
            onChange={e => this.setState({ id: e.target.value })}
            />
          <input
            ref={this.passwordInput}
            className="login-form-password"
            type="password"
            name="password"
            placeholder="Mot de passe"
            maxLength={TEXT_INPUT_MAX_LENGTH}
            value={this.state.pwd}
            onChange={e => this.setState({ pwd: e.target.value })}
            />
          <input className="login-form-submit" type="submit" value="Valider"/>
          {this.state.error && <span className="login-form-error">{this.state.error}</span>}
        </form>
      </CardBody>
      </Card>
      </div>
    );
  }

  handleSubmit = async e => {
    e.preventDefault();

    const password = this.passwordInput.current.value;
    const id = this.idInput.current.value;

    const cleanPassword = password && password.replace(/(^\s*)|(\s*$)/g, "")
    const cleanId = id && id.replace(/(^\s*)|(\s*$)/g, "");
    if (cleanPassword && cleanId) {
      const response = await fetch('/login', 
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ 
        id: this.state.id,
        pwd: this.state.pwd
       }),
    })
    if (response.ok){
      
      const body = await response.json()
      
      client.setCredentials(body)
      this.props.history.push('/home')
    }
    else{
      switch (response.status){
        case 400 : 
        this.setState({ error : "Erreur de connexion"})
        break;
      case 401 : 
        this.setState({ error : "Identifiants incorrects"})
        break;
      default :
        this.setState({ error : "Une erreur a eu lieu. Veuillez reessayer ultérieurement."})
        break;
      }
    }
  } else {
    this.passwordInput.current.value = cleanPassword;
    this.idInput.current.value = cleanId;
    this.setState({ error: "Veuillez saisir un identifiant et un mot de passe" })
  }
  
  };
}



export default LoginCard;