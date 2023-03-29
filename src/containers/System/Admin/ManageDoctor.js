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
            alldoctors: []
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

    }

    handleSaveContentMarkdown = () => {
        this.props.saveDetailDoctorRedux({
            contentHTML: this.state.contentHTML,
            contentMarkdown: this.state.contentMarkdown,
            description: this.state.description,
            doctorid: this.state.selectedDoctor.value
        })
    }

    handleEditorChange = ({ html, text }) => {
        this.setState({
            contentHTML: html,
            contentMarkdown: text,
        })

    }

    handleChange = (selectedDoctor) => {
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
                                Text
                            </textarea>

                        </div>
                    </div>
                    <div className='manage-doctor-editor'>
                        <MdEditor style={{ height: '500px' }} renderHTML={text => mdParser.render(text)}
                            onChange={this.handleEditorChange} />
                    </div>
                    <button
                        onClick={() => { this.handleSaveContentMarkdown() }}
                        className='save-content-doctor'>Lưu thông tin</button>
                </div >

            </React.Fragment>
        )
    }

}

const mapStateToProps = state => {
    return {
        language: state.app.language,
        doctorstoRedux: state.admin.alldoctors
    };
};

const mapDispatchToProps = dispatch => {
    return {
        fetchDoctorRedux: () => dispatch(actions.fetchAllDoctorStart()),
        saveDetailDoctorRedux: (data) => dispatch(actions.saveDetailDoctor(data))

    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ManageDoctor);
