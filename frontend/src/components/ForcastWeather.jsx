import { useState, useEffect } from "react";
import {
  LineChart,
  LinePlot,
  lineElementClasses,
} from "@mui/x-charts/LineChart";
import {
  Box,
  Stack,
  Typography,
  autocompleteClasses,
  styled,
} from "@mui/material";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import { red, blue } from "@mui/material/colors";
import { FORCAST_5_DAYS_3_HOURS } from "../data/APIs";

const dateTimeConverter = (dataStringOld) => {
  const inputDateString = dataStringOld;
  const inputDate = new Date(inputDateString);

  const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];

  const monthName = months[inputDate.getMonth()];
  const dayOfMonth = inputDate.getDate();
  const hour = inputDate.getHours();
  const ampm = hour >= 12 ? "pm" : "am";
  const formattedHour = hour % 12 || 12; // Convert 0 to 12 for midnight

  const resultString = `${monthName} ${dayOfMonth}${getDaySuffix(
    dayOfMonth
  )} ${formattedHour}${ampm}`;

  function getDaySuffix(day) {
    if (day >= 11 && day <= 13) {
      return "th";
    }
    switch (day % 10) {
      case 1:
        return "st";
      case 2:
        return "nd";
      case 3:
        return "rd";
      default:
        return "th";
    }
  }
  return resultString;
};

export default function ForcastWeather(props) {
  const { lat, long, unit } = props;
  const [data, setData] = useState([]);
  const WeatherAPIKey = import.meta.env.VITE_APP_WEATHER_API_KEY;
  const fetchUrl = FORCAST_5_DAYS_3_HOURS(lat, long, unit, WeatherAPIKey);

  useEffect(() => {
    const FetchData = async () => {
      await fetch(fetchUrl)
        .then((res) => res.json())
        .then((result) => {
          if (result.list) {
            console.log(result.list);
            const _ret = result.list.map((ele) => {
              return {
                temp: ele.main.temp,
                feels_like: ele.main.feels_like,
                weather_descrip: ele.weather[0].description,
                weather_icon: ele.weather[0].icon,
                local_time: ele.dt_txt,
                unix_time: ele.dt,
              };
            });
            setData(_ret);
          }
        });
    };
    FetchData();
  }, [lat, long, unit]);

  const weatherChart = (data) => {
    const time_x = data.map(
      (ele) => (ele.unix_time - data[0].unix_time) / 3600
    );
    const temp_y = data.map((ele) => ele.feels_like);
    return (
      <Box sx={{ display: "flex" }} justifyContent={"center"}>
        <LineChart
          xAxis={[{ data: time_x, labelFontSize: 200 }]}
          yAxis={[{ min: 0 }]}
          series={[{ type: "line", data: temp_y }]}
          width={500}
          height={300}
        />
      </Box>
    );
  };

  const weatherTabs = (data) => {
    return data.map((ele, index) => {
      const iconURL = `https://openweathermap.org/img/wn/${ele.weather_icon}@2x.png`;
      // console.log(iconURL);
      const fontColor = ele.feels_like >= ele.temp ? red[500] : blue[700];

      return (
        <Card key={index} sx={{ minWidth: "6vw", aspectRatio: 0.6 }}>
          <CardMedia
            component="img"
            sx={{ padding: "0 1em 0 1em" }}
            image={iconURL}
            alt=""
          />
          <CardContent>
            <Typography
              variant="body1"
              fontStyle={"italic"}
              sx={{ textTransform: "capitalize" }}
            >
              {ele.weather_descrip}
            </Typography>
            <Typography variant="body1" fontStyle={"italic"}>
              {dateTimeConverter(ele.local_time)}
            </Typography>
            <Typography variant="body2">
              Temperature: {Math.round(ele.temp * 10) / 10}
            </Typography>
            <Typography variant="body1" color={fontColor}>
              Feels Like: {Math.round(ele.feels_like * 10) / 10}
            </Typography>
          </CardContent>
        </Card>
      );
    });
  };

  if (data.length === 0) {
    return (
      <Box
        sx={{ display: "flex", fontStyle: "italic" }}
        justifyContent={"center"}
      >
        loading
      </Box>
    );
  } else {
    return (
      <>
        <Box>{weatherChart(data)}</Box>
        <Box sx={{ minHeight: "11em" }} justifyContent={"center"}>
          <Stack
            // component={"ul"}
            display={"flex"}
            // justifyContent={"left"}
            direction="row"
            sx={{ maxWidth: "90vw", overflowX: "scroll" }}
            spacing={2}
            padding={2}
          >
            {weatherTabs(data.slice(0, 6))}
          </Stack>
        </Box>
      </>
    );
  }
}
