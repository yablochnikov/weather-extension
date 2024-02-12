import React, { FC, useEffect, useState } from "react";
import { createRoot } from "react-dom/client";
// styles
import "fontsource-roboto";
import "./options.css";
// components
import {
  Box,
  Button,
  Card,
  CardContent,
  Grid,
  Switch,
  TextField,
  Typography,
} from "@mui/material";
// utils
import { getStoredOptions, setStoredOptions } from "../utils/storage";
import { LocalStorageOptions } from "../types";

type FormState = "ready" | "saving";

const App: FC<{}> = () => {
  const [options, setOptions] = useState<LocalStorageOptions | null>(null);
  const [formState, setFormState] = useState<FormState>("ready");

  useEffect(() => {
    getStoredOptions().then((options) => setOptions(options));
  }, []);

  const handleHomeCityChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const updatedOptions = {
      ...options,
      homeCity: event.target.value,
    };

    setStoredOptions(updatedOptions).then(() => {
      setOptions(updatedOptions);
    });
  };

  const handleSaveButtonClick = () => {
    setFormState("saving");

    setStoredOptions(options).then(() => {
      setTimeout(() => {
        setFormState("ready");
      }, 500);
    });
  };

  const handleSwitchChange = (checked: boolean) => {
    const updatedOptions = {
      ...options,
      hasAutoOverlay: checked,
    };

    setStoredOptions(updatedOptions).then(() => {
      setOptions(updatedOptions);
    });
  };

  const isDisabled = formState === "saving";

  if (!options) {
    return null;
  }

  return (
    <Box mx="5%" my="2%">
      <Card>
        <CardContent>
          <Grid container direction="column" spacing={4}>
            <Grid item>
              <Typography variant="h4" component="h2">
                Weather Extension Options
              </Typography>
            </Grid>
            <Grid item>
              <Typography variant="body1">Home city name</Typography>
              <TextField
                fullWidth
                placeholder="Enter a home city name"
                value={options.homeCity}
                onChange={handleHomeCityChange}
                disabled={isDisabled}
              />
            </Grid>

            <Grid item>
              <Typography variant="body1">
                Auto toggle overlay on webpage
              </Typography>
              <Switch
                checked={options.hasAutoOverlay}
                disabled={isDisabled}
                onChange={(_e, checked) => handleSwitchChange(checked)}
              />
            </Grid>
            <Grid item>
              <Button
                variant="contained"
                color="primary"
                onClick={handleSaveButtonClick}
                disabled={isDisabled}
              >
                {formState === "saving" ? "Saving..." : "Save"}
              </Button>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    </Box>
  );
};

const root = document.createElement("div");
document.body.appendChild(root);
createRoot(root).render(<App />);
