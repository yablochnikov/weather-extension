import React, { FC, useState, useEffect } from "react";
import { createRoot } from "react-dom/client";
// icons
import {
  Add as AddIcon,
  PictureInPicture as PictureInPictureIcon,
} from "@mui/icons-material";
// components
import { WeatherCard } from "../components/WeatherCard";
import { Grid, Paper, InputBase, Box, IconButton } from "@mui/material";
// utils
import {
  setStoredCities,
  getStoredCities,
  getStoredOptions,
  setStoredOptions,
} from "../utils/storage";
import { Messages } from "../utils/messages";
// types
import { LocalStorageOptions } from "../types";
// styles
import "fontsource-roboto";
import "./popup.css";

const App: FC<{}> = () => {
  const [cities, setCities] = useState<string[]>([
    "London",
    "New York",
    "Error",
  ]);
  const [cityInput, setCityInput] = useState<string>("");
  const [options, setOptions] = useState<LocalStorageOptions | null>(null);

  useEffect(() => {
    getStoredCities().then((cities) => setCities(cities));
    getStoredOptions().then((options) => setOptions(options));
  }, []);

  const handleCityButtonClick = () => {
    if (cityInput === "") {
      return;
    }
    const updatedCities = [...cities, cityInput];
    setStoredCities(updatedCities).then(() => {
      setCities(updatedCities);
      setCityInput("");
    });
  };

  const handleCityDeleteButtonClick = (index: number) => {
    cities.splice(index, 1);
    const updatedCities = [...cities];

    setStoredCities(updatedCities).then(() => {
      setCities(updatedCities);
    });
  };

  const handleTempScaleButtonClick = () => {
    const updateOptions: LocalStorageOptions = {
      ...options,
      tempScale: options?.tempScale === "metric" ? "imperial" : "metric",
    };

    setStoredOptions(updateOptions).then(() => {
      setOptions(updateOptions);
    });
  };

  const handleToggleOverlay = () => {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      if (tabs.length > 0) {
        chrome.tabs.sendMessage(tabs[0].id!, Messages.TOGGLE_OVERLAY);
      }
    });
  };

  if (!options) {
    return null;
  }

  return (
    <Box mx="8px" my="16px">
      <Grid container justifyContent="center">
        <Grid item>
          <Paper>
            <Box px="15px" py="5px">
              <InputBase
                placeholder="Search…"
                value={cityInput}
                onChange={(event) => setCityInput(event.target.value)}
              />

              <IconButton
                color="primary"
                aria-label="directions"
                onClick={handleCityButtonClick}
              >
                <AddIcon />
              </IconButton>
              <IconButton onClick={handleTempScaleButtonClick}>
                {options.tempScale === "metric" ? "\u2103" : "\u2109"}
              </IconButton>
              <IconButton onClick={handleToggleOverlay}>
                <PictureInPictureIcon />
              </IconButton>
            </Box>
          </Paper>
        </Grid>
      </Grid>
      {options.homeCity != "" && (
        <WeatherCard city={options.homeCity} tempScale={options.tempScale} />
      )}
      {cities.map((city, id) => (
        <WeatherCard
          key={city}
          city={city}
          tempScale={options.tempScale}
          onDelete={() => {
            handleCityDeleteButtonClick(id);
          }}
        />
      ))}
      <Box height="16px" />
    </Box>
  );
};

const root = document.createElement("div");
document.body.appendChild(root);
createRoot(root).render(<App />);
