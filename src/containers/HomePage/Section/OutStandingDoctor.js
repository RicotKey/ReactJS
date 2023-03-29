import React, { Component } from 'react';
import { connect } from 'react-redux';
import { LANGUAGE } from '../../../utils';
import { FormattedMessage } from 'react-intl'
import Slider from "react-slick";
import * as actions from '../../../store/actions'
class OutStandingDoctor extends Component {

    constructor(props) {
        super(props)

        this.state = {
            arrDoctors: []
        }
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.topdoctorsRedux !== this.props.topdoctorsRedux) {
            this.setState({
                arrDoctors: this.props.topdoctorsRedux
            })
        }
    }

    componentDidMount() {
        this.props.fetchTopDoctorRedux()
    }

    render() {

        let topDoctors = this.state.arrDoctors
        let language = this.props.language
        return (

            <div className='section-share section-outstanding-doctor'>
                <div className='section-container'>
                    <div className='section-header'>
                        <span className='title-section'><FormattedMessage id='homepage.outstandingdoctor.outstandingdoctor' /></span>
                        <button className='btn-section'><FormattedMessage id='homepage.outstandingdoctor.more-infor' /></button>
                    </div>
                    <div className='section-body'>
                        <Slider {...this.props.settings}>

                            {topDoctors && topDoctors.length > 0 && topDoctors.map((item, index) => {
                                let imageBase64 = ''
                                if (item.image) {

                                    imageBase64 = new Buffer(item.image, 'base64').toString('binary')


                                }
                                let nameVi = `${item.positionData.valueVi}, ${item.lastName} ${item.firstName}`
                                let nameEn = `${item.positionData.valueEn}, ${item.firstName} ${item.lastName}`
                                return (
                                    <div className='section-customize' key={index}>
                                        <div className='boder-customize'>
                                            <div className='outer-bg'>
                                                <div className='bg-image section-outstanding-doctor'
                                                    style={{ backgroundImage: `url(${imageBase64})` }}
                                                ></div>
                                            </div>

                                            <div className='positon text-center'>
                                                <div>{language === LANGUAGE.VI ? nameVi : nameEn}</div>
                                                <div>Khoa nhi đồng</div>
                                            </div>
                                        </div>
                                    </div>
                                )
                            })}
                        </Slider>
                    </div>
                </div>
            </div>
        );
    }

}

const mapStateToProps = state => {
    return {
        isLoggedIn: state.user.isLoggedIn,
        topdoctorsRedux: state.admin.doctors,
        language: state.app.language
    };
};

const mapDispatchToProps = dispatch => {
    return {
        fetchTopDoctorRedux: () => dispatch(actions.fetchTopDoctorStart()),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(OutStandingDoctor);