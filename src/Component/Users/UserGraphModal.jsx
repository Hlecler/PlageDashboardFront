
import React from 'react';
import {Button, Modal, ModalBody} from 'reactstrap';
import TeacherExoGraph from '../Teacher/TeacherExoGraph'
class UserGraphModal extends React.Component {
    constructor(){
        super();
        
        this.state = {
            modal: false
        }

        this.toggle = this.toggle.bind(this);
    }

    toggle() {
      this.setState(({
        modal: !this.state.modal
      }));
    }

    
    render() 
    {
        return (
           <div>
                <div>
                  <li>
                  <Button color="info" onClick={this.toggle}>Exercice {this.props.exercice}</Button>
                  </li>
                  <Modal isOpen={this.state.modal} toggle={this.toggle} className={this.props.className} size = "lg">
                    <ModalBody>
                      <TeacherExoGraph match = {{params : {idExercise : this.props.exercice}}}></TeacherExoGraph>
                    </ModalBody>
                  </Modal>
                </div>
           </div>
        );
    }
}
export default UserGraphModal;