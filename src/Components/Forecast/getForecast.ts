function getForecast(data, day: number, hour: number | boolean) {
  let forecast =
    hour || hour === 0
      ? data.forecastday[day].hour[hour as number]
      : data.forecastday[day].day;

  return {
    temp: {
      name: hour ? "Temperature" : "Max Temp.",
      value: forecast.maxtemp_c || forecast.temp_c,
      unit: "°C",
    },
    mintemp: {
      name: hour ? "Cloud" : "Min Temp.",
      value: forecast.mintemp_c || forecast.cloud,
      unit: hour ? "%" : "°C",
    },
    weather: {
      name: "Weather",
      value: forecast.condition.text,
      unit: "",
    },
    humidity: {
      name: "Humidity",
      value: forecast.avghumidity || forecast.humidity,
      unit: "%",
    },
    wind: {
      name: "Wind",
      value: forecast.maxwind_kph || forecast.wind_kph,
      unit: "km/h",
    },
    uv: {
      name: "UV",
      value: forecast.uv,
      unit: "",
    },
    rain: {
      name: "Rain",
      value: forecast.daily_chance_of_rain || forecast.chance_of_rain || 0,
      unit: "%",
    },
    snow: {
      name: "Snow",
      value: forecast.daily_chance_of_snow || forecast.chance_of_snow || 0,
      unit: "%",
    },
    layer: {
      name: "Snow Layer",
      value: forecast.totalsnow_cm || forecast.snow_cm || 0,
      unit: "cm",
    },
  };
}

export default getForecast;
