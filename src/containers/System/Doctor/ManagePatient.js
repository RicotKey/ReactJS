import React, { Component } from 'react';
import { connect } from 'react-redux';

import { LANGUAGE, USER_ROLE } from '../../../utils'
import { FormattedMessage } from 'react-intl'
import './ManagePatient.scss';
import _ from 'lodash'
import DatePicker from '../../../components/Input/DatePicker';
import { getAllPatientForDoctor, postSendRemedy } from '../../../services/userService';
import moment from 'moment';
import RemedyModal from './RemedyModal';
import { Toast, toast } from 'react-toastify';
import LoadingOverlay from "react-loading-overlay"
LoadingOverlay.propTypes = undefined
class ManagePatient extends Component {

    constructor(props) {
        super(props);
        this.state = {
            currentDate: moment(new Date()).startOf('day').valueOf(),
            dataPatient: [],
            isOpenRemedyModal: false,
            dataModal: {},
            isShowLoading: false
        }
    }


    async componentDidMount() {

        this.getDataPatient()
    }

    getDataPatient = async () => {
        let { user } = this.props
        let { currentDate } = this.state
        let formateDate = new Date(currentDate).getTime();

        let res = await getAllPatientForDoctor({
            doctorid: user.id,
            date: formateDate
        })
        if (res && res.errCode === 0) {
            this.setState({
                dataPatient: res.data
            })
        }
    }



    handleOnchangeDatePicker = (date) => {
        this.setState({
            currentDate: date[0]
        }, async () => {
            await this.getDataPatient()
        })
    }

    handleBtnConfirm = (item) => {
        let data = {
            doctorid: item.doctorid,
            patientid: item.patientid,
            email: item.patientData.email,
            timeType: item.timeType,
            patientName: item.patientData.firstName
        }

        this.setState({
            isOpenRemedyModal: true,
            dataModal: data
        })
    }

    closeRemedyModal = () => {
        this.setState({
            isOpenRemedyModal: false,
            dataModal: {}
        })
    }

    sendRemedy = async (dataChild) => {
        let { dataModal } = this.state;
        this.setState({
            isShowLoading: true
        })

        let res = await postSendRemedy({
            email: dataChild.email,
            imgBase64: dataChild.imgBase64,
            doctorid: dataModal.doctorid,
            patientid: dataModal.patientid,
            timeType: dataModal.timeType,
            language: this.props.language,
            patientName: dataModal.patientName
        })

        if (res && res.errCode === 0) {
            this.setState({
                isShowLoading: false
            })
            toast.success('Send Remedy succeeds: ');
            this.closeRemedyModal();
            await this.getDataPatient();
        } else {
            this.setState({
                isShowLoading: false
            })
            toast.error('Something wrongs...');
            console.log('erro send remedy: ', res)
        }
    }

    handleBtnRemedy = () => {

    }
    render() {
        let { dataPatient, isOpenRemedyModal, dataModal } = this.state;
        let { language } = this.props;
        return (
            <>
                <LoadingOverlay active={this.state.isShowLoading}
                    spinner
                    text='Loading...'>
                    <div className='manage-patient-container'>
                        <div className='m-p-title'>
                            <FormattedMessage id='admin.manage-patient.manage-patient' />
                        </div>
                        <div className='manage-patient-body row'>
                            <div className='col-4 form-group'>
                                <label> <FormattedMessage id='admin.manage-patient.chooseday' /></label>
                                <DatePicker
                                    onChange={this.handleOnchangeDatePicker}
                                    className="form-control"
                                    value={this.state.currentDate}
                                />
                            </div>
                            <div className='col-12 table-manage-patient'>
                                <table style={{ width: '100%' }}>
                                    <tbody>
                                        <tr>
                                            <th>STT</th>
                                            <th><FormattedMessage id='admin.manage-patient.fullname' /></th>
                                            <th><FormattedMessage id='admin.manage-patient.time' /></th>
                                            <th><FormattedMessage id='admin.manage-patient.phonenumber' /></th>
                                            <th><FormattedMessage id='admin.manage-patient.gender' /></th>
                                            <th><FormattedMessage id='admin.manage-patient.actions' /></th>
                                        </tr>
                                        {dataPatient && dataPatient.length > 0
                                            ? dataPatient.map((item, index) => {
                                                let time = language === LANGUAGE.VI ?
                                                    item.timeTypeDataPatient.valueVi : item.timeTypeDataPatient.valueEn;
                                                let gender = language === LANGUAGE.VI ?
                                                    item.patientData.genderData.valueVi : item.patientData.genderData.valueEn;
                                                return (
                                                    <tr key={index}>
                                                        <td>{index + 1}</td>
                                                        <td>{item.timeTypeDataPatient.valueVi}</td>
                                                        <td>{item.patientData.firstName}</td>
                                                        <td>{item.patientData.phonenumber}</td>
                                                        <td>{gender}</td>
                                                        <td>
                                                            <button className='mp-btn-confirm'
                                                                onClick={() => this.handleBtnConfirm(item)}
                                                            >Xác nhận</button>
                                                        </td>
                                                    </tr>
                                                )
                                            })
                                            :
                                            <tr>
                                            </tr>
                                        }
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                    <RemedyModal
                        isOpenModal={isOpenRemedyModal}
                        dataModal={dataModal}
                        closeRemedyModal={this.closeRemedyModal}
                        sendRemedy={this.sendRemedy}
                    />
                </LoadingOverlay>
            </>
        );
    }

}

const mapStateToProps = state => {
    return {

        language: state.app.language,
        user: state.user.userInfo,

    };
};

const mapDispatchToProps = dispatch => {
    return {

        // changelanguageAppbyRedux: (language) => dispatch(actions.changelanguageApp(language))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ManagePatient);
