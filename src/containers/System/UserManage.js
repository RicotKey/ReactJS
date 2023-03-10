import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import {getAllUser, createNewUserSV, deleteUser} from '../../services/userService'
import './UserManage.scss'
import ModalUser from './ModalUser';
import { emitter } from '../../utils/emitter';
import { flatMap } from 'lodash';

class UserManage extends Component {

    constructor(props) {
        super(props);
        this.state = {  
            userArray : [],
            isOpenModalUser: false,
            
        }
    }   

    async componentDidMount() {
        await this.getAllUser()
    }
    getAllUser = async() =>{
        let res = await getAllUser('ALL');
        if(res && res.errCode===0){
            this.setState({
                userArray: res.users
            })
        }
    }

    handbleAddNewUser = () =>{
        this.setState({
            isOpenModalUser : true,
        })
    }
    toggleModalUser =()=>{
        this.setState({
            isOpenModalUser : !this.state.isOpenModalUser,
        })
    }

    createNewUser = async (data)=>{
       try {
            let response = await createNewUserSV(data);
            if(response && response.errCode !== 0){
                alert(response.message)
            }else{
                await this.getAllUser();
                this.setState({
                    isOpenModalUser : false,
                    
                })
                emitter.emit('EVENT_CLEAR_MODAL_DATA')
            }
       } catch (error) {
            console.log(error)
       }
    }
   
    handbleDeleteUser = async (user)=>{
        try {
           
            let response = await deleteUser(user.id);
            if(response && response.errCode !== 0){
                alert(response.message)
            }else{
               
                await this.getAllUser();             
            }
            
        } catch (error) {
            console.log(error)
        }
    }

    render() {
        let userArray = this.state.userArray;
        return (
            <div className="users-container">
                <ModalUser
                    isOpen={this.state.isOpenModalUser}
                    tooggleFromManage={this.toggleModalUser}
                    createNewUser={this.createNewUser}
                    
                />
                <div className='title text-center'>Manage User</div>
                <div className="mx-1">
                    <button className="btn btn-primary px-3" onClick={()=>this.handbleAddNewUser()}><i className="fas fa-plus"></i> Add new user</button>   
                </div>
               
                    <div className='table mt-3 mx-1'>
                        <table id="customers">
                            <tbody>
                            <tr>
                                <th>Email</th>
                                <th>FirstName</th>
                                <th>LastName</th>
                                <th>Address</th>
                                <th>Action</th>
                            </tr>
                            {userArray && userArray.map((item,index)=>{
                                return(
                                    <tr key={index}>
                                    <td>{item.email}</td>
                                    <td>{item.firstName}</td>
                                    <td>{item.lastName}</td>
                                    <td>{item.address}</td>
                                    <td>
                                        <button className='btn-edit'><i className="fas fa-edit"></i></button>
                                        <button className='btn-delete' onClick={()=>{this.handbleDeleteUser(item)}}><i className="fas fa-trash"></i></button>
                                    </td>
                                
                                    </tr>
                                )
                            })}
                            </tbody>
                        </table>
                    </div>
                   
            </div>
        );
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

export default connect(mapStateToProps, mapDispatchToProps)(UserManage);
