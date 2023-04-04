import React, { Component } from 'react';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl'
import Slider from "react-slick";
class HandBook extends Component {


    render() {
        return (
            <div className='section-share section-handbook'>
                <div className='section-container'>
                    <div className='section-header'>
                        <span className='title-section'>Cẩm nang</span>
                        <button className='btn-section'>xem thêm</button>
                    </div>
                    <div className='section-body'>
                        <Slider {...this.props.settings}>
                            <div className='section-customize'>
                                <div className='bg-image section-handbook'></div>
                                <div>Sạch mụn sáng da chỉ với 3 bước</div>
                            </div>
                            <div className='section-customize'>
                                <div className='bg-image section-handbook'></div>
                                <div>Tự tin với nụ cười tỏa sáng</div>
                            </div>
                            <div className='section-customize'>
                                <div className='bg-image section-handbook'></div>
                                <div>Top 3 trung tâm y tế hàng đầu Việt Nam</div>
                            </div>
                            <div className='section-customize'>
                                <div className='bg-image section-handbook'></div>
                                <div>Chữa bệnh tại gia là như thế nào</div>
                            </div>
                            <div className='section-customize'>
                                <div className='bg-image section-handbook'></div>
                                <div></div>
                            </div>
                            <div className='section-customize'>
                                <div className='bg-image section-handbook'></div>
                                <div>Top 5 trang web đặt lịch online</div>
                            </div>
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
        language: state.app.language,
    };
};

const mapDispatchToProps = dispatch => {
    return {

    };
};

export default connect(mapStateToProps, mapDispatchToProps)(HandBook);