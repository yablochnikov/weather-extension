import React, { FC, ReactNode } from "react";
// components
import {
  Card,
  CardContent,
  Box,
  Button,
  CardActions,
  Typography,
} from "@mui/material";
// styles
import "./WeatherCard.css";

interface WeatherCardContainerProps {
  children: ReactNode;
  onDelete?: () => void;
}

const WeatherCardContainer: FC<WeatherCardContainerProps> = ({
  children,
  onDelete,
}) => {
  return (
    <Box mx={"4px"} my={"16px"}>
      <Card>
        <CardContent>{children}</CardContent>
        <CardActions>
          {onDelete && (
            <Button onClick={onDelete} color="secondary">
              <Typography className="weatherCard-body">Delete</Typography>
            </Button>
          )}
        </CardActions>
      </Card>
    </Box>
  );
};

export default WeatherCardContainer;
