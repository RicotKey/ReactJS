import React, { Component } from 'react';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import './ManageSpecialty.scss';
import MarkdownIt from 'markdown-it';
import MdEditor from 'react-markdown-editor-lite'
import { CommonUtils } from '../../../utils';

class ManageSpecialty extends Component {

    constructor(props) {
        super(props);
        this.state = {

        }
    }


    componentDidMount() {

    }
    render() {

        return (
            <div >

            </div>
        );
    }

}

const mapStateToProps = state => {
    return {

        language: state.app.language,

    };
};

const mapDispatchToProps = dispatch => {
    return {

        // changelanguageAppbyRedux: (language) => dispatch(actions.changelanguageApp(language))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ManageSpecialty);
