import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import { getAllCodeService } from '../../../services/userService'
import { CRUD_ACTIONS, dateFormat, LANGUAGE, CommonUtils } from '../../../utils';
import * as actions from '../../../store/actions'
import Carousel from 'react-images'
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { flatMap, times } from 'lodash';
import './UserRedux.scss'
import MarkdownIt from 'markdown-it';
import MdEditor from 'react-markdown-editor-lite';

import 'react-markdown-editor-lite/lib/index.css';
import './ManageDoctor.scss'
import Select from 'react-select';



const mdParser = new MarkdownIt(/* Markdown-it options */);



class ManageDoctor extends Component {
    constructor(props) {
        super(props)
        this.state = {
            contentHTML: '',
            contentMarkdown: '',
            selectedDoctor: '',
            description: '',
            alldoctors: [],
            doctorinfor: {},
            isEdit: false,


            listPrice: [],
            listPayment: [],
            listProvince: [],
            listClinic: [],
            listSpecialty: [],

            selectedPrice: '',
            selectedPayment: '',
            selectedProvince: '',
            selectedClinic: '',
            selectedSpecialty: '',

            nameClinic: '',
            addressClinic: '',
            note: '',
            clinicid: '',
            specialtyid: '',
        }
    }

    componentDidMount() {
        this.props.fetchDoctorRedux();
        this.props.getAllRequiredDoctorInfor();
    }


    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.doctorstoRedux !== this.props.doctorstoRedux) {
            let dataSelect = this.buildDataInputSelect(this.props.doctorstoRedux, 'USERS')
            this.setState({
                alldoctors: dataSelect
            })
        }
        if (prevState.selectedDoctor !== this.state.selectedDoctor) {
            this.props.fetchInforDoctorRedux(this.state.selectedDoctor.value);
        }
        if (prevProps.detailDoctorRedux !== this.props.detailDoctorRedux) {
            let infordoctor = this.props.detailDoctorRedux
            if (infordoctor && infordoctor.Markdown.contentHTML && infordoctor.Markdown.contentMarkdown
                && infordoctor.Markdown.description) {
                let { listPrice, listPayment, listProvince } = this.state
                if (infordoctor.Doctor_Infor) {
                    let priceid = infordoctor.Doctor_Infor.priceid
                    let paymentid = infordoctor.Doctor_Infor.paymentid
                    let provinceid = infordoctor.Doctor_Infor.provinceid
                    let nameClinic = infordoctor.Doctor_Infor.nameClinic
                    let addressClinic = infordoctor.Doctor_Infor.addressClinic
                    let note = infordoctor.Doctor_Infor.note

                    let selectedPrice = listPrice.find(item => {
                        return item && item.value === priceid
                    })

                    let selectedPayment = listPayment.find(item => {
                        return item && item.value === paymentid
                    })


                    let selectedProvince = listProvince.find(item => {
                        return item && item.value === provinceid
                    })
                    this.setState({
                        contentHTML: infordoctor.Markdown.contentHTML,
                        contentMarkdown: infordoctor.Markdown.contentMarkdown,
                        description: infordoctor.Markdown.description,
                        isEdit: true,

                        addressClinic: addressClinic,
                        nameClinic: nameClinic,
                        note: note,
                        selectedPayment: selectedPayment,
                        selectedPrice: selectedPrice,
                        selectedProvince: selectedProvince

                    })
                } else {
                    this.setState({
                        addressClinic: '',
                        nameClinic: '',
                        note: '',
                        selectedPayment: '',
                        selectedPrice: '',
                        selectedProvince: ''
                    })
                }


            } else {
                this.setState({
                    contentHTML: '',
                    contentMarkdown: '',
                    description: '',
                    isEdit: false,
                    addressClinic: '',
                    nameClinic: '',
                    note: ''
                })
            }
        }

        if (prevProps.allRequiredDoctorInfor !== this.props.allRequiredDoctorInfor) {
            let { resPayment, resPrice, resProvince, resSpecialty } = this.props.allRequiredDoctorInfor;

            let dataSelectPrice = this.buildDataInputSelect(resPrice, 'PRICE');
            let dataSelectPayment = this.buildDataInputSelect(resPayment, 'PAYMENT');
            let dataSelectProvince = this.buildDataInputSelect(resProvince, 'PROVINCE');
            let dataSelectSpecialty = this.buildDataInputSelect(resSpecialty, 'SPECIALTY');

            this.setState({
                listPrice: dataSelectPrice,
                listPayment: dataSelectPayment,
                listProvince: dataSelectProvince,
                listSpecialty: dataSelectSpecialty
            })
        }

        if (prevProps.language !== this.props.language) {
            let dataSelect = this.buildDataInputSelect(this.props.doctorstoRedux, 'USERS')
            let { resPayment, resPrice, resProvince } = this.props.allRequiredDoctorInfor;

            let dataSelectPrice = this.buildDataInputSelect(resPrice, 'PRICE');
            let dataSelectPayment = this.buildDataInputSelect(resPayment, 'PAYMENT');
            let dataSelectProvince = this.buildDataInputSelect(resProvince, 'PROVINCE');

            this.setState({
                alldoctors: dataSelect,
                listPrice: dataSelectPrice,
                listPayment: dataSelectPayment,
                listProvince: dataSelectProvince
            })
        }
    }

    handleSaveContentMarkdown = () => {
        let isEdit = this.state.isEdit;
        this.props.saveDetailDoctorRedux({
            contentHTML: this.state.contentHTML,
            contentMarkdown: this.state.contentMarkdown,
            description: this.state.description,
            doctorid: this.state.selectedDoctor.value,
            action: isEdit === true ? CRUD_ACTIONS.EDIT : CRUD_ACTIONS.CREATE,

            selectedPrice: this.state.selectedPrice.value,
            selectedPayment: this.state.selectedPayment.value,
            selectedProvince: this.state.selectedProvince.value,
            nameClinic: this.state.nameClinic,
            addressClinic: this.state.addressClinic,
            note: this.state.note,
            clinicid: this.state.selectedClinic && this.state.selectedClinic.value ? this.state.selectedClinic.value : '',
            specialtyid: this.state.selectedSpecialty.value

        })
    }

    handleEditorChange = ({ html, text }) => {
        this.setState({
            contentHTML: html,
            contentMarkdown: text,
        })

    }

    handleChangeSelectDoctorInfor = async (selectedDoctor, name) => {
        let stateName = name.name;
        let stateCopy = { ...this.state }
        stateCopy[stateName] = selectedDoctor;
        this.setState({
            ...stateCopy
        });
    };

    // handbleChangeSelect = async (selectedDoctor) =>{
    //     this.setState({selectedDoctor});


    //     let res = this.props.detailDoctorRedux;
    //     let markdown = res.Markdown;
    //     this.setState({

    //     })
    // }

    handbleOnChangeText = (event, id) => {
        let stateCopy = { ...this.state };
        stateCopy[id] = event.target.value;
        this.setState({
            ...stateCopy
        })
    }

    handbleOnChangeDesc = (event) => {
        this.setState({
            description: event.target.value
        })
    }

    buildDataInputSelect = (input, type) => {
        let result = [];
        let { language } = this.props;
        if (input && input.length > 0) {

            if (type === 'USERS') {
                input.map((item, index) => {
                    let object = {};
                    let labelVi = `${item.lastName} ${item.firstName}`
                    let labelEn = `${item.firstName} ${item.lastName} `
                    object.label = language === LANGUAGE.VI ? labelVi : labelEn;
                    object.value = item.id;

                    result.push(object)
                })
            }
            if (type === 'PRICE') {
                input.map((item, index) => {
                    let object = {};
                    let labelVi = `${item.valueVi} VND`
                    let labelEn = `${item.valueEn} USD`
                    object.label = language === LANGUAGE.VI ? labelVi : labelEn;
                    object.value = item.keyMap;
                    result.push(object)
                })
            }
            if (type === 'PAYMENT' || type === 'PROVINCE') {
                input.map((item, index) => {
                    let object = {};
                    let labelVi = `${item.valueVi}`
                    let labelEn = `${item.valueEn}`
                    object.label = language === LANGUAGE.VI ? labelVi : labelEn;
                    object.value = item.keyMap;
                    result.push(object)
                })
            }

            if (type === 'SPECIALTY') {
                input.map((item, index) => {
                    let object = {};
                    object.label = item.name;
                    object.value = item.id;
                    result.push(object)
                })
            }
        }
        return result;
    }
    render() {

        let { isEdit } = this.state
        return (

            <React.Fragment>
                <div className='manage-doctor-container'>
                    <div className='manage-doctor-title'>
                        <FormattedMessage id='admin.manage-doctor.title' />
                    </div>
                    <div className='more-infor'>
                        <div className='content-left form-group'>
                            <label><FormattedMessage id='admin.manage-doctor.select-doctor' /></label>
                            <Select
                                value={this.state.selectedDoctor}
                                onChange={this.handleChangeSelectDoctorInfor}
                                options={this.state.alldoctors}
                                placeholder={<FormattedMessage id="admin.manage-doctor.select-doctor" />}
                                name={'selectedDoctor'}
                            />
                        </div>
                        <div className='content-right'>
                            <label><FormattedMessage id='admin.manage-doctor.intro' /></label>
                            <textarea
                                onChange={(event) => { this.handbleOnChangeText(event, 'description') }}
                                value={this.state.description}
                                className='form-control' rows='4'>
                            </textarea>

                        </div>
                    </div>
                    <div className='more-infor-extra row'>
                        <div className='col-4 form-group'>
                            <label><FormattedMessage id="admin.manage-doctor.price" /></label>
                            <Select
                                value={this.state.selectedPrice}
                                options={this.state.listPrice}
                                placeholder={<FormattedMessage id='admin.manage-doctor.price' />}
                                onChange={this.handleChangeSelectDoctorInfor}
                                name="selectedPrice"
                            />
                        </div>
                        <div className='col-4 form-group'>
                            <label><FormattedMessage id="admin.manage-doctor.payment" /></label>
                            <Select
                                value={this.state.selectedPayment}
                                options={this.state.listPayment}
                                placeholder={<FormattedMessage id='admin.manage-doctor.payment' />}
                                onChange={this.handleChangeSelectDoctorInfor}
                                name='selectedPayment'
                            />
                        </div>
                        <div className='col-4 form-group'>
                            <label><FormattedMessage id="admin.manage-doctor.province" /></label>
                            <Select
                                value={this.state.selectedProvince}
                                options={this.state.listProvince}
                                placeholder={<FormattedMessage id='admin.manage-doctor.province' />}
                                onChange={this.handleChangeSelectDoctorInfor}
                                name='selectedProvince'
                            />
                        </div>
                        <div className='col-4 form-group'>
                            <label><FormattedMessage id='admin.manage-doctor.nameClinic' /></label>
                            <input className='form-control'
                                onChange={(event) => this.handbleOnChangeText(event, 'nameClinic')}
                                value={this.state.nameClinic}
                            />
                        </div>


                        <div className='col-4 form-group'>
                            <label><FormattedMessage id='admin.manage-doctor.addressClinic' /></label>
                            <input className='form-control'
                                onChange={(event) => this.handbleOnChangeText(event, 'addressClinic')}
                                value={this.state.addressClinic}
                            />
                        </div>


                        <div className='col-4 form-group'>
                            <label><FormattedMessage id='admin.manage-doctor.note' /></label>
                            <input className='form-control'
                                onChange={(event) => this.handbleOnChangeText(event, 'note')}
                                value={this.state.note}
                            />
                        </div>
                    </div>
                    <div className='row'>
                        <div className='col-4 form-group'>
                            <label><FormattedMessage id="admin.manage-doctor.specialty" /></label>
                            <Select
                                value={this.state.selectedSpecialty}
                                options={this.state.listSpecialty}
                                placeholder={<FormattedMessage id='admin.manage-doctor.specialty' />}
                                onChange={this.handleChangeSelectDoctorInfor}
                                name='selectedSpecialty'
                            />
                        </div>
                        <div className='col-4 form-group'>
                            <label><FormattedMessage id="admin.manage-doctor.select-clinic" /></label>
                            <Select
                                value={this.state.selectedClinic}
                                options={this.state.listClinic}
                                placeholder={<FormattedMessage id='admin.manage-doctor.select-clinic' />}
                                onChange={this.handleChangeSelectDoctorInfor}
                                name='selectedClinic'
                            />
                        </div>
                    </div>
                    <div className='manage-doctor-editor'>
                        <MdEditor style={{ height: '300px' }} renderHTML={text => mdParser.render(text)}
                            onChange={this.handleEditorChange}
                            value={this.state.contentMarkdown} />
                    </div>
                    <button
                        onClick={() => { this.handleSaveContentMarkdown() }}
                        className={isEdit === false ? 'save-content-doctor' : 'edit-infordoctor'}>
                        {isEdit === false ? <span><FormattedMessage id='admin.manage-doctor.add' /></span> : <span> <FormattedMessage id='admin.manage-doctor.save' /></span>} </button>
                </div >

            </React.Fragment>
        )
    }

}

const mapStateToProps = state => {
    return {
        language: state.app.language,
        doctorstoRedux: state.admin.alldoctors,
        detailDoctorRedux: state.admin.detaildoctor,
        allRequiredDoctorInfor: state.admin.allRequiredDoctorInfor
    };
};

const mapDispatchToProps = dispatch => {
    return {
        fetchDoctorRedux: () => dispatch(actions.fetchAllDoctorStart()),
        saveDetailDoctorRedux: (data) => dispatch(actions.saveDetailDoctor(data)),
        fetchInforDoctorRedux: (id) => dispatch(actions.fetchInforDoctorStart(id)),
        getAllRequiredDoctorInfor: () => dispatch(actions.getRequiredDoctorInfor())
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ManageDoctor);
