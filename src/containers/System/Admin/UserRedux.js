import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import { getAllCodeService } from '../../../services/userService'
import { dateFormat, LANGUAGE, CommonUtils } from '../../../utils';
import * as actions from '../../../store/actions'
import Carousel from 'react-images'
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
    }

    handbleOnchangeImage = async (event) => {
        let data = event.target.files;
        let file = data[0];
        if (file) {
            let base64 = await CommonUtils.getBase64(file);

            let url = URL.createObjectURL(file);
            this.setState({
                reviewImgURL: url,
                avatar: base64

            })
        }
    }
    componentDidUpdate(prevProps, prevState, snapshot) {
        //Compare value of props past vs present 
        if (prevProps.genderstoRedux !== this.props.genderstoRedux) {
            let allGenders = this.props.genderstoRedux;
            this.setState({
                genderAll: allGenders,
                gender: allGenders && allGenders.length > 0 ? allGenders[0].keyMap : ''
            })
        }
        if (prevProps.positionstoRedux !== this.props.positionstoRedux) {
            let allPositions = this.props.positionstoRedux;
            this.setState({
                positionAll: allPositions,
                position: allPositions && allPositions.length > 0 ? allPositions[0].keyMap : ''
            })
        }
        if (prevProps.rolestoRedux !== this.props.rolestoRedux) {
            let allRoles = this.props.rolestoRedux
            this.setState({
                roleAll: allRoles,
                role: allRoles && allRoles.length > 0 ? allRoles[0].keyMap : ''
            })
        }

        if (prevProps.users !== this.props.users) {
            let allGenders = this.props.genderstoRedux;
            let allPositions = this.props.positionstoRedux;
            let allRoles = this.props.rolestoRedux
            this.setState({
                email: '',
                password: '',
                firstname: '',
                lastname: '',
                phonenumber: '',
                address: '',
                gender: allGenders && allGenders.length > 0 ? allGenders[0].keyMap : '',
                position: allPositions && allPositions.length > 0 ? allPositions[0].keyMap : '',
                role: allRoles && allRoles.length > 0 ? allRoles[0].keyMap : '',
                avatar: '',
                reviewImgURL: ''
            })
        }
    }

    openPreviewImage = () => {
        if (!this.state.reviewImgURL) return;
        this.setState({
            isOpen: !this.state.isOpen

        })

    }

    handbleSaveUser = () => {
        let isValid = this.checkValidateInput();

        if (isValid === false) return;

        //fire action redux
        this.props.createNewUser({
            email: this.state.email,
            password: this.state.password,
            firstName: this.state.firstname,
            lastName: this.state.lastname,
            address: this.state.address,
            phonenumber: this.state.phonenumber,
            gender: this.state.gender,
            role: this.state.role,
            position: this.state.position,
            avatar: this.state.avatar
        })

        this.props.fetchUserRedux()
    }

    checkValidateInput = () => {
        let isValid = true;
        let arrCheck = ['email', 'password', 'firstname', 'lastname',
            'phonenumber', 'address', 'avatar']
        for (let i = 0; i < arrCheck.length; i++) {
            if (!this.state[arrCheck[i]]) {
                isValid = false;
                alert(arrCheck[i] + ' missing')
                break;
            }
        }
        return isValid;
    }

    onChangeInput = (event, id) => {
        let copyState = { ...this.state }
        copyState[id] = event.target.value;
        this.setState({
            ...copyState
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
            <React.Fragment>
                <div className='user-redux-container'>
                    <div className='title'>
                        <FormattedMessage id='manage.user.title' />
                    </div>
                    <div className="user-redux-body" >
                        <div className='container'>
                            <div className='row mb-5'>
                                <div className='col-12 mt-3'>
                                    <h1><FormattedMessage id='manage.user.subtitle' /></h1>
                                </div>
                                <div className='col-12'>{isLoading === true ? 'Loading' : ''}</div>


                                <div className='col-3'>
                                    <label><FormattedMessage id='manage.user.lastName' /></label>
                                    <input className='form-control' type="text"

                                        value={lastname}
                                        onChange={(event) => { this.onChangeInput(event, 'lastname') }}
                                    ></input>
                                </div>
                                <div className='col-3'>
                                    <label><FormattedMessage id='manage.user.firstName' /></label>
                                    <input className='form-control' type="text"
                                        value={firstname}
                                        onChange={(event) => { this.onChangeInput(event, 'firstname') }}
                                    ></input>
                                </div>

                                <div className='col-3'>
                                    <label><FormattedMessage id='manage.user.email' /></label>
                                    <input className='form-control' type="email"
                                        value={email}
                                        onChange={(event) => { this.onChangeInput(event, 'email') }}></input>
                                </div>


                                <div className='col-3'>
                                    <label><FormattedMessage id='manage.user.password' /></label>
                                    <input className='form-control' type="password"
                                        value={password}
                                        onChange={(event) => { this.onChangeInput(event, 'password') }}></input>
                                </div>

                                <div className='col-3 mt-3'>
                                    <label><FormattedMessage id='manage.user.phonenumber' /></label>
                                    <input className='form-control' type="text"
                                        value={phonenumber}
                                        onChange={(event) => { this.onChangeInput(event, 'phonenumber') }}></input>
                                </div>
                                <div className='col-9 mt-3'>
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
                                                    <option key={index} value={item.keyMap}>{language === LANGUAGE.VI ? item.valueVi : item.valueEn}</option>
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
                                                    <option key={index} value={item.keyMap}>{language === LANGUAGE.VI ? item.valueVi : item.valueEn}</option>
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
                                                    <option key={index} value={item.keyMap}>{language === LANGUAGE.VI ? item.valueVi : item.valueEn}</option>
                                                )
                                            })}
                                    </select>
                                </div>
                                <div className='col-3 mt-3'>
                                    <label><FormattedMessage id='manage.user.image' /></label>
                                    <div className='preview-img-container'>
                                        <input id='image' type='file' hidden onChange={(event) => this.handbleOnchangeImage(event)}></input>
                                        <label className='label-upload' htmlFor='image'>Tải ảnh <i className='fas fa-upload'></i></label>
                                        <div className='preview-image' style={{ backgroundImage: `url(${this.state.reviewImgURL})` }}
                                            onClick={() => this.openPreviewImage()}
                                        >
                                        </div>
                                    </div>

                                </div>
                                <div className='col-12 mt-3'>

                                    <button className='btn btn-primary' onClick={() => this.handbleSaveUser()}><FormattedMessage id='manage.user.btn-save' /></button>
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
            </React.Fragment>
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
        createNewUser: (data) => dispatch(actions.createNewUser(data)),
        fetchUserRedux: () => dispatch(actions.fetchAllUserStart())


    };
};

export default connect(mapStateToProps, mapDispatchToProps)(UserRedux);
