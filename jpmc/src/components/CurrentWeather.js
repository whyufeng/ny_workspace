import { useState, useEffect } from "react";
import { Box, Stack, Typography, Grid } from "@mui/material";
import Divider from "@mui/material/Divider";

export default function CurrentWeather(props) {
  const { lat, long, unit } = props;
  const [data, setData] = useState([]);
  const WeatherAPIKey = process.env.REACT_APP_WEATHER_API_KEY;

  useEffect(() => {
    const FetchData = async () => {
      const fetchUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&units=${unit}&appid=${WeatherAPIKey}`;
      await fetch(fetchUrl)
        .then((res) => res.json())
        .then((result) => {
          setData(result);
          console.log(result);
        });
    };
    FetchData();
  }, [lat, long, unit]);

  const BasicWeather = (data) => {
    if (data.main === undefined) {
      return (
        <Box
          sx={{ display: "flex", fontStyle: "italic" }}
          justifyContent={"center"}
        >
          loading
        </Box>
      );
    } else {
      const iconURL = `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;
      return (
        <Box>
          <Box
            sx={{ display: "flex", fontStyle: "italic" }}
            justifyContent={"center"}
          >
            <Stack
              direction={"row"}
              divider={<Divider orientation="vertical" flexItem />}
              alignItems={"center"}
            >
              <img src={iconURL} style={{ width: "200%" }} />
              <h1 style={{ paddingLeft: "1em" }}>
                {Math.round(data.main.feels_like)}&deg;
              </h1>
            </Stack>
          </Box>
          <Typography
            sx={{
              display: "flex",
              justifyContent: "center",
              fontWeight: "regular",
              fontSize: "1.25rem",
              color: "cyan",
              textTransform: "capitalize",
              m: 1,
            }}
          >
            {data.weather[0].description}
          </Typography>

          <Typography
            sx={{
              display: "flex",
              justifyContent: "center",
              fontWeight: "regular",
              fontSize: "1.25rem",
              color: "blue",
              textTransform: "capitalize",
              m: 1,
            }}
          >
            {data.name}
          </Typography>
        </Box>
      );
    }
  };

  return BasicWeather(data);
}
