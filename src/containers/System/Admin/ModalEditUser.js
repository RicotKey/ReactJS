import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import { getAllCodeService } from '../../../services/userService'
import { CRUD_ACTIONS, dateFormat, LANGUAGE } from '../../../utils';
import * as actions from '../../../store/actions'
import Carousel from 'react-images'
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { flatMap } from 'lodash';
import './UserRedux.scss'
class UserRedux extends Component {
    constructor(props) {
        super(props)
        this.state = {
            genderAll: [],
            positionAll: [],
            roleAll: [],
            reviewImgURL: '',
            isOpen: false,

            email: '',
            password: '',
            firstname: '',
            lastname: '',
            phonenumber: '',
            address: '',
            gender: '',
            position: '',
            role: '',
            avatar: '',


        }
    }

    async componentDidMount() {
        this.props.getGenderStart();
        this.props.getPositionStart();
        this.props.getRoleStart();

        let data = this.props.editUser
        console.log("data: ", data)
        if (data && !flatMap.isEmpty) {
            this.setState({
                id: data.id,
                email: data.email,
                password: 'password',
                firstname: data.firstName,
                lastname: data.lastName,
                address: data.address,
                phonenumber: data.phonenumber,
                gender: data.gender,
                position: data.positionid,
                role: data.roleid,
                avatar: '',

            })
        }
    }

    handbleOnchangeImage = (event) => {
        let data = event.target.files;
        let file = data[0];
        if (file) {
            let url = URL.createObjectURL(file);
            this.setState({
                reviewImgURL: url,
                avatar: file

            })
        }
    }
    componentDidUpdate(prevProps, prevState, snapshot) {
        //Compare value of props past vs present 
        if (prevProps.genderstoRedux !== this.props.genderstoRedux) {
            let allGenders = this.props.genderstoRedux;
            this.setState({
                genderAll: allGenders,
                //gender: allGenders && allGenders.length > 0 ? allGenders[0].key : ''
            })
        }
        if (prevProps.positionstoRedux !== this.props.positionstoRedux) {
            let allPositions = this.props.positionstoRedux;
            this.setState({
                positionAll: allPositions,
                // position: allPositions && allPositions.length > 0 ? allPositions[0].key : ''
            })
        }
        if (prevProps.rolestoRedux !== this.props.rolestoRedux) {
            let allRoles = this.props.rolestoRedux
            this.setState({
                roleAll: allRoles,
                // role: allRoles && allRoles.length > 0 ? allRoles[0].key : ''
            })
        }

        if (prevProps.users !== this.props.users) {

            this.setState({

                email: '',
                password: '',
                firstname: '',
                lastname: '',
                phonenumber: '',
                address: '',
                gender: '',
                position: '',
                role: '',
                avatar: '',
            })
        }
    }

    openPreviewImage = () => {
        if (!this.state.reviewImgURL) return;
        this.setState({
            isOpen: !this.state.isOpen

        })

    }


    checkValidateInput = () => {
        let isValid = true;
        let arrCheck = ['email', 'password', 'firstname', 'lastname',
            'phonenumber', 'address']
        for (let i = 0; i < arrCheck.length; i++) {
            if (!this.state[arrCheck[i]]) {
                isValid = false;
                alert(arrCheck[i] + ' missing')
                break;
            }
        }
        return isValid;
    }

    toggle = () => {
        this.props.tooggleFromManage()
    }

    onChangeInput = (event, id) => {
        let copyState = { ...this.state }
        copyState[id] = event.target.value;
        this.setState({
            ...copyState
        })
    }


    handleUpdateUser = () => {
        this.props.tooggleFromManage();
        this.props.editUserRedux({
            id: this.state.id,
            email: this.state.email,
            password: this.state.password,
            firstName: this.state.firstname,
            lastName: this.state.lastname,
            address: this.state.address,
            phonenumber: this.state.phonenumber,
            gender: this.state.gender,
            roleid: this.state.role,
            positionid: this.state.position,
            // avatar: this.state.avatar
        })
    }

    render() {
        let genders = this.state.genderAll;
        let positions = this.state.positionAll;
        let roles = this.state.roleAll;
        let language = this.props.language;
        let isLoading = this.props.isLoading;
        const images = [{ source: this.state.reviewImgURL }]

        let { email, password, firstname, lastname,
            phonenumber, address, gender, position, role, avatar } = this.state

        return (
            <Modal
                isOpen={this.props.isOpen}
                toggle={() => { this.toggle() }}
                className={'modal-user-container'}
                size='lg'
            >
                <ModalHeader toggle={() => { this.toggle() }}><FormattedMessage id='manage.user.edit-header' /></ModalHeader>
                <ModalBody>
                    <div className='user-redux-container'>

                        <div className="user-redux-body" >
                            <div className='container'>
                                <div className='row'>
                                    <div className='col-12 mt-3'>
                                        <h1><FormattedMessage id='manage.user.subtitle' /></h1>
                                    </div>
                                    <div className='col-12 mt-3'>{isLoading === true ? 'Loading' : ''}</div>


                                    <div className='col-4'>
                                        <label><FormattedMessage id='manage.user.email' /></label>

                                        <div class="input-group mb-2">
                                            <div class="input-group-prepend">
                                                <div class="input-group-text">@</div>
                                                <input readOnly id="inlineFormInputGroup" className='form-control' type="email"
                                                    value={email}
                                                    onChange={(event) => { this.onChangeInput(event, 'email') }}></input>
                                            </div>
                                        </div>


                                    </div>
                                    <div className='col-4'>
                                        <label><FormattedMessage id='manage.user.lastName' /></label>
                                        <input className='form-control' type="text"

                                            value={lastname}
                                            onChange={(event) => { this.onChangeInput(event, 'lastname') }}></input>
                                    </div>
                                    <div className='col-4'>
                                        <label><FormattedMessage id='manage.user.firstName' /></label>
                                        <input className='form-control' type="text"
                                            value={firstname}
                                            onChange={(event) => { this.onChangeInput(event, 'firstname') }}
                                        ></input>
                                    </div>



                                    <div className='col-4 mt-3'>
                                        <label><FormattedMessage id='manage.user.phonenumber' /></label>
                                        <input className='form-control' type="text"
                                            value={phonenumber}
                                            onChange={(event) => { this.onChangeInput(event, 'phonenumber') }}></input>
                                    </div>
                                    <div className='col-8 mt-3'>
                                        <label><FormattedMessage id='manage.user.address' /></label>
                                        <input className='form-control' type="text"
                                            value={address}
                                            onChange={(event) => { this.onChangeInput(event, 'address') }}></input>
                                    </div>
                                    <div className='col-3 mt-3'>
                                        <label><FormattedMessage id='manage.user.gender' /></label>
                                        <select value={gender} className="form-control"

                                            onChange={(event) => { this.onChangeInput(event, 'gender') }}
                                        >
                                            {genders && genders.length > 0 &&
                                                genders.map((item, index) => {
                                                    return (
                                                        <option key={index} value={item.key}>{language === LANGUAGE.VI ? item.valueVi : item.valueEn}</option>
                                                    )
                                                })}
                                        </select>
                                    </div>
                                    <div className='col-3 mt-3'>
                                        <label><FormattedMessage id='manage.user.position' /></label>
                                        <select value={position} className="form-control"

                                            onChange={(event) => { this.onChangeInput(event, 'position') }}
                                        >
                                            {positions && positions.length > 0 &&
                                                positions.map((item, index) => {
                                                    return (
                                                        <option key={index} value={item.key}>{language === LANGUAGE.VI ? item.valueVi : item.valueEn}</option>
                                                    )
                                                })}
                                        </select>
                                    </div>
                                    <div className='col-3 mt-3'>
                                        <label><FormattedMessage id='manage.user.roleid' /></label>
                                        <select value={role} className="form-control"

                                            onChange={(event) => { this.onChangeInput(event, 'role') }}
                                        >
                                            {roles && positions.length > 0 &&
                                                roles.map((item, index) => {
                                                    return (
                                                        <option key={index} value={item.key}>{language === LANGUAGE.VI ? item.valueVi : item.valueEn}</option>
                                                    )
                                                })}
                                        </select>
                                    </div>
                                    <div className='col-3 mt-3'>
                                        <label><FormattedMessage id='manage.user.image' /></label>
                                        <div className='preview-img-container'>
                                            <input id='previewImg' type='file' hidden onChange={(event) => this.handbleOnchangeImage(event)}></input>
                                            <label className='label-upload' htmlFor='previewImg'>Tải ảnh <i className='fas fa-upload'></i></label>
                                            <div className='preview-image' style={{ backgroundImage: `url(${this.state.reviewImgURL})` }}
                                                onClick={() => this.openPreviewImage()}
                                            >
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        {this.state.isOpen === true &&
                            <Carousel views={images}
                                backdropClosesModal={false}
                            />

                        }
                    </div>
                </ModalBody>
                <ModalFooter>
                    <Button className='px-3' color="primary" onClick={() => { this.handleUpdateUser() }}><FormattedMessage id='manage.user.btn-update' /></Button>{' '}
                    <Button className='px-3' color="secondary" onClick={() => { this.toggle() }}><FormattedMessage id='manage.user.btn-close' /></Button>
                </ModalFooter>
            </Modal>
        )
    }

}

const mapStateToProps = state => {
    return {
        language: state.app.language,
        genderstoRedux: state.admin.genders,
        positionstoRedux: state.admin.positions,
        rolestoRedux: state.admin.roles,
        isLoading: state.admin.isLoading,
        users: state.admin.users
    };
};

const mapDispatchToProps = dispatch => {
    return {
        // changelanguageAppbyRedux: (language) =>dispatch(changelanguageApp(language))
        getGenderStart: () => dispatch(actions.fetchGenderStart()),
        getPositionStart: () => dispatch(actions.fetchPositionStart()),
        getRoleStart: () => dispatch(actions.fetchRoleStart()),
        fetchUserRedux: () => dispatch(actions.fetchAllUserStart()),
        editUserRedux: (data) => dispatch(actions.editUserStart(data))

    };
};

export default connect(mapStateToProps, mapDispatchToProps)(UserRedux);
