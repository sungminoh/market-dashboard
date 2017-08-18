import React from "react";
import PropTypes from "prop-types";

import { ChartCanvas, Chart } from "react-stockcharts";
import {
  LineSeries,
  CandlestickSeries
} from "react-stockcharts/lib/series";

import { XAxis, YAxis } from "react-stockcharts/lib/axes";
import {
  CrossHairCursor,
  MouseCoordinateX,
  MouseCoordinateY,
  CurrentCoordinate,
} from "react-stockcharts/lib/coordinates";
import { EdgeIndicator } from "react-stockcharts/lib/coordinates";

import { discontinuousTimeScaleProvider } from "react-stockcharts/lib/scale";
import {
  OHLCTooltip,
  MovingAverageTooltip,
  HoverTooltip
} from "react-stockcharts/lib/tooltip";
import { ema, wma, sma, tma } from "react-stockcharts/lib/indicator";
import { fitWidth } from "react-stockcharts/lib/helper";
import { last } from "react-stockcharts/lib/utils";

import { str2Color, dateFormat, numberFormat, tooltipContent, yExtents } from './utils';


class CandlestickChart extends React.Component {
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

    const ema20 = ema()
      .options({
        windowSize: 20, // optional will default to 10
        sourcePath: "close", // optional will default to close as the source
      })
      .skipUndefined(true) // defaults to true
      .merge((d, c) => {d.ema20 = c;}) // Required, if not provided, log a error
      .accessor(d => d.ema20) // Required, if not provided, log an error during calculation
      .stroke("blue"); // Optional

    const sma20 = sma()
      .options({ windowSize: 20 })
      .merge((d, c) => {d.sma20 = c;})
      .accessor(d => d.sma20);

    const wma20 = wma()
      .options({ windowSize: 20 })
      .merge((d, c) => {d.wma20 = c;})
      .accessor(d => d.wma20);

    const tma20 = tma()
      .options({ windowSize: 20 })
      .merge((d, c) => {d.tma20 = c;})
      .accessor(d => d.tma20);

    const ema50 = ema()
      .options({ windowSize: 50 })
      .merge((d, c) => {d.ema50 = c;})
      .accessor(d => d.ema50);

    const calculatedData = ema20(sma20(wma20(tma20(ema50(initialData)))));
    const xScaleProvider = discontinuousTimeScaleProvider.inputDateAccessor(d => d[xAxis]);
    const {
      data,
      xScale,
      xAccessor,
      displayXAccessor,
    } = xScaleProvider(calculatedData);
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

          <LineSeries yAccessor={sma20.accessor()} stroke={sma20.stroke()}/>
          <LineSeries yAccessor={wma20.accessor()} stroke={wma20.stroke()}/>
          <LineSeries yAccessor={tma20.accessor()} stroke={tma20.stroke()}/>
          <LineSeries yAccessor={ema20.accessor()} stroke={ema20.stroke()}/>
          <LineSeries yAccessor={ema50.accessor()} stroke={ema50.stroke()}/>
          <CurrentCoordinate yAccessor={sma20.accessor()} fill={sma20.stroke()} />
          <CurrentCoordinate yAccessor={wma20.accessor()} fill={wma20.stroke()} />
          <CurrentCoordinate yAccessor={tma20.accessor()} fill={tma20.stroke()} />
          <CurrentCoordinate yAccessor={ema20.accessor()} fill={ema20.stroke()} />
          <CurrentCoordinate yAccessor={ema50.accessor()} fill={ema50.stroke()} />
          <MovingAverageTooltip
            onClick={e => console.log(e)}
            origin={[-38, 15]}
            options={[
              {
                yAccessor: sma20.accessor(),
                type: "SMA",
                stroke: sma20.stroke(),
                windowSize: sma20.options().windowSize,
                echo: "some echo here",
              },
              {
                yAccessor: wma20.accessor(),
                type: "WMA",
                stroke: wma20.stroke(),
                windowSize: wma20.options().windowSize,
                echo: "some echo here",
              },
              {
                yAccessor: tma20.accessor(),
                type: "TMA",
                stroke: tma20.stroke(),
                windowSize: tma20.options().windowSize,
                echo: "some echo here",
              },
              {
                yAccessor: ema20.accessor(),
                type: "EMA",
                stroke: ema20.stroke(),
                windowSize: ema20.options().windowSize,
                echo: "some echo here",
              },
              {
                yAccessor: ema50.accessor(),
                type: "EMA",
                stroke: ema50.stroke(),
                windowSize: ema50.options().windowSize,
                echo: "some echo here",
              },
            ]}
          />

          <OHLCTooltip forChart={1} origin={[-40, 0]}/>
          <HoverTooltip
            yAccessor={d => d[yAxes[0]]}
            tooltipContent={tooltipContent(yAxes)}
            fontSize={15} />
          <CandlestickSeries fill={'#000000'} stroke={'#000000'}/>
        </Chart>
        <CrossHairCursor />
      </ChartCanvas>

    );
  }
}

CandlestickChart.propTypes = {
  data: PropTypes.array.isRequired,
  xAxis: PropTypes.string,
  yAxes: PropTypes.array,
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

CandlestickChart.defaultProps = {
  xAxis: 'date',
  yAxes: ['high', 'low', 'open', 'close'],
  type: "hybrid",
  height: 500,
  seriesName: 'line',
  margin: { left: 70, right: 70, top: 20, bottom: 30 },
  yTicks: 10,
  yMax: Number.MAX_VALUE,
  yMin: Number.MIN_VALUE,
};

CandlestickChart = fitWidth(CandlestickChart);

export default CandlestickChart;

