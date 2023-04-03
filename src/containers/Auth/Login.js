import React, { Component } from 'react';
import { connect } from 'react-redux';
import { push } from "connected-react-router";

import * as actions from "../../store/actions";

import './Login.scss';
import { FormattedMessage } from 'react-intl';
import { handleLoginApi } from '../../services/userService';

class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: '',
            isshowpassword: false,
            errMessage: '',
        }
    }
    handleOnChangeEmail = (event) => {
        this.setState({
            email: event.target.value,
        })
    }

    handleOnChangePassword = (event) => {
        this.setState({
            password: event.target.value,
        })
    }

    handleKeyDown = (event) => {
        if (event.key === 'Enter' || event.keyCode === 13) {
            this.handleLogin();
        }
    }
    handleLogin = async () => {
        this.setState({
            errMessage: ''
        })

        try {
            let data = await handleLoginApi(this.state.email, this.state.password)
            if (data && data.errCode != 0) {
                this.setState({
                    errMessage: data.message

                })
            }
            if (data && data.errCode === 0) {
                console.log(data.user.roleid)
                if (data.user.roleid == 'R2') {
                    this.props.navigate('/doctor/manage-patient')
                }
                if (data.user.roleid == 'R1') {
                    this.props.navigate('/system/list-user')
                }
                this.props.userLoginSuccess(data.user)

            }
        } catch (error) {
            if (error.response) {
                if (error.response.data) {
                    this.setState({
                        errMessage: error.response.data.message
                    })
                }
            }
        }
    }
    handleShowHidePassword = (event) => {
        this.setState({
            isshowpassword: !this.state.isshowpassword
        })
    }
    render() {
        return (
            <div className='login-background'>
                <div className='login-container'>
                    <div className='login-content row'>
                        <div className='col-12 login-text'>Login</div>
                        <div className='col-12 form-group login-input'>
                            <label>Email</label>
                            <input type='email'
                                className='form-control'
                                placeholder='Enter your email'
                                value={this.state.email}
                                onChange={(event) => this.handleOnChangeEmail(event)}
                                name='email'>
                            </input>
                        </div>
                        <div className='col-12 form-group login-input'>
                            <label>Password</label>
                            <div className='custom-ipnut-password'>
                                <input type={this.state.isshowpassword ? 'text' : 'password'}
                                    className='form-control'
                                    placeholder='Enter your password'
                                    value={this.state.password}
                                    onChange={(event) => this.handleOnChangePassword(event)}
                                    name='password'
                                    onKeyDown={(event) => this.handleKeyDown(event)}>
                                </input>
                                <span onClick={(event) => this.handleShowHidePassword(event)}> <i className={this.state.isshowpassword ? 'fas fa-eye' : 'fas fa-eye-slash'}></i></span>

                            </div>
                        </div>
                        <div className='col-12' style={{ color: 'red' }}>
                            {this.state.errMessage}
                        </div>
                        <div className='col-12'>
                            <button className='btn-login'
                                onClick={() => this.handleLogin()}>Login</button>
                        </div>
                        <div className='col-12'>
                            <span className='fogot-password'>Forgot your password ?</span>
                        </div>
                        <div className='col-12 text-center mt-3'>Or login with: </div>
                        <div className='col-12 social-login'>
                            <i className="fab fa-google google"></i>
                            <i className="fab fa-facebook-f facebook"></i>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        lang: state.app.language
    };
};

const mapDispatchToProps = dispatch => {
    return {
        navigate: (path) => dispatch(push(path)),
        //adminLoginFail: () => dispatch(actions.adminLoginFail()),
        userLoginSuccess: (userInfo) => dispatch(actions.userLoginSuccess(userInfo))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
