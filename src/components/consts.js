
export const CARD_TYPE = {
  icon: 'Icon',
  temperature: 'Temperature',
  wind: 'Wind',
  extra: 'Extra Options',
};

export const MEASUREMENT_SYSTEM = {
  imperial: 'imperial',
  metric: 'metric'
};

export const MEASUREMENT = {
  metric: {
    temp: 'C',
    windSpeed: 'meter/sec',
    windGust: 'meter/sec',
  },
  imperial: {
    temp: 'F',
    windSpeed: 'miles/hour',
    windGust: 'miles/hour',
  }
};

export const CURRENT_AND_FORECAST = {
  current: 'current',
  minutely: 'minutely',
  hourly: 'hourly',
  daily: 'daily',
  alerts: 'alerts'
};