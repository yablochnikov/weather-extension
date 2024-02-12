import React, { FC, useEffect, useState } from "react";
// utils
import { fetchOpenWeatherData, getWeatherIconSrc } from "../../utils/api";
// types
import {
  OpenWeatherData,
  OpenWeatherTempScale,
  WeatherCardSate,
} from "../../types";
import { Button, CardActions, Grid, Typography } from "@mui/material";
// components
import WeatherCardContainer from "./WeatherCardContainer";
// styles
import "./WeatherCard.css";

interface WeatherCardProps {
  city: string;
  onDelete?: () => void;
  tempScale: OpenWeatherTempScale;
}

const WeatherCard: FC<WeatherCardProps> = ({ city, onDelete, tempScale }) => {
  const [weatherData, setWeatherData] = useState<OpenWeatherData | null>(null);
  const [cardState, setCardState] = useState<WeatherCardSate>("loading");

  useEffect(() => {
    fetchOpenWeatherData(city, tempScale)
      .then((data) => {
        setWeatherData(data);
        setCardState("ready");
      })
      .catch((error) => setCardState("error"));
  }, [city, tempScale]);

  if (cardState === "loading" || cardState === "error") {
    return (
      <WeatherCardContainer onDelete={onDelete}>
        <Typography className="weatherCard-title" component="h2">
          {city}
        </Typography>
        <Typography className="weatherCard-body">
          {cardState === "loading"
            ? "Loading..."
            : "Error: could not retrieve weather data for this city"}
        </Typography>
      </WeatherCardContainer>
    );
  }

  return (
    <WeatherCardContainer onDelete={onDelete}>
      <Grid container justifyContent="space-around">
        <Grid item textAlign="center">
          <Typography className="weatherCard-title">
            {weatherData.name}
          </Typography>
          <Typography className="weatherCard-temp">
            {Math.round(weatherData.main.temp)}
          </Typography>
          <Typography className="weatherCard-body">
            Feels like: {Math.round(weatherData.main.feels_like)}
          </Typography>
        </Grid>
        <Grid item>
          {weatherData.weather.length > 0 && (
            <>
              <img src={getWeatherIconSrc(weatherData.weather[0].icon)} />
              <Typography className="weatherCard-body">
                {weatherData.weather[0].main}
              </Typography>
            </>
          )}
        </Grid>
      </Grid>
    </WeatherCardContainer>
  );
};

export default WeatherCard;
