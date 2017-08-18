import React, { PropTypes } from 'react';
import moment from 'moment';
import InputForm from './InputForm';
import ChartTab from './ChartTab';
import { createConnectComponent } from '../../../utils/componentUtil';

class Petro extends React.Component {
  constructor(props) {
    super(props);
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
          <InputForm />
          <ChartTab />
        </section>
      </div>
    );
  }
}

Petro.propTypes = {
  dispatch: PropTypes.func.isRequired,
  isLoading: PropTypes.bool,
}

export default createConnectComponent(Petro, (state) => {
  const {
    isLoading,
    errorMsg,
  } = state.petroReducer;

  return {
    isLoading,
    errorMsg,
  };
});
