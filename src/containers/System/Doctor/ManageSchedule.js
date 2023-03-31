import React, { Component } from 'react';
import { connect } from "react-redux";
import { FormattedMessage } from 'react-intl'
import './ManageSchedule.scss'
import { CRUD_ACTIONS, LANGUAGE, dateFormat } from '../../../utils';
import moment from 'moment'
import DatePicker from '../../../components/Input/DatePicker';
import * as actions from '../../../store/actions'
import Select from 'react-select';
import _ from 'lodash'
import { toast } from 'react-toastify';
import { saveBulkScheduleDoctor } from '../../../services/userService';


class ManageSchedule extends Component {
    constructor(props) {
        super(props);
        this.state = {
            listDoctors: [],
            selectedDoctor: {},
            currentDate: '',
            rangeTime: []
        }
    }
    componentDidMount() {
        this.props.fetchAllDoctors();
        this.props.fetchAllScheduleTime();
    }
    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.allDoctors !== this.props.allDoctors) {
            let dataSelect = this.builDataInputSelect(this.props.allDoctors)
            this.setState({
                listDoctors: dataSelect
            })
        }

        if (prevProps.allScheduleTime !== this.props.allScheduleTime) {
            let data = this.props.allScheduleTime;
            if (data && data.length > 0) {
                data = data.map(item => ({ ...item, isSelected: false }))
            }
            this.setState({
                rangeTime: data
            })
        }
    }

    handleClickBtnTime = (time) => {
        let { rangeTime } = this.state;
        if (rangeTime && rangeTime.length > 0) {
            rangeTime = rangeTime.map(item => {
                if (item.id === time.id) item.isSelected = !item.isSelected;
                return item;
            })
            this.setState({
                rangeTime: rangeTime
            })
        }
    }

    handleSaveSchedule = async () => {
        let { rangeTime, selectedDoctor, currentDate } = this.state;
        let result = [];

        if (!currentDate) {
            toast.error("Date Missing!")
            return;
        }
        if (selectedDoctor && _.isEmpty(selectedDoctor)) {
            toast.error("Doctor Missing!")
            return;
        }

        // let formateDate = moment(currentDate).format(dateFormat.SEND_TO_SERVER);
        let formateDate = new Date(currentDate).getTime();

        if (!formateDate) {
            toast.error("Date Missing!")
            return;
        }
        if (rangeTime && rangeTime.length > 0) {
            let seletedTime = rangeTime.filter(item => item.isSelected === true);
            if (seletedTime && seletedTime.length > 0) {
                seletedTime.map((schedule, index) => {
                    let object = {};
                    object.doctorid = selectedDoctor.value;
                    object.date = formateDate;
                    object.timeType = schedule.keyMap;
                    result.push(object);
                })
            } else {
                toast.error("Time Missing!")
                return;
            }
        }
        let res = await saveBulkScheduleDoctor({
            arrSchedule: result,
            doctorid: selectedDoctor.value,
            formatedDate: formateDate
        })
        if (res.errCode === 0) {
            toast.success("Save Schedule Success")
        }
    }

    builDataInputSelect = (inputData) => {

        let result = [];
        let { language } = this.props;
        if (inputData && inputData.length > 0) {
            inputData.map((item, index) => {
                let object = {};
                let labelVi = `${item.lastName} ${item.firstName}`;
                let labelEn = `${item.firstName} ${item.lastName}`;
                object.label = language === LANGUAGE.VI ? labelVi : labelEn;
                object.value = item.id
                result.push(object)
            })
        }
        return result;

    }


    handelChangeSelect = async (selectedOption) => {

        this.setState({ selectedDoctor: selectedOption });
    }

    handelOnchangeDatePicket = (date) => {
        this.setState({
            currentDate: date[0]
        })
    }

    render() {
        let { rangeTime } = this.state;
        let { language } = this.props;
        return (
            <div className='manage-schedule-container'>
                <div className='m-s-title'>
                    {<FormattedMessage id="manage-schedule.title" />}
                </div>
                <div className='container'>
                    <div className='row'>
                        <div className='col-6 form-group'>
                            <label> <FormattedMessage id="manage-schedule.choose-doctor" /></label>
                            <Select
                                value={this.state.selectedDoctor}
                                onChange={this.handelChangeSelect}
                                options={this.state.listDoctors}
                            />

                        </div>

                        <div className='col-6 form-group'>
                            <label><FormattedMessage id="manage-schedule.choose-date" /></label>
                            <DatePicker
                                onChange={this.handelOnchangeDatePicket}
                                className="form-control"
                                value={this.state.currentDate}
                                minDate={new Date()}
                            />
                        </div>
                        <div className='col-12 pick-hour-container'>
                            {rangeTime && rangeTime.length > 0 && rangeTime.map((item, index) => {
                                return (
                                    <button className={item.isSelected === true ? "btn btn-schedule active" : 'btn btn-schedule'}
                                        key={index}
                                        onClick={() => this.handleClickBtnTime(item)}
                                    >
                                        {language === LANGUAGE.VI ? item.valueVi : item.valueEn}
                                    </button>
                                )
                            })}
                        </div>
                        <div className='col-12'>
                            <button className='btn btn-primary btn-save-schedule'
                                onClick={() => this.handleSaveSchedule()}
                            >
                                <FormattedMessage id="manage-schedule.save" />
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        language: state.app.language,
        allDoctors: state.admin.alldoctors,
        allScheduleTime: state.admin.allScheduleTime
    };
};

const mapDispatchToProps = dispatch => {
    return {
        fetchAllDoctors: () => dispatch(actions.fetchAllDoctorStart()),
        fetchAllScheduleTime: () => dispatch(actions.fetchAllScheduleTimeStart())

    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ManageSchedule);
