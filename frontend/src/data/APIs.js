export const FORCAST_5_DAYS_3_HOURS = (lat, long, unit, WeatherAPIKey) => {
  return `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${long}&cnt=40&units=${unit}&appid=${WeatherAPIKey}`;
};

export const FORCAST_HOURLY_4_DAYS = (lat, long, unit, WeatherAPIKey) => {
  return `https://pro.openweathermap.org/data/2.5/forecast/hourly?lat=lat=${lat}&lon=${long}&appid=${WeatherAPIKey}&units=${unit}&mode=json&cnt=6`;
};
// cnt: optional	A number of timestamps in response.
