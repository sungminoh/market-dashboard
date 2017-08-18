import React, { PropTypes } from 'react';
import CSSModules from 'react-css-modules';
import moment from 'moment';
import { changeDateRange } from '../../../actions/petroAction';
import { createConnectComponent } from '../../../utils/componentUtil';
import styles from './InputForm.css';
import FormContainer from '../../common/FormContainer';
import DateRange from '../../common/DateRange';

import {Checkbox, Radio} from 'react-icheck';

class InputForm extends FormContainer {
  constructor(props){
    super(props);
  }

  onChangeDateRange(start, end){
    const startDate = start.format('YYYYMMDD');
    const endDate = end.format('YYYYMMDD');
    this.props.dispatch(changeDateRange(startDate, endDate));
  }

  render() {
    const {
      startDate,
      endDate,
    } = this.props;

    return (
      <div styleName="input-form--wrap">
        <form>
          <div className="box">
            <div className="box-body">
              <div styleName="input-form--editor-container">
                <div styleName="input-form--daterange">
                  <DateRange
                    title="Date Range"
                    mode="daily"
                    start={startDate}
                    end={endDate}
                    onChange={this.onChangeDateRange.bind(this)}/>
                </div>
              </div>
            </div>
          </div>
        </form>
      </div>
    );
  }
}

InputForm.propTypes = {
  dispatch: PropTypes.func.isRequired,
  starDate: PropTypes.string,
  endDate: PropTypes.string,
};

InputForm.defaultProps = {
  startDate: '',
  endDate: '',
}

export default createConnectComponent(
  CSSModules(InputForm, styles, {allowMultiple: true}),
  (state) => {
    const {
      startDate,
      endDate,
    } = state.petroReducer;

    return {
      startDate,
      endDate,
    };
  }
);
