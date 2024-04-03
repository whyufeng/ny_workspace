import { useState, useEffect } from "react";

import { Box, Stack } from "@mui/material";
import { DrawerHeader, MiniDrawer } from "../components/Navbar";
import Switch from "@mui/material/Switch";
import Typography from "@mui/material/Typography";
import CurrentWeather from "../components/CurrentWeather";
import ForcastWeather from "../components/ForcastWeather";

export default function Home() {
  const [lat, setLat] = useState([]);
  const [long, setLong] = useState([]);
  const [unit, setUnit] = useState("imperial");

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(function (position) {
      setLat(position.coords.latitude);
      setLong(position.coords.longitude);
    });
  }, [lat, long]);

  const handleSwitchToggle = (event) => {
    if (event.target.checked) {
      setUnit("metric");
    } else {
      setUnit("imperial");
    }
  };

  return (
    <Box sx={{ display: "flex" }}>
      <MiniDrawer />;
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <DrawerHeader />
        <Stack
          direction="row"
          alignItems="center"
          justifyContent="right"
          sx={{ mr: 10 }}
        >
          <Typography variant="body1">°F</Typography>
          <Switch onChange={handleSwitchToggle} />
          <Typography variant="body1">°C</Typography>
        </Stack>
        <CurrentWeather lat={lat} long={long} unit={unit} />
        <ForcastWeather lat={lat} long={long} unit={unit} />
      </Box>
    </Box>
  );
}
