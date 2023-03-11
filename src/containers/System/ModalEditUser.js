import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { emitter } from '../../utils/emitter';
import { flatMap } from 'lodash';
class ModalEditUser extends Component {

    constructor(props){
        super(props);
        this.state={
            id: '',
            email: '',
            password: '',
            firstName: '',
            lastName: '',
            address: ''
        }
    }


    componentDidMount() {
        let data = this.props.editUser
        if(data && !flatMap.isEmpty){
            this.setState({
                id: data.id,
                email: data.email,
                password: 'password',
                firstName: data.firstName,
                lastName: data.lastName,
                address: data.address
            })
        }
    }

    toggle =() =>{
        this.props.tooggleFromManage()
    }

    handleOnChangeInput = (event,id)=>{
        let copyState = {...this.state};
        copyState[id] = event.target.value;
        this.setState({
            ...copyState
        })
    }

    checkValideInput =() =>{
        let isValid = true;
        let arrInput = ['email', 'password', 'firstName', 'lastName', 'address']
        for(let i =0; i<arrInput.length; i++){
            if(!this.state[arrInput[i]]){
                isValid = false;
                alert(arrInput[i] + ' missing: ');
                break;
            }

        }
        return isValid;

    }
    handleUpdateUser = ()=>{
        let isValid = this.checkValideInput();
        if(isValid){
            this.props.saveUser(this.state)     
        }
     
    }
    render() {
        return (
           
                <Modal 
                    isOpen={this.props.isOpen} 
                    toggle={()=>{this.toggle()}} 
                    className={'modal-user-container'}
                    size='lg'
                    >
                    <ModalHeader toggle={()=>{this.toggle()}}>Edit User</ModalHeader>
                    <ModalBody>
                        <div className='modal-user-body'>
                            <div className='input-container'>
                                <label>Email</label>
                                <input type='email' onChange={(event)=>this.handleOnChangeInput(event, "email")} value={this.state.email} disabled></input>
                            
                            </div>
                            <div className='input-container'>
                                <label>Password</label>
                                <input type='password' onChange={(event)=>this.handleOnChangeInput(event, "password")} value={this.state.password} disabled></input>
                            </div>
                            <div className='input-container'>
                                <label>First Name</label>
                                <input type='text' onChange={(event)=>this.handleOnChangeInput(event, "firstName")} value={this.state.firstName}></input>
                            </div>
                            <div className='input-container'>
                                <label>Last Name</label>
                                <input type='text'onChange={(event)=>this.handleOnChangeInput(event, "lastName")} value={this.state.lastName}></input>
                            </div>
                            <div className='input-container max-with-input'>
                                <label>Address</label>
                                <input type='text'onChange={(event)=>this.handleOnChangeInput(event, "address")} value={this.state.address}></input>
                            </div>
                        </div>
                    </ModalBody>
                    <ModalFooter>
                        <Button className='px-3' color="primary" onClick={()=>{this.handleUpdateUser()}}>Update User</Button>{' '}
                        <Button className='px-3' color="secondary" onClick={()=>{this.toggle()}}>Close</Button> 
                    </ModalFooter>
                </Modal>
            
        )
    }

}

const mapStateToProps = state => {
    return {
    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ModalEditUser);
