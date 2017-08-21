import React, { PropTypes } from 'react';
import CSSModules from 'react-css-modules';
import moment from 'moment';
import Select from 'react-select';
import { setSelected, fetchChartData } from '../../../actions/petroAction';
import { createConnectComponent } from '../../../utils/componentUtil';
import styles from './InputForm.css';
import FormContainer from '../../common/FormContainer';
import DateRange from '../../common/DateRange';

import {Checkbox, Radio} from 'react-icheck';


const keys2Options = keys => keys.map(key => ({value: key, label: key}));

class InputForm extends FormContainer {
  constructor(props){
    super(props);
  }

  //onChangeDateRange(start, end){
    //const startDate = start.format('YYYYMMDD');
    //const endDate = end.format('YYYYMMDD');
    //this.props.dispatch(changeDateRange(startDate, endDate));
  //}

  onChangeMaterialSelect(selected){
    this.props.dispatch(setSelected(selected));
  }

  render() {
    const {
      dataType,
      selected,
      keys,
    } = this.props;
    return (
      <div styleName="input-form--wrap">
        <form>
          <div className="box">
            <div className="box-body">
              <div styleName="input-form--editor-container">
                {/*
                <div styleName="input-form--daterange">
                  <DateRange
                    title="Date Range"
                    mode="daily"
                    start={startDate}
                    end={endDate}
                    onChange={this.onChangeDateRange.bind(this)}/>
                </div>
                */}
                <div styleName="input-form--multiselect">
                  <div className="form-group">
                    <label>Select materials</label>
                    {dataType === 'daily' ?
                      <Select
                        multi
                        simpleValue
                        id="selected-material"
                        value={selected}
                        placeholder={"All"}
                        options={keys2Options(keys)}
                        onChange={this.onChangeMaterialSelect.bind(this)}
                      /> :
                      <Select
                        simpleValue
                        id="selected-material"
                        value={selected}
                        placeholder={"All"}
                        options={keys2Options(keys)}
                        onChange={this.onChangeMaterialSelect.bind(this)}
                      />
                    }
                  </div>
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
  dataType: PropTypes.string,
  selected: PropTypes.string,
  keys: PropTypes.array,
};

InputForm.defaultProps = {
  selected: '',
  keys: [],
}

export default createConnectComponent(
  CSSModules(InputForm, styles, {allowMultiple: true}),
  (state) => {
    const {
      dataType,
      selected,
      keys,
    } = state.petroReducer;

    return {
      dataType,
      selected,
      keys,
    };
  }
);
