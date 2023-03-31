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
            selectedPrice: '',
            selectedPayment: '',
            selectedProvince: '',
            nameClinic: '',
            addressClinic: '',
            note: ''
        }
    }

    componentDidMount() {
        this.props.fetchDoctorRedux();
        this.props.getAllRequiredDoctorInfor();
    }


    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.doctorstoRedux !== this.props.doctorstoRedux) {
            let dataSelect = this.buildDataInputSelect(this.props.doctorstoRedux)
            this.setState({
                alldoctors: dataSelect
            })
        }

        if (prevProps.language !== this.props.language) {
            let dataSelect = this.buildDataInputSelect(this.props.doctorstoRedux)
            this.setState({
                alldoctors: dataSelect
            })
        }

        if (prevProps.detailDoctorRedux !== this.props.detailDoctorRedux) {
            let infordoctor = this.props.detailDoctorRedux
            if (infordoctor && infordoctor.Markdown.contentHTML && infordoctor.Markdown.contentMarkdown
                && infordoctor.Markdown.description) {
                this.setState({
                    contentHTML: infordoctor.Markdown.contentHTML,
                    contentMarkdown: infordoctor.Markdown.contentMarkdown,
                    description: infordoctor.Markdown.description,
                    isEdit: true
                })
            } else {
                this.setState({
                    contentHTML: '',
                    contentMarkdown: '',
                    description: '',
                    isEdit: false
                })
            }
        }

        if (prevProps.allRequiredDoctorInfor !== this.props.allRequiredDoctorInfor) {
            let { resPayment, resPrice, resProvince } = this.props.allRequiredDoctorInfor;

            let dataSelectPrice = this.buildDataInputSelect(resPrice);
            let dataSelectPayment = this.buildDataInputSelect(resPayment);
            let dataSelectProvince = this.buildDataInputSelect(resProvince);

            this.setState({
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
            action: isEdit === true ? CRUD_ACTIONS.EDIT : CRUD_ACTIONS.CREATE
        })
        this.setState({
            contentHTML: '',
            contentMarkdown: '',
            description: '',
            selectedDoctor: '',
            isEdit: false
        })
    }

    handleEditorChange = ({ html, text }) => {
        this.setState({
            contentHTML: html,
            contentMarkdown: text,
        })

    }

    handleChange = (selectedDoctor) => {
        this.props.fetchInforDoctorRedux(selectedDoctor.value)
        this.setState({
            selectedDoctor: selectedDoctor
        });
    };

    handbleOnChangeDesc = (event) => {
        this.setState({
            description: event.target.value
        })
    }

    buildDataInputSelect = (input, type) => {
        let result = [];
        let { language } = this.props;
        if (input && input.length > 0) {
            input.map((item, index) => {
                let object = {};
                let labelVi = type === 'USERS' ? `${item.lastName} ${item.firstName}` : item.valueVi
                let labelEn = type === 'USERS' ? `${item.firstName} ${item.lastName} ` : item.valueEn

                object.label = language === LANGUAGE.VI ? labelVi : labelEn;
                object.value = item.id;
                result.push(object)
            })
        }
        return result;
    }
    render() {

        let isEdit = this.state.isEdit
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
                                onChange={this.handleChange}
                                options={this.state.alldoctors}
                                placeholder={'Chọn bác sĩ'}
                            />
                        </div>
                        <div className='content-right'>
                            <label><FormattedMessage id='admin.manage-doctor.intro' /></label>
                            <textarea
                                onChange={(event) => { this.handbleOnChangeDesc(event) }}
                                value={this.state.description}
                                className='form-control' rows='4'>
                            </textarea>

                        </div>
                    </div>
                    <div className='more-infor-extra row'>
                        <div className='col-4 form-group'>
                            <label>Chọn giá</label>
                            <Select
                                options={this.state.listPrice}
                                placeholder={'Chọn giá'}
                            />
                        </div>
                        <div className='col-4 form-group'>
                            <label>Chọn phương thức thanh toán</label>
                            <Select
                                options={this.state.listPayment}
                                placeholder={'Chọn phương thức thanh toán'}
                            />
                        </div>
                        <div className='col-4 form-group'>
                            <label>Chọn tỉnh thành</label>
                            <Select
                                options={this.state.listProvince}
                                placeholder={'Chọn tỉnh thành'}
                            />
                        </div>

                        <div className='col-4 form-group'>
                            <label>Tên phòng khám</label>
                            <input className='form-control' />
                        </div>

                        <div className='col-4 form-group'>
                            <label>Địa chỉ phòng khám</label>
                            <input className='form-control' />
                        </div>

                        <div className='col-4 form-group'>
                            <label>Note</label>
                            <input className='form-control' />
                        </div>
                    </div>
                    <div className='manage-doctor-editor'>
                        <MdEditor style={{ height: '500px' }} renderHTML={text => mdParser.render(text)}
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
