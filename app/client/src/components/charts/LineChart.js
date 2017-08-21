import React from 'react';
import PropTypes from 'prop-types';

import { ChartCanvas, Chart } from 'react-stockcharts';
import {
  ScatterSeries,
  CircleMarker,
  LineSeries,
} from 'react-stockcharts/lib/series';

import { XAxis, YAxis } from 'react-stockcharts/lib/axes';
import {
  CrossHairCursor,
  MouseCoordinateX,
  MouseCoordinateY,
  EdgeIndicator,
} from 'react-stockcharts/lib/coordinates';

import { discontinuousTimeScaleProvider } from 'react-stockcharts/lib/scale';
import { MovingAverageTooltip, HoverTooltip } from 'react-stockcharts/lib/tooltip';
import { fitWidth } from 'react-stockcharts/lib/helper';
import { last } from 'react-stockcharts/lib/utils';

import { str2Color, dateFormat, numberFormat, tooltipContent, yExtents } from './utils';

/*
 * For the interactive scaling of the y-axis.
 */
const renderEdgeIndicators = yAxes => (
  yAxes.map(axis => (
    <EdgeIndicator
      itemType="last"
      key={`EdgeIndicator-${axis}`}
      orient="right"
      edgeAt="right"
      yAccessor={d => d[axis]}
      fill={() => str2Color(axis)}
    />
  ))
);

const renderLineSeries = yAxes => (
  yAxes.map(axis => (
    <LineSeries
      key={`LineSeries-${axis}`}
      yAccessor={d => d[axis]}
      stroke={str2Color(axis)}
    />
  ))
);

const renderScatterSeries = yAxes => (
  yAxes.map(axis => (
    <ScatterSeries
      key={`ScatterSeries-${axis}`}
      yAccessor={d => d[axis]}
      marker={CircleMarker}
      markerProps={{ r: 3, stroke: str2Color(axis), fill: str2Color(axis) }}
    />
  ))
);

const getYAxes = (data, yAxes) => {
  if (!yAxes || yAxes.length === 0) {
    yAxes = Object.keys(data[0]);
  }
  const dateIndex = yAxes.indexOf('date');
  if (dateIndex > -1) {
    yAxes.splice(dateIndex, 1);
  }
  const idIndex = yAxes.indexOf('id');
  if (dateIndex > -1) {
    yAxes.splice(idIndex, 1);
  }
  return yAxes;
};


class LineAndScatterChart extends React.Component {
  render() {
    const {
      data: initialData,
      type,
      width,
      height,
      ratio,
      seriesName,
      margin,
      yTicks,
      xAxis,
      yAxes: initialYAxes,
      yMax,
      yMin,
    } = this.props;

    if (!initialData || initialData.length === 0) {
      return null;
    }

    const yAxes = getYAxes(initialData, initialYAxes);

    const xScaleProvider = discontinuousTimeScaleProvider
      .inputDateAccessor(d => d[xAxis]);

    const {
      data,
      xScale,
      xAccessor,
      displayXAccessor,
    } = xScaleProvider(initialData);
    const xExtents = [
      xAccessor(last(data)),
      xAccessor(data[Math.max(0, data.length - 30)]),
    ];

    return (
      <ChartCanvas
        ratio={ratio}
        width={width}
        height={height}
        margin={margin}
        type={type}
        pointsPerPxThreshold={1}
        seriesName={seriesName}
        data={data}
        xAccessor={xAccessor}
        displayXAccessor={displayXAccessor}
        xScale={xScale}
        xExtents={xExtents}
      >
        <Chart
          id={1}
          yExtents={d => yExtents(d, yAxes, yMax, yMin)}
        >
          <XAxis axisAt="bottom" orient="bottom" />
          <YAxis axisAt="right" orient="right" ticks={yTicks} />
          <MouseCoordinateX
            at="bottom"
            orient="bottom"
            displayFormat={dateFormat}
          />
          <MouseCoordinateY
            at="right"
            orient="right"
            displayFormat={numberFormat}
          />
          {renderEdgeIndicators(yAxes)}
          {renderLineSeries(yAxes)}
          {/*renderScatterSeries(yAxes)*/}
          <HoverTooltip
            yAccessor={d => d[yAxes[0]]}
            tooltipContent={tooltipContent(yAxes)}
            fontSize={15}
          />
        </Chart>
        <CrossHairCursor />
      </ChartCanvas>

    );
  }
}

LineAndScatterChart.propTypes = {
  data: PropTypes.array, // eslint-disable-line react/forbid-prop-types
  xAxis: PropTypes.string,
  yAxes: PropTypes.array, // eslint-disable-line react/forbid-prop-types
  type: PropTypes.oneOf(['svg', 'hybrid']),
  width: PropTypes.number,
  height: PropTypes.number,
  ratio: PropTypes.number,
  seriesName: PropTypes.string,
  margin: PropTypes.object, // eslint-disable-line react/forbid-prop-types
  yTicks: PropTypes.number,
  yMax: PropTypes.number,
  yMin: PropTypes.number,
};

LineAndScatterChart.defaultProps = {
  type: 'hybrid',
  data: undefined,
  xAxis: 'date',
  yAxes: undefined,
  height: 500,
  width: undefined,
  ratio: undefined,
  seriesName: 'line',
  margin: { left: 70, right: 70, top: 20, bottom: 30 },
  yTicks: 10,
  yMax: Number.MAX_VALUE,
  yMin: Number.MIN_VALUE,
};

export default fitWidth(LineAndScatterChart);

