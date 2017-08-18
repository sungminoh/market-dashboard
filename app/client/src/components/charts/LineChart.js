import React from "react";
import PropTypes from "prop-types";

import { ChartCanvas, Chart } from "react-stockcharts";
import {
  ScatterSeries,
  //SquareMarker,
  //TriangleMarker,
  CircleMarker,
  LineSeries,
} from "react-stockcharts/lib/series";

import { XAxis, YAxis } from "react-stockcharts/lib/axes";
import { CrossHairCursor, MouseCoordinateX, MouseCoordinateY } from "react-stockcharts/lib/coordinates";
import { EdgeIndicator } from "react-stockcharts/lib/coordinates";

import { discontinuousTimeScaleProvider } from "react-stockcharts/lib/scale";
import { OHLCTooltip, MovingAverageTooltip, HoverTooltip } from "react-stockcharts/lib/tooltip";
import { ema, wma, sma, tma } from "react-stockcharts/lib/indicator";
import { fitWidth } from "react-stockcharts/lib/helper";
import { last } from "react-stockcharts/lib/utils";

import { str2Color, dateFormat, numberFormat, tooltipContent, yExtents } from './utils';


class LineAndScatterChart extends React.Component {
  /*
   * For the interactive scaling of the y-axis.
   */
  renderEdgeIndicators(){
    const {
      yAxes
    } = this.props;
    return yAxes.map(axis => (
      <EdgeIndicator itemType="last"
        key={'EdgeIndicator-' + axis}
        orient="right"
        edgeAt="right"
        yAccessor={d => d[axis]}
        fill={d => str2Color(axis)} />
    ))
  }

  renderLineSeries(){
    const {
      yAxes
    } = this.props;
    return yAxes.map(axis => (
      <LineSeries
        key={'LineSeries-' + axis}
        yAccessor={d => d[axis]}
        stroke={str2Color(axis)} />
    ));
  }

  renderScatterSeries(){
    const {
      yAxes
    } = this.props;
    return yAxes.map(axis => (
      <ScatterSeries
        key={'ScatterSeries-' + axis}
        yAccessor={d => d[axis]}
        marker={CircleMarker}
        markerProps={{ r: 3, stroke: str2Color(axis), fill: str2Color(axis)}} />
    ))
  }

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
      yAxes,
      yMax,
      yMin,
    } = this.props;
    const xScaleProvider = discontinuousTimeScaleProvider.inputDateAccessor(d => d[xAxis]);
    const {
      data,
      xScale,
      xAccessor,
      displayXAccessor,
    } = xScaleProvider(initialData);
    const xExtents = [
      xAccessor(last(data)),
      xAccessor(data[0])
    ];
    return (
      <ChartCanvas ratio={ratio} width={width} height={height}
          margin={margin}
          type={type}
          pointsPerPxThreshold={1}
          seriesName={seriesName}
          data={data}
          xAccessor={xAccessor}
          displayXAccessor={displayXAccessor}
          xScale={xScale}
          xExtents={xExtents}>
        <Chart id={1}
          yExtents={d => yExtents(d, yAxes, yMax, yMin)}>
          <XAxis axisAt="bottom" orient="bottom"/>
          <YAxis axisAt="right" orient="right" ticks={yTicks} />
          <MouseCoordinateX
            at="bottom"
            orient="bottom"
            displayFormat={dateFormat} />
          <MouseCoordinateY
            at="right"
            orient="right"
            displayFormat={numberFormat} />
          {this.renderEdgeIndicators()}
          {this.renderLineSeries()}
          {this.renderScatterSeries()}
          <OHLCTooltip forChart={1} origin={[-40, 0]}/>
          <HoverTooltip
            yAccessor={d => d[yAxes[0]]}
            tooltipContent={tooltipContent(yAxes)}
            fontSize={15} />
        </Chart>
        <CrossHairCursor />
      </ChartCanvas>

    );
  }
}

LineAndScatterChart.propTypes = {
  data: PropTypes.array.isRequired,
  xAxis: PropTypes.string.isRequired,
  yAxes: PropTypes.array.isRequired,
  type: PropTypes.oneOf(["svg", "hybrid"]),
  width: PropTypes.number,
  height: PropTypes.number,
  ratio: PropTypes.number,
  seriesName: PropTypes.string,
  margin: PropTypes.object,
  yTicks: PropTypes.number,
  yMax: PropTypes.number,
  yMin: PropTypes.number,
};

LineAndScatterChart.defaultProps = {
  type: "hybrid",
  height: 500,
  seriesName: 'line',
  margin: { left: 70, right: 70, top: 20, bottom: 30 },
  yTicks: 10,
  yMax: Number.MAX_VALUE,
  yMin: Number.MIN_VALUE,
};

LineAndScatterChart = fitWidth(LineAndScatterChart);

export default LineAndScatterChart;

