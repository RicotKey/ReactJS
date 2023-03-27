import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import { getAllUser, createNewUserSV, deleteUser, edtiUserSv } from '../../../services/userService'
import './TableManageUser.scss'
import * as actions from "../../../store/actions"
import ModalEditUser from './ModalEditUser';
import { times } from 'lodash';
class TableManageUser extends Component {

    constructor(props) {
        super(props);
        this.state = {
            users: [],
            isOpenModalEditUser: false,
        }
    }

    componentDidMount() {
        this.props.fetchUserRedux();
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.users !== this.props.users) {
            this.setState({
                users: this.props.users
            })

        }
    }

    handleDeleteUser = (user) => {
        this.props.deleteUserRedux(user.id)

    }
    handleEditUser = (user) => {
        console.log("check", user)
        this.setState({
            isOpenModalEditUser: true,

        })
    }
    toggleModalEditUser = () => {
        this.setState({
            isOpenModalEditUser: !this.state.isOpenModalEditUser
        })
    }
    render() {
        let userArray = this.state.users;

        return (
            <React.Fragment>
                <div className='container'>
                    {this.state.isOpenModalEditUser &&
                        <ModalEditUser
                            isOpen={this.state.isOpenModalEditUser}
                            tooggleFromManage={this.toggleModalEditUser}
                            editUser={this.state.editUser}
                            saveUser={this.doEditUser}
                        />}
                    <div className='title'>
                        <FormattedMessage id='manage.user.title' />
                    </div>
                    <div className='row'>
                        <div className='col-12 mt-3'>
                            <table id='tableManageUser'>
                                <tbody>
                                    <tr>
                                        <th>Email</th>
                                        <th>FirstName</th>
                                        <th>LastName</th>
                                        <th>Address</th>
                                        <th>Action</th>
                                    </tr>

                                    {userArray && userArray.length > 0 && userArray.map((item, index) => {
                                        return (
                                            <tr key={index}>
                                                <td>{item.email}</td>
                                                <td>{item.firstName}</td>
                                                <td>{item.lastName}</td>
                                                <td>{item.address}</td>
                                                <td>
                                                    <button className='btn-edit' onClick={() => this.handleEditUser(item)}  ><i className="fas fa-edit" ></i></button>
                                                    <button className='btn-delete' onClick={() => this.handleDeleteUser(item)}><i className="fas fa-trash"></i></button>

                                                </td>
                                            </tr>
                                        )
                                    })
                                    }
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </React.Fragment>
        );
    }

}

const mapStateToProps = state => {
    return {
        users: state.admin.users,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        fetchUserRedux: () => dispatch(actions.fetchAllUserStart()),
        deleteUserRedux: (id) => dispatch(actions.deleteUserStart(id))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(TableManageUser);
