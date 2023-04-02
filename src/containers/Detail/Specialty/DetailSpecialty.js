import React, { Component } from 'react';
import { connect } from 'react-redux';
import HomeHeader from '../../HomePage/HomeHeader'
import './DetailSpecialty.scss';
import _ from 'lodash'
class DetailSpecialty extends Component {

    constructor(props) {
        super(props);
        this.state = {

        }
    }


    componentDidMount() {

    }
    render() {

        return (
            <>
                <HomeHeader />
                <div >
                    Detail Specialty
                </div>
            </>
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

export default connect(mapStateToProps, mapDispatchToProps)(DetailSpecialty);
