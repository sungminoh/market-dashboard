/* global $:true */
import React, { PropTypes } from 'react';
import moment from 'moment';

class DateRange extends React.Component {
  componentDidMount() {
      this.initMode();
  }

  componentDidUpdate() {
      this.initMode();
  }

  initMode() {
    const $inputButton = this.$inputButton;
    const {
      mode,
      start,
      end,
      gap,
      onChange,
    } = this.props;

    let options;

    switch(mode) {
      case 'daily':
        options = this.getDailyOptions(start, end, gap);
        break;
      case 'hourly':
        options = this.getHourlyOptions(start, end, gap);
        break;
      case 'minutely':
        options = this.getMinutelyOptions(start, end, gap);
        break;
      default:
        options = this.getDailyOptions(start, end, gap);
        break;
    }

    $inputButton.daterangepicker(options, onChange);
  }

  getMinutelyOptions(start, end, gap) {
    let formattedEndDate, formattedStartDate;
    if(start && end){
      formattedEndDate = moment(end).format('YYYY-MM-DD HH:mm');
      formattedStartDate = moment(start).format('YYYY-MM-DD HH:mm');
    }else{
      const nowDate = moment();
      formattedEndDate = nowDate.format('YYYY-MM-DD HH:mm');
      gap = gap ? gap : 60 * 12;
      formattedStartDate = nowDate.set('minute', nowDate.minute() - gap).format('YYYY-MM-DD HH:mm');
    }

    return {
      timePicker: true,
      timePicker24Hour: true,
      timePickerIncrement: 1,
      startDate: formattedStartDate,
      endDate: formattedEndDate,
      opens: 'center',
      locale: {
        format: 'YYYY-MM-DD HH:mm'
      }
    };
  }

  getHourlyOptions(start, end, gap) {
    let formattedEndDate, formattedStartDate;
    if(start && end){
      formattedEndDate = moment(end).format('YYYY-MM-DD HH:00');
      formattedStartDate = moment(start).format('YYYY-MM-DD HH:00');
    }else{
      const nowDate = moment();
      formattedEndDate = nowDate.format('YYYY-MM-DD HH:00');
      gap = gap ? gap : 24 * 7;
      formattedStartDate = nowDate.set('hour', nowDate.hour() - gap).format('YYYY-MM-DD HH:00');
    }

    return {
      timePicker: true,
      timePicker24Hour: true,
      timePickerIncrement: 60,
      startDate: formattedStartDate,
      endDate: formattedEndDate,
      opens: 'center',
      locale: {
        format: 'YYYY-MM-DD HH:00'
      }
    };
  }

  getDailyOptions(start, end, gap) {
    let formattedEndDate, formattedStartDate;
    if(start && end){
      formattedEndDate = moment(end).format('YYYY-MM-DD 23:59');
      formattedStartDate = moment(start).format('YYYY-MM-DD 00:00');
    }else{
      const nowDate = moment();
      formattedEndDate = nowDate.format('YYYY-MM-DD 23:59');
      gap = gap ? gap : 100;
      formattedStartDate = nowDate.set('month', nowDate.date() - gap).format('YYYY-MM-DD 00:00');
    }

    return {
      timePicker: false,
      startDate: formattedStartDate,
      endDate: formattedEndDate,
      opens: 'center',
      locale: {
        format: 'YYYY-MM-DD'
      }
    };
  }

  render() {
    const {
      title,
    } = this.props;
    return (
      <div>
        {title ? <label>Date Range</label> : null}
        <div className="input-group">
          <div className="input-group-addon">
            <span><i className="fa fa-calendar" /></span>
          </div>
          <input
            ref={(ref) => this.$inputButton = $(ref)}
            name="daterange"
            type='text'
            className='form-control'/>
        </div>
      </div>
    );
  }
}

DateRange.propTypes = {
  mode: PropTypes.string,
  start: PropTypes.string,
  end: PropTypes.string,
  onChange: PropTypes.func,
  title: PropTypes.string,
};

DateRange.defaultProps = {
  mode: '',
  start: '',
  end: '',
  onChange: _ => _,
  title: '',
};

export default DateRange;
