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
            isEdit: false
        }
    }

    componentDidMount() {
        this.props.fetchDoctorRedux();
    }


    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.doctorstoRedux !== this.props.doctorstoRedux) {
            let dataSelect = this.buildDataInuputSelect(this.props.doctorstoRedux)
            this.setState({
                alldoctors: dataSelect
            })
        }

        if (prevProps.language !== this.props.language) {
            let dataSelect = this.buildDataInuputSelect(this.props.doctorstoRedux)
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

    buildDataInuputSelect = (input) => {
        let result = [];
        let { language } = this.props;
        if (input && input.length > 0) {
            input.map((item, index) => {
                let object = {};
                let labelVi = `${item.lastName} ${item.firstName}`;
                let labelEn = `${item.firstName} ${item.lastName} `

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
                        Tạo thêm thông tin doctor
                    </div>
                    <div className='more-infor'>
                        <div className='content-left form-group'>
                            <label>Chọn bác sĩ</label>
                            <Select
                                value={this.state.selectedDoctor}
                                onChange={this.handleChange}
                                options={this.state.alldoctors}

                            />
                        </div>
                        <div className='content-right'>
                            <label>Thông tin giới thiệu</label>
                            <textarea
                                onChange={(event) => { this.handbleOnChangeDesc(event) }}
                                value={this.state.description}
                                className='form-control' rows='4'>
                            </textarea>

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
                        {isEdit === false ? <span>Lưu thông tin</span> : <span> Sửa thông tin</span>} </button>
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
    };
};

const mapDispatchToProps = dispatch => {
    return {
        fetchDoctorRedux: () => dispatch(actions.fetchAllDoctorStart()),
        saveDetailDoctorRedux: (data) => dispatch(actions.saveDetailDoctor(data)),
        fetchInforDoctorRedux: (id) => dispatch(actions.fetchInforDoctorStart(id)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ManageDoctor);
