import React, { Component } from 'react';
import { connect } from 'react-redux';

import {FormattedMessage} from 'react-intl'
import Slider from "react-slick";

class About extends Component {

    
    render() {
        return (
            <div className='section-share section-about'>
                <div className='section-about-header'>
                    Nhạc thư giãn giảm căng thẳng
                </div>
                <div className='section-about-content'>
                    <div className='content-left'>
                    <iframe width="100%" height="400px" src="https://www.youtube.com/embed/lxUKyGoBp_U" title="Hoa Cưới (H2O Remix) - Đạt Long Vinh | Rồi Người Rời Bước Thật Mau Mặc Vào Tà Áo Nàng Dâu Remix" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>
                    </div>
                    
                    <div className='content-right'>
                    <i className="fas fa-code"></i>
                    <span style={{color:'#FF0000'}}> D</span><span style={{color:'#FF5A00'}}>e</span><span style={{color:'#FF5A00'}}>a</span><span style={{color:'#EFFF00'}}>d</span><span style={{color:'#95FF00'}}>l</span><span style={{color:'#3BFF00'}}>i</span><span style={{color:'#00FF1E'}}>n</span><span style={{color:'#00FFD2'}}>e </span><span style={{color:'#00D1FF '}}>N</span><span style={{color:'#0077FF'}}>e</span><span style={{color:'#001DFF'}}>v</span><span style={{color:'#3C00FF'}}>e</span><span style={{color:'#F000FF'}}>r </span><span style={{color:'#FF00B3'}}>Di</span><span style={{color:'#FF0059'}}>e </span>
                    <i className="fas fa-code"></i>    
                            <p>
                            .Nguyễn Bùi Hoàng Phước &#8594; Leader
                            </p>
                            <p>
                            .Lê Trọng Phước &#8594; Front-end
                            </p>
                            <p>
                            .Trần Thanh Phước &#8594; Database
                            </p>
                            <p>
                            .Trần Hữu Quang &#8594; Back-end
                            </p>
                            <p>
                            .Trương Phúc Tấn &#8594; Phù hộ
                            </p>
                        
                    </div>
                </div>
            </div>
        )
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

export default connect(mapStateToProps, mapDispatchToProps)(About);