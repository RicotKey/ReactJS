import React, { Component } from 'react';
import { connect } from 'react-redux';
import { LANGUAGE, USER_ROLE } from '../../../utils'
import { FormattedMessage } from 'react-intl'
import HomeHeader from '../../HomePage/HomeHeader'
import { postVerifyBookAppointment } from '../../../services/userService';
import './VerifyEmail.scss';
import _ from 'lodash'
class VerifyEmail extends Component {

    constructor(props) {
        super(props);
        this.state = {
            statusVerify: false,
            errCode: 0
        }
    }


    async componentDidMount() {
        if (this.props.location && this.props.location.search) {
            let urlParams = new URLSearchParams(this.props.location.search);
            let token = urlParams.get('token')
            let doctorid = urlParams.get('doctorid')
            let res = await postVerifyBookAppointment({
                token: token,
                doctorid: doctorid
            })

            if (res && res.errCode === 0) {
                this.setState({
                    statusVerify: true,
                    errCode: res.errCode
                })
            } else {
                this.setState({
                    statusVerify: true,
                    errCode: res && res.errCode ? res.errCode : -1
                })
            }
        }
    }
    render() {
        let { statusVerify, errCode } = this.state;
        return (
            <div >
                <HomeHeader />
                <div className='verify-email-container'>
                    {statusVerify === false ?
                        <div>Loangding data</div>
                        :
                        <div>
                            {+errCode === 0 ?
                                <div className='infor-booking'>Xác nhận lịch hẹn thành công</div> :
                                <div className='infor-booking'>Lịch hẹn không tồn tại hoặc đã được xác nhận!</div>
                            }
                        </div>
                    }
                </div>
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

export default connect(mapStateToProps, mapDispatchToProps)(VerifyEmail);
