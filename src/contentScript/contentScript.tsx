import React, { FC, useEffect, useState } from "react";
import { createRoot } from "react-dom/client";
// components
import { Card } from "@mui/material";
import { WeatherCard } from "../components/WeatherCard";
// utils
import { getStoredOptions } from "../utils/storage";
import { Messages } from "../utils/messages";
// types
import { LocalStorageOptions } from "../types";
// styles
import "./contentScript.css";

const App: FC<{}> = () => {
  const [options, setOptions] = useState<LocalStorageOptions | null>(null);
  const [isActive, setIsActive] = useState<boolean>(false);

  useEffect(() => {
    getStoredOptions().then((options) => {
      setIsActive(options.hasAutoOverlay);
      setOptions(options);
    });
  }, []);

  useEffect(() => {
    chrome.runtime.onMessage.addListener((msg) => {
      if (msg === Messages.TOGGLE_OVERLAY) {
        setIsActive(!isActive);
      }
    });
  }, [isActive]);

  if (!options) {
    return null;
  }
  return (
    <>
      {isActive && (
        <Card className="overlayCard">
          <WeatherCard
            city={options.homeCity}
            tempScale={options.tempScale}
            onDelete={() => setIsActive(false)}
          />
        </Card>
      )}
    </>
  );
};

const root = document.createElement("div");
document.body.appendChild(root);
createRoot(root).render(<App />);
