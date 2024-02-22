import * as React from "react";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import Typography from "@mui/material/Typography";
import { Stack, Button, Box } from "@mui/material";

import { CoinContext } from "../pages/Home";

let availCoinList = ["ETH", "BTC", "SOL"];

export default function CoinSelect() {
  const [coinList, setCoinList] = React.useContext(CoinContext);

  const [coin, setCoin] = React.useState("");
  const handleChange = (event) => {
    setCoin(event.target.value);
  };

  const onClick = () => {
    if (!coinList.includes(coin)) {
      setCoinList([...coinList, coin]);
    }
  };

  const clearAll = () => {
    setCoinList([]);
  };

  return (
    <Stack direction={"row"} alignItems={"center"} spacing={1}>
      <Box>
        <FormControl sx={{ m: 1, minWidth: 180 }} size="small">
          <InputLabel id="select-coin">Coin-Select</InputLabel>
          <Select
            labelId="select-coin"
            id="select-coin"
            value={coin}
            label="coin select"
            onChange={handleChange}
          >
            {availCoinList.map((coin) => {
              return (
                <MenuItem key={coin} value={coin}>
                  <Typography align={"center"}>{coin}</Typography>
                </MenuItem>
              );
            })}
          </Select>
        </FormControl>
      </Box>
      <Box>
        <Button variant="contained" onClick={onClick}>
          ADD
        </Button>
      </Box>
      <Box>
        <Button variant="contained" onClick={clearAll}>
          CLEAR
        </Button>
      </Box>
    </Stack>
  );
}
