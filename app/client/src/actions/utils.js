export const firstDayOfWeek = (year, week) => {
  year = parseInt(year);
  week = parseInt(week);
  // Jan 1 of 'year'
  var d = new Date(year, 0, 1);
  var offset = d.getTimezoneOffset();

  // ISO: week 1 is the one with the year's first Thursday
  // so nearest Thursday: current date + 4 - current day number
  // Sunday is converted from 0 to 7
  d.setDate(d.getDate() + 4 - (d.getDay() || 7));

  // 7 days * (week - overlapping first week)
  d.setTime(d.getTime() + 7 * 24 * 60 * 60 * 1000
    * (week + (year == d.getFullYear() ? -1 : 0 )));

  // daylight savings fix
  d.setTime(d.getTime()
    + (d.getTimezoneOffset() - offset) * 60 * 1000);

  // back to Monday (from Thursday)
  d.setDate(d.getDate() - 3);

  return d;
};

export const preprocess = (type, data) => {
  const toDate = (type, dateString) => {
    if(type === 'daily')
      return new Date(dateString);
    else if(type === 'weekly')
      return firstDayOfWeek.apply(this, dateString.split('-'));
    else if(type === 'monthly')
      return new Date(dateString + '-01')
  };
  let toDateRec = (type, data) => {
    if(data.constructor === Array){
      // handle array
      return data.map(d => ({
        ...d,
        date: toDate(type, d.date),
      }));
    } else if (data.constructor === Object) {
      // handle object
      for(let key of Object.keys(data)) {
        data[key] = toDateRec(type, data[key]);
      }
      return data;
    }
  }
  return toDateRec(type, data);
};
