import * as React from "react";
import { useState, useEffect } from "react";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";

export default function ComboBox() {
  const [availableCoins, setavailableCoins] = useState([]);
  useEffect(() => {
    fetch("api/coins_list")
      .then((response) => response.json())
      .then((results) => {
        const coins = Array.from(Object.values(results));
        console.log(coins);
        setavailableCoins(coins);
      })
      .catch((error) => {
        console.error("Note:", error);
      });
  }, []);

  return (
    <Autocomplete
      disablePortal
      id="search-box"
      options={availableCoins}
      sx={{ width: "15em" }}
      renderInput={(params) => <TextField {...params} label="Coin Selection" />}
    />
  );
}

// const available_Coins = [
//   { label: 'The Shawshank Redemption', year: 1994 },
//   { label: 'The Godfather', year: 1972 },
//   { label: 'The Godfather: Part II', year: 1974 },
//   { label: 'The Dark Knight', year: 2008 },
//   { label: '12 Angry Men', year: 1957 },
//   { label: "Schindler's List", year: 1993 },
//   { label: 'Pulp Fiction', year: 1994 },
// ];
