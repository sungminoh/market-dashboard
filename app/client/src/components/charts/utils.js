import { format } from "d3-format";
import { timeFormat } from "d3-time-format";


export const str2Color = (str) => {
  var hash = 0;
  for (var i = 0; i < str.length; i++) {
    hash = str.charCodeAt(i) + ((hash << 5) - hash);
  }
  var colour = '#';
  for (var i = 0; i < 3; i++) {
    var value = (hash >> (i * 8)) & 0xFF;
    colour += ('00' + value.toString(16)).substr(-2);
  }
  return colour;
}

export const dateFormat = timeFormat("%Y-%m-%d");
export const numberFormat = format(".2f");

export const tooltipContent = (yAxes, entries) => {
  return ({ currentItem, xAccessor }) => {
    return {
      x: dateFormat(xAccessor(currentItem)),
      y: yAxes.map(axis => ({
           label: axis,
           value: currentItem[axis] && numberFormat(currentItem[axis]),
           stroke: str2Color(axis),
          }))
         .concat(entries)
         .filter(line => line && line.value)
    };
  };
}

export const yExtents = (d, yAxes, yMax, yMin) => {
  let values = []
  for(let axis of yAxes){
    let h = d[axis] * 1.05;
    let l = d[axis] * 0.95;
    if(yMin <= h && h <= yMax) values.push(h);
    if(yMin <= l && l <= yMax) values.push(l);
  }
  if(yMax < Number.MAX_VALUE) values.push(yMax);
  if(yMin > Number.MIN_VALUE) values.push(yMin);
  return values;
}

