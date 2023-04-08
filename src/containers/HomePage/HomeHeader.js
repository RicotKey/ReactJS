import React, { Component } from 'react';
import { connect } from 'react-redux';
import './HomeHeader.scss';
import logo from "../../assets/logohutech.png"
import { FormattedMessage } from 'react-intl'
import { LANGUAGE } from '../../utils'
import { changelanguageApp } from '../../store/actions'
import { withRouter } from 'react-router';
class HomeHeader extends Component {

    changelanguage = (language) => {
        this.props.changelanguageAppbyRedux(language)
    }

    returntoHomePage = () => {
        this.props.history.push('/home')
        console.log('chek')
    }

    render() {
        let language = this.props.language;
        return (
            <React.Fragment>
                <div className='home-header-container'>
                    <div className='home-header-content'>
                        <div className='left-content'>
                            <i className='fas fa-bars'></i>
                            <img className='header-logo' src={logo} onClick={() => this.returntoHomePage()}></img>
                        </div>
                        <div className='center-content'>
                            <div className='child-content'>
                                <div><b><FormattedMessage id='homeheader.specialty' /></b></div>
                                <div className='subs-title'><FormattedMessage id='homeheader.findspecialty' /></div>
                            </div>
                            <div className='child-content'>
                                <div><b><FormattedMessage id='homeheader.facilities' /></b></div>
                                <div className='subs-title'><FormattedMessage id='homeheader.hospital' /></div>
                            </div>
                            <div className='child-content'>
                                <div><b><FormattedMessage id='homeheader.doctor' /></b></div>
                                <div className='subs-title'><FormattedMessage id='homeheader.choosedoctor' /></div>
                            </div>
                            <div className='child-content'>
                                <div><b><FormattedMessage id='homeheader.package' /></b></div>
                                <div className='subs-title'><FormattedMessage id='homeheader.general' /></div>
                            </div>
                        </div>
                        <div className='right-content'>
                            <div className='support'><i className='fas fa-question-circle'></i><FormattedMessage id='homeheader.support' /></div>
                            <div className={language === LANGUAGE.VI ? 'language-vi active' : 'language-vi'}><span onClick={() => { this.changelanguage(LANGUAGE.VI) }}>VN</span></div>
                            <div className={language === LANGUAGE.EN ? 'language-en active' : 'language-en'}><span onClick={() => { this.changelanguage(LANGUAGE.EN) }}>EN</span></div>
                        </div>
                    </div>
                </div>
                {this.props.isShowBanner === true &&
                    <div className='home-header-banner'>
                        <div className='content-up'>
                            <div className='title1'><FormattedMessage id='banner.title1' /></div>
                            <div className='title2'><FormattedMessage id='banner.title2' /></div>
                            <div className='search'>
                                <i className='fas fa-search'></i>
                                <input placeholder='Search Doctor'></input>
                            </div>
                        </div>
                        <div className='content-down'>
                            <div className='options'>
                                <div className='option-child'>
                                    <div className='icon-child'><i className='far fa-hospital'></i></div>
                                    <div className='text-child'><FormattedMessage id='banner.text-child1' /></div>
                                </div>
                                <div className='option-child'>
                                    <div className='icon-child'><i className='fas fa-mobile-alt'></i></div>
                                    <div className='text-child'><FormattedMessage id='banner.text-child2' /></div>
                                </div>
                                <div className='option-child'>
                                    <div className='icon-child'><i className='fas fa-flask'></i></div>
                                    <div className='text-child'><FormattedMessage id='banner.text-child3' /></div>
                                </div>
                                <div className='option-child'>
                                    <div className='icon-child'><i className='fas fa-procedures'></i></div>
                                    <div className='text-child'><FormattedMessage id='banner.text-child4' /></div>
                                </div>
                                <div className='option-child'>
                                    <div className='icon-child'><i className='fas fa-user-md'></i></div>
                                    <div className='text-child'><FormattedMessage id='banner.text-child5' /></div>
                                </div>
                                <div className='option-child'>
                                    <div className='icon-child'><i className="fas fa-briefcase-medical"></i></div>
                                    <div className='text-child'><FormattedMessage id='banner.text-child6' /></div>
                                </div>
                            </div>
                        </div>

                    </div>
                }
            </React.Fragment>
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
        changelanguageAppbyRedux: (language) => dispatch(changelanguageApp(language))
    };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(HomeHeader));