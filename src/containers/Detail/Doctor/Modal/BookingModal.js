import React, { Component } from 'react';
import { connect } from 'react-redux';
import { LANGUAGE } from '../../../../utils';
import { FormattedMessage } from 'react-intl'
import './BookingModal.scss';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import _ from 'lodash'
import DatePicker from '../../../../components/Input/DatePicker'
import * as actions from '../../../../store/actions';
import Select from 'react-select';
import { postPatientBookAppointment } from '../../../../services/userService'
import { toast } from 'react-toastify';
import ProfileDoctor from '../ProfileDoctor';
import moment from 'moment';
class BookingModal extends Component {

    constructor(props) {
        super(props);
        this.state = {
            fullName: '',
            phonenumber: '',
            email: '',
            address: '',
            reason: '',
            birthday: '',
            selectedGender: '',
            doctorid: '',
            genders: '',
            timeType: '',
        }
    }


    componentDidMount() {
        this.props.getGenders();
    }

    buildDataGender = (data) => {
        let result = [];
        let language = this.props.language;
        if (data && data.length > 0) {
            data.map(item => {
                let object = {};
                object.label = language === LANGUAGE.VI ? item.valueVi : item.valueEn;
                object.value = item.keyMap;
                result.push(object)
            })
        }
        return result;
    }

    async componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.language !== this.props.language) {
            this.setState({
                genders: this.buildDataGender(this.props.genders)
            })
        }
        if (this.props.genders !== prevProps.genders) {
            this.setState({
                genders: this.buildDataGender(this.props.genders)
            })
        }
        if (this.props.dataTime !== prevProps.dataTime) {
            if (this.props.dataTime && !_.isEmpty(this.props.dataTime)) {
                let doctorid = this.props.dataTime.doctorid;
                let timeType = this.props.dataTime.timeType;
                this.setState({
                    doctorid: doctorid,
                    timeType: timeType
                })
            }
        }
    }

    handleOnchangeInput = (event, id) => {
        let valueInput = event.target.value;
        let stateCopy = { ...this.state };
        stateCopy[id] = valueInput;
        this.setState({
            ...stateCopy
        })
    }

    handleOnchangeDatePicker = (date) => {
        this.setState({
            birthday: date[0]
        })
    }

    handleChangeSelect = (selectdOption) => {
        this.setState({ selectedGender: selectdOption })
    }

    handleConfirmBooking = async () => {
        let date = new Date(this.state.birthday).getTime();
        let timeString = this.buildTimeBooking(this.props.dataTime)
        let doctorName = this.buildDoctorName(this.props.dataTime)

        let res = await postPatientBookAppointment({
            fullName: this.state.fullName,
            phonenumber: this.state.phonenumber,
            email: this.state.email,
            address: this.state.address,
            reason: this.state.reason,
            date: this.props.dataTime.date,
            birthday: date,
            selectedGender: this.state.selectedGender.value,
            doctorid: this.state.doctorid,
            timeType: this.state.timeType,
            language: this.props.language,
            timeString: timeString,
            doctorName: doctorName
        })

        if (res && res.errCode === 0) {
            toast.success("Booking a new appintment succeed")
            this.props.closeBookingClose();
        } else {
            toast.error('Booking a new appointment error!')
        }
    }

    buildTimeBooking = (dataTime) => {
        let { language } = this.props;
        if (dataTime && !_.isEmpty(dataTime)) {
            let time = language === LANGUAGE.VI ?
                dataTime.timeTypeData.valueVi : dataTime.timeTypeData.valueEn;

            let date = language === LANGUAGE.VI ?
                moment.unix(+dataTime.date / 1000).format('dddd - DD/MM/YYYY') :
                moment.unix(+dataTime.date / 1000).locale('en').format('ddd - MM/DD/YYYY');

            return `${time} - ${date}`
        }
    }

    buildDoctorName = (dataTime) => {

        let { language } = this.props;
        if (dataTime && !_.isEmpty(dataTime)) {
            let name = language === LANGUAGE.VI ?
                `${dataTime.doctorData.lastname} ${dataTime.doctorData.firstname}`
                :
                `${dataTime.doctorData.firstname} ${dataTime.doctorData.lastname}`

            return name
        }
        return ''
    }

    render() {
        let { isOpenModal, closeBookingClose, dataTime } = this.props;
        let doctorid = ''
        if (dataTime && !_.isEmpty(dataTime)) {
            doctorid = dataTime.doctorid
        }



        return (

            <Modal
                isOpen={isOpenModal}
                className={'booking-modal-container'}
                size='lg'
                centered
            >
                <div className='booking-modal-content'>
                    <div className='booking-modal-header'>
                        <span className='left'>
                            <FormattedMessage id="patient.booking-modal.title" />
                        </span>
                        <span className='right' onClick={closeBookingClose}><i className='fas fa-times'></i></span>
                    </div>
                    <div className='booking-modal-body'>
                        <div className='doctor-infor'>
                            <ProfileDoctor
                                doctorid={doctorid}
                                isShowDescriptionDoctor={false}
                                dataTime={dataTime}
                                isShowLinkDetail={false}
                                isShowPrice={true}
                            />
                        </div>

                        <div className='row'>
                            <div className='col-6 form-group'>
                                <label> <FormattedMessage id="patient.booking-modal.fullname" /></label>
                                <input className='form-control'
                                    value={this.state.fullName}
                                    onChange={(event) => this.handleOnchangeInput(event, 'fullName')}
                                ></input>
                            </div>
                            <div className='col-6 form-group'>
                                <label><FormattedMessage id="patient.booking-modal.phonenumber" /></label>
                                <input className='form-control'
                                    value={this.state.phonenumber}
                                    onChange={(event) => this.handleOnchangeInput(event, 'phonenumber')}
                                ></input>
                            </div>
                            <div className='col-6 form-group'>
                                <label><FormattedMessage id="patient.booking-modal.email" /></label>
                                <input className='form-control'
                                    value={this.state.email}
                                    onChange={(event) => this.handleOnchangeInput(event, 'email')}
                                ></input>
                            </div>
                            <div className='col-6 form-group'>
                                <label><FormattedMessage id="patient.booking-modal.address" /></label>
                                <input className='form-control'
                                    value={this.state.address}
                                    onChange={(event) => this.handleOnchangeInput(event, 'address')}
                                ></input>

                            </div>
                            <div className='col-12 form-group'>
                                <label><FormattedMessage id="patient.booking-modal.reason" /></label>
                                <input className='form-control'
                                    value={this.state.reason}
                                    onChange={(event) => this.handleOnchangeInput(event, 'reason')}
                                ></input>

                            </div>
                            <div className='col-6 form-group'>
                                <label><FormattedMessage id="patient.booking-modal.birthday" /></label>
                                <DatePicker
                                    onChange={this.handleOnchangeDatePicker}
                                    className='form-control'
                                    value={this.state.birthday}
                                />
                            </div>
                            <div className='col-6 form-group'>
                                <label><FormattedMessage id="patient.booking-modal.gender" /></label>
                                <Select
                                    onChange={this.handleChangeSelect}
                                    options={this.state.genders}
                                    value={this.state.selectedGender}
                                />

                            </div>
                        </div>
                    </div>
                    <div className='booking-modal-footer'>
                        <button className='btn-booking-confirm' onClick={() => this.handleConfirmBooking()} ><FormattedMessage id="patient.booking-modal.btnConfirm" /></button>
                        <button className='btn-booking-canel' onClick={closeBookingClose} ><FormattedMessage id="patient.booking-modal.btnCancel" /></button>
                    </div>

                </div>




            </Modal>

        );
    }

}

const mapStateToProps = state => {
    return {

        language: state.app.language,
        genders: state.admin.genders
    };
};

const mapDispatchToProps = dispatch => {
    return {

        // changelanguageAppbyRedux: (language) => dispatch(actions.changelanguageApp(language))
        getGenders: () => dispatch(actions.fetchGenderStart())
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(BookingModal);
