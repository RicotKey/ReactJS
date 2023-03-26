import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import {getAllCodeService} from '../../../services/userService'
import { LANGUAGE } from '../../../utils';
class UserRedux extends Component {
    constructor(props){
        super(props)
        this.state = {
            genderAll: []
        }
    }

    async componentDidMount() {
        try {
            let res = await getAllCodeService('gender');
            if(res && res.errCode ===0){
                this.setState({
                    genderAll: res.data
                })
            }
        } catch (error) {
            console.log(error)
        }
    }


    render() {
        console.log("Check: ", this.state)
        let genders = this.state.genderAll
        let language = this.props.language;
        return (
            <div className='user-redux-container'>
                <div className='title'>
                    <FormattedMessage id='manage.user.title'/>
                </div>
                <div className="user-redux-body" >
                    <div className='container'>
                        <div className='row'>
                            <div className='col-12'>
                                <h1><FormattedMessage id='manage.user.subtitle'/> <span className="badge badge-secondary">New</span></h1>
                            </div>
                            
                            <div className='col-3'>
                                <label><FormattedMessage id='manage.user.firstName'/></label>
                                <input className='form-control' type="text"></input>
                            </div>
                            <div className='col-3'>
                                <label><FormattedMessage id='manage.user.lastName'/></label>
                                <input className='form-control' type="text"></input>
                            </div>
                        
                        
                            <div className='col-3'>
                                <label><FormattedMessage id='manage.user.email'/></label>
                                <input className='form-control' type="email"></input>
                            </div>
                          
                           
                            <div className='col-3'>
                                <label><FormattedMessage id='manage.user.password'/></label>
                                <input className='form-control' type="password"></input>
                            </div>
                           
                            <div className='col-3'>
                                <label><FormattedMessage id='manage.user.phonenumber'/></label>
                                <input className='form-control' type="text"></input>
                            </div>
                            <div className='col-9'>
                                <label><FormattedMessage id='manage.user.address'/></label>
                                <input className='form-control' type="text"></input>
                            </div>
                            <div className='col-3'>
                                <label><FormattedMessage id='manage.user.gender'/></label>
                                <select className="form-control">
                                    {genders && genders.length > 0 &&
                                        genders.map((item,index)=>{
                                            return(
                                                <option key={index}>{language ===LANGUAGE.VI ? item.valueVi : item.valueEn}</option>
                                            )
                                        })}
                                </select>
                            </div>
                            <div className='col-3'>
                                <label><FormattedMessage id='manage.user.position'/></label>
                                <select className="form-control">
                                    {genders && genders.length > 0 &&
                                        genders.map((item,index)=>{
                                            return(
                                                <option key={index}>{item.valueVi}</option>
                                            )
                                        })}
                                </select>
                            </div>
                            <div className='col-3'>
                                <label><FormattedMessage id='manage.user.roleid'/></label>
                                <select className="form-control">
                                    {genders && genders.length > 0 &&
                                        genders.map((item,index)=>{
                                            return(
                                                <option key={index}>{item.valueVi}</option>
                                            )
                                        })}
                                </select>
                            </div>
                            <div className='col-3'>
                                <label><FormattedMessage id='manage.user.image'/></label>
                                <input className='form-control' type="text"></input>
                            </div>
                            <div className='col-12 mt-3'>
                           
                                <button className='btn btn-primary'><FormattedMessage id='manage.user.save'/></button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }

}

const mapStateToProps = state => {
    return {
        language: state.app.language,
    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(UserRedux);
