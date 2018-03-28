import React, { PropTypes } from 'react';
import { setDataType, setSelected } from '../../../actions/petroAction';
import LineChart from '../../charts/LineChart';
import CandleChart from '../../charts/CandleChart';
import { createConnectComponent } from '../../../utils/componentUtil';
import FormContainer from '../../common/FormContainer';

class ChartTab extends FormContainer {
  constructor(props) {
    super(props);
    this.state = {
      dataType: 'daily',
    };
  }

  onClickTab(e){
    const {
      dispatch,
      yAxis,
    } = this.props;
    let dataType = e.target.getAttribute('value');
    dispatch(setDataType(dataType));
    if(yAxis){
      dispatch(setSelected(yAxis));
      this.setState({
        dataType,
      });
    }
  }

  renderChart(){
    let {
      daily,
      selected,
      dataType,
      weekly,
      monthly,
      yAxis,
      type,
    } = this.props;
    let yAxes = selected.split(',').filter(x => x);
    yAxes = [yAxis] || yAxes;
    dataType = this.state.dataType || dataType;

    if(dataType === 'daily'){
      if(type === 'price'){
        return (
          <div>
            <h2>Price {`(${yAxes})`}</h2>
            <LineChart data={daily.prices} yAxes={yAxes}/>
          </div>
        );
      }else if(type === 'spread'){
        return (
          <div>
            <h2>Spread {`(${yAxes})`}</h2>
            <LineChart data={daily.spreads} yAxes={yAxes}/>
          </div>
        );
      }else{
        return (
          <div>
            <h2>Price {`(${yAxes})`}</h2>
            <LineChart data={daily.prices} yAxes={yAxes}/>
            <h2>Spread {`(${yAxes})`}</h2>
            <LineChart data={daily.spreads} yAxes={yAxes}/>
          </div>
        );
      }
    }else if(dataType === 'weekly' && weekly.prices){
      if(type === 'price'){
        return (
          <div>
            <div>
              <h2>Price {`(${yAxes})`}</h2>
              <CandleChart data={weekly.prices[yAxes[0]]} />
            </div>
          </div>
        );
      }else if(type === 'spread'){
        return (
          <div>
            <div>
              <h2>Spread {`(${yAxes})`}</h2>
              <CandleChart data={weekly.spreads[yAxes[0]]} />
            </div>
          </div>
        );
      }else{
        return (
          <div>
            <div>
              <h2>Price {`(${yAxes})`}</h2>
              <CandleChart data={weekly.prices[yAxes[0]]} />
              <h2>Spread {`(${yAxes})`}</h2>
              <CandleChart data={weekly.spreads[yAxes[0]]} />
            </div>
          </div>
        );
      }
    }else if(dataType === 'monthly' && monthly.prices){
      if(type === 'price'){
        return (
          <div>
            <div>
              <h2>Price {`(${yAxes})`}</h2>
              <CandleChart data={monthly.prices[yAxes[0]]} />
            </div>
          </div>
        );
      }else if(type === 'spread'){
        return (
          <div>
            <div>
              <h2>Price {`(${yAxes})`}</h2>
              <CandleChart data={monthly.prices[yAxes[0]]} />
              <h2>Spread {`(${yAxes})`}</h2>
              <CandleChart data={monthly.spreads[yAxes[0]]} />
            </div>
          </div>
        );

      }else{
        return (
          <div>
            <div>
              <h2>Price {`(${yAxes})`}</h2>
              <CandleChart data={monthly.prices[yAxes[0]]} />
              <h2>Spread {`(${yAxes})`}</h2>
              <CandleChart data={monthly.spreads[yAxes[0]]} />
            </div>:
          </div>
        );
      }
    }else{
      return null;
    }
  }

  render(){
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
          {this.renderChart()}
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
  yAxis: PropTypes.string,
  type: PropTypes.string,
};

ChartTab.defaultProps = {
  type: 'both',
}

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
