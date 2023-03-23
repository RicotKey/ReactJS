import React, { Component } from 'react';
import { connect } from 'react-redux';

import * as actions from "../../store/actions";
import Navigator from '../../components/Navigator';
import { adminMenu } from './menuApp';
import {LANGUAGE} from '../../utils'
import './Header.scss';

class Header extends Component {

    changelanguage =(language) =>{
        this.props.changelanguageAppbyRedux(language)
    }

    render() {
        const { processLogout } = this.props;
        let language = this.props.language;
        return (
            <div className="header-container">
                {/* thanh navigator */}
                <div className="header-tabs-container">
                    <Navigator menus={adminMenu} />
                </div>
                <div className='language'>
                        <span className={language === LANGUAGE.VI ? 'language-vi active': 'language-vi'}><span onClick={()=>{this.changelanguage(LANGUAGE.VI)}}>VN</span></span>
                        <span className={language === LANGUAGE.EN ? 'language-en active': 'language-en'}><span onClick={()=>{this.changelanguage(LANGUAGE.EN)}}>EN</span></span>
                     {/* nút logout */}
                    <div className="btn btn-logout" onClick={processLogout}>
                        <i className="fas fa-sign-out-alt"></i>
                    </div>
                </div>
               
            </div>
        );
    }

}

const mapStateToProps = state => {
    return {
        isLoggedIn: state.user.isLoggedIn,
        language: state.app.language,    
    };
};

const mapDispatchToProps = dispatch => {
    return {
        processLogout: () => dispatch(actions.processLogout()),
        changelanguageAppbyRedux: (language) =>dispatch(actions.changelanguageApp(language))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Header);
