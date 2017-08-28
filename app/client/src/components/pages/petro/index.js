import React, { PropTypes } from 'react';
import queryString from 'query-string';
import moment from 'moment';
import InputForm from './InputForm';
import ChartTab from './ChartTab';
import { createConnectComponent } from '../../../utils/componentUtil';
import { setDataType, setSelected, fetchChartData, fetchChartKeys } from '../../../actions/petroAction';
import FormContainer from '../../common/FormContainer';


class Petro extends FormContainer {
  constructor(props) {
    super(props);
  }

  componentWillMount(){
    let query = queryString.parse(this.props.location.search);
    let dataType = query.dataType || 'daily';
    let selected = query.selected || '';
    const {
      dispatch
    } = this.props;
    dispatch(setDataType(dataType));
    dispatch(setSelected(selected));
    dispatch(fetchChartKeys());
  }

  componentDidMount(){
    this.componentWillReceiveProps(this.props);
  }

  componentWillReceiveProps(nextProps){
    let {
      dispatch,
      dataType,
      selected,
    } = nextProps;
    let diff = '';
    if(dataType !== 'daily'){
      let exists = Object.keys(nextProps[dataType].prices || {});
      diff = selected.split(',').diff(exists);
      diff = diff.join(',');
    }
    if(!nextProps[dataType].prices || diff){
      dispatch(fetchChartData(this.getFormData({dataType, selected: diff})));
    }
  }

  render() {
    return (
      <div>
        <section className="content-header">
          <h1>
            Petro Chemistry
            <small>chart</small>
          </h1>
        </section>
        <section className="content">
          {/*
          <InputForm type={this.props.dataType}/>
          */}
          <ChartTab yAxis="wti" type="price"/>
          <ChartTab yAxis="refining_margin" type="price"/>
          <ChartTab yAxis="ethylene" type="spread"/>
          <ChartTab yAxis="ldpe" type="spread"/>
          <ChartTab yAxis="pp" type="spread"/>
          <ChartTab yAxis="butadiene" type="price"/>
        </section>
      </div>
    );
  }
}

Petro.propTypes = {
  dispatch: PropTypes.func.isRequired,
  isLoading: PropTypes.bool,
  dataType: PropTypes.string,
  selected: PropTypes.string,
  daily: PropTypes.object,
  weekly: PropTypes.object,
  monthly: PropTypes.object,
}

export default createConnectComponent(Petro, (state) => {
  const {
    isLoading,
    errorMsg,
    dataType,
    selected,
    daily,
    weekly,
    monthly,
  } = state.petroReducer;

  return {
    isLoading,
    errorMsg,
    dataType,
    selected,
    daily,
    weekly,
    monthly,
  };
});
