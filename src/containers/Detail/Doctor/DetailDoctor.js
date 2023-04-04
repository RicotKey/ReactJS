import React, { Component } from 'react';
import { connect } from "react-redux";
import HomeHeader from '../../HomePage/HomeHeader';
import './DetailDoctor.scss'
import * as actions from '../../../store/actions'
import { result } from 'lodash';
import { LANGUAGE } from '../../../utils';
import DoctorSchedule from './DoctorSchedule';
import DoctorExtraInfor from './DoctorExtraInfor';
class DetailDoctor extends Component {
    constructor(props) {
        super(props)
        this.state = {
            detailDoctor: {},
            currentDoctorid: -1,

        }
    }

    componentDidMount() {
        if (this.props.match && this.props.match.params && this.props.match.params.id) {
            let id = this.props.match.params.id
            this.props.fetchInforDoctorRedux(id)
            this.setState({
                currentDoctorid: id
            })
        }
    }
    // if (user.image) {
    //     this.setState({
    //         imageBase64: new Buffer(user.image, 'base64').toString('binary')
    //     })

    // }
    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.detailDoctorRedux !== this.props.detailDoctorRedux) {
            this.setState({
                detailDoctor: this.props.detailDoctorRedux
            })
        }
    }

    convertBase64toString = (image) => {
        let result = '';
        if (image) {
            return result = new Buffer(image, 'base64').toString('binary')
        }
    }

    render() {
        let language = this.props.language
        let doctor = this.state.detailDoctor
        let image = this.convertBase64toString(doctor.image)
        let nameVi = ''
        let nameEn = ''
        if (doctor && doctor.positionData) {
            nameVi = `${doctor.positionData.valueVi}, ${doctor.lastName} ${doctor.firstName}`
            nameEn = `${doctor.positionData.valueEn}, ${doctor.firstName} ${doctor.lastName}`
        }

        return (
            <>

                <HomeHeader isShowBanner={false} />
                <div className='doctor-detail-container'>
                    <div className='intro-doctor'>
                        <div className='content-left' style={{ backgroundImage: `url(${image ? image : ''} )` }}></div>
                        <div className='content-right'>
                            <div className='up'>
                                {language === LANGUAGE.VI ? nameVi : nameEn}
                            </div>
                            <div className='down'>{
                                doctor.Markdown && doctor.Markdown.description &&
                                <span>
                                    {doctor.Markdown.description}
                                </span>
                            }</div>
                        </div>
                    </div>
                    <div className='schedule-doctor'>
                        <div className='content-left'>
                            <DoctorSchedule doctoridFromParent={this.state.currentDoctorid} />
                        </div>
                        <div className='content-right'>
                            <DoctorExtraInfor doctoridFromParent={this.state.currentDoctorid} />
                        </div>
                    </div>
                    <div className='detail-infor-doctor'>
                        {doctor && doctor.Markdown && doctor.Markdown.contentHTML &&
                            <div dangerouslySetInnerHTML={{ __html: doctor.Markdown.contentHTML }}></div>
                        }
                    </div>
                    <div className='comment-doctor'></div>
                </div>

            </>
        );
    }
}

const mapStateToProps = state => {
    return {
        detailDoctorRedux: state.admin.detaildoctor,
        language: state.app.language
    };
};

const mapDispatchToProps = dispatch => {
    return {
        fetchInforDoctorRedux: (id) => dispatch(actions.fetchInforDoctorStart(id)),

    };
};

export default connect(mapStateToProps, mapDispatchToProps)(DetailDoctor);
