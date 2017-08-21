import React, { PropTypes } from 'react';
import { setDataType } from '../../../actions/petroAction';
import LineChart from '../../charts/LineChart';
import CandleChart from '../../charts/CandleChart';
import { createConnectComponent } from '../../../utils/componentUtil';
import FormContainer from '../../common/FormContainer';

class ChartTab extends FormContainer {
  constructor(props) {
    super(props);
  }

  onClickTab(e){
    let dataType = e.target.getAttribute('value');
    this.props.dispatch(setDataType(dataType));
  }

  render(){
    const {
      dispatch,
      daily,
      selected,
      dataType,
      weekly,
      monthly,
    } = this.props;
    let yAxes = selected.split(',').filter(x => x);
            //<Link to={{pathname: '/login'}} data-toggle="tab">Daily</Link>
            //<CandleChart data={weekly.prices} />
    return (
      <div className="nav-tabs-custom">
        <ul className="nav nav-tabs">
          <li className="active">
            <a onClick={this.onClickTab.bind(this)} value='daily' data-toggle="tab">Daily</a>
          </li>
          <li>
            <a onClick={this.onClickTab.bind(this)} value='weekly' data-toggle="tab">Weekly</a>
          </li>
          <li>
            <a onClick={this.onClickTab.bind(this)} value='monthly' data-toggle="tab">Monthly</a>
          </li>
        </ul>
        <div className="tab-content">
          {dataType === 'daily' ?
            <div>
              <h2>Price</h2>
              <LineChart data={daily.prices} yAxes={yAxes}/>
              <h2>Spread</h2>
              <LineChart data={daily.spreads} yAxes={yAxes}/>
            </div> :
          dataType === 'weekly' ?
            <div>
              {weekly.prices ?
                <div>
                  <h2>Price</h2>
                  <CandleChart data={weekly.prices[yAxes[0]]} />
                  <h2>Spread</h2>
                  <CandleChart data={weekly.spreads[yAxes[0]]} />
                </div>:
                null
              }
            </div> :
            <div>
              {monthly.prices ?
                <div>
                  <h2>Price</h2>
                  <CandleChart data={monthly.prices[yAxes[0]]} />
                  <h2>Spread</h2>
                  <CandleChart data={monthly.spreads[yAxes[0]]} />
                </div>:
                null
              }
            </div>
          }
        </div>
      </div>
    );
  }
}


ChartTab.propTypes = {
  dispatch: PropTypes.func.isRequired,
  isLoading: PropTypes.bool,
  selected: PropTypes.string,
  dataType: PropTypes.string,
  daily: PropTypes.object,
  weekly: PropTypes.object,
  monthly: PropTypes.object,
};

export default createConnectComponent(ChartTab, (state) => {
  const {
    isLoading,
    errorMsg,
    selected,
    dataType,
    daily,
    weekly,
    monthly,
  } = state.petroReducer;

  return {
    isLoading,
    errorMsg,
    selected,
    dataType,
    daily,
    weekly,
    monthly,
  };
});
