import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import {getAllUser} from '../../services/userService'
import './UserManage.scss'
import ModalUser from './ModalUser';

class UserManage extends Component {

    constructor(props) {
        super(props);
        this.state = {  
            userArray : [],
            isOpenModalUser: false,
        }
    }

    async componentDidMount() {
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

    render() {
        let userArray = this.state.userArray;
        return (
            <div className="users-container">
                <ModalUser
                    isOpen={this.state.isOpenModalUser}
                    tooggleFromManage={this.toggleModalUser}
                />
                <div className='title text-center'>Manage User</div>
                <div className="mx-1">
                    <button className="btn btn-primary px-3" onClick={()=>this.handbleAddNewUser()}><i className="fas fa-plus"></i> Add new user</button>   
                </div>
                <div className='table mt-3 mx-1'>
                    <table id="customers">
                        <tr>
                            <th>Email</th>
                            <th>FirstName</th>
                            <th>LastName</th>
                            <th>Address</th>
                            <th>Action</th>
                        </tr>
                        {userArray && userArray.map((item,index)=>{
                            console.log('check userArray', item, index)
                            return(
                                <tr>
                                <td>{item.email}</td>
                                <td>{item.firstName}</td>
                                <td>{item.lastName}</td>
                                <td>{item.address}</td>
                                <td>
                                    <button className='btn-edit'><i className="fas fa-edit"></i></button>
                                    <button className='btn-delete'><i class="fas fa-trash"></i></button>
                                </td>
                               
                                </tr>
                            )
                        })}
                        
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
