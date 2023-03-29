import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import { getAllCodeService } from '../../../services/userService'
import { CRUD_ACTIONS, dateFormat, LANGUAGE, CommonUtils } from '../../../utils';
import * as actions from '../../../store/actions'
import Carousel from 'react-images'
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { flatMap } from 'lodash';
import './UserRedux.scss'
import MarkdownIt from 'markdown-it';
import MdEditor from 'react-markdown-editor-lite';

import 'react-markdown-editor-lite/lib/index.css';
import './ManageDoctor.scss'
import Select from 'react-select';

const options = [
    { value: 'chocolate', label: 'Chocolate' },
    { value: 'strawberry', label: 'Strawberry' },
    { value: 'vanilla', label: 'Vanilla' },
];

const mdParser = new MarkdownIt(/* Markdown-it options */);



class ManageDoctor extends Component {
    constructor(props) {
        super(props)
        this.state = {
            contentHTML: '',
            contentMarkdown: '',
            selectedDoctor: '',
            description: '',
        }
    }

    componentDidMount() {

    }


    componentDidUpdate(prevProps, prevState, snapshot) {


    }

    handleSaveContentMarkdown = () => {
        console.log('Content: ', this.state)
    }

    handleEditorChange = ({ html, text }) => {
        this.setState({
            contentHTML: text,
            contentMarkdown: html,
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
                                options={options}
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

    };
};

const mapDispatchToProps = dispatch => {
    return {


    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ManageDoctor);
