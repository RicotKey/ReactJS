import React, { Component } from 'react';
import { connect } from 'react-redux';

import { FormattedMessage } from 'react-intl'
import Slider from "react-slick";

class HomeFooter extends Component {


    render() {
        return (
            <div className='home-footer'>
                <p>&copy; 2023 	&#8711;Deadline Never Die. More information, please visit our github page &#9829;.
                    <a target="_blank" href='https://github.com/RicotKey'>  &#8594; Click Here &#8592;</a></p>
                <iframe width="50%" height="400px" src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d15673.710568264787!2d106.785373!3d10.8550427!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x317527c3debb5aad%3A0x5fb58956eb4194d0!2zxJDhuqFpIEjhu41jIEh1dGVjaCBLaHUgRQ!5e0!3m2!1svi!2s!4v1680623075255!5m2!1svi!2s" title="Hoa Cưới (H2O Remix) - Đạt Long Vinh | Rồi Người Rời Bước Thật Mau Mặc Vào Tà Áo Nàng Dâu Remix" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowFullScreen></iframe>
                <div style={{ height: '10px' }}></div>
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

export default connect(mapStateToProps, mapDispatchToProps)(HomeFooter);