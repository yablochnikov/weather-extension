import { OpenWeatherData, OpenWeatherTempScale } from "../types";

const OPEN_WEATHER_API_KEY = "2d6a44f98c2ab61df1d66550ecc9286f";

export async function fetchOpenWeatherData(
  city: string,
  tempScale: OpenWeatherTempScale = "metric"
) {
  const response = await fetch(
    `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=${tempScale}&appid=${OPEN_WEATHER_API_KEY}`
  );

  if (!response.ok) {
    throw new Error("City not found");
  }

  const data: OpenWeatherData = await response.json();

  return data;
}

export function getWeatherIconSrc(iconCode: string) {
  return `http://openweathermap.org/img/wn/${iconCode}@2x.png`;
}
